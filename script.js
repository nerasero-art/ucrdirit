/* =========================================================
   Storia dell'Ucraina — Timeline interattiva orizzontale
   Logica: creazione della timeline, ricerca in tempo reale,
   filtri per periodo e per materia, scorrimento orizzontale.
   ========================================================= */

"use strict";

/* ---------- Materie scolastiche ---------- */
const MATERIE = {
  diritto: { nome: "Diritto", colore: "var(--diritto)" },
  economia: { nome: "Economia politica", colore: "var(--economia)" },
  italiano: { nome: "Italiano", colore: "var(--italiano)" },
  inglese: { nome: "Inglese", colore: "var(--inglese)" },
  matematica: { nome: "Matematica", colore: "var(--matematica)" },
  informatica: { nome: "Informatica", colore: "var(--informatica)" }
};

const ICONE_ERE = {
  medioevo: "\u{1F3F0}",
  moderna: "\u{1F4DC}",
  ottocento: "\u{1F58B}\uFE0F",
  novecento: "\u{1F3ED}",
  contemporanea: "\u{1F5F3}\uFE0F",
  cosacchi: "\u2694\uFE0F"
};

// Indirizzi delle immagini di Wikimedia Commons
function urlCommons(file, larghezza) {
  return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=" + larghezza;
}
function paginaCommons(file) {
  return "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(file);
}

const NOMI_ERE = {
  medioevo: "Medioevo",
  moderna: "Età moderna",
  ottocento: "Ottocento",
  novecento: "Novecento",
  contemporanea: "Ucraina indipendente"
};

/* ---------- Dati: eventi storici ---------- */
const EVENTI = [
  {
    data: "882",
    era: "medioevo",
    titolo: "Fondazione della Rus' di Kiev",
    testo: "Il principe Oleg il Saggio conquista Kiev e unifica le terre degli Slavi orientali, da Novgorod al Dnepr, in un unico Stato: la Rus' di Kiev.",
    dettagli: [
      "Kiev diventa la capitale e viene chiamata «madre delle città della Rus'».",
      "Lo Stato controlla la via commerciale «dai Variaghi ai Greci», tra il Mar Baltico e Costantinopoli.",
      "La Rus' di Kiev è considerata la culla comune di Ucraini, Bielorussi e Russi."
    ],
    materie: {
      economia: "La Rus' nasce attorno a una grande via commerciale: pellicce, miele e cera venivano scambiati con l'argento e i tessuti di Bisanzio. È un esempio di come il commercio e gli scambi facciano nascere ricchezza e Stati.",
      inglese: "I Variaghi erano Vichinghi scandinavi, gli stessi popoli che invasero l'Inghilterra. Dalla loro lingua, il norreno, l'inglese ha preso parole di uso quotidiano come sky, egg e window."
    },
    parole: "origini slavi orientali oleg rus kiev kyiv fondazione stato variaghi vichinghi commercio"
  },
  {
    data: "988",
    era: "medioevo",
    titolo: "Cristianizzazione della Rus' di Kiev",
    testo: "Il principe Vladimiro il Grande adotta il cristianesimo di rito bizantino e fa battezzare la popolazione di Kiev nelle acque del Dnepr.",
    dettagli: [
      "La scelta lega la Rus' all'Impero bizantino: Vladimiro sposa la principessa Anna, sorella dell'imperatore Basilio II.",
      "Si diffondono la scrittura cirillica, l'architettura delle chiese e la cultura religiosa ortodossa.",
      "Sotto il figlio Jaroslav il Saggio viene costruita la Cattedrale di Santa Sofia a Kiev."
    ],
    materie: {
      italiano: "Con il cristianesimo arriva l'alfabeto cirillico e nasce la prima letteratura scritta della Rus'. È un parallelo con l'Italia, dove la cultura scritta medievale nasce in latino nei monasteri prima che si sviluppi il volgare.",
      diritto: "La scelta di una religione di Stato lega potere politico e Chiesa. In Diritto si studia come la Costituzione italiana regola il rapporto tra Stato e Chiesa (artt. 7 e 8) e garantisce la libertà religiosa (art. 19)."
    },
    img: {
      file: "80-391-0151_Kyiv_St.Sophia's_Cathedral_RB_18.jpg",
      didascalia: "La Cattedrale di Santa Sofia a Kiev, patrimonio UNESCO",
      autore: "Rbrechko",
      licenza: "CC BY-SA 4.0"
    },
    parole: "battesimo religione cristianesimo ortodossia vladimiro volodymyr bisanzio chiesa dnepr cirillico"
  },
  {
    data: "XI secolo",
    era: "medioevo",
    titolo: "La Russkaja Pravda, il primo codice di leggi",
    testo: "Sotto Jaroslav il Saggio viene messa per iscritto la Russkaja Pravda («giustizia della Rus'»), la prima raccolta di leggi della Rus' di Kiev.",
    dettagli: [
      "Al posto della vendetta di sangue introduce multe in denaro per i reati.",
      "Regola proprietà, eredità, debiti e commercio.",
      "Le multe si pagano in grivne, lingotti d'argento da cui prende il nome l'attuale moneta ucraina."
    ],
    materie: {
      diritto: "È il primo esempio di legge scritta nelle terre ucraine: le regole sono uguali e conoscibili da tutti, e la pena sostituisce la vendetta privata. Sono le basi del principio di legalità che si studia in Diritto.",
      economia: "La grivna era una misura d'argento usata come moneta. Oggi la moneta dell'Ucraina si chiama hryvnia: un esempio di come nasce il denaro come mezzo di scambio e unità di conto."
    },
    parole: "russkaja pravda russkaya leggi codice jaroslav yaroslav saggio giustizia multe grivna hryvnia diritto"
  },
  {
    data: "1187",
    era: "medioevo",
    titolo: "Prima menzione del nome «Ucraina»",
    testo: "La parola «Ucraina» compare per la prima volta in una cronaca medievale, la Cronaca di Kiev, per indicare le terre attorno a Perejaslav.",
    dettagli: [
      "La cronaca racconta il lutto dell'«Ucraina» per la morte di un principe locale.",
      "Il nome viene di solito collegato al significato di «terra di confine» o «paese, terra propria».",
      "Nei secoli successivi il nome si estende a tutto il territorio abitato dagli Ucraini."
    ],
    materie: {
      italiano: "È un esercizio di etimologia: studiare da dove viene una parola e come cambia significato nel tempo, come si fa in Italiano con le parole che derivano dal latino.",
      inglese: "In inglese si diceva «the Ukraine», come per una regione. Dopo l'indipendenza del 1991 la forma corretta è semplicemente «Ukraine», senza articolo, perché indica uno Stato sovrano."
    },
    parole: "nome ucraina ukraine etimologia confine cronaca di kiev perejaslav prima menzione"
  },
  {
    data: "1240",
    era: "medioevo",
    titolo: "Invasione mongola e saccheggio di Kiev",
    testo: "Le armate mongole di Batu Khan assediano e distruggono Kiev nel dicembre del 1240: è il crollo definitivo dello Stato della Rus'.",
    dettagli: [
      "Gran parte della popolazione della città viene uccisa o fugge.",
      "Le terre della Rus' devono pagare tributi all'Orda d'Oro.",
      "Il Principato di Galizia-Volinia, a ovest, resta per un secolo il principale centro politico delle terre ucraine."
    ],
    materie: {
      italiano: "Pochi anni dopo, nel 1245–1246, il frate italiano Giovanni da Pian del Carpine attraversa Kiev distrutta mentre va dal Gran Khan e la descrive nella sua Historia Mongalorum. Più tardi anche Il Milione di Marco Polo racconterà il mondo dei Mongoli (i «Tartari»).",
      economia: "I tributi imposti dall'Orda d'Oro sono un esempio di prelievo fiscale senza alcun servizio in cambio. La distruzione di Kiev interrompe anche i commerci con Bisanzio e l'Europa."
    },
    parole: "mongoli tatari tartari orda d'oro batu khan assedio distruzione saccheggio galizia volinia pian del carpine marco polo"
  },
  {
    data: "1492",
    era: "moderna",
    cosacchi: true,
    titolo: "Prima notizia dei Cosacchi ucraini",
    testo: "Il khan di Crimea si lamenta con il granduca di Lituania per l'attacco a una nave tatara compiuto dai Cosacchi di Kiev e di Čerkasy: è una delle prime notizie scritte sui Cosacchi ucraini.",
    dettagli: [
      "La parola «cosacco» viene dal turco e significa «uomo libero».",
      "I primi Cosacchi sono contadini fuggiti dalla servitù, cacciatori e pescatori che vivono nella steppa di confine, chiamata «Campo selvaggio».",
      "Si organizzano in gruppi armati per difendersi dalle incursioni dei Tatari di Crimea."
    ],
    materie: {
      italiano: "Lavoro sulla parola: «cosacco» è un prestito da una lingua turca, come in italiano parole quali «chiosco» e «caffè» arrivate dal turco. E il 1492 è anche l'anno del primo viaggio di Cristoforo Colombo.",
      economia: "Nella steppa i Cosacchi vivono di caccia, pesca, allevamento e apicoltura. Molti sono fuggiti per sottrarsi alla servitù della gleba: cercano libertà personale ed economica."
    },
    parole: "cosacchi cosacco prima notizia khan crimea tatari campo selvaggio steppa uomo libero frontiera colombo"
  },
  {
    data: "c. 1552",
    era: "moderna",
    cosacchi: true,
    titolo: "Nasce la Sič zaporoga",
    testo: "Il principe Dmytro Vyšnevec'kyj, detto Bajda, costruisce una fortezza sull'isola di Mala Chortycja, sul Dnepr: è considerata la prima Sič zaporoga, il centro dei Cosacchi «oltre le rapide».",
    dettagli: [
      "«Zaporoghi» significa «quelli che vivono oltre le rapide» del fiume Dnepr.",
      "Nella Sič i Cosacchi decidono insieme in un'assemblea, la rada, che elegge il capo (otaman) e può anche destituirlo.",
      "Nel corso dei secoli la Sič cambia sede più volte, fino alla sua distruzione nel 1775."
    ],
    materie: {
      diritto: "La rada è una forma di democrazia diretta: tutti i membri votano e il capo può essere revocato. In Diritto si confronta con la democrazia rappresentativa della Costituzione italiana, dove il popolo esercita la sovranità soprattutto eleggendo il Parlamento (art. 1).",
      economia: "Nella Sič risorse come pesca, caccia e pascoli sono gestite in comune dalla comunità: un esempio di proprietà collettiva, diversa dalla proprietà privata."
    },
    img: {
      file: "Zaporozhian_Sich_rada.jpg",
      didascalia: "La rada, l'assemblea dei Cosacchi zaporoghi (immagine del XVIII secolo)",
      autore: "Wikimedia Commons",
      licenza: "pubblico dominio"
    },
    parole: "sič sich zaporoga zaporoghi chortycja khortytsia vyšnevec'kyj vyshnevetsky bajda baida rada otaman fortezza isola dnepr rapide democrazia"
  },
  {
    data: "1569",
    era: "moderna",
    titolo: "Unione di Lublino",
    testo: "Il Regno di Polonia e il Granducato di Lituania si uniscono nella Confederazione polacco-lituana: la maggior parte delle terre ucraine passa sotto il controllo polacco.",
    dettagli: [
      "Le regioni di Kiev, Volinia e Podolia vengono trasferite dalla Lituania alla Corona polacca.",
      "Aumentano la servitù della gleba e la pressione della nobiltà polacca e cattolica sui contadini ortodossi.",
      "Nel 1596 nasce con l'Unione di Brest la Chiesa greco-cattolica ucraina."
    ],
    materie: {
      diritto: "Due Stati si uniscono con un parlamento comune ma mantengono alcune istituzioni proprie. È utile per capire le differenze tra Stato unitario, federazione e confederazione, e per confrontarle con l'Unione Europea.",
      economia: "Le terre ucraine diventano grandi produttrici di grano per l'Europa, esportato tramite il porto di Danzica. La ricchezza va ai grandi proprietari terrieri, mentre i contadini lavorano come servi della gleba."
    },
    parole: "polonia lituania confederazione polacco-lituana unione lublino nobiltà cattolici grano servitù"
  },
  {
    data: "1621",
    era: "moderna",
    cosacchi: true,
    titolo: "La battaglia di Chotyn",
    testo: "I Cosacchi guidati dall'etmano Petro Sahajdačnyj combattono insieme all'esercito polacco-lituano e fermano l'avanzata dell'Impero ottomano a Chotyn, sul fiume Dnestr.",
    dettagli: [
      "La battaglia si conclude con un trattato di pace tra la Polonia e l'Impero ottomano.",
      "Sahajdačnyj è famoso per le spedizioni via mare dei Cosacchi, con barche leggere chiamate čajky, fino alle coste del Mar Nero.",
      "Sostiene la cultura ucraina: entra con l'esercito cosacco nella Confraternita di Kiev, la cui scuola darà vita nel 1632 al Collegio Mohyla, la prima scuola superiore ucraina."
    ],
    materie: {
      diritto: "La guerra finisce con un trattato di pace: un accordo tra Stati che stabilisce obblighi per entrambe le parti. È la base del diritto internazionale.",
      italiano: "Il Collegio Mohyla di Kiev insegna latino, greco e retorica sul modello delle scuole europee del tempo, come i collegi dei gesuiti in Italia: istruzione e cultura diventano parte dell'identità di un popolo."
    },
    img: {
      file: "Brandt_Zaporizhian_Camp.jpg",
      didascalia: "Accampamento di Cosacchi zaporoghi, dipinto di Józef Brandt (XIX secolo)",
      autore: "Wikimedia Commons",
      licenza: "pubblico dominio"
    },
    parole: "chotyn khotyn battaglia sahajdačnyj sahaidachny ottomani turchi polonia cosacchi čajky mar nero collegio mohyla confraternita"
  },
  {
    data: "1648 – 1654",
    era: "moderna",
    cosacchi: true,
    titolo: "Rivolta di Chmel'nyc'kyj e nascita dell'Hetmanato cosacco",
    testo: "L'etmano Bohdan Chmel'nyc'kyj guida i Cosacchi e i contadini contro la Polonia e fonda uno Stato cosacco autonomo, l'Hetmanato. Nel 1654, con il Trattato di Perejaslav, si allea con lo zar di Russia.",
    dettagli: [
      "I Cosacchi zaporoghi, comunità libere di guerrieri sul basso Dnepr, sono il cuore della rivolta.",
      "L'Hetmanato ha un proprio esercito, una propria amministrazione e un capo eletto, l'etmano.",
      "Il Trattato di Perejaslav (gennaio 1654) mette l'Hetmanato sotto la protezione dello zar: per la Russia è l'inizio del controllo sull'Ucraina."
    ],
    materie: {
      diritto: "I Cosacchi eleggono il loro capo in un'assemblea, la rada. Il Trattato di Perejaslav mostra inoltre che un accordo internazionale può essere interpretato in modi diversi dalle parti: alleanza per gli Ucraini, sottomissione per la Russia.",
      economia: "La rivolta nasce anche da motivi economici: i contadini si ribellano alla servitù della gleba, alle tasse e al potere dei grandi proprietari terrieri."
    },
    img: {
      file: "Ilja_Jefimowitsch_Repin_-_Reply_of_the_Zaporozhian_Cossacks_-_Yorck.jpg",
      didascalia: "«La risposta dei Cosacchi zaporoghi», dipinto di Il'ja Repin (1880–1891)",
      autore: "Wikimedia Commons",
      licenza: "pubblico dominio"
    },
    parole: "cosacchi zaporoghi etmano hetman hetmanato bohdan khmelnytsky chmelnyckyj perejaslav pereiaslav trattato russia zar rivolta"
  },
  {
    data: "1708 – 1709",
    era: "moderna",
    cosacchi: true,
    titolo: "Mazepa, la distruzione di Baturyn e la battaglia di Poltava",
    testo: "L'etmano Ivan Mazepa si allea con il re di Svezia Carlo XII contro lo zar Pietro il Grande per difendere l'autonomia dell'Hetmanato. Le truppe russe distruggono la capitale Baturyn (1708) e sconfiggono gli Svedesi a Poltava (1709).",
    dettagli: [
      "A Baturyn, nel novembre 1708, vengono uccisi migliaia di abitanti, compresi i civili.",
      "Dopo la sconfitta di Poltava Mazepa fugge nell'Impero ottomano, dove muore nello stesso anno.",
      "Da allora lo zar limita sempre di più l'autonomia dell'Hetmanato."
    ],
    materie: {
      inglese: "Il poeta inglese Lord Byron dedica a Mazepa il poema narrativo «Mazeppa» (1819), un classico del Romanticismo inglese che si può leggere in lingua originale.",
      diritto: "Mazepa cerca un'alleanza internazionale per difendere l'autonomia del suo Stato dal potere centrale dello zar: un tema che collega sovranità, autonomia e alleanze tra Stati."
    },
    parole: "mazepa mazeppa baturyn poltava carlo xii svezia pietro il grande zar etmano cosacchi byron autonomia"
  },
  {
    data: "5 aprile 1710",
    era: "moderna",
    cosacchi: true,
    titolo: "La Costituzione di Pylyp Orlyk",
    testo: "L'etmano in esilio Pylyp Orlyk firma i «Patti e Costituzioni» dell'Hetmanato, uno dei primi testi costituzionali d'Europa.",
    dettagli: [
      "Prevede la divisione dei poteri tra l'etmano, un consiglio generale e un tribunale.",
      "Limita il potere dell'etmano e protegge i diritti dei Cosacchi e delle vedove e degli orfani.",
      "Viene scritta in latino e in ucraino, ma non entra mai davvero in vigore."
    ],
    materie: {
      diritto: "Anticipa la separazione dei poteri (legislativo, esecutivo, giudiziario) che Montesquieu descriverà nel 1748: lo stesso principio su cui si basa la Costituzione italiana del 1948.",
      italiano: "Il testo ufficiale è in latino, la lingua colta dell'Europa del tempo, come per molti testi scientifici e giuridici scritti in Italia fino al Settecento."
    },
    parole: "orlyk costituzione patti e costituzioni 1710 separazione dei poteri montesquieu latino etmano"
  },
  {
    data: "1775 – 1795",
    era: "moderna",
    cosacchi: true,
    titolo: "Fine dell'autonomia cosacca e spartizioni delle terre ucraine",
    testo: "L'imperatrice Caterina la Grande distrugge la Sič zaporoga (1775) e abolisce l'autonomia dell'Hetmanato. Con le spartizioni della Polonia le terre ucraine vengono divise tra l'Impero russo e l'Impero austriaco.",
    dettagli: [
      "Nel 1775 l'esercito russo distrugge la Sič, la fortezza dei Cosacchi zaporoghi; entro il 1781 l'Hetmanato è trasformato in province russe.",
      "Con le spartizioni della Polonia (1772, 1793, 1795) la Russia ottiene l'Ucraina a ovest del Dnepr.",
      "La Galizia passa all'Austria, dove nel XIX secolo crescerà il movimento nazionale ucraino."
    ],
    materie: {
      diritto: "La fine dell'autonomia trasforma un territorio con leggi proprie in semplici province di un impero accentrato. In Italia la Costituzione fa il contrario: riconosce e promuove le autonomie locali (art. 5) e le regioni a statuto speciale.",
      economia: "Nel 1783 la servitù della gleba viene estesa anche ai contadini dell'ex Hetmanato: perdono la libertà di spostarsi e devono lavorare gratis per i proprietari. È un modello economico opposto al lavoro libero e retribuito."
    },
    parole: "caterina la grande impero russo austria asburgo galizia sič sich spartizione polonia abolizione autonomia servitù"
  },
  {
    data: "1792",
    era: "moderna",
    cosacchi: true,
    titolo: "I Cosacchi del Mar Nero si trasferiscono nel Kuban'",
    testo: "Caterina la Grande concede ai Cosacchi del Mar Nero, eredi degli Zaporoghi, le terre del Kuban', a nord del Caucaso, in cambio della difesa dei confini dell'Impero.",
    dettagli: [
      "Dopo la distruzione della Sič molti Zaporoghi erano fuggiti oltre il Danubio, nell'Impero ottomano, dove fondano la Sič del Danubio.",
      "Nel Kuban' i coloni fondano Ekaterinodar, l'odierna Krasnodar.",
      "Per molto tempo molti abitanti del Kuban' continuano a parlare dialetti ucraini."
    ],
    materie: {
      economia: "La terra viene data in cambio del servizio militare: un modello simile al feudo medievale. È anche un esempio di colonizzazione agricola di nuove terre.",
      diritto: "La concessione avviene con un atto dell'imperatrice: chi ha il potere assoluto decide da solo i diritti di un'intera comunità, senza Parlamento né Costituzione."
    },
    parole: "kuban cosacchi mar nero caterina la grande krasnodar ekaterinodar danubio sič del danubio colonizzazione"
  },
  {
    data: "1840",
    era: "ottocento",
    titolo: "Taras Ševčenko pubblica il «Kobzar»",
    testo: "Esce la raccolta di poesie «Kobzar» di Taras Ševčenko, ex servo della gleba diventato pittore e poeta. È l'opera simbolo della letteratura e della lingua ucraina moderna.",
    dettagli: [
      "Il kobzar è il cantastorie che suona la kobza, uno strumento tradizionale.",
      "Ševčenko scrive della libertà, del passato cosacco e delle sofferenze dei contadini.",
      "Per le sue poesie contro lo zar viene arrestato ed esiliato come soldato semplice."
    ],
    materie: {
      italiano: "Ševčenko è un poeta del Romanticismo come Manzoni e Leopardi: usa la letteratura per dare voce al popolo e per costruire una lingua e un'identità nazionale, proprio come avviene nell'Italia del Risorgimento.",
      inglese: "È lo stesso clima romantico dei poeti inglesi come Byron e Shelley, che celebravano la libertà dei popoli oppressi."
    },
    parole: "ševčenko shevchenko taras kobzar poesia letteratura romanticismo lingua ucraina poeta"
  },
  {
    data: "1876",
    era: "ottocento",
    titolo: "Il decreto di Ems vieta la lingua ucraina",
    testo: "Lo zar Alessandro II firma il decreto di Ems, che vieta di stampare e importare libri in lingua ucraina e di usarla a teatro.",
    dettagli: [
      "Già nel 1863 una circolare aveva limitato le pubblicazioni in ucraino.",
      "Molti autori ucraini pubblicano allora le loro opere nella Galizia austriaca, dove la lingua è permessa.",
      "Il divieto resta in vigore fino al 1905."
    ],
    materie: {
      diritto: "È un esempio di censura. La Costituzione italiana, invece, garantisce la libertà di manifestare il proprio pensiero (art. 21) e tutela le minoranze linguistiche (art. 6).",
      italiano: "La lingua è parte dell'identità di un popolo: vietarla significa cancellare una cultura. Anche in Italia la questione della lingua nazionale è stata centrale nella costruzione dell'identità del Paese."
    },
    parole: "ems decreto ukaz censura lingua ucraina alessandro ii divieto libri stampa"
  },
  {
    data: "1917 – 1921",
    era: "novecento",
    titolo: "Guerra d'indipendenza e Repubblica Popolare Ucraina",
    testo: "Dopo la Rivoluzione russa nasce la Repubblica Popolare Ucraina, che nel gennaio 1918 proclama l'indipendenza. Dopo anni di guerra, i bolscevichi prendono il controllo: nel 1922 la RSS Ucraina entra a far parte dell'Unione Sovietica.",
    dettagli: [
      "A Kiev si forma la Rada Centrale, guidata dallo storico Mychajlo Hruševs'kyj.",
      "Il 22 gennaio 1918 viene proclamata l'indipendenza; un anno dopo l'Atto di Unificazione unisce la Repubblica Popolare Ucraina con quella dell'Ucraina occidentale.",
      "Il 30 dicembre 1922 la RSS Ucraina è tra le repubbliche fondatrici dell'URSS."
    ],
    materie: {
      diritto: "Per nascere uno Stato ha bisogno di popolo, territorio e sovranità, e del riconoscimento degli altri Stati. La Repubblica Popolare Ucraina proclama l'indipendenza ma non riesce a difendere la propria sovranità.",
      inglese: "Nel 1918 il presidente americano Woodrow Wilson presenta i suoi «Quattordici punti», che parlano di autodeterminazione dei popoli: un tema che si può leggere e discutere in inglese."
    },
    parole: "rivoluzione russa bolscevichi rada centrale repubblica popolare ucraina indipendenza hruševskyj urss unione sovietica rss ucraina guerra 1918 1922 wilson autodeterminazione"
  },
  {
    data: "1932 – 1933",
    era: "novecento",
    titolo: "Holodomor, la grande carestia",
    testo: "La carestia artificiale provocata dal regime sovietico di Stalin, con la collettivizzazione forzata e la requisizione dei raccolti, causa la morte di milioni di persone in Ucraina.",
    dettagli: [
      "Holodomor significa «sterminio per fame».",
      "Le stime degli storici parlano di circa 3,5–5 milioni di vittime in Ucraina.",
      "Ai contadini vengono confiscati cereali e cibo; ai villaggi affamati è vietato spostarsi in cerca di aiuto."
    ],
    materie: {
      economia: "È la conseguenza estrema dell'economia pianificata: lo Stato decide quanto produrre, impone quote di grano irraggiungibili e toglie la terra ai contadini (collettivizzazione). Si può confrontare con l'economia di mercato.",
      matematica: "Il numero delle vittime è una stima: gli storici lo calcolano confrontando censimenti, nascite e morti. È un esempio di come la statistica serva a ricostruire fatti che nessuno ha registrato direttamente.",
      diritto: "Il giurista Raphael Lemkin, che inventò la parola «genocidio» e ispirò la Convenzione ONU del 1948, usò l'Holodomor come esempio di genocidio. Il Parlamento europeo lo ha riconosciuto come tale nel 2022."
    },
    parole: "holodomor carestia fame stalin collettivizzazione genocidio vittime urss contadini economia pianificata lemkin"
  },
  {
    data: "1939 – 1945",
    era: "novecento",
    titolo: "L'Ucraina nella Seconda guerra mondiale",
    testo: "L'Ucraina è uno dei territori più colpiti dalla guerra: occupata dalla Germania nazista dal 1941, subisce devastazioni, deportazioni e stragi, ma anche una forte resistenza.",
    dettagli: [
      "Nel 1939 l'URSS annette l'Ucraina occidentale (Galizia e Volinia), fino ad allora polacca.",
      "Nel settembre 1941, a Babyn Jar, presso Kiev, i nazisti uccidono in due giorni oltre 33.000 ebrei.",
      "Milioni di ucraini muoiono tra soldati e civili; città e villaggi vengono distrutti.",
      "Nel 1944 Stalin deporta l'intero popolo dei Tatari di Crimea in Asia centrale."
    ],
    materie: {
      inglese: "Nel febbraio 1945 Churchill, Roosevelt e Stalin si incontrano a Jalta, in Crimea, per decidere l'Europa del dopoguerra. I loro discorsi e documenti sono fonti in lingua inglese.",
      diritto: "Nel 1945 nasce l'ONU e la RSS Ucraina è tra i Paesi fondatori. Dopo la guerra nascono anche la Costituzione italiana (1948) e la Dichiarazione universale dei diritti umani (1948)."
    },
    parole: "seconda guerra mondiale nazisti germania occupazione resistenza babyn jar olocausto deportazione tatari crimea jalta yalta onu"
  },
  {
    data: "1954",
    era: "novecento",
    titolo: "Trasferimento della Crimea alla RSS Ucraina",
    testo: "Per decisione del leader sovietico Nikita Chruščëv, la penisola di Crimea passa dalla RSFS Russa alla RSS Ucraina.",
    dettagli: [
      "Il decreto è del febbraio 1954, nel 300° anniversario del Trattato di Perejaslav.",
      "La Crimea era legata all'Ucraina per geografia, economia e collegamenti (acqua, energia, trasporti).",
      "All'epoca il cambiamento ha valore soprattutto amministrativo, perché entrambe fanno parte dell'URSS."
    ],
    materie: {
      diritto: "Un confine interno tra repubbliche sovietiche diventa nel 1991 un confine internazionale tra Stati indipendenti. Aiuta a capire la differenza tra confini amministrativi e confini di Stato.",
      economia: "La Crimea non ha fiumi importanti: per l'acqua, l'energia e le merci dipende dalla terraferma ucraina. Negli anni successivi viene costruito il Canale della Crimea settentrionale per portare l'acqua del Dnepr."
    },
    parole: "crimea chruščëv krusciov khrushchev rsfs russa rss ucraina trasferimento penisola confini"
  },
  {
    data: "26 aprile 1986",
    era: "novecento",
    titolo: "Disastro nucleare di Černobyl'",
    testo: "L'esplosione del reattore n. 4 della centrale nucleare di Černobyl', vicino a Pryp'jat', provoca il più grave incidente nucleare della storia.",
    dettagli: [
      "La nube radioattiva raggiunge gran parte dell'Europa, Italia compresa.",
      "Circa 350.000 persone vengono evacuate; nasce la «zona di esclusione» di 30 km.",
      "Il governo sovietico nasconde inizialmente la gravità dell'incidente, alimentando la sfiducia nel regime."
    ],
    materie: {
      matematica: "La radioattività diminuisce secondo una funzione esponenziale. Il cesio-137 ha un tempo di dimezzamento di circa 30 anni: dopo 30 anni ne resta la metà, dopo 60 un quarto. Un ottimo esempio di decadimento esponenziale.",
      diritto: "Dopo Černobyl', nel 1987 gli italiani votano tre referendum abrogativi sul nucleare (art. 75 della Costituzione) e l'Italia chiude le sue centrali nucleari.",
      inglese: "La serie televisiva «Chernobyl» (2019), in inglese, racconta il disastro ed è molto usata per esercitarsi con l'ascolto e il lessico scientifico."
    },
    img: {
      file: "NSC-Oct-2017.jpg",
      didascalia: "Il Nuovo sarcofago che copre il reattore n. 4 (2017)",
      autore: "Tim Porter",
      licenza: "CC BY-SA 4.0"
    },
    parole: "černobyl chernobyl cernobyl chornobyl nucleare reattore centrale radiazioni pripyat incidente disastro referendum esponenziale"
  },
  {
    data: "24 agosto 1991",
    era: "contemporanea",
    titolo: "Dichiarazione di Indipendenza dell'Ucraina",
    testo: "Dopo il fallito colpo di Stato di Mosca, il Parlamento ucraino (Verchovna Rada) proclama l'indipendenza. A dicembre l'URSS si dissolve.",
    dettagli: [
      "Il 1° dicembre 1991 oltre il 90% degli elettori approva l'indipendenza con un referendum.",
      "Leonid Kravčuk diventa il primo presidente dell'Ucraina.",
      "Il 24 agosto è oggi la festa nazionale dell'Ucraina."
    ],
    materie: {
      diritto: "L'indipendenza viene confermata dal popolo con un referendum: è un esempio di sovranità popolare e di autodeterminazione dei popoli, principi che si studiano in Diritto.",
      economia: "Con la fine dell'URSS l'Ucraina deve passare dall'economia pianificata all'economia di mercato: privatizzazioni, prezzi liberi e nascita di imprese private.",
      matematica: "I risultati del referendum si leggono con le percentuali: con oltre il 90% di sì, su 10 votanti più di 9 scelgono l'indipendenza."
    },
    img: {
      file: "Maidan_Nezalezhnosti_view.jpg",
      didascalia: "Piazza dell'Indipendenza (Majdan Nezaležnosti) a Kiev",
      autore: "Juan Antonio Segal",
      licenza: "CC BY-SA 4.0"
    },
    parole: "indipendenza 1991 verchovna rada parlamento referendum kravčuk crollo urss dissoluzione unione sovietica festa nazionale"
  },
  {
    data: "5 dicembre 1994",
    era: "contemporanea",
    titolo: "Memorandum di Budapest",
    testo: "L'Ucraina rinuncia alle armi nucleari ereditate dall'URSS, all'epoca il terzo arsenale atomico del mondo. In cambio Stati Uniti, Regno Unito e Russia si impegnano a rispettarne l'indipendenza e i confini.",
    dettagli: [
      "Le testate nucleari vengono trasferite in Russia e smantellate entro il 1996.",
      "L'Ucraina aderisce al Trattato di non proliferazione nucleare.",
      "Dopo il 2014 il Memorandum diventa un simbolo delle garanzie internazionali non rispettate."
    ],
    materie: {
      inglese: "Il documento è firmato con Stati Uniti e Regno Unito ed esiste anche in inglese: espressioni come «territorial integrity» e «security assurances» sono lessico tipico delle relazioni internazionali.",
      diritto: "È un tema di diritto internazionale: un memorandum contiene impegni politici, ma non è un trattato con obblighi di difesa. Mostra la differenza tra promessa politica e obbligo giuridico."
    },
    parole: "budapest memorandum nucleare armi atomiche disarmo garanzie stati uniti regno unito russia diritto internazionale"
  },
  {
    data: "1996",
    era: "contemporanea",
    titolo: "Costituzione dell'Ucraina e nascita della grivnia",
    testo: "Il 28 giugno 1996 il Parlamento approva la Costituzione dell'Ucraina. A settembre entra in circolazione la nuova moneta nazionale, la grivnia (hryvnia).",
    dettagli: [
      "Il 28 giugno è la Festa della Costituzione.",
      "La grivnia sostituisce il karbovanec al cambio di 1 grivnia ogni 100.000 karbovanci.",
      "Nel 1993 l'inflazione aveva superato il 10.000% in un anno."
    ],
    materie: {
      diritto: "Si può confrontare con la Costituzione italiana: entrambe descrivono lo Stato come repubblica democratica, elencano i diritti dei cittadini e dividono i poteri dello Stato.",
      economia: "Una nuova moneta e una banca centrale servono a fermare l'iperinflazione, cioè l'aumento velocissimo dei prezzi che fa perdere valore ai risparmi.",
      matematica: "Il cambio 1 : 100.000 e l'inflazione del 10.000% sono esercizi su rapporti e percentuali: con un'inflazione del 10.000% un prodotto che costa 1 costa 101 un anno dopo."
    },
    parole: "costituzione 1996 grivnia hryvnia moneta karbovanec inflazione iperinflazione banca centrale cambio"
  },
  {
    data: "2004",
    era: "contemporanea",
    titolo: "Rivoluzione Arancione",
    testo: "Grandi proteste pacifiche a Kiev contro i brogli nelle elezioni presidenziali portano alla ripetizione del voto, vinto da Viktor Juščenko.",
    dettagli: [
      "Il colore arancione era il simbolo della campagna di Juščenko.",
      "Centinaia di migliaia di persone manifestano in piazza dell'Indipendenza (Majdan) a Kiev.",
      "La Corte Suprema annulla il secondo turno e il voto viene ripetuto il 26 dicembre 2004."
    ],
    materie: {
      diritto: "Un tribunale annulla un'elezione irregolare: è un esempio di Stato di diritto e di separazione dei poteri. In Italia il voto deve essere «personale ed eguale, libero e segreto» (art. 48).",
      informatica: "Internet, i siti di informazione indipendenti e gli SMS vengono usati per organizzare le proteste e diffondere notizie: uno dei primi esempi di mobilitazione digitale."
    },
    parole: "rivoluzione arancione elezioni brogli proteste juščenko yushchenko janukovyč majdan maidan corte suprema voto internet"
  },
  {
    data: "2013 – 2014",
    era: "contemporanea",
    titolo: "Euromaidan, annessione della Crimea e guerra nel Donbas",
    testo: "Le proteste di Euromaidan, nate contro la sospensione dell'accordo con l'Unione Europea, diventano la Rivoluzione della Dignità. Il presidente Janukovyč fugge; la Russia annette la Crimea e inizia il conflitto nel Donbas.",
    dettagli: [
      "Le proteste iniziano nel novembre 2013 in piazza dell'Indipendenza a Kiev.",
      "Nel febbraio 2014 oltre cento manifestanti, ricordati come la «Centuria Celeste», vengono uccisi; Janukovyč fugge in Russia.",
      "Nel marzo 2014 la Russia annette la Crimea dopo un referendum non riconosciuto dall'ONU e dalla comunità internazionale.",
      "Da aprile 2014 scoppia la guerra nel Donbas tra l'esercito ucraino e le forze separatiste sostenute dalla Russia."
    ],
    materie: {
      diritto: "L'annessione della Crimea viola il principio dell'integrità territoriale degli Stati. L'Assemblea generale dell'ONU ha dichiarato non valido il referendum in Crimea.",
      economia: "Al centro della protesta c'è l'Accordo di associazione con l'UE, che comprende una zona di libero scambio. Dopo l'annessione l'UE adotta sanzioni economiche contro la Russia.",
      informatica: "Le proteste si organizzano su Facebook e Twitter e vengono trasmesse in diretta streaming: i social network diventano uno strumento politico."
    },
    img: {
      file: "Anti-government_protests_in_Kiev_(13087651675).jpg",
      didascalia: "Le proteste di Euromaidan a Kiev",
      autore: "Flickr / Wikimedia Commons",
      licenza: "CC BY 2.0"
    },
    parole: "euromaidan maidan rivoluzione della dignità unione europea janukovyč yanukovych crimea annessione donbas donbass guerra separatisti proteste sanzioni social"
  },
  {
    data: "24 febbraio 2022",
    era: "contemporanea",
    titolo: "Inizio dell'invasione russa su larga scala",
    testo: "La Russia lancia un'invasione militare su larga scala dell'Ucraina da nord, est e sud. È la più grande guerra in Europa dalla Seconda guerra mondiale.",
    dettagli: [
      "L'attacco su Kiev viene respinto e le truppe russe si ritirano dal nord del Paese nella primavera 2022.",
      "Milioni di ucraini sono costretti a lasciare le proprie case e a rifugiarsi all'estero o in altre regioni.",
      "L'Unione Europea e molti altri Paesi sostengono l'Ucraina e adottano sanzioni contro la Russia."
    ],
    materie: {
      diritto: "La Carta dell'ONU vieta l'uso della forza contro l'integrità territoriale di un altro Stato (art. 2). La Costituzione italiana dice che l'Italia ripudia la guerra come mezzo di offesa (art. 11).",
      economia: "La guerra fa salire i prezzi dell'energia e del grano in tutta Europa e provoca un'alta inflazione nel 2022: un esempio di come domanda e offerta reagiscono a uno shock.",
      informatica: "La guerra si combatte anche online: attacchi informatici a reti e siti governativi, uso di satelliti come Starlink per mantenere internet e lotta alla disinformazione."
    },
    parole: "invasione russa guerra 2022 attacco kiev profughi rifugiati sanzioni unione europea inflazione energia grano cyber zelens'kyj zelensky"
  },
  {
    data: "23 giugno 2022",
    era: "contemporanea",
    titolo: "L'Ucraina diventa Paese candidato all'Unione Europea",
    testo: "Il Consiglio europeo concede all'Ucraina lo status di Paese candidato all'adesione all'Unione Europea.",
    dettagli: [
      "La domanda di adesione era stata presentata pochi giorni dopo l'inizio dell'invasione, a fine febbraio 2022.",
      "Lo stesso giorno lo status viene concesso anche alla Moldavia.",
      "Per entrare nell'UE un Paese deve completare riforme su democrazia, giustizia, lotta alla corruzione ed economia."
    ],
    materie: {
      diritto: "L'adesione all'UE segue l'art. 49 del Trattato sull'Unione Europea e i «criteri di Copenaghen»: istituzioni democratiche, Stato di diritto e rispetto dei diritti umani.",
      economia: "Entrare nell'UE significa far parte del mercato unico, con libera circolazione di merci, servizi, capitali e persone. L'Ucraina deve dimostrare di avere un'economia di mercato funzionante.",
      inglese: "L'inglese è la lingua di lavoro più usata nelle istituzioni europee: candidatura, negoziati e documenti ufficiali si leggono spesso in inglese."
    },
    parole: "unione europea ue candidato candidatura adesione consiglio europeo copenaghen mercato unico moldavia 2022"
  }
];

/* ---------- Riferimenti agli elementi della pagina ---------- */
const timeline = document.getElementById("timeline");
const track = document.getElementById("track");
const input = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const status = document.getElementById("searchStatus");
const emptyState = document.getElementById("emptyState");
const searchForm = document.querySelector(".search");
const searchBar = document.getElementById("searchBar");
const eraChips = document.querySelectorAll("#eraFilters .chip");
const subjectBox = document.getElementById("subjectFilters");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const scrollHint = document.getElementById("scrollHint");

let eraAttiva = "tutti";
let materiaAttiva = "tutte";

/* ---------- Funzioni di supporto ---------- */

// Rende il testo sicuro da inserire nell'HTML
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Normalizza il testo: minuscole, senza accenti e senza apostrofi
// (così "cernobyl" trova "Černobyl'" e "sevcenko" trova "Ševčenko")
function normalizza(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’`´]/g, "")
    .replace(/[–—]/g, "-");
}

// Evidenzia le parole cercate, anche se nel testo originale hanno accenti
function evidenzia(testo, termini) {
  const sicuro = escapeHtml(testo);
  if (!termini.length) return sicuro;

  let norm = "";
  const mappa = [];
  for (let i = 0; i < sicuro.length; i++) {
    const n = normalizza(sicuro[i]);
    for (let k = 0; k < n.length; k++) {
      norm += n[k];
      mappa.push(i);
    }
  }

  const intervalli = [];
  termini.forEach((t) => {
    let pos = norm.indexOf(t);
    while (pos !== -1) {
      intervalli.push([mappa[pos], mappa[pos + t.length - 1] + 1]);
      pos = norm.indexOf(t, pos + t.length);
    }
  });
  if (!intervalli.length) return sicuro;

  // Unisce gli intervalli sovrapposti
  intervalli.sort((a, b) => a[0] - b[0]);
  const uniti = [intervalli[0]];
  for (let i = 1; i < intervalli.length; i++) {
    const ultimo = uniti[uniti.length - 1];
    if (intervalli[i][0] <= ultimo[1]) ultimo[1] = Math.max(ultimo[1], intervalli[i][1]);
    else uniti.push(intervalli[i]);
  }

  let risultato = "";
  let cursore = 0;
  uniti.forEach(([a, b]) => {
    const pezzo = sicuro.slice(a, b);
    if (pezzo.includes("&") || pezzo.includes(";")) return; // non spezzare le entità HTML
    risultato += sicuro.slice(cursore, a) + "<mark>" + pezzo + "</mark>";
    cursore = b;
  });
  return risultato + sicuro.slice(cursore);
}

/* ---------- Filtri per materia (creati dai dati) ---------- */
function creaFiltriMaterie() {
  const tutte = document.createElement("button");
  tutte.type = "button";
  tutte.className = "chip is-active";
  tutte.dataset.materia = "tutte";
  tutte.textContent = "Tutte";
  subjectBox.appendChild(tutte);

  Object.entries(MATERIE).forEach(([chiave, m]) => {
    const quanti = EVENTI.filter((ev) => ev.materie[chiave]).length;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip chip--subject";
    chip.dataset.materia = chiave;
    chip.style.setProperty("--c", m.colore);
    chip.innerHTML = `<span class="chip__dot" aria-hidden="true"></span>${m.nome} (${quanti})`;
    subjectBox.appendChild(chip);
  });

  subjectBox.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    subjectBox.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    materiaAttiva = chip.dataset.materia;
    filtra();
    tornaAllInizio();
  });
}

/* ---------- Creazione della timeline ---------- */
function creaTimeline() {
  const frammento = document.createDocumentFragment();

  EVENTI.forEach((ev, indice) => {
    const nomiMaterie = Object.keys(ev.materie).map((k) => MATERIE[k].nome).join(" ");
    const testiMaterie = Object.values(ev.materie).join(" ");
    ev.testoDettagli = normalizza(ev.dettagli.join(" ") + " " + testiMaterie);
    ev.testoPrincipale = normalizza([ev.data, ev.titolo, ev.testo, nomiMaterie].join(" "));
    ev.indiceRicerca = [ev.testoPrincipale, ev.testoDettagli, normalizza(ev.parole), normalizza(NOMI_ERE[ev.era]), ev.cosacchi ? "cosacchi" : ""].join(" ");

    const articolo = document.createElement("article");
    articolo.className = "event" + (ev.cosacchi ? " is-cossack" : "");
    articolo.dataset.indice = indice;
    articolo.innerHTML = `
      <time class="event__date"></time>
      <span class="event__dot" aria-hidden="true"></span>
      <div class="card">
        ${creaCopertina(ev)}
        <div class="card__body">
        <div class="card__badges">
          <span class="card__era">${NOMI_ERE[ev.era]}</span>
          ${ev.cosacchi ? '<span class="card__cossack">\u2694 Cosacchi</span>' : ""}
        </div>
        <h2 class="card__title"></h2>
        <p class="card__text"></p>
        <div class="tags"></div>
        <div class="card__details" id="dettagli-${indice}">
          <div>
            <p class="details__heading">Approfondimento</p>
            <ul></ul>
            <p class="details__heading">Collegamenti con le materie</p>
            <div class="links"></div>
          </div>
        </div>
        <button type="button" class="card__toggle" aria-expanded="false" aria-controls="dettagli-${indice}">
          Approfondisci e materie <span aria-hidden="true">&#9662;</span>
        </button>
        </div>
      </div>`;

    // Se la foto non si carica, al suo posto compare l'illustrazione
    const foto = articolo.querySelector(".cover img");
    if (foto) {
      foto.addEventListener("error", () => {
        foto.closest(".cover").outerHTML = copertinaIllustrata(ev);
      });
    }

    const bottone = articolo.querySelector(".card__toggle");
    bottone.addEventListener("click", () => {
      const aperta = articolo.querySelector(".card").classList.contains("is-open");
      apriScheda(articolo, !aperta);
    });

    frammento.appendChild(articolo);
  });

  timeline.appendChild(frammento);
}

// Copertina della scheda: foto (se c'è) oppure illustrazione con l'anno
function copertinaIllustrata(ev) {
  const icona = ev.cosacchi ? ICONE_ERE.cosacchi : ICONE_ERE[ev.era];
  const numero = ev.data.match(/\d{3,4}/);
  const anno = escapeHtml(numero ? numero[0] : ev.data.split(" ")[0]);
  return `<div class="cover cover--art${ev.cosacchi ? " is-cossack" : ""}" aria-hidden="true">
      <span class="cover__year">${anno}</span><span class="cover__icon">${icona}</span>
    </div>`;
}

function creaCopertina(ev) {
  if (!ev.img) return copertinaIllustrata(ev);
  const { file, didascalia, autore, licenza } = ev.img;
  return `<figure class="cover">
      <img src="${urlCommons(file, 640)}" alt="${escapeHtml(didascalia)}" loading="lazy" draggable="false" referrerpolicy="no-referrer">
      <figcaption>${escapeHtml(didascalia)} · <a href="${paginaCommons(file)}" target="_blank" rel="noopener">${escapeHtml(autore)}</a>, ${escapeHtml(licenza)}</figcaption>
    </figure>`;
}

function apriScheda(articolo, apri) {
  const scheda = articolo.querySelector(".card");
  const bottone = articolo.querySelector(".card__toggle");
  scheda.classList.toggle("is-open", apri);
  bottone.setAttribute("aria-expanded", String(apri));
  bottone.firstChild.textContent = apri ? "Chiudi " : "Approfondisci e materie ";
}

// Scrive i testi dentro le schede, con le parole cercate evidenziate
function aggiornaTesti(articolo, ev, termini) {
  articolo.querySelector(".event__date").innerHTML = evidenzia(ev.data, termini);
  articolo.querySelector(".card__title").innerHTML = evidenzia(ev.titolo, termini);
  articolo.querySelector(".card__text").innerHTML = evidenzia(ev.testo, termini);

  articolo.querySelector(".tags").innerHTML = Object.keys(ev.materie)
    .map((k) => `<span class="tag" style="--c:${MATERIE[k].colore}">${evidenzia(MATERIE[k].nome, termini)}</span>`)
    .join("");

  articolo.querySelector(".card__details ul").innerHTML = ev.dettagli
    .map((d) => `<li>${evidenzia(d, termini)}</li>`)
    .join("");

  articolo.querySelector(".links").innerHTML = Object.entries(ev.materie)
    .map(([k, perche]) => `
      <div class="link" style="--c:${MATERIE[k].colore}">
        <strong>${evidenzia(MATERIE[k].nome, termini)} — perché?</strong>
        ${evidenzia(perche, termini)}
      </div>`)
    .join("");
}

/* ---------- Ricerca in tempo reale e filtri ---------- */
function filtra() {
  const query = input.value.trim();
  const termini = normalizza(query).split(/\s+/).filter(Boolean);
  const filtriAttivi = termini.length > 0 || eraAttiva !== "tutti" || materiaAttiva !== "tutte";
  const articoli = timeline.querySelectorAll(".event");
  let visibili = 0;

  articoli.forEach((articolo) => {
    const ev = EVENTI[articolo.dataset.indice];
    const eraOk = eraAttiva === "tutti" || ev.era === eraAttiva || (eraAttiva === "cosacchi" && Boolean(ev.cosacchi));
    const materiaOk = materiaAttiva === "tutte" || Boolean(ev.materie[materiaAttiva]);
    const testoOk = termini.every((t) => ev.indiceRicerca.includes(t));
    const mostra = eraOk && materiaOk && testoOk;

    articolo.hidden = !mostra;
    if (!mostra) return;

    visibili++;
    aggiornaTesti(articolo, ev, termini);

    // Se la parola cercata compare solo nei dettagli, apre la scheda
    const soloNeiDettagli = termini.length > 0 &&
      !termini.every((t) => ev.testoPrincipale.includes(t)) &&
      termini.some((t) => ev.testoDettagli.includes(t));
    if (soloNeiDettagli) apriScheda(articolo, true);

    if (filtriAttivi) articolo.classList.add("is-visible");
  });

  // Testo di stato e pulsante di cancellazione
  clearBtn.hidden = query === "";
  searchForm.classList.toggle("has-value", query !== "");
  emptyState.hidden = visibili !== 0;
  track.hidden = visibili === 0;
  scrollHint.hidden = visibili === 0;

  if (!filtriAttivi) {
    status.textContent = `${EVENTI.length} eventi in ordine cronologico, da sinistra a destra. Digita per cercare.`;
  } else if (visibili === 0) {
    status.textContent = "Nessun risultato.";
  } else {
    const parola = visibili === 1 ? "evento trovato" : "eventi trovati";
    const q = query !== "" ? ` per «${escapeHtml(query)}»` : "";
    const e = eraAttiva === "cosacchi" ? " sulla storia dei Cosacchi" : (eraAttiva !== "tutti" ? ` nel periodo \u00AB${NOMI_ERE[eraAttiva]}\u00BB` : "");
    const m = materiaAttiva !== "tutte" ? ` collegati a ${MATERIE[materiaAttiva].nome}` : "";
    status.innerHTML = `<strong>${visibili}</strong> ${parola}${q}${e}${m}.`;
  }

  if (!filtriAttivi) osservaAnimazioni();
  aggiornaNavigazione();
}

/* ---------- Animazione delle schede quando entrano nella vista ---------- */
let osservatore = null;

function osservaAnimazioni() {
  if (!("IntersectionObserver" in window)) {
    timeline.querySelectorAll(".event").forEach((a) => a.classList.add("is-visible"));
    return;
  }
  if (!osservatore) {
    osservatore = new IntersectionObserver(
      (voci) => {
        voci.forEach((voce) => {
          if (voce.isIntersecting) {
            voce.target.classList.add("is-visible");
            osservatore.unobserve(voce.target);
          }
        });
      },
      { root: track, threshold: 0.1 }
    );
  }
  timeline.querySelectorAll(".event:not(.is-visible)").forEach((a) => osservatore.observe(a));
}

/* ---------- Scorrimento orizzontale ---------- */
function passo() {
  const evento = timeline.querySelector(".event:not([hidden])");
  const gap = parseFloat(getComputedStyle(timeline).columnGap) || 28;
  return evento ? evento.offsetWidth + gap : 380;
}

function aggiornaNavigazione() {
  const max = track.scrollWidth - track.clientWidth;
  const percentuale = max > 0 ? (track.scrollLeft / max) * 100 : 100;
  progress.style.width = percentuale + "%";
  prevBtn.disabled = track.scrollLeft <= 2;
  nextBtn.disabled = track.scrollLeft >= max - 2;
}

function tornaAllInizio() {
  track.scrollTo({ left: 0, behavior: "auto" });
  aggiornaNavigazione();
}

prevBtn.addEventListener("click", () => track.scrollBy({ left: -passo(), behavior: "smooth" }));
nextBtn.addEventListener("click", () => track.scrollBy({ left: passo(), behavior: "smooth" }));
track.addEventListener("scroll", aggiornaNavigazione, { passive: true });
window.addEventListener("resize", aggiornaNavigazione);

// La rotellina del mouse (su e giù) fa scorrere la timeline a destra e sinistra
track.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || e.shiftKey) return;
  const max = track.scrollWidth - track.clientWidth;
  const versoDestra = e.deltaY > 0;
  if ((versoDestra && track.scrollLeft >= max - 1) || (!versoDestra && track.scrollLeft <= 0)) return;
  e.preventDefault();
  track.scrollBy({ left: e.deltaY * 1.2, behavior: "auto" });
}, { passive: false });

// Trascinamento con il mouse
let trascina = null;
track.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse" || e.target.closest("button, a, .card__details, figcaption")) return;
  trascina = { x: e.clientX, scroll: track.scrollLeft, mosso: false };
});
window.addEventListener("pointermove", (e) => {
  if (!trascina) return;
  const dx = e.clientX - trascina.x;
  if (Math.abs(dx) > 4) {
    trascina.mosso = true;
    track.classList.add("is-dragging");
  }
  if (trascina.mosso) track.scrollLeft = trascina.scroll - dx;
});
window.addEventListener("pointerup", () => {
  trascina = null;
  track.classList.remove("is-dragging");
});

/* ---------- Eventi dell'interfaccia ---------- */

// Ricerca mentre si digita
let timer = null;
input.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    filtra();
    tornaAllInizio();
  }, 80);
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  filtra();
  input.focus();
});

// Tasti rapidi: "/" per cercare, "Esc" per cancellare, frecce per scorrere
document.addEventListener("keydown", (e) => {
  const inCampo = document.activeElement === input;
  if (e.key === "/" && !inCampo) {
    e.preventDefault();
    input.focus();
  } else if (e.key === "Escape" && inCampo) {
    input.value = "";
    filtra();
  } else if (!inCampo && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
    e.preventDefault();
    track.scrollBy({ left: e.key === "ArrowRight" ? passo() : -passo(), behavior: "smooth" });
  }
});

// Filtri per periodo
eraChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    eraChips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    eraAttiva = chip.dataset.era;
    filtra();
    tornaAllInizio();
  });
});

// Suggerimenti quando non ci sono risultati
document.querySelectorAll("[data-suggest]").forEach((btn) => {
  btn.addEventListener("click", () => {
    eraAttiva = "tutti";
    materiaAttiva = "tutte";
    eraChips.forEach((c) => c.classList.toggle("is-active", c.dataset.era === "tutti"));
    subjectBox.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c.dataset.materia === "tutte"));
    input.value = btn.dataset.suggest;
    filtra();
    tornaAllInizio();
    input.focus();
  });
});

// Bordo sotto la barra di ricerca quando la pagina scorre
window.addEventListener("scroll", () => {
  searchBar.classList.toggle("is-stuck", window.scrollY > searchBar.offsetTop);
}, { passive: true });

/* ---------- Avvio ---------- */
creaFiltriMaterie();
creaTimeline();
filtra();
