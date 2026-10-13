/* JEFF PRO — Comptes abonnés (connexion email + mot de passe, statut STANDARD / VIP)
   Rien à modifier ici : la configuration est dans firebase-config.js */
const V = "10.12.2";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const cfg = typeof FIREBASE_CONFIG !== "undefined" ? FIREBASE_CONFIG : null;

if (cfg && cfg.apiKey) start().catch(e => console.error("Comptes :", e));

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

  // --- Connexion / inscription ---
  let mode = "register";
  const setMode = m => {
    mode = m;
    const reg = m === "register";
    $("#aPass2Wrap").hidden = !reg;
    $("#aForgot").hidden = reg;
    $("#aTitle").textContent = reg ? "Créer mon compte" : "Se connecter";
    $("#aSub").textContent = reg ? "Inscris-toi pour accéder à ton espace et passer VIP." : "Content de te revoir !";
    $("#aSubmit").textContent = reg ? "S'INSCRIRE" : "SE CONNECTER";
    $("#aSwitchTxt").textContent = reg ? "Déjà un compte ?" : "Pas encore de compte ?";
    $("#aSwitch").textContent = reg ? "Se connecter" : "S'inscrire";
    $("#aPass").autocomplete = reg ? "new-password" : "current-password";
    msg("");
  };
  $("#aSwitch").onclick = () => setMode(mode === "register" ? "login" : "register");
  const msg = (t, ok) => { const m = $("#aMsg"); m.textContent = t; m.className = "hint " + (t ? (ok ? "ok" : "err") : ""); };

  setMode("register");

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
    $("#authBox").hidden = !!user;
    $("#profileBox").hidden = !user;
    if (!user) { renderVip("out"); return; }

    $("#pEmail").textContent = user.email;
    let statut = "STANDARD";
    try {
      statut = await ensureProfile(user);
      // Mise à jour en direct quand tu passes l'abonné en VIP
      stopUser = F.onSnapshot(F.doc(db, "users", user.uid), s => { if (s.exists()) applyStatut(s.data().statut); });
    } catch (e) { console.error(e); }
    applyStatut(statut);
  });

  let current = null;
  function applyStatut(statut) {
    const vip = statut === "VIP";
    $("#pStatut").textContent = vip ? "VIP" : "STANDARD";
    $("#pStatut").classList.toggle("vip", vip);
    $("#pUpgrade").hidden = vip;
    $("#pIsVip").hidden = !vip;
    $("#acctHint").hidden = true;
    if (current === statut) return;
    current = statut;
    if (stopVip) { stopVip(); stopVip = null; }
    if (vip) {
      stopVip = F.onSnapshot(F.query(F.collection(db, "vip_pronos"), F.orderBy("date")),
        s => renderVip("vip", s.docs.map(d => d.data())),
        () => renderVip("vip", []));
    } else renderVip("standard");
  }

  // --- Pronos VIP dans l'onglet Pronos ---
  function renderVip(state, list) {
    const box = $("#vipPronos"); box.hidden = false;
    if (state === "out") {
      current = null;
      box.innerHTML = '<div class="vp"><h4>🔒 Pronos VIP du jour</h4><p class="hint" style="margin-top:0">Connecte-toi à ton compte VIP pour les voir.</p><a href="#profil" data-tab="profil" class="btn">Se connecter</a></div>';
      return;
    }
    if (state === "standard") {
      box.innerHTML = '<div class="vp"><h4>🔒 Pronos VIP du jour</h4><p class="hint" style="margin-top:0">Ton compte est STANDARD. Passe VIP pour débloquer mes pronos premium.</p><a href="#vip" data-tab="vip" class="btn">Passer VIP</a></div>';
      return;
    }
    const now = Date.now() - 3 * 3600e3;
    const rows = (list || []).filter(p => !p.date || new Date(p.date).getTime() > now);
    const fmt = d => { const x = new Date(d); return isNaN(x) ? "" : x.toLocaleString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); };
    box.innerHTML = '<div class="hdr-vip">★ Mes pronos VIP</div>' + (rows.length ? rows.map(p => {
      const has = p.dom || p.ext;
      return '<div class="vp"><div class="top"><span>' + esc(p.ligue || "VIP") + '</span><span>' + esc(fmt(p.date)) + '</span></div>'
      + (has ? '<h4>' + esc(p.dom) + ' vs ' + esc(p.ext) + '</h4>' : '')
      + (p.image ? '<img src="' + esc(p.image) + '" alt="Coupon VIP" class="vp-img" style="width:100%;border-radius:10px;margin:6px 0;cursor:zoom-in">' : '')
      + (p.prono ? '<div class="pr"><b>' + esc(p.prono) + '</b><b>' + esc(p.cote ? "Cote " + p.cote : "") + '</b></div>' : '')
      + (p.prono && p.confiance ? '<p class="meta">Confiance : <b>' + esc(p.confiance) + '</b></p>' : '')
      + (p.analyse ? '<p class="meta">' + esc(p.analyse) + '</p>' : '') + '</div>';
    }).join("")
      : '<div class="empty">Les pronos VIP du jour arrivent bientôt.</div>');
    box.querySelectorAll(".vp-img").forEach(im => im.onclick = () => { const lb = $("#lb"); if (lb) { $("#lbImg").src = im.src; lb.classList.add("on"); } });
  }
}
