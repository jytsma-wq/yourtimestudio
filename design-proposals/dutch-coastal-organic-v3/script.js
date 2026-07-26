(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  root.classList.add("motion-ready");

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");
  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!(menuButton instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) {
      return;
    }

    menuButton.setAttribute("aria-expanded", "false");
    navigation.dataset.open = "false";
    document.body.classList.remove("menu-open");

    if (restoreFocus) {
      menuButton.focus();
    }
  };

  if (menuButton instanceof HTMLButtonElement && navigation instanceof HTMLElement) {
    menuButton.addEventListener("click", () => {
      const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(willOpen));
      navigation.dataset.open = String(willOpen);
      document.body.classList.toggle("menu-open", willOpen);

      if (willOpen) {
        navigation.querySelector("a")?.focus();
      }
    });

    navigation.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu({ restoreFocus: true });
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        closeMenu();
      }
    });
  }

  const slides = [...document.querySelectorAll(".hero-showcase__slide")];
  const slideCount = document.querySelector(".hero-showcase__count");
  const slideStatus = document.querySelector(".hero-showcase__sector");
  let activeSlide = 0;
  let slideTimer;

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    if (slideCount) {
      slideCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(
        slides.length,
      ).padStart(2, "0")}`;
    }

    if (slideStatus) {
      slideStatus.textContent = slides[index]?.dataset.status ?? "";
      if (!reducedMotion.matches) {
        slideStatus.animate(
          [
            { opacity: 0, transform: "translateY(0.55rem)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 650, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
        );
      }
    }
  };

  const stopSlides = () => {
    window.clearInterval(slideTimer);
  };

  const startSlides = () => {
    stopSlides();
    if (reducedMotion.matches || slides.length < 2 || document.hidden) {
      return;
    }

    slideTimer = window.setInterval(() => {
      activeSlide = (activeSlide + 1) % slides.length;
      showSlide(activeSlide);
    }, 4300);
  };

  if (slides.length > 0) {
    showSlide(activeSlide);
    startSlides();
    document.addEventListener("visibilitychange", startSlides);
    reducedMotion.addEventListener("change", startSlides);
  }

  const getHashTarget = () => {
    const rawId = window.location.hash.slice(1);
    if (!rawId) {
      return null;
    }

    try {
      return document.getElementById(decodeURIComponent(rawId));
    } catch {
      return document.getElementById(rawId);
    }
  };

  const revealTarget = (target) => {
    if (!(target instanceof HTMLElement)) {
      return;
    }

    target.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
  };

  const initialHashTarget = getHashTarget();
  const revealItems = [...document.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    revealItems.forEach((item, index) => {
      item.classList.add("will-reveal");
      item.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      if (initialHashTarget?.contains(item)) {
        item.classList.add("is-visible");
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const previewSection = new URLSearchParams(window.location.search).get("preview");
  if (previewSection) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    document.getElementById(previewSection)?.scrollIntoView({ block: "start" });
  }

  if (initialHashTarget) {
    revealTarget(initialHashTarget);
    const settleDeepLink = () => {
      if (getHashTarget() !== initialHashTarget) {
        return;
      }

      window.requestAnimationFrame(() => {
        initialHashTarget.scrollIntoView({ block: "start", behavior: "auto" });
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(settleDeepLink);
    } else {
      window.addEventListener("load", settleDeepLink, { once: true });
    }
  }

  window.addEventListener("hashchange", () => revealTarget(getHashTarget()));

  const motionRegions = [...document.querySelectorAll("main > section")];
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const regionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-in-view", entry.isIntersecting);
        });
      },
      { rootMargin: "-12% 0px -12% 0px", threshold: 0.04 },
    );

    motionRegions.forEach((region) => regionObserver.observe(region));
  } else {
    motionRegions.forEach((region) => region.classList.add("is-in-view"));
  }

  const parallaxMedia = [
    ...document.querySelectorAll(
      ".project__media img, .sector-story__media img, .photography__image img",
    ),
  ];
  let frameRequested = false;

  const updateMotion = () => {
    frameRequested = false;

    if (reducedMotion.matches) {
      return;
    }

    parallaxMedia.forEach((image) => {
      const rect = image.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) {
        return;
      }

      const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
      const shift = Math.max(-20, Math.min(20, distance * -0.035));
      image.style.setProperty("--media-shift", `${shift}px`);
    });
  };

  const requestMotionUpdate = () => {
    if (!frameRequested) {
      frameRequested = true;
      window.requestAnimationFrame(updateMotion);
    }
  };

  window.addEventListener("scroll", requestMotionUpdate, { passive: true });
  window.addEventListener("resize", requestMotionUpdate);
  reducedMotion.addEventListener("change", requestMotionUpdate);
  requestMotionUpdate();

  const auditForm = document.querySelector(".audit-form");
  if (auditForm instanceof HTMLFormElement) {
    const websiteInput = auditForm.elements.namedItem("websiteUrl");
    const contactInput = auditForm.elements.namedItem("contact");
    const status = auditForm.querySelector(".audit-form__status");

    const setError = (input, message) => {
      if (!(input instanceof HTMLInputElement)) {
        return;
      }

      input.setAttribute("aria-invalid", String(Boolean(message)));
      const errorId = input.getAttribute("aria-describedby");
      const error = errorId ? document.getElementById(errorId) : null;
      if (error) {
        error.textContent = message;
      }
    };

    const isCompleteUrl = (value) => {
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    };

    const isContactDetail = (value) => {
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phone = /^\+?[\d\s().-]{7,}$/;
      return email.test(value) || phone.test(value);
    };

    auditForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const websiteValue =
        websiteInput instanceof HTMLInputElement ? websiteInput.value.trim() : "";
      const contactValue =
        contactInput instanceof HTMLInputElement ? contactInput.value.trim() : "";
      const websiteMessage = isCompleteUrl(websiteValue)
        ? ""
        : "Enter a complete website address starting with http:// or https://.";
      const contactMessage = isContactDetail(contactValue)
        ? ""
        : "Enter a valid email address or WhatsApp number.";

      setError(websiteInput, websiteMessage);
      setError(contactInput, contactMessage);

      const firstInvalid = auditForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid instanceof HTMLInputElement) {
        if (status) {
          status.textContent = "";
        }
        firstInvalid.focus();
        return;
      }

      if (status) {
        status.textContent =
          "Preview complete. Nothing was sent or stored; production submission remains disabled.";
      }
    });

    auditForm.addEventListener("input", (event) => {
      if (event.target instanceof HTMLInputElement) {
        setError(event.target, "");
      }
      if (status) {
        status.textContent = "";
      }
    });
  }
})();
