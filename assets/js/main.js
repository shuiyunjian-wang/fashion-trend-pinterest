/* =========================================================
   Fashion Trend Studio — main.js
   2026 Women's Fashion Trends
   ---------------------------------------------------------
   ALL imagery is defined here as REMOTE, REPLACEABLE URLs.
   To swap any picture, edit one line in SITE_IMAGES below.
   No local image files are used anywhere in this project.
   ========================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------------
     1. IMAGE SOURCES — edit these URLs to change the site
     ------------------------------------------------------- */
  var SITE_IMAGES = {
    hero:      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    french:    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
    y2k:       'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    romantic:  'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80',
    vacation:  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
    street:    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80',
    soft:      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    pin1:      'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?auto=format&fit=crop&w=800&q=80',
    pin2:      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80',
    pin3:      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
    // pin4 split into per-page keys to avoid a single image serving 7 different products.
    'pin4-fm':  'https://shuiyunjian-wang.github.io/fashion-trend-pinterest/assets/img/pin4-fm.jpg',
    'pin4-y2k': 'https://shuiyunjian-wang.github.io/fashion-trend-pinterest/assets/img/pin4-y2k.jpg',
    'pin4-sf':  'https://shuiyunjian-wang.github.io/fashion-trend-pinterest/assets/img/pin4-sf.jpg',
    'pin4-rd':  'https://shuiyunjian-wang.github.io/fashion-trend-pinterest/assets/img/pin4-rd.jpg',
    'pin4-ss':  'https://shuiyunjian-wang.github.io/fashion-trend-pinterest/assets/img/pin4-ss.jpg',
    'pin4-vs':  'https://shuiyunjian-wang.github.io/fashion-trend-pinterest/assets/img/pin4-vs.jpg',
    'pin4-idx': 'https://shuiyunjian-wang.github.io/fashion-trend-pinterest/assets/img/pin4-idx.jpg',
    editorial: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80'
  };

  /* Secondary CDN used only if the primary URL fails to load. */
  var FALLBACK = function (key) {
    return 'https://picsum.photos/seed/fts-' + encodeURIComponent(key) + '/800/1000';
  };

  /* -------------------------------------------------------
     2. Apply image sources + graceful failure handling
     ------------------------------------------------------- */
  function mountImages() {
    var imgs = document.querySelectorAll('img[data-key]');

    Array.prototype.forEach.call(imgs, function (img) {
      var key = img.getAttribute('data-key');
      var frame = img.closest('.frame');
      var url = SITE_IMAGES[key];

      if (!url) {
        if (frame) frame.classList.add('is-empty');
        return;
      }

      img.addEventListener('load', function () {
        if (frame) frame.classList.remove('is-empty');
      });

      img.addEventListener('error', function () {
        if (img.dataset.retried === '1') {
          /* both sources failed — keep an elegant placeholder */
          if (frame) frame.classList.add('is-empty');
          img.style.visibility = 'hidden';
          return;
        }
        img.dataset.retried = '1';
        img.src = FALLBACK(key);
      });

      if (frame) frame.classList.add('is-empty');
      img.src = url;
    });
  }

  /* -------------------------------------------------------
     3. Mobile navigation
     ------------------------------------------------------- */
  function mountNav() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    var nav = document.getElementById('nav');
    if (!toggle || !links) return;

    function close() {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    Array.prototype.forEach.call(links.querySelectorAll('a'), function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    if (nav) {
      var onScroll = function () {
        nav.classList.toggle('is-stuck', window.scrollY > 12);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* -------------------------------------------------------
     4. Scroll reveal
     ------------------------------------------------------- */
  function mountReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------
     5. Pinterest "Save" buttons
     ------------------------------------------------------- */
  function mountPinButtons() {
    var pins = document.querySelectorAll('.js-pin');

    Array.prototype.forEach.call(pins, function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var key = el.getAttribute('data-pin-key') || 'hero';
        var desc = el.getAttribute('data-pin-desc') || document.title;
        var media = SITE_IMAGES[key] || SITE_IMAGES.hero;

        var url = 'https://www.pinterest.com/pin/create/button/'
          + '?url=' + encodeURIComponent(window.location.href)
          + '&media=' + encodeURIComponent(media)
          + '&description=' + encodeURIComponent(desc);

        window.open(url, 'pinterest', 'width=760,height=620,noopener');
      });
    });
  }

  /* -------------------------------------------------------
     6. Trend filter (trends.html)
     ------------------------------------------------------- */
  function mountFilter() {
    var chips = document.getElementById('chips');
    var grid = document.getElementById('trendGrid');
    var empty = document.getElementById('emptyState');
    if (!chips || !grid) return;

    var cards = grid.querySelectorAll('.tcard');

    chips.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;

      Array.prototype.forEach.call(chips.querySelectorAll('.chip'), function (c) {
        c.classList.toggle('is-active', c === btn);
      });

      var f = btn.getAttribute('data-filter');
      var shown = 0;

      Array.prototype.forEach.call(cards, function (card) {
        var match = (f === 'all') || (card.getAttribute('data-cat') === f);
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });

      if (empty) empty.hidden = shown !== 0;
    });
  }

  /* -------------------------------------------------------
     7. Misc
     ------------------------------------------------------- */
  function mountMisc() {
    Array.prototype.forEach.call(document.querySelectorAll('#year'), function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* -------------------------------------------------------
     Boot
     ------------------------------------------------------- */
  function init() {
    mountImages();
    mountNav();
    mountReveal();
    mountPinButtons();
    mountFilter();
    mountMisc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
