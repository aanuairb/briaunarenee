/* Briauna Renee — UGC portfolio. Small, no libraries.
   You shouldn't need to edit this file. Videos and photos are set in index.html. */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var frames = Array.prototype.slice.call(document.querySelectorAll('.v'));
  var all = []; // every frame that has a working video

  function titleFor(v) {
    if (v.getAttribute('data-title')) return v.getAttribute('data-title');
    var slot = v.closest('.slot');
    var h = slot && slot.querySelector('h3');
    return h ? h.textContent.trim() : 'sample video';
  }

  function setState(v) {
    var vid = v._vid, btn = v._btn;
    if (!vid || !btn) return;
    var sounding = !vid.paused && !vid.muted;
    v.classList.toggle('sound', sounding);
    btn.setAttribute('aria-label', (sounding ? 'Pause: ' : 'Play with sound: ') + titleFor(v));
  }

  function addPoster(v) {
    var p = v.getAttribute('data-poster');
    var old = v.querySelector('img.poster');
    if (old) old.remove();
    if (!p) return;
    var img = document.createElement('img');
    img.className = 'poster'; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
    img.onerror = function () { img.remove(); };
    img.src = p;
    v.insertBefore(img, v.firstChild);
  }

  function unload(v) {
    if (v._vid) { v._vid.pause(); v._vid.remove(); }
    if (v._btn) v._btn.remove();
    all = all.filter(function (f) { return f !== v; });
    v._vid = v._btn = null; v._loaded = false; v._userPaused = false;
    v.classList.remove('has-video', 'sound');
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

    vid.addEventListener('error', function () { vid.remove(); }, { once: true });
    vid.addEventListener('loadeddata', function () {
      if (v._vid !== vid) return;
      v.classList.add('has-video');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'play';
      btn.innerHTML = '<span aria-hidden="true"></span>';
      v.appendChild(btn);
      v._btn = btn;
      btn.addEventListener('click', function () {
        if (vid.paused || vid.muted) {
          all.forEach(function (o) { if (o !== v && o._vid && !o._vid.muted) { o._vid.muted = true; setState(o); } });
          vid.muted = false;
          v._userPaused = false;
          var p = vid.play(); if (p && p.catch) p.catch(function () {});
        } else {
          vid.pause();
          v._userPaused = true;
        }
        setState(v);
      });
      vid.addEventListener('pause', function () { setState(v); });
      vid.addEventListener('play', function () { setState(v); });
      all.push(v);
      setState(v);
      if (v._inView) autoplay(v);
    });

    v._vid = vid;
    // "#t=0.1" makes iPhone Safari show a frame when nothing autoplays
    vid.src = reduceMotion ? src + '#t=0.1' : src;
    var poster = v.querySelector('img.poster');
    if (poster) poster.insertAdjacentElement('afterend', vid); else v.insertBefore(vid, v.firstChild);
  }

  function autoplay(v) {
    if (reduceMotion || !v._vid || v._userPaused || !v.classList.contains('has-video')) return;
    var p = v._vid.play(); if (p && p.catch) p.catch(function () {});
  }

  frames.forEach(addPoster);

  var io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        v._inView = e.isIntersecting;
        if (e.isIntersecting) { loadVideo(v); autoplay(v); }
        else if (v._vid && !v._vid.paused) { v._vid.pause(); }
      });
    }, { rootMargin: '250px 0px' });
    frames.forEach(function (v) { io.observe(v); });
  } else {
    frames.forEach(function (v) { v._inView = true; loadVideo(v); });
  }

  /* ---------- one product, three hooks ---------- */
  var hookFrame = document.getElementById('hook-frame');
  var hookNum = document.getElementById('hook-num');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.hook-tabs [role="tab"]'));
  function selectTab(t, focus) {
    tabs.forEach(function (x) { x.setAttribute('aria-selected', String(x === t)); x.tabIndex = x === t ? 0 : -1; });
    if (focus) t.focus();
    if (!hookFrame) return;
    var i = tabs.indexOf(t) + 1;
    if (hookNum) hookNum.textContent = i;
    hookFrame.setAttribute('data-title', 'Hook ' + i);
    unload(hookFrame);
    hookFrame.setAttribute('data-video', t.getAttribute('data-video') || '');
    hookFrame.setAttribute('data-poster', t.getAttribute('data-poster') || '');
    addPoster(hookFrame);
    loadVideo(hookFrame);
  }
  tabs.forEach(function (t, i) {
    t.tabIndex = i === 0 ? 0 : -1;
    t.addEventListener('click', function () { selectTab(t, false); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); selectTab(n, true); }
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
