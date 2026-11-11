import { SUPABASE_URL, SUPABASE_PUBLIC_KEY, ADMIN_EMAIL } from './supabase-config.js';
const $=id=>document.getElementById(id);
let api=null, user=null, kind='events', lang='it', selected=null, records={events:[]}, editing=null, existingImage=null;
const COPY={
 it:{back:'Pagina principale',installTitle:'Installa il pannello come app',installHintAndroid:'Avrai l’icona GG Admin sulla schermata Home, separata dal sito pubblico.',installHintIos:'Safari → Condividi → «Aggiungi alla schermata Home». L’icona si chiamerà GG Admin.',installBtn:'Installa',subtitle:'Aggiungi e gestisci i flyer degli eventi. Quelli pubblicati compaiono subito sulla pagina principale.',upcomingCount:'In arrivo',loading:'Caricamento…',restricted:'Accesso riservato',restrictedDesc:'L’accesso è consentito soltanto all’indirizzo e-mail autorizzato. Riceverai un link per entrare senza password.',sendLink:'Invia link di accesso',authTip:'Controlla anche Spam. Dopo aver pubblicato il sito, aggiungi il nuovo URL alle Redirect URLs del progetto Supabase per poter aprire il link di accesso.',otpToggle:'Hai ricevuto un codice a 6 cifre?',pasteToggle:'Il link ti porta su un’altra pagina?',pasteLabel:'Copia e incolla il link ricevuto per e-mail',otpLabel:'Codice e-mail',verify:'Conferma codice',connected:'Accesso amministratore attivo',logout:'Esci',eventCount:'Eventi',venueCount:'Locali suggeriti',draftCount:'Bozze',eventTab:'📅 Eventi',venueTab:'⭐ Suggerimenti',newItem:'+ Aggiungi flyer',titleIt:'Titolo italiano *',titleDe:'Titel Deutsch *',date:'Data e ora *',location:'Luogo',descIt:'Descrizione italiana',descDe:'Beschreibung Deutsch',linkEvent:'Link informazioni/prenotazioni (facoltativo)',autoExpire:'Nascondi automaticamente gli eventi passati',name:'Nome locale *',city:'Città',category:'Categoria (ristorante, bar, discoteca...)',flyerPhoto:'Flyer (JPG, PNG, WebP · max 10 MB)',venuePhoto:'Biglietto da visita / foto (JPG, PNG, WebP · max 10 MB)',uploadHelp:'Seleziona un’immagine per l’anteprima',order:'Ordine di visualizzazione',published:'Pubblicato e visibile ai clienti',preview:'Anteprima',save:'Salva',cancel:'Annulla',saved:'Salvato correttamente.',deleted:'Eliminato.',linkSent:'Controlla la tua e-mail: ti abbiamo inviato le istruzioni per entrare.',authError:'Non è stato possibile accedere.',noItems:'Nessun flyer ancora. Premi «+ Aggiungi flyer» per iniziare.',newEvent:'Nuovo evento',newVenue:'Nuovo locale',editEvent:'Modifica evento',editVenue:'Modifica locale',delete:'Elimina',edit:'Modifica',publish:'Pubblica',unpublish:'Nascondi',live:'Pubblicato',draft:'Bozza',areYouSure:'Eliminare questo elemento definitivamente?',invalidFile:'Carica un file JPG, PNG o WebP fino a 10 MB.',requiredEvent:'Inserisci il titolo in italiano e tedesco e una data.',requiredVenue:'Inserisci il nome del locale.',invalidLink:'I collegamenti devono iniziare con https://',sessionExpired:'Sessione scaduta. Accedi nuovamente.',missingImage:'Puoi aggiungere un’immagine adesso o in seguito.',notAdmin:'Questo account non è autorizzato ad amministrare il sito.',noPicture:'Nessuna immagine',broken:'Errore di rete. Riprova.'},
 de:{back:'Startseite',installTitle:'Panel als App installieren',installHintAndroid:'Du erhältst das Symbol GG Admin auf dem Home-Bildschirm, getrennt von der öffentlichen Seite.',installHintIos:'Safari → Teilen → „Zum Home-Bildschirm“. Das Symbol heißt GG Admin.',installBtn:'Installieren',subtitle:'Füge Event-Flyer hinzu und verwalte sie. Veröffentlichte Flyer erscheinen sofort auf der Startseite.',upcomingCount:'Demnächst',loading:'Laden…',restricted:'Geschützter Zugang',restrictedDesc:'Nur die freigegebene E-Mail-Adresse darf auf die Verwaltung zugreifen. Du erhältst einen Anmeldelink ohne Passwort.',sendLink:'Anmeldelink senden',authTip:'Sieh auch im Spam nach. Nach der Veröffentlichung die Webadresse in den Redirect URLs des Supabase-Projekts freigeben.',otpToggle:'Hast du einen sechsstelligen Code erhalten?',pasteToggle:'Führt der Anmeldelink zu einer anderen Seite?',pasteLabel:'Kopiere den E-Mail-Anmeldelink und füge ihn hier ein',otpLabel:'E-Mail-Code',verify:'Code bestätigen',connected:'Administrator angemeldet',logout:'Abmelden',eventCount:'Events',venueCount:'Empfohlene Lokale',draftCount:'Entwürfe',eventTab:'📅 Events',venueTab:'⭐ Empfehlungen',newItem:'+ Flyer hinzufügen',titleIt:'Titolo italiano *',titleDe:'Titel Deutsch *',date:'Datum und Uhrzeit *',location:'Ort',descIt:'Descrizione italiana',descDe:'Beschreibung Deutsch',linkEvent:'Info-/Buchungslink (optional)',autoExpire:'Vergangene Events automatisch verbergen',name:'Name des Lokals *',city:'Stadt',category:'Kategorie (Restaurant, Bar, Club...)',flyerPhoto:'Flyer (JPG, PNG, WebP · max. 10 MB)',venuePhoto:'Visitenkarte / Foto (JPG, PNG, WebP · max. 10 MB)',uploadHelp:'Bitte ein Bild für die Vorschau auswählen',order:'Anzeigereihenfolge',published:'Veröffentlicht und für Besucher sichtbar',preview:'Vorschau',save:'Speichern',cancel:'Abbrechen',saved:'Erfolgreich gespeichert.',deleted:'Gelöscht.',linkSent:'Bitte prüfe deine E-Mail. Die Anmeldung wurde gesendet.',authError:'Anmeldung fehlgeschlagen.',noItems:'Noch keine Flyer. Tippe auf „+ Flyer hinzufügen“.',newEvent:'Neues Event',newVenue:'Neues Lokal',editEvent:'Event bearbeiten',editVenue:'Lokal bearbeiten',delete:'Löschen',edit:'Bearbeiten',publish:'Veröffentlichen',unpublish:'Verbergen',live:'Veröffentlicht',draft:'Entwurf',areYouSure:'Diesen Eintrag endgültig löschen?',invalidFile:'Bitte JPG, PNG oder WebP bis 10 MB hochladen.',requiredEvent:'Bitte deutschen und italienischen Titel sowie Datum eingeben.',requiredVenue:'Bitte Namen des Lokals eingeben.',invalidLink:'Links müssen mit https:// beginnen.',sessionExpired:'Sitzung abgelaufen. Bitte erneut anmelden.',missingImage:'Ein Bild kannst du auch später hinzufügen.',notAdmin:'Dieses Konto darf die Seite nicht verwalten.',noPicture:'Kein Bild',broken:'Netzwerkfehler. Bitte erneut versuchen.'}
};
const T=key=>COPY[lang][key]||key;
const show=(id,visible)=>$(id).classList.toggle('hidden',!visible);
function notify(message,error=false){const n=$('notice');n.textContent=message;n.classList.toggle('error',error);show('notice',true);n.scrollIntoView({behavior:'smooth',block:'nearest'});}
function busy(state){show('busy',state);$('saveItem').disabled=state;}
function dateLocal(d){if(!d)return '';const x=new Date(d);return isNaN(x)?'':new Date(x.getTime()-x.getTimezoneOffset()*60000).toISOString().slice(0,16);}
function safeUrl(s){const x=(s||'').trim();if(!x)return null;try{const url=new URL(x);return url.protocol==='https:'?url.href:null;}catch{return null;}}
function setLang(l){lang=l;document.documentElement.lang=l;document.querySelectorAll('[data-t]').forEach(el=>{el.textContent=T(el.dataset.t);});document.querySelectorAll('.lng').forEach(x=>{x.classList.toggle('active',x.dataset.lang===l);x.setAttribute('aria-pressed',String(x.dataset.lang===l));});if(user)renderList();}
for(const b of document.querySelectorAll('.lng'))b.addEventListener('click',()=>setLang(b.dataset.lang));
function isAdmin(u){return !!u?.email && u.email.toLowerCase()===ADMIN_EMAIL;}
async function start(){
  if(!window.supabase?.createClient){notify('La libreria di accesso non è disponibile: verifica la connessione Internet.',true);return;}
  api=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLIC_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  api.auth.onAuthStateChange((_event,session)=>{setTimeout(()=>setSession(session?.user||null),10);});
  const {data,error}=await api.auth.getSession();if(error)notify(error.message,true);await setSession(data?.session?.user||null);
}
async function setSession(u){
  user=u;
  if(!u){show('login',true);show('admin',false);return;}
  if(!isAdmin(u)){show('admin',false);show('login',true);notify(T('notAdmin'),true);return;}
  $('accountEmail').textContent=u.email;
  show('login',false);show('admin',true);
  await loadRecords();
}
$('loginForm').addEventListener('submit',async e=>{
 e.preventDefault();if(!api){notify(T('broken'),true);return;}
 busy(true);const email=ADMIN_EMAIL;
 const {error}=await api.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin+new URL('./dashboard.html',location.href).pathname,shouldCreateUser:true}});
 busy(false);notify(error?error.message:T('linkSent'),!!error);
});
$('otpForm').addEventListener('submit',async e=>{
  e.preventDefault();const token=$('otpCode').value.trim();if(!token||!api)return;
  busy(true);const {error}=await api.auth.verifyOtp({email:ADMIN_EMAIL,token,type:'email'});busy(false);notify(error?error.message:T('connected'),!!error);
});
$('pasteForm').addEventListener('submit',async e=>{
  e.preventDefault();if(!api)return;
  try{
    const raw=$('magicUrl').value.trim(),link=new URL(raw);
    if(link.protocol!=='https:'||link.origin!==SUPABASE_URL||!link.pathname.endsWith('/auth/v1/verify'))throw Error(T('authError'));
    const token_hash=link.searchParams.get('token_hash')||link.searchParams.get('token');
    const type=link.searchParams.get('type')||'magiclink';
    if(!token_hash||!['magiclink','signup','email','recovery'].includes(type))throw Error(T('authError'));
    busy(true);const {error}=await api.auth.verifyOtp({token_hash,type});busy(false);
    if(error)throw error;$('magicUrl').value='';notify(T('connected'));
  }catch(err){busy(false);notify(err.message||T('authError'),true);}
});
$('logout').addEventListener('click',async()=>{if(api){await api.auth.signOut();notify('');}});
async function loadRecords(){if(!api||!isAdmin(user))return;
 busy(true);
 try{
   const {data,error}=await api.from('events').select('*').order('sort_order',{ascending:true}).order('starts_at',{ascending:true});
   if(error)throw error;records.events=data||[];
   updateCounts();await renderList();
 }catch(e){notify(e.message||T('broken'),true)}finally{busy(false);}
}
function updateCounts(){
 $('statEvents').textContent=records.events.filter(x=>x.published).length;
 $('statUpcoming').textContent=records.events.filter(x=>x.published&&x.starts_at&&new Date(x.starts_at)>new Date()).length;
 $('statDrafts').textContent=records.events.filter(x=>!x.published).length;
}
function node(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
async function getImage(path){
 if(!path||!api)return null;
 const {data,error}=await api.storage.from('media').createSignedUrl(path,3600);
 return error?null:data?.signedUrl||null;
}
async function renderList(){
 const box=$('items');box.replaceChildren();const data=records[kind];
 if(!data.length){box.append(node('div','empty-items',T('noItems')));return;}
 for(const item of data){
  const card=node('article','item');const imageBox=node('div','item-thumb');const src=await getImage(item.image_path);
  if(src){const img=node('img');img.src=src;img.alt=kind==='events'?(item.title_it||item.title_de||'Flyer'):(item.name||'Visitenkarte');imageBox.append(img);}else imageBox.append(node('div','placeholder',kind==='events'?'📅':'📇'));
  card.append(imageBox);const content=node('div','item-details');const state=node('span',item.published?'status live':'status',T(item.published?'live':'draft'));content.append(state);
  content.append(node('h3','',kind==='events'?(item[`title_${lang}`]||item.title_it||item.title_de||''):(item.name||'')));
  const details=kind==='events'?[item.starts_at?new Date(item.starts_at).toLocaleString(lang==='it'?'it-IT':'de-DE'):null,item.location]:[item.city,item.category];content.append(node('p','',details.filter(Boolean).join(' · ')));
  const buttons=node('div','item-actions');
  const edit=node('button','btn ghost',T('edit'));edit.type='button';edit.addEventListener('click',()=>openEditor(item));buttons.append(edit);
  const toggle=node('button','btn ghost',T(item.published?'unpublish':'publish'));toggle.type='button';toggle.addEventListener('click',()=>togglePublished(item));buttons.append(toggle);
  const del=node('button','btn ghost',T('delete'));del.type='button';del.addEventListener('click',()=>removeItem(item));buttons.append(del);
  content.append(buttons);card.append(content);box.append(card);
 }
}
function openEditor(item=null){
 editing=item||null;existingImage=item?.image_path||null;
 const form=$('contentForm');form.reset();$('itemId').value=item?.id||'';
 const fields=kind==='events'?['title_it','title_de','location','description_it','description_de','link_url','sort_order']:['name','city','category','website_url','instagram_url','whatsapp_url','sort_order'];
 for(const field of fields){const control=form.elements.namedItem(field);if(control && item)control.value=item[field]??'';}
 $('startsAt').value=item?.starts_at?dateLocal(item.starts_at):'';
 $('autoExpire').checked=item?.auto_expire??true;$('published').checked=item?.published??false;
 $('formTitle').textContent=T(item?(kind==='events'?'editEvent':'editVenue'):(kind==='events'?'newEvent':'newVenue'));
 $('photoPreview').src='';show('photoPreview',false);show('uploadHelp',true);
 show('editor',true);$('editor').scrollIntoView({behavior:'smooth',block:'start'});
 if(existingImage)getImage(existingImage).then(src=>{if(src && existingImage===(item?.image_path)){ $('photoPreview').src=src;show('photoPreview',true);show('uploadHelp',false);}});
}
function closeEditor(){show('editor',false);editing=null;existingImage=null;$('itemPhoto').value='';}
$('newItem').addEventListener('click',()=>openEditor());$('editorClose').addEventListener('click',closeEditor);$('cancelEdit').addEventListener('click',closeEditor);
$('itemPhoto').addEventListener('change',()=>{
 const f=$('itemPhoto').files?.[0];if(!f){if(!existingImage){show('photoPreview',false);show('uploadHelp',true);}return;}
 if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>10*1024*1024){notify(T('invalidFile'),true);$('itemPhoto').value='';return;}
 const previewUrl=URL.createObjectURL(f);$('photoPreview').src=previewUrl;show('photoPreview',true);show('uploadHelp',false);
 $('photoPreview').onload=()=>URL.revokeObjectURL(previewUrl);
});
function getPayload(){
 const form=$('contentForm');const n=id=>$(id).value.trim();
 const base={sort_order:Number(n('sortOrder'))||0,published:$('published').checked};
 if(kind==='events'){
  if(!n('eventTitleIt')||!n('eventTitleDe')||!n('startsAt'))throw Error(T('requiredEvent'));
  const link=n('eventLink');if(link&&!safeUrl(link))throw Error(T('invalidLink'));
  return {...base,title_it:n('eventTitleIt'),title_de:n('eventTitleDe'),description_it:n('eventDescIt')||null,description_de:n('eventDescDe')||null,starts_at:new Date(n('startsAt')).toISOString(),location:n('location')||null,link_url:link||null,auto_expire:$('autoExpire').checked};
 }
}
$('contentForm').addEventListener('submit',async e=>{
 e.preventDefault();if(!api||!isAdmin(user))return notify(T('notAdmin'),true);
 let payload;try{payload=getPayload();}catch(err){notify(err.message,true);return;}
 const file=$('itemPhoto').files?.[0];let newPath=null;const oldPath=editing?.image_path||null;
 if(file&&!['image/jpeg','image/png','image/webp'].includes(file.type))return notify(T('invalidFile'),true);
 if(file&&file.size>10*1024*1024)return notify(T('invalidFile'),true);
 busy(true);
 try{
  if(file){const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[file.type];newPath=`${kind}/${crypto.randomUUID()}.${ext}`;
    const result=await api.storage.from('media').upload(newPath,file,{contentType:file.type,cacheControl:'3600',upsert:false});if(result.error)throw result.error;
  }
  payload.image_path=newPath||oldPath;
  const query=editing?api.from(kind).update(payload).eq('id',editing.id):api.from(kind).insert(payload);
  const {data,error}=await query.select().single();if(error)throw error;
  if(newPath&&oldPath&&newPath!==oldPath)await api.storage.from('media').remove([oldPath]);
  closeEditor();await loadRecords();notify(T('saved'));
 }catch(err){if(newPath)await api.storage.from('media').remove([newPath]);notify(err.message||T('broken'),true);}finally{busy(false);}
});
async function togglePublished(item){if(!isAdmin(user))return;busy(true);const {error}=await api.from(kind).update({published:!item.published}).eq('id',item.id);if(error)notify(error.message,true);else {await loadRecords();notify(T('saved'));}busy(false);}
async function removeItem(item){if(!isAdmin(user)||!confirm(T('areYouSure')))return;busy(true);
 const {error}=await api.from(kind).delete().eq('id',item.id);if(error)notify(error.message,true);else {if(item.image_path)await api.storage.from('media').remove([item.image_path]);await loadRecords();notify(T('deleted'));}busy(false);
}
$('previewItem').addEventListener('click',()=>{
 const box=$('previewBody');box.replaceChildren();const image=$('photoPreview');if(!image.classList.contains('hidden')&&image.src){const img=node('img');img.src=image.src;box.append(img)}
 box.append(node('h3','',lang==='de'?($('eventTitleDe').value||$('eventTitleIt').value):($('eventTitleIt').value||$('eventTitleDe').value)));
 const sv=$('startsAt').value;box.append(node('p','',[sv?new Date(sv).toLocaleString(lang==='it'?'it-IT':'de-DE'):'',$('location').value].filter(Boolean).join(' · ')));
 const desc=lang==='de'&&$('eventDescDe').value?'eventDescDe':'eventDescIt';if($(desc).value)box.append(node('p','',$(desc).value));show('previewModal',true);
});
$('previewClose').addEventListener('click',()=>show('previewModal',false));$('previewModal').addEventListener('click',e=>{if(e.target===$('previewModal'))show('previewModal',false)});
window.addEventListener('keydown',e=>{if(e.key==='Escape')show('previewModal',false)});
setLang('it');
window.addEventListener('load',start);
