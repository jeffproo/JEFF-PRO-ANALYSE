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

/* ---------- BOOKMAKERS ----------
   lien : lien d'inscription (avec ton affiliation)
   appli : lien de téléchargement de l'application
   procedure : image de la procédure d'inscription */
const BOOKMAKERS = [
  { nom: "1XBET",     bonus: "Bonus 200%", couleur: "#1d5fd1",
    lien: "https://reffpa.com/L?tag=d_4215855m_97c_&site=4215855&ad=97&r=registration",
    appli: "https://1xbet.fr.uptodown.com/android", procedure: "images/procedure-1xbet.jpg" },
  { nom: "MELBET",    bonus: "Bonus 200%", couleur: "#f2a20c",
    lien: "https://refpa3665.com/L?tag=d_4139550m_45415c_&site=4139550&ad=45415&r=registration",
    appli: "https://refpa3665.com/L?tag=d_4139550m_18775c_&site=4139550&ad=18775", procedure: "images/procedure-melbet.jpg" },
  { nom: "PARIPESA",  bonus: "Bonus 200%", couleur: "#0f9d8a",
    lien: "https://paripesa.bet/christtpronoso",
    appli: "https://paripesa.bet/christtpronosoapp", procedure: "images/procedure-paripesa.jpg" },
  { nom: "WINWIN",    bonus: "Bonus 200%", couleur: "#e0413b",
    lien: "https://slim.link/qxyZnTd",
    appli: "https://slim.link/24n1drD", procedure: "images/procedure-winwin.jpg" },
  { nom: "BETWINNER", bonus: "Bonus 100%", couleur: "#2e7d32",
    lien: "https://bwredir.com/3cSE?p=%2Fregistration%2F",
    appli: "https://betwinner.fr.uptodown.com/android", procedure: "images/procedure-betwinner.jpg" }
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
  { ligue: "Championship", dom: "Wolverhampton", ext: "Bolton Wanderers", date: "2026-10-13T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Championship", dom: "Wrexham", ext: "West Bromwich Albion", date: "2026-10-13T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Championship", dom: "Burnley", ext: "Charlton Athletic", date: "2026-10-13T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Championship", dom: "Lincoln City", ext: "West Ham United", date: "2026-10-14T20:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Championship", dom: "Burnley", ext: "Wolverhampton", date: "2026-10-16T20:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Championship", dom: "Watford", ext: "Charlton Athletic", date: "2026-10-17T12:30", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Championship", dom: "Wrexham", ext: "Preston North End", date: "2026-10-17T15:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Championship", dom: "Wolverhampton", ext: "Portsmouth", date: "2026-10-20T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },

  // --- Premier League ---
  { ligue: "Premier League", dom: "Brentford", ext: "Liverpool", date: "2026-10-17T15:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Premier League", dom: "Newcastle United", ext: "Aston Villa", date: "2026-10-17T17:30", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Premier League", dom: "Brighton", ext: "Crystal Palace", date: "2026-10-18T14:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },

  // --- Serie A ---
  { ligue: "Serie A", dom: "Venezia", ext: "Napoli", date: "2026-10-17T14:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Serie A", dom: "Bologna", ext: "Inter Milan", date: "2026-10-17T17:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Serie A", dom: "AS Roma", ext: "Genoa", date: "2026-10-17T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },

  // --- Ligue 1 ---
  { ligue: "Ligue 1", dom: "Le Mans", ext: "Toulouse", date: "2026-10-16T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Strasbourg", ext: "Paris Saint-Germain", date: "2026-10-17T16:15", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Lille", ext: "Brest", date: "2026-10-17T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Troyes", ext: "Lens", date: "2026-10-17T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Le Havre", ext: "Auxerre", date: "2026-10-18T16:15", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Ligue 1", dom: "Lyon", ext: "Nice", date: "2026-10-18T19:45", prono: "", cote: "", confiance: "", analyse: "", vip: false },

  // --- Brasileirão ---
  { ligue: "Brasileirão", dom: "Mirassol", ext: "Internacional", date: "2026-10-17T00:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Brasileirão", dom: "Botafogo", ext: "Chapecoense", date: "2026-10-17T22:00", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Brasileirão", dom: "Atlético Mineiro", ext: "Coritiba", date: "2026-10-17T22:30", prono: "", cote: "", confiance: "", analyse: "", vip: false },
  { ligue: "Brasileirão", dom: "Corinthians", ext: "Vitória", date: "2026-10-20T00:00", prono: "", cote: "", confiance: "", analyse: "", vip: false }

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
