import { SUPABASE_URL, BASE_HEADERS } from './supabase-config.js';
const grid = document.querySelector('#event-grid');
const empty = document.querySelector('#event-empty');
let events = [];
const signedCache = new Map();
function lang(){ return window.getSiteLang?.() === 'it' ? 'it' : 'de'; }
function safeExternal(url){ try { const u = new URL(url); return u.protocol === 'https:' ? u.href : null; } catch { return null; } }
async function signedImage(path){
  if(!path || !/^events\/[A-Za-z0-9_./-]+$/.test(path) || path.includes('..')) return null;
  const hit = signedCache.get(path);
  if(hit && hit.expiry > Date.now()) return hit.url;
  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/media/${path.split('/').map(encodeURIComponent).join('/')}`, {
      method:'POST', headers:{...BASE_HEADERS,'Content-Type':'application/json'}, body:JSON.stringify({expiresIn:3600})
    });
    if(!res.ok) return null;
    const value = await res.json(); let url = value.signedURL || value.signedUrl;
    if(!url) return null;
    if(url.startsWith('/')) url = SUPABASE_URL + url;
    signedCache.set(path, {url, expiry: Date.now() + 3000000}); return url;
  } catch { return null; }
}
function el(tag, cls, text){ const n = document.createElement(tag); if(cls) n.className = cls; if(text !== undefined) n.textContent = text; return n; }
const S = {
  it:{empty:'I prossimi eventi saranno pubblicati qui.', details:'Scopri di più', open:'Apri il flyer', error:'Impossibile caricare gli eventi. Riprova con una connessione Internet.'},
  de:{empty:'Neue Veranstaltungstermine folgen in Kürze.', details:'Mehr erfahren', open:'Flyer öffnen', error:'Events konnten nicht geladen werden. Bitte Internetverbindung prüfen.'}
};
async function render(){
  if(!grid) return;
  const l = lang(), s = S[l];
  const cards = [];
  for(const row of events){
    if(row.auto_expire && row.starts_at && new Date(row.starts_at).getTime() < Date.now() - 6*3600*1000) continue; // hide a few hours after start
    const title = String(row[`title_${l}`] || row.title_it || row.title_de || 'Event');
    const card = el('article','flyer-card');
    const uri = await signedImage(row.image_path);
    if(uri){
      const a = el('a','flyer-open'); a.href = uri; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', `${s.open}: ${title}`);
      const img = el('img'); img.alt = title; img.loading = 'lazy'; img.decoding = 'async'; img.src = uri;
      a.append(img); card.append(a);
    }
    const body = el('div','card-body');
    body.append(el('h3','',title));
    const when = row.starts_at ? new Intl.DateTimeFormat(l === 'de' ? 'de-DE' : 'it-IT', {weekday:'short',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(row.starts_at)) : null;
    const meta = [when, row.location].filter(Boolean);
    if(meta.length) body.append(el('p','',meta.join(' · ')));
    const desc = String(row[`description_${l}`] || '');
    if(desc) body.append(el('p','',desc));
    const actions = el('div','card-actions');
    const href = safeExternal(row.link_url);
    if(href){ const a = el('a','card-link',s.details); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; actions.append(a); }
    body.append(actions);
    card.append(body); cards.push(card);
  }
  grid.replaceChildren(...cards);
  const has = cards.length > 0;
  empty.classList.toggle('hidden', has); empty.dataset.count = has ? '1' : '0';
  if(!has) empty.textContent = s.empty;
}
async function load(){
  try{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/events?select=*&published=eq.true&order=sort_order.asc,starts_at.asc&limit=100`, {headers:BASE_HEADERS, cache:'no-store'});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    events = await res.json(); await render();
  }catch(e){
    console.warn('Unable to load events', e);
    empty.textContent = S[lang()].error;
  }
}
window.addEventListener('site-language-changed', render);
await load();
document.addEventListener('visibilitychange', () => { if(document.visibilityState === 'visible') load(); });
