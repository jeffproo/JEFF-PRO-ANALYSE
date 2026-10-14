/* JEFF PRO — Comptes abonnés (connexion email + mot de passe, statut STANDARD / VIP)
   Rien à modifier ici : la configuration est dans firebase-config.js */
const V = "10.12.2";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const cfg = typeof FIREBASE_CONFIG !== "undefined" ? FIREBASE_CONFIG : null;

if (cfg && cfg.apiKey) start().catch(e => {
  console.error("Comptes :", e);
  document.body.classList.remove("pending"); document.body.classList.add("locked");
  const g = document.getElementById("gateErr"); if (g) g.hidden = false;
});

async function start() {
  const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const A = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`);
  const F = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
  const app = initializeApp(cfg);
  const auth = A.getAuth(app); auth.languageCode = "fr";
  const db = F.getFirestore(app);

  $("#authOff").hidden = true;
  $("#authBox").hidden = false;
  $("#acctHint").hidden = false;

  // --- Preuves publiques (visibles par tout le monde, même sans compte) ---
  F.onSnapshot(F.query(F.collection(db, "preuves"), F.orderBy("createdAt", "desc"), F.limit(80)),
    s => { if (window.JP_setProofs) window.JP_setProofs(s.docs.map(d => d.data())); },
    e => console.warn("Preuves :", e && e.code));

  // --- Matchs et pronostics gratuits (publics, gérés depuis l'admin) ---
  F.onSnapshot(F.collection(db, "matchs"),
    s => { if (window.JP_setMatchs) window.JP_setMatchs(s.docs.map(d => d.data())); },
    e => console.warn("Matchs :", e && e.code));

  // --- Logos des clubs (publics) ---
  F.onSnapshot(F.collection(db, "logos"),
    s => { const map = {}; s.docs.forEach(d => { const p = d.data(); if (p.nom && p.image) map[p.nom] = p.image; }); if (window.JP_setLogos) window.JP_setLogos(map); },
    e => console.warn("Logos :", e && e.code));

  // --- Connexion / inscription ---
  let mode = "login";
  const setMode = m => {
    mode = m;
    const reg = m === "register";
    $("#aPass2Wrap").hidden = !reg;
    $("#aForgot").hidden = reg;
    $("#aTitle").textContent = reg ? "INSCRIPTION" : "CONNEXION";
    $("#aSub").textContent = reg ? "Crée ton compte gratuit pour voir mes avis et pronostics." : "";
    $("#aSubmit").textContent = reg ? "S'INSCRIRE" : "SE CONNECTER";
    $("#aSwitchTxt").textContent = reg ? "Déjà un compte ?" : "Pas encore de compte ?";
    $("#aSwitch").textContent = reg ? "Se connecter" : "S'inscrire";
    $("#aPass").autocomplete = reg ? "new-password" : "current-password";
    msg("");
  };
  $("#aSwitch").onclick = () => setMode(mode === "register" ? "login" : "register");
  const msg = (t, ok) => { const m = $("#aMsg"); m.textContent = t; m.className = "hint " + (t ? (ok ? "ok" : "err") : ""); };

  setMode("login");

  const ERR = {
    "auth/invalid-email": "Adresse email invalide.",
    "auth/missing-password": "Entre ton mot de passe.",
    "auth/weak-password": "Mot de passe trop court (6 caractères minimum).",
    "auth/email-already-in-use": "Cet email a déjà un compte. Connecte-toi.",
    "auth/invalid-credential": "Email ou mot de passe incorrect.",
    "auth/wrong-password": "Email ou mot de passe incorrect.",
    "auth/user-not-found": "Aucun compte avec cet email.",
    "auth/too-many-requests": "Trop d'essais. Réessaie dans quelques minutes.",
    "auth/network-request-failed": "Pas de connexion internet."
  };
  const fr = e => ERR[e && e.code] || "Une erreur est survenue. Réessaie.";

  $("#authForm").onsubmit = async e => {
    e.preventDefault();
    const email = $("#aEmail").value.replace(/\s+/g, "").toLowerCase(), pass = $("#aPass").value;
    if (!email) return msg("Écris ton adresse email.");
    if (mode === "register" && pass !== $("#aPass2").value) return msg("Les deux mots de passe ne sont pas identiques.");
    $("#aSubmit").disabled = true;
    try {
      if (mode === "login") await A.signInWithEmailAndPassword(auth, email, pass);
      else {
        const c = await A.createUserWithEmailAndPassword(auth, email, pass);
        await ensureProfile(c.user);
      }
      $("#authForm").reset();
    } catch (err) { msg(fr(err)); }
    finally { $("#aSubmit").disabled = false; }
  };

  $("#aForgot").onclick = async () => {
    const email = $("#aEmail").value.replace(/\s+/g, "").toLowerCase();
    if (!email) return msg("Écris ton email au-dessus, puis clique à nouveau sur « Mot de passe oublié ».");
    try { await A.sendPasswordResetEmail(auth, email); msg("📩 Email envoyé : regarde ta boîte mail (et les spams).", true); }
    catch (err) { msg(fr(err)); }
  };

  $("#logout").onclick = () => A.signOut(auth);

  async function ensureProfile(user) {
    const ref = F.doc(db, "users", user.uid);
    const snap = await F.getDoc(ref);
    if (!snap.exists()) {
      await F.setDoc(ref, { email: user.email, statut: "STANDARD", createdAt: F.serverTimestamp() });
      return "STANDARD";
    }
    return snap.data().statut || "STANDARD";
  }

  // --- État du compte ---
  let stopVip = null, stopUser = null;
  A.onAuthStateChanged(auth, async user => {
    if (stopVip) { stopVip(); stopVip = null; }
    if (stopUser) { stopUser(); stopUser = null; }
    window.JP_USER = user ? { email: user.email, uid: user.uid } : null;
    document.body.classList.remove("pending");
    document.body.classList.toggle("locked", !user);
    $("#authBox").hidden = !!user;
    if (user && !window.__jpLogged) { window.__jpLogged = true; window.scrollTo(0, 0); if (window.JP_onLogin) window.JP_onLogin(); }
    if (!user) window.__jpLogged = false;
    $("#profileBox").hidden = !user;
    if (!user) { renderVip("out"); return; }

    $("#pEmail").textContent = user.email;
    let statut = "STANDARD";
    try {
      statut = await ensureProfile(user);
      // Mise à jour en direct quand tu passes l'abonné en VIP
      stopUser = F.onSnapshot(F.doc(db, "users", user.uid), s => { if (s.exists()) applyStatut(s.data().statut, s.data()); });
    } catch (e) { console.error(e); applyStatut(statut); }
    if (!stopUser) applyStatut(statut);
  });

  let current = null;
  let stopPrem = null, premTimer = null;
  function applyStatut(statut, data) {
    data = data || {};
    const until = data.premiumUntil && data.premiumUntil.toDate ? data.premiumUntil.toDate() : null;
    const prem = statut === "PREMIUM" && until && until > new Date();
    const vip = statut === "VIP" || statut === "PREMIUM";
    const fin = prem ? until.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "";
    $("#pStatut").textContent = prem ? "💎 PREMIUM · jusqu’au " + fin : vip ? "VIP" : "STANDARD";
    $("#pStatut").classList.toggle("vip", vip);
    $("#pUpgrade").hidden = vip;
    $("#pIsVip").hidden = !vip;
    $("#acctHint").hidden = true;
    if (window.JP_premState) window.JP_premState(prem ? fin : "");
    if (window.JP_vipGate) window.JP_vipGate(vip);
    clearTimeout(premTimer);
    if (prem) premTimer = setTimeout(() => applyStatut(statut, data), Math.min(until - new Date() + 1000, 2147483000));
    const key = statut + "|" + (prem ? "P" : "");
    if (current === key) return;
    current = key;
    if (stopVip) { stopVip(); stopVip = null; }
    if (stopPrem) { stopPrem(); stopPrem = null; }
    if (vip) {
      let vipList = [], premList = [], apercu = [];
      const draw = () => { renderVip("vip", premList.map(p => ({ ...p, premium: true })).concat(vipList), prem ? [] : apercu); if (window.JP_couponLists) window.JP_couponLists(vipList, premList, prem, apercu); };
      stopVip = F.onSnapshot(F.query(F.collection(db, "vip_pronos"), F.orderBy("date")),
        s => { vipList = s.docs.map(d => d.data()); draw(); }, () => draw());
      if (prem) stopPrem = F.onSnapshot(F.query(F.collection(db, "premium_pronos"), F.orderBy("date")),
        s => { premList = s.docs.map(d => d.data()); draw(); }, () => draw());
      else stopPrem = F.onSnapshot(F.collection(db, "premium_apercu"),
        s => { apercu = s.docs.map(d => d.data()).sort((a, b) => String(a.date).localeCompare(String(b.date))); draw(); }, () => draw());
    } else { renderVip("standard"); if (window.JP_couponLists) window.JP_couponLists([], [], false); }
  }

  // --- Pronos VIP dans l'onglet Pronos ---
  function renderVip(state, list, locked) {
    const box = $("#vipPronos"); box.hidden = false;
    if (state === "out") {
      current = null;
      box.innerHTML = '<div class="vp"><h4>🔒 Pronos VIP du jour</h4><p class="hint" style="margin-top:0">Connecte-toi à ton compte VIP pour les voir.</p><a href="#profil" data-tab="profil" class="btn">Se connecter</a></div>';
      return;
    }
    if (state === "standard") {
      box.innerHTML = '<div class="vp"><h4>🔒 Pronos VIP du jour</h4><p class="hint" style="margin-top:0">Ton compte est STANDARD. Rejoins le VIP gratuit ou le 💎 Premium pour débloquer les coupons.</p><a href="#vip" data-tab="vip" class="btn">Passer VIP</a></div>';
      return;
    }
    const now = Date.now() - 3 * 3600e3;
    const rows = (list || []).filter(p => !p.date || new Date(p.date).getTime() > now);
    const fmt = d => { const x = new Date(d); return isNaN(x) ? "" : x.toLocaleString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); };
    const lk = (locked || []).filter(p => !p.date || new Date(p.date).getTime() > now);
    const lockHtml = lk.map(p => '<div class="vp lockc"><div class="top"><span>💎 PREMIUM · ' + esc(p.ligue || "Coupon") + '</span><span>' + esc(fmt(p.date)) + '</span></div>'
      + '<h4>' + ((p.dom || p.ext) ? esc(p.dom) + ' vs ' + esc(p.ext) : 'Coupon Premium') + '</h4>'
      + '<div class="lockbox">' + (p.image ? '<img src="' + esc(p.image) + '" alt="" class="lockimg">' : '<div class="lockblur">██████ ███ ████<br>████ ██████ ██</div>') + '<span>🔒 Réservé aux membres Premium</span></div>'
      + (p.cote ? '<div class="pr"><b>Prono caché</b><b>Cote ' + esc(p.cote) + '</b></div>' : '')
      + '<button type="button" class="btn lockbtn" data-tab="vip" data-vm-go="prem">💎 Passe en Premium pour ce coupon</button></div>').join("");
    box.innerHTML = '<div class="hdr-vip">★ Mes pronos VIP</div>' + (rows.length ? rows.map(p => {
      const has = p.dom || p.ext;
      return '<div class="vp"' + (p.premium ? ' style="border-color:#7c5cff;background:#faf8ff"' : '') + '><div class="top"><span>' + (p.premium ? '💎 PREMIUM · ' : '') + esc(p.ligue || "VIP") + '</span><span>' + esc(fmt(p.date)) + '</span></div>'
      + (has ? '<h4>' + esc(p.dom) + ' vs ' + esc(p.ext) + '</h4>' : '')
      + (p.image ? '<img src="' + esc(p.image) + '" alt="Coupon VIP" class="vp-img" style="width:100%;border-radius:10px;margin:6px 0;cursor:zoom-in">' : '')
      + (p.prono ? '<div class="pr"><b>' + esc(p.prono) + '</b><b>' + esc(p.cote ? "Cote " + p.cote : "") + '</b></div>' : '')
      + (p.prono && p.confiance ? '<p class="meta">Confiance : <b>' + esc(p.confiance) + '</b></p>' : '')
      + (p.analyse ? '<p class="meta">' + esc(p.analyse) + '</p>' : '') + '</div>';
    }).join("")
      : '<div class="empty">Les pronos VIP du jour arrivent bientôt.</div>') + lockHtml;
    box.querySelectorAll(".vp-img").forEach(im => im.onclick = () => { const lb = $("#lb"); if (lb) { $("#lbImg").src = im.src; ["#lbImg2","#lbCap1","#lbCap2"].forEach(x => { const e = $(x); if (e) e.hidden = true; }); lb.classList.add("on"); } });
  }
}
