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
  // Ton numéro WhatsApp (sans + ni espaces) : solution de secours pour recevoir les captures
  whatsapp: "22965061408",
  // Adresse de ton relais Cloudflare (voir RECEVOIR-LES-CAPTURES.txt).
  // Quand elle est remplie, les captures de tes abonnés arrivent directement dans ton Telegram.
  // Tant qu'elle est vide, le bouton envoie les abonnés sur ton WhatsApp.
  envoiCaptures: "",
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
