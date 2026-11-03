/* Briauna Renee — UGC portfolio. Small, no libraries.
   You shouldn't need to edit this file. Videos and photos are set in index.html. */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- illustrated placeholders (show until a real video loads) ---------- */
  var scenes = {
    jar: '<defs><linearGradient id="gj" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe3d3"/><stop offset="1" stop-color="#d9c2a6"/></linearGradient></defs><rect width="90" height="160" fill="url(#gj)"/><path d="M0 110 Q45 95 90 112 L90 160 L0 160Z" fill="#f6efe5"/><rect x="25" y="78" width="40" height="34" rx="6" fill="#d99b82"/><rect x="23" y="70" width="44" height="12" rx="4" fill="#c98568"/>',
    bottle: '<defs><linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e7e2da"/><stop offset="1" stop-color="#cfc6b9"/></linearGradient></defs><rect width="90" height="160" fill="url(#gb)"/><rect x="36" y="45" width="18" height="10" fill="#f2f2f2"/><rect x="40" y="34" width="4" height="12" fill="#f2f2f2"/><rect x="31" y="54" width="28" height="70" rx="6" fill="#9DAE95"/><rect x="35" y="72" width="20" height="30" rx="2" fill="#FBF8F3" opacity=".7"/><rect x="0" y="122" width="90" height="38" fill="#efe9e0"/>',
    bag: '<defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3dccf"/><stop offset="1" stop-color="#c7bba8"/></linearGradient></defs><rect width="90" height="160" fill="url(#gg)"/><path d="M28 70 Q45 60 62 70 L66 118 Q45 126 24 118Z" fill="#efe6d6"/><path d="M30 84 Q45 78 60 86 M28 98 Q45 92 63 100" stroke="#3a2b20" stroke-width="2.4" fill="none"/><path d="M40 64 L36 50 M50 64 L54 50" stroke="#b9a88d" stroke-width="1.5"/>',
    hair: '<defs><linearGradient id="gh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8c2a6"/><stop offset="1" stop-color="#9c7a5e"/></linearGradient></defs><rect width="90" height="160" fill="url(#gh)"/><path d="M24 70 Q22 40 45 38 Q70 40 66 72 Q70 105 60 118 L30 118 Q20 104 24 70Z" fill="#3b2418"/><ellipse cx="45" cy="72" rx="13" ry="17" fill="#9a6748"/><path d="M20 160 Q24 118 45 116 Q66 118 70 160Z" fill="#cfd9c8"/>',
    spf: '<defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0e2cf"/><stop offset="1" stop-color="#d6b48f"/></linearGradient></defs><rect width="90" height="160" fill="url(#gs)"/><rect x="34" y="40" width="22" height="78" rx="9" fill="#e9c27a"/><rect x="38" y="30" width="14" height="12" rx="3" fill="#4E3828"/><circle cx="68" cy="128" r="10" fill="#f8f2ea" opacity=".9"/>',
    app: '<rect width="90" height="160" fill="#e9e0d3"/><rect x="18" y="26" width="54" height="108" rx="9" fill="#2e241c"/><rect x="21" y="32" width="48" height="96" rx="5" fill="#fbf8f3"/><rect x="25" y="38" width="28" height="4" rx="2" fill="#4E3828"/><rect x="25" y="48" width="40" height="12" rx="3" fill="#E3D3BC"/><rect x="25" y="64" width="40" height="12" rx="3" fill="#9DAE95"/><rect x="25" y="80" width="40" height="12" rx="3" fill="#B9ACCB"/><rect x="25" y="96" width="40" height="12" rx="3" fill="#E3D3BC"/>'
  };

  var frames = Array.prototype.slice.call(document.querySelectorAll('.v'));
  var videos = [];

  frames.forEach(function (v, i) {
    var art = scenes[v.getAttribute('data-scene')] || scenes.jar;
    // make gradient ids unique per frame so Safari doesn't mix them up
    art = art.replace(/id="(g\w)"/g, 'id="$1' + i + '"').replace(/url\(#(g\w)\)/g, 'url(#$1' + i + ')');
    v.insertAdjacentHTML('afterbegin', '<svg class="scene" viewBox="0 0 90 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + art + '</svg>');
    v.insertAdjacentHTML('beforeend', '<span class="ph-badge" aria-hidden="true">Placeholder</span>');
  });

  function titleFor(v) {
    if (v.getAttribute('data-title')) return v.getAttribute('data-title');
    var item = v.closest('.item');
    var h = item && item.querySelector('h3');
    return h ? h.textContent.trim() : 'sample video';
  }

  function setState(v, vid, btn) {
    var sounding = !vid.paused && !vid.muted;
    v.classList.toggle('sound', sounding);
    btn.setAttribute('aria-label', (sounding ? 'Pause: ' : 'Play with sound: ') + titleFor(v));
  }

  function loadVideo(v) {
    if (v._loaded) return;
    v._loaded = true;
    var src = v.getAttribute('data-video');
    if (!src) return;

    var vid = document.createElement('video');
    vid.muted = true; vid.defaultMuted = true; vid.loop = true; vid.playsInline = true;
    vid.setAttribute('muted', ''); vid.setAttribute('playsinline', ''); vid.setAttribute('webkit-playsinline', '');
    vid.preload = reduceMotion ? 'metadata' : 'auto';
    vid.setAttribute('aria-label', titleFor(v));
    if (v.getAttribute('data-poster')) vid.poster = v.getAttribute('data-poster');

    vid.addEventListener('error', function () { vid.remove(); }, { once: true });
    vid.addEventListener('loadeddata', function () {
      if (v.classList.contains('has-video')) return;
      v.classList.add('has-video');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'play';
      btn.innerHTML = '<span aria-hidden="true"></span>';
      v.appendChild(btn);
      btn.addEventListener('click', function () {
        if (vid.paused || vid.muted) {
          videos.forEach(function (o) { if (o.vid !== vid && !o.vid.muted) { o.vid.muted = true; setState(o.v, o.vid, o.btn); } });
          vid.muted = false;
          v._userPaused = false;
          var p = vid.play(); if (p && p.catch) p.catch(function () {});
        } else {
          vid.pause();
          v._userPaused = true;
        }
        setState(v, vid, btn);
      });
      vid.addEventListener('pause', function () { setState(v, vid, btn); });
      vid.addEventListener('play', function () { setState(v, vid, btn); });
      videos.push({ v: v, vid: vid, btn: btn });
      v._vid = vid;
      setState(v, vid, btn);
      if (!reduceMotion && v._inView) autoplay(v);
    });

    // "#t=0.1" makes iPhone Safari show the first frame when nothing autoplays
    vid.src = reduceMotion ? src + '#t=0.1' : src;
    v.querySelector('svg.scene').insertAdjacentElement('afterend', vid);
  }

  function autoplay(v) {
    if (reduceMotion || !v._vid || v._userPaused) return;
    var p = v._vid.play(); if (p && p.catch) p.catch(function () {});
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        v._inView = e.isIntersecting;
        if (e.isIntersecting) { loadVideo(v); autoplay(v); }
        else if (v._vid && !v._vid.paused) { v._vid.pause(); }
      });
    }, { rootMargin: '200px 0px' });
    frames.forEach(function (v) { io.observe(v); });
  } else {
    frames.forEach(function (v) { v._inView = true; loadVideo(v); });
  }

  /* ---------- work filters ---------- */
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.work .item'));
  var status = document.getElementById('filter-status');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var shown = 0;
      items.forEach(function (it) {
        var cats = (it.getAttribute('data-category') || '').split(/\s+/);
        var show = f === 'all' || cats.indexOf(f) !== -1;
        it.hidden = !show;
        if (show) shown++;
      });
      if (status) status.textContent = shown + (shown === 1 ? ' video' : ' videos') + ' shown';
    });
  });

  /* ---------- copy email ---------- */
  var copyBtn = document.getElementById('copy');
  var emailEl = document.getElementById('email');
  if (copyBtn && emailEl) {
    copyBtn.addEventListener('click', function () {
      var email = emailEl.textContent.trim();
      function done(msg) { copyBtn.textContent = msg; setTimeout(function () { copyBtn.textContent = 'Copy email'; }, 1800); }
      function fallback() {
        var r = document.createRange(); r.selectNodeContents(emailEl);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
        done(ok ? 'Copied ✓' : 'Selected, now copy');
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () { done('Copied ✓'); }, fallback);
      } else { fallback(); }
    });
  }

  /* ---------- footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
