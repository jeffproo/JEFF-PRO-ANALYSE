/* =========================================================
   JEFF PRO — FICHIER À MODIFIER
   C'est ici que tu changes TOUT : matchs, pronos, preuves,
   bookmakers, liens WhatsApp / Telegram.
   Tu n'as jamais besoin de toucher à vip.html.
   ========================================================= */

const CONFIG = {
  nom: "JEFF PRO",
  codePromo: "8F9Y",
  depotMin: "2000 FCFA",
  chaineWhatsapp: "https://whatsapp.com/channel/0029VbBw8FBDp2Q03qhB4t2b",
  bot: "https://t.me/JeffProAnalyseBot",
  // Ton compte Telegram perso (ex : "https://t.me/tonpseudo") : les abonnés t'y envoient leurs captures.
  // Laisse vide pour utiliser le bot ci-dessus.
  telegramPerso: "",
  // Ton numéro WhatsApp (sans + ni espaces) : solution de secours pour recevoir les captures
  whatsapp: "22965061408",
  // Adresse de ton relais Cloudflare (voir RECEVOIR-LES-CAPTURES.txt).
  // Quand elle est remplie, les captures de tes abonnés arrivent directement dans ton Telegram.
  // Tant qu'elle est vide, le bouton envoie les abonnés sur ton WhatsApp.
  envoiCaptures: "https://jeffpro-preuves.calebhounnon77.workers.dev",
  // Lien de ton site principal (ton index.html)
  accueil: "index.html"
};

/* ---------- VIP PREMIUM (payant) ----------
   Les 3 formules et tes numéros Mobile Money. */
const PREMIUM = {
  formules: [
    { nom: "1 semaine",  prix: 3000,  jours: 7 },
    { nom: "2 semaines", prix: 5000,  jours: 14 },
    { nom: "1 mois",     prix: 10000, jours: 30 }
  ],
  paiement: [
    "MTN MoMo : +229 01 57 61 74 17 (Justine)",
    "Moov Money : +229 01 65 06 03 78 (Caleb)"
  ],
  walliAndroid: "https://play.google.com/store/apps/details?id=com.africamax.wallisend",
  walliIphone: "https://onelink.to/5d8yht"
};

/* ---------- BOOKMAKERS ----------
   lien : lien d'inscription (avec ton affiliation)
   appli : lien de téléchargement de l'application
   procedure : image de la procédure d'inscription */
const BOOKMAKERS = [
  { nom: "1XBET",     bonus: "Bonus 200%", couleur: "#1d5fd1",
    lien: "https://reffpa.com/L?tag=d_4215855m_97c_&site=4215855&ad=97&r=registration",
    appli: "https://1xbet.fr.uptodown.com/android", procedure: "images/procedure-1xbet.jpg", logo: "data:image/jpeg;base64,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" },
  { nom: "MELBET",    bonus: "Bonus 200%", couleur: "#f2a20c",
    lien: "https://refpa3665.com/L?tag=d_4139550m_45415c_&site=4139550&ad=45415&r=registration",
    appli: "https://refpa3665.com/L?tag=d_4139550m_18775c_&site=4139550&ad=18775", procedure: "images/procedure-melbet.jpg", logo: "data:image/jpeg;base64,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" },
  { nom: "PARIPESA",  bonus: "Bonus 200%", couleur: "#0f9d8a",
    lien: "https://paripesa.bet/christtpronoso",
    appli: "https://paripesa.bet/christtpronosoapp", procedure: "images/procedure-paripesa.jpg", logo: "data:image/jpeg;base64,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" },
  { nom: "WINWIN",    bonus: "Bonus 200%", couleur: "#e0413b",
    lien: "https://slim.link/qxyZnTd",
    appli: "https://slim.link/24n1drD", procedure: "images/procedure-winwin.jpg", logo: "data:image/jpeg;base64,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" },
  { nom: "BETWINNER", bonus: "Bonus 100%", couleur: "#2e7d32",
    lien: "https://bwredir.com/3cSE?p=%2Fregistration%2F",
    appli: "https://betwinner.fr.uptodown.com/android", procedure: "images/procedure-betwinner.jpg", logo: "data:image/jpeg;base64,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" }
];

/* ---------- PROCÉDURE VIP ----------
   Le texte des étapes affichées dans l'Espace VIP. Modifie-le comme tu veux. */
const ETAPES = [
  { titre: "Inscris-toi avec le code 8F9Y", texte: "Crée un NOUVEAU compte sur 1xBet, Melbet, Paripesa, WinWin ou Betwinner avec le code promo 8F9Y. Si tu as déjà un compte, déconnecte-toi et crée un nouveau compte (nouveau numéro ou nouvel e-mail)." },
  { titre: "Fais une recharge de 2000 FCFA minimum", texte: "Recharge ton nouveau compte d'au moins 2000 FCFA." },
  { titre: "Capture 1 : ton inscription", texte: "La capture de ton profil où on voit bien ton identifiant / numéro de compte." },
  { titre: "Capture 2 : ta recharge", texte: "La capture de ta recharge de 2000 FCFA minimum." },
  { titre: "Envoie tes 2 captures ci-dessous", texte: "Je vérifie moi-même tes preuves, puis je te donne l'accès VIP." }
];

/* ---------- COULEURS DES CLUBS ----------
   "Nom du club": ["couleur 1", "couleur 2", "ABRÉVIATION"]
   Pour un nouveau club, ajoute une ligne. Sans ligne, la page met une couleur automatique. */
const COULEURS = {
  // Championship
  "Wolverhampton":       ["#FDB913", "#231F20", "WOL"],
  "Bolton Wanderers":    ["#263C7E", "#FFFFFF", "BOL"],
  "Wrexham":             ["#D71920", "#FFFFFF", "WRE"],
  "West Bromwich Albion":["#122F67", "#FFFFFF", "WBA"],
  "Burnley":             ["#6C1D45", "#99D6EA", "BUR"],
  "Charlton Athletic":   ["#D4021D", "#FFFFFF", "CHA"],
  "Lincoln City":        ["#E2231A", "#FFFFFF", "LIN"],
  "West Ham United":     ["#7A263A", "#1BB1E7", "WHU"],
  "Watford":             ["#FBEE23", "#231F20", "WAT"],
  "Preston North End":   ["#0A1F44", "#FFFFFF", "PNE"],
  "Portsmouth":          ["#001489", "#FFFFFF", "POR"],
  // Premier League
  "Brentford":           ["#E30613", "#FFFFFF", "BRE"],
  "Liverpool":           ["#C8102E", "#FFFFFF", "LIV"],
  "Newcastle United":    ["#241F20", "#FFFFFF", "NEW"],
  "Aston Villa":         ["#670E36", "#95BFE5", "AVL"],
  "Brighton":            ["#0057B8", "#FFFFFF", "BHA"],
  "Crystal Palace":      ["#1B458F", "#C4122E", "CRY"],
  // Serie A
  "Venezia":             ["#231F20", "#F26722", "VEN"],
  "Napoli":              ["#12A0D7", "#FFFFFF", "NAP"],
  "Bologna":             ["#A21C26", "#1A2F48", "BFC"],
  "Inter Milan":         ["#0068A8", "#231F20", "INT"],
  "AS Roma":             ["#8E1F2F", "#F0BC42", "ROM"],
  "Genoa":               ["#C8102E", "#002F6C", "GEN"],
  // Ligue 1
  "Le Mans":             ["#D52B1E", "#F7D117", "LMA"],
  "Toulouse":            ["#4B2C82", "#FFFFFF", "TFC"],
  "Strasbourg":          ["#009FE3", "#FFFFFF", "RCS"],
  "Paris Saint-Germain": ["#004170", "#DA291C", "PSG"],
  "Lille":               ["#E01E13", "#20325F", "LIL"],
  "Brest":               ["#E2001A", "#FFFFFF", "BRS"],
  "Troyes":              ["#005BAC", "#FFFFFF", "TRO"],
  "Lens":                ["#EC1C24", "#FFD700", "RCL"],
  "Le Havre":            ["#8AC6E8", "#1A2D53", "HAC"],
  "Auxerre":             ["#004B9B", "#FFFFFF", "AJA"],
  "Lyon":                ["#1D3E8C", "#DA001A", "OL"],
  "Nice":                ["#C8102E", "#231F20", "OGC"],
  // Brasileirão
  "Mirassol":            ["#FFE000", "#00843D", "MIR"],
  "Internacional":       ["#E30613", "#FFFFFF", "SCI"],
  "Botafogo":            ["#231F20", "#FFFFFF", "BOT"],
  "Chapecoense":         ["#00843D", "#FFFFFF", "CHP"],
  "Atlético Mineiro":    ["#231F20", "#FFFFFF", "CAM"],
  "Coritiba":            ["#00544D", "#FFFFFF", "CFC"],
  "Corinthians":         ["#231F20", "#FFFFFF", "COR"],
  "Vitória":             ["#E30613", "#231F20", "VIT"]
};

/* ---------- LOGOS DES CLUBS (facultatif) ----------
   Mets l'image du logo dans le dossier images/logos sur GitHub,
   puis ajoute une ligne : "Nom exact du club comme dans MATCHS": "chemin de l'image".
   Sans logo, la page affiche un rond avec les initiales. */
const LOGOS = {
  // "Liverpool": "images/logos/liverpool.png",
  // "Brentford": "images/logos/brentford.png",
};

/* ---------- MATCHS À VENIR ----------
   date : "AAAA-MM-JJTHH:MM" (heure de Porto-Novo / Cotonou)
   prono, cote, confiance, analyse : remplis-les quand ton prono est prêt.
   vip: true  => affiche un cadenas "réservé VIP" sur ce match.
   ⚠️ Tout ce qui est écrit dans ce fichier est visible par tout le monde (code source).
   Tes VRAIS pronos VIP, publie-les dans admin.html : seuls les comptes VIP les voient.
   Pour ajouter un match : copie une ligne { ... }, colle-la, change les infos. */
const MATCHS = [
  // --- Championship ---
  { ligue: "Championship", dom: "Wolverhampton", ext: "Bolton Wanderers", date: "2026-10-13T19:45", prono: "Victoire Wolverhampton", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Championship", dom: "Wrexham", ext: "West Bromwich Albion", date: "2026-10-13T19:45", prono: "Double chance : Wrexham ou nul (1X)", cote: "", confiance: "Moyenne", analyse: "", vip: false },
  { ligue: "Championship", dom: "Burnley", ext: "Charlton Athletic", date: "2026-10-13T19:45", prono: "Victoire Burnley", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Championship", dom: "Lincoln City", ext: "West Ham United", date: "2026-10-14T20:00", prono: "Double chance : West Ham ou nul (X2)", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Championship", dom: "Burnley", ext: "Wolverhampton", date: "2026-10-16T20:00", prono: "Double chance : Burnley ou nul (1X)", cote: "", confiance: "Moyenne", analyse: "", vip: false },
  { ligue: "Championship", dom: "Watford", ext: "Charlton Athletic", date: "2026-10-17T12:30", prono: "Double chance : Watford ou nul (1X)", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Championship", dom: "Wrexham", ext: "Preston North End", date: "2026-10-17T15:00", prono: "Double chance : Wrexham ou nul (1X)", cote: "", confiance: "Moyenne", analyse: "", vip: false },
  { ligue: "Championship", dom: "Wolverhampton", ext: "Portsmouth", date: "2026-10-20T19:45", prono: "Victoire Wolverhampton", cote: "", confiance: "Forte", analyse: "", vip: false },

  // --- Premier League ---
  { ligue: "Premier League", dom: "Brentford", ext: "Liverpool", date: "2026-10-17T15:00", prono: "Double chance : Liverpool ou nul (X2)", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Premier League", dom: "Newcastle United", ext: "Aston Villa", date: "2026-10-17T17:30", prono: "Double chance : Newcastle ou nul (1X)", cote: "", confiance: "Moyenne", analyse: "", vip: false },
  { ligue: "Premier League", dom: "Brighton", ext: "Crystal Palace", date: "2026-10-18T14:00", prono: "Double chance : Brighton ou nul (1X)", cote: "", confiance: "Moyenne", analyse: "", vip: false },

  // --- Serie A ---
  { ligue: "Serie A", dom: "Venezia", ext: "Napoli", date: "2026-10-17T14:00", prono: "Double chance : Napoli ou nul (X2)", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Serie A", dom: "Bologna", ext: "Inter Milan", date: "2026-10-17T17:00", prono: "Double chance : Inter ou nul (X2)", cote: "", confiance: "Moyenne", analyse: "", vip: false },
  { ligue: "Serie A", dom: "AS Roma", ext: "Genoa", date: "2026-10-17T19:45", prono: "Victoire AS Roma", cote: "", confiance: "Forte", analyse: "", vip: false },

  // --- Ligue 1 ---
  { ligue: "Ligue 1", dom: "Le Mans", ext: "Toulouse", date: "2026-10-16T19:45", prono: "Double chance : Toulouse ou nul (X2)", cote: "", confiance: "Moyenne", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Strasbourg", ext: "Paris Saint-Germain", date: "2026-10-17T16:15", prono: "Victoire Paris Saint-Germain", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Lille", ext: "Brest", date: "2026-10-17T19:45", prono: "Victoire Lille", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Troyes", ext: "Lens", date: "2026-10-17T19:45", prono: "Double chance : Lens ou nul (X2)", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Le Havre", ext: "Auxerre", date: "2026-10-18T16:15", prono: "Double chance : Le Havre ou nul (1X)", cote: "", confiance: "Moyenne", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Lyon", ext: "Nice", date: "2026-10-18T19:45", prono: "Double chance : Lyon ou nul (1X)", cote: "", confiance: "Forte", analyse: "", vip: false },

  // --- Brasileirão ---
  { ligue: "Brasileirão", dom: "Mirassol", ext: "Internacional", date: "2026-10-17T00:00", prono: "Double chance : Mirassol ou nul (1X)", cote: "", confiance: "Moyenne", analyse: "", vip: false },
  { ligue: "Brasileirão", dom: "Botafogo", ext: "Chapecoense", date: "2026-10-17T22:00", prono: "Victoire Botafogo", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Brasileirão", dom: "Atlético Mineiro", ext: "Coritiba", date: "2026-10-17T22:30", prono: "Victoire Atlético Mineiro", cote: "", confiance: "Forte", analyse: "", vip: false },
  { ligue: "Brasileirão", dom: "Corinthians", ext: "Vitória", date: "2026-10-20T00:00", prono: "Victoire Corinthians", cote: "", confiance: "Forte", analyse: "", vip: false }

  /* EXEMPLE d'un match rempli :
  { ligue: "Ligue 1", dom: "Lille", ext: "Brest", date: "2026-10-17T19:45",
    prono: "Plus de 2,5 buts", cote: "1.85", confiance: "Forte",
    analyse: "Deux équipes offensives, défenses fragiles.", vip: false },
  */
];

/* ---------- MES PREUVES ----------
   1) Mets ta capture dans le dossier "preuves" sur GitHub (ex : preuves/2026-10-12.jpg)
   2) Ajoute une ligne ici avec le même nom de fichier.
   Les plus récentes en premier. */
const PREUVES = [
  // { image: "preuves/2026-10-12.jpg", titre: "Coupon VIP gagné", date: "12 oct. 2026", cote: "4.20" },
];
