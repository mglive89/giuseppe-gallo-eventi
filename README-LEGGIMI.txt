GIUSEPPE GALLO · MTV SOUND PROMOTER
PWA + DASHBOARD FLYER EVENTI (DE/IT) · versione solo eventi

CONTENUTO
- index.html: pagina principale con poster 4K, contatti, bandiere, logo MTV Sound, eventi e locali suggeriti; menu Info per salvare la PWA sulla Home.
- Questa versione mostra SOLO gli eventi con i flyer (sezione Locali suggeriti rimossa).
- dashboard.html: area riservata per aggiungere/modificare/pubblicare/eliminare i flyer degli eventi (immagini su Supabase Storage).
- I dati pubblici sono caricati live dal database Supabase già predisposto, con protezioni RLS per il solo amministratore.
- poster-4k.webp: manifesto mantenuto identico alla versione 4K precedente.

PUBBLICAZIONE GRATUITA
1. Estrai il contenuto dello ZIP in una cartella (non modificare i nomi dei file).
2. Vai a https://app.netlify.com/drop e trascina la cartella con index.html (non il file ZIP se il portale richiede una cartella).
3. Ricevi un URL HTTPS pubblico *.netlify.app. Aprilo e prova la homepage.
4. Dalla homepage apri Dashboard nel footer, premi "Invia link di accesso" e controlla la casella peppegallo812329@gmail.com.
   Se il collegamento ricevuto apre la Dashboard, l'accesso funziona direttamente.
   Se invece porta a un'altra pagina, TORNA alla Dashboard e usa l'opzione "Il link ti porta su un'altra pagina?": copia il collegamento intero dall'e-mail e incollalo lì. Questo evita di dipendere dal redirect.
   Se la mail mostra un codice numerico, puoi inserirlo nella voce dedicata.
5. Facoltativo e consigliato: se hai accesso al pannello Supabase del progetto, apri l'impostazione Auth > URL Configuration e autorizza https://TUA-SITE.netlify.app/dashboard.html come redirect, per usare direttamente il clic sul link.

6. Usa + Aggiungi flyer, carica il flyer (JPG/PNG/WebP max 10 MB), imposta "Pubblicato" e premi Salva.
7. I nuovi flyer compariranno nella homepage per i visitatori, senza dover ricaricare il sito su Netlify.

L'AREA ADMIN NON RICHIEDE UNA PASSWORD INSERITA NEL CODICE.
La gestione è autorizzata mediante email certificata e policy RLS Supabase, non con una chiave privata nel browser.

ATTENZIONE: La conferma di login Supabase potrebbe richiedere il corretto inserimento del redirect URL nel pannello Supabase prima di funzionare.
Questo pacchetto è stato creato e controllato localmente; il login e il caricamento immagini richiedono un test reale dopo la pubblicazione HTTPS.
Non è ancora pubblicato online.

Prima di usare commercialmente completare Impressum e Datenschutzerklärung.

NOTE VERSIONE SOLO EVENTI
- Usa lo stesso progetto Supabase (tabella events, bucket media): i flyer gia' caricati compaiono anche qui.
- Gli eventi con 'Nascondi automaticamente' spariscono 6 ore dopo l'orario di inizio.
- Toccando un flyer sulla homepage si apre a schermo intero.

PANNELLO ADMIN COME APP SEPARATA
- La Dashboard non e' piu' collegata dalla homepage: si apre solo da https://mglive89.github.io/giuseppe-gallo-eventi/dashboard.html
- Aprila sul telefono e installala (Android: pulsante Installa; iPhone: Safari > Condividi > Aggiungi alla schermata Home). Comparira' l'icona 'GG Admin', separata dall'app pubblica.
- Solo l'e-mail amministratore configurata in supabase-config.js puo' entrare; la pagina non e' indicizzata dai motori di ricerca.

SECONDO AMMINISTRATORE
- La Dashboard accetta due e-mail admin (nel codice sono salvate solo come hash SHA-256, in supabase-config.js).
- Nel campo e-mail della Dashboard scrivi la tua: il dispositivo la ricorda per le volte successive.
- Perche' il salvataggio funzioni, le policy RLS del progetto Supabase devono includere anche la seconda e-mail (script SQL fornito a parte).
