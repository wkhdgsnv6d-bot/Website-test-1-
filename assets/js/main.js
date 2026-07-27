/* ==========================================================================
   Acacia Kitchens — site scripts
   No dependencies. Every module fails quietly if its markup isn't on the page.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     FORM ENDPOINT
     Leave as an empty string and the forms will validate, then send the
     visitor to thank-you.html without transmitting anything (useful while the
     site is in review). Paste a form-handling URL here — Formspree, Netlify
     Forms, FormSubmit or your own script — and submissions will be posted to
     it. See README.md → "Connecting the enquiry forms".
     -------------------------------------------------------------------- */
  var FORM_ENDPOINT = "";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* --- Sticky header ---------------------------------------------------- */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;

    /* While the header floats over a dark hero it stays transparent with light
       text. It only switches to the solid white bar once the hero has been
       scrolled past — otherwise a white bar would sit over a dark image. */
    var hero = $(".hero, .page-hero");
    var threshold = 10;

    function measure() {
      threshold = hero ? Math.max(10, hero.offsetHeight - header.offsetHeight - 24) : 10;
    }

    function update() {
      header.classList.toggle("is-stuck", window.scrollY > threshold);
    }

    measure();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", function () { measure(); update(); });
    window.addEventListener("load", function () { measure(); update(); });
  }

  /* --- Mobile navigation ------------------------------------------------ */
  function initMobileNav() {
    var toggle = $(".nav-toggle");
    var drawer = $("#mobile-nav");
    if (!toggle || !drawer) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      drawer.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    $$("a", drawer).forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && drawer.classList.contains("is-open")) setOpen(false);
    });
  }

  /* --- Scroll reveal ---------------------------------------------------- */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var pending = items.slice();

    function reveal(el) {
      el.classList.add("is-visible");
      observer.unobserve(el);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) {
      // Children of a [data-reveal-group] cascade in one after another.
      var group = el.closest("[data-reveal-group]");
      if (group) {
        var siblings = $$("[data-reveal]", group);
        var index = siblings.indexOf(el);
        if (index > -1) el.style.setProperty("--reveal-delay", Math.min(index, 6) * 90 + "ms");
      }
      observer.observe(el);
    });

    /* Safety net: a fast scroll (or a fling on a phone) can carry an element
       right past the viewport between animation frames, and the observer then
       never fires for it again — leaving that content invisible for good.
       This sweep reveals anything the page has already scrolled to. */
    var ticking = false;
    function sweep() {
      ticking = false;
      var viewportBottom = window.innerHeight;
      pending = pending.filter(function (el) {
        if (el.classList.contains("is-visible")) return false;
        if (el.getBoundingClientRect().top < viewportBottom) { reveal(el); return false; }
        return true;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sweep);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Animated counters ------------------------------------------------ */
  function initCounters() {
    var counters = $$("[data-count-to]");
    if (!counters.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      counters.forEach(function (el) { el.textContent = el.dataset.countTo + (el.dataset.countSuffix || ""); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        var target = parseFloat(el.dataset.countTo);
        var suffix = el.dataset.countSuffix || "";
        var start = performance.now();
        var duration = 1400;
        (function step(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        })(start);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* --- Accordions ------------------------------------------------------- */
  function initAccordions() {
    $$(".accordion__trigger").forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;

      trigger.addEventListener("click", function () {
        var isOpen = trigger.getAttribute("aria-expanded") === "true";
        var accordion = trigger.closest(".accordion");

        if (accordion) {
          $$(".accordion__trigger", accordion).forEach(function (other) {
            if (other === trigger) return;
            var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
            other.setAttribute("aria-expanded", "false");
            if (otherPanel) otherPanel.style.height = "0px";
          });
        }

        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.style.height = isOpen ? "0px" : panel.scrollHeight + "px";
      });
    });

    window.addEventListener("resize", function () {
      $$('.accordion__trigger[aria-expanded="true"]').forEach(function (trigger) {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        if (panel) panel.style.height = panel.scrollHeight + "px";
      });
    });
  }

  /* --- Horizontal sliders ----------------------------------------------- */
  function initSliders() {
    $$("[data-slider]").forEach(function (slider) {
      var track = $(".slider__track", slider);
      var prev = $("[data-slider-prev]", slider);
      var next = $("[data-slider-next]", slider);
      if (!track) return;

      function step() {
        var first = track.firstElementChild;
        return first ? first.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
      }
      if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
      if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    });
  }

  /* --- Project filtering ------------------------------------------------ */
  function initFilters() {
    var bar = $("[data-filter-bar]");
    if (!bar) return;
    var cards = $$("[data-category]");
    var countEl = $("[data-filter-count]");

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      var filter = btn.dataset.filter;

      $$(".filter-btn", bar).forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      var shown = 0;
      cards.forEach(function (card) {
        var match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !match);
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown;
    });
  }

  /* --- Gallery lightbox ------------------------------------------------- */
  function initLightbox() {
    var triggers = $$("[data-lightbox]");
    if (!triggers.length) return;

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Project image viewer");
    box.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close image viewer">&#10005;</button>' +
      '<div><img alt="" /><p class="lightbox__caption"></p></div>';
    document.body.appendChild(box);

    var img = $("img", box);
    var caption = $(".lightbox__caption", box);
    var closeBtn = $(".lightbox__close", box);
    var lastFocus = null;

    function open(trigger) {
      var source = $("img", trigger) || trigger;
      lastFocus = trigger;
      img.src = source.getAttribute("src");
      img.alt = source.getAttribute("alt") || "";
      caption.textContent = source.getAttribute("alt") || "";
      box.classList.add("is-open");
      document.body.classList.add("is-locked");
      closeBtn.focus();
    }

    function close() {
      box.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      if (lastFocus) lastFocus.focus();
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () { open(trigger); });
    });
    closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("is-open")) close();
    });
  }

  /* --- Form validation & submission ------------------------------------- */
  function initForms() {
    var forms = $$("[data-validate]");
    if (!forms.length) return;

    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // Accepts Australian landline and mobile formats, with or without spacing.
    var PHONE = /^(\+?61|0)[\s-]?[2-9](?:[\s-]?\d){8}$/;
    var MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

    function fieldWrap(input) { return input.closest(".field") || input.closest(".checkbox"); }

    function setError(input, message) {
      var wrap = fieldWrap(input);
      if (!wrap) return;
      wrap.classList.add("has-error");
      input.setAttribute("aria-invalid", "true");
      var msg = $(".error-msg", wrap);
      if (msg) msg.textContent = message;
    }

    function clearError(input) {
      var wrap = fieldWrap(input);
      if (!wrap) return;
      wrap.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
    }

    function validateField(input) {
      var value = (input.value || "").trim();
      var type = input.type;

      if (type === "checkbox") {
        if (input.required && !input.checked) {
          setError(input, "Please tick this box so we can respond to your enquiry.");
          return false;
        }
        clearError(input);
        return true;
      }

      if (type === "file") {
        var oversized = Array.prototype.filter.call(input.files || [], function (f) {
          return f.size > MAX_UPLOAD_BYTES;
        });
        if (oversized.length) {
          setError(input, "Each file needs to be under 10 MB. Please compress or email large files instead.");
          return false;
        }
        clearError(input);
        return true;
      }

      if (input.required && !value) {
        setError(input, "This field is required.");
        return false;
      }
      if (value && type === "email" && !EMAIL.test(value)) {
        setError(input, "Please enter a valid email address, e.g. name@example.com.");
        return false;
      }
      if (value && type === "tel" && !PHONE.test(value.replace(/[()]/g, ""))) {
        setError(input, "Please enter a valid Australian phone number, e.g. 07 4775 6421.");
        return false;
      }
      if (value && input.minLength > 0 && value.length < input.minLength) {
        setError(input, "Please give us a little more detail (" + input.minLength + " characters or more).");
        return false;
      }
      clearError(input);
      return true;
    }

    forms.forEach(function (form) {
      var status = $(".form-status", form);
      var submit = $('[type="submit"]', form);

      $$("input, select, textarea", form).forEach(function (input) {
        input.addEventListener("blur", function () { validateField(input); });
        input.addEventListener("input", function () {
          if (fieldWrap(input) && fieldWrap(input).classList.contains("has-error")) validateField(input);
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fields = $$("input, select, textarea", form);
        var firstBad = null;

        fields.forEach(function (input) {
          if (!validateField(input) && !firstBad) firstBad = input;
        });

        if (firstBad) {
          if (status) {
            status.className = "form-status is-error";
            status.textContent = "Please check the highlighted fields and try again.";
          }
          firstBad.focus();
          firstBad.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
          return;
        }

        if (status) {
          status.className = "form-status";
          status.textContent = "";
        }

        var redirect = form.dataset.redirect || "thank-you.html";

        if (!FORM_ENDPOINT) {
          // No handler connected yet — validate only, then show the thank you page.
          window.location.href = redirect;
          return;
        }

        if (submit) {
          submit.disabled = true;
          submit.dataset.label = submit.textContent;
          submit.textContent = "Sending…";
        }

        fetch(FORM_ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        })
          .then(function (res) {
            if (!res.ok) throw new Error("Request failed");
            window.location.href = redirect;
          })
          .catch(function () {
            if (submit) {
              submit.disabled = false;
              submit.textContent = submit.dataset.label || "Send enquiry";
            }
            if (status) {
              status.className = "form-status is-error";
              status.innerHTML =
                "Sorry, your enquiry could not be sent just now. Please call " +
                '<a href="tel:+61747756421">(07) 4775 6421</a> or email ' +
                '<a href="mailto:acaciakitchenstsv@gmail.com">acaciakitchenstsv@gmail.com</a>.';
            }
          });
      });
    });
  }

  /* --- Pre-fill the quote form from a service link ----------------------- */
  function initQuotePrefill() {
    var select = $("#project-type");
    if (!select) return;
    var wanted = new URLSearchParams(window.location.search).get("service");
    if (!wanted) return;
    wanted = wanted.toLowerCase();

    // Options carry a data-service list of the slugs used on the services page,
    // because the labels ("Outdoor Kitchen") and the slugs ("outdoor-kitchens")
    // deliberately don't match one to one.
    var match = Array.prototype.find.call(select.options, function (opt) {
      var slugs = (opt.dataset.service || "").split(/\s+/);
      return slugs.indexOf(wanted) > -1;
    });
    if (match) select.value = match.value;
  }

  /* --- Footer year ------------------------------------------------------ */
  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* --- Deferred map loading --------------------------------------------- */
  function initMap() {
    var frame = $("[data-map-src]");
    if (!frame) return;
    var load = function () {
      if (frame.dataset.loaded) return;
      frame.dataset.loaded = "true";
      frame.src = frame.dataset.mapSrc;
    };
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { load(); observer.disconnect(); }
      }, { rootMargin: "300px" });
      observer.observe(frame);
    } else {
      load();
    }
  }

  function init() {
    initHeader();
    initMobileNav();
    initReveal();
    initCounters();
    initAccordions();
    initSliders();
    initFilters();
    initLightbox();
    initForms();
    initQuotePrefill();
    initYear();
    initMap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
