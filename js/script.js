(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Flip headline (split-flap board effect) ---------- */
  const flipMessages = [
    "TripGenie génère tout le reste.",
    "Vols, hôtels, restos — assemblés.",
    "Un pack complet en 30 secondes.",
  ];
  const flipWindow = document.getElementById("flipWindow");

  function cycleFlip(index = 0) {
    if (!flipWindow) return;
    flipWindow.style.opacity = "0";
    flipWindow.style.transform = "translateY(-8px)";
    setTimeout(() => {
      flipWindow.textContent = flipMessages[index % flipMessages.length];
      flipWindow.style.transition = "none";
      flipWindow.style.transform = "translateY(8px)";
      requestAnimationFrame(() => {
        flipWindow.style.transition = "opacity 0.35s ease, transform 0.35s ease";
        flipWindow.style.opacity = "1";
        flipWindow.style.transform = "translateY(0)";
      });
    }, 220);
    setTimeout(() => cycleFlip(index + 1), 3400);
  }

  if (!prefersReducedMotion && flipWindow) {
    setTimeout(() => cycleFlip(1), 3400);
  }

  /* ---------- Boarding pass live-data cycle (signature element) ---------- */
  const trips = [
    { code: "TOK", city: "Tokyo, Japon", vibe: "Surprise", budget: "1 450 €", score: 0.87 },
    { code: "LIS", city: "Lisbonne, Portugal", vibe: "Relax", budget: "780 €", score: 0.91 },
    { code: "BKK", city: "Bangkok, Thaïlande", vibe: "Student", budget: "620 €", score: 0.83 },
    { code: "MYK", city: "Mykonos, Grèce", vibe: "Party", budget: "1 120 €", score: 0.88 },
    { code: "REY", city: "Reykjavik, Islande", vibe: "Group", budget: "1 690 €", score: 0.9 },
  ];

  const bpDest = document.getElementById("bpDest");
  const bpCity = document.getElementById("bpCity");
  const bpVibe = document.getElementById("bpVibe");
  const bpBudget = document.getElementById("bpBudget");
  const bpBar = document.getElementById("bpBar");
  const bpScore = document.getElementById("bpScore");

  function renderTrip(trip) {
    if (bpBar) bpBar.style.width = "0%";
    if (bpScore) bpScore.textContent = "0.00";

    [bpDest, bpCity, bpVibe, bpBudget].forEach((el) => {
      if (el) el.style.opacity = "0";
    });

    setTimeout(() => {
      if (bpDest) bpDest.textContent = trip.code;
      if (bpCity) bpCity.textContent = trip.city;
      if (bpVibe) bpVibe.textContent = trip.vibe;
      if (bpBudget) bpBudget.textContent = trip.budget;
      [bpDest, bpCity, bpVibe, bpBudget].forEach((el) => {
        if (el) el.style.opacity = "1";
      });

      requestAnimationFrame(() => {
        if (bpBar) bpBar.style.width = `${trip.score * 100}%`;
      });

      // animate the score number counting up
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        if (bpScore) bpScore.textContent = (progress * trip.score).toFixed(2);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, 260);
  }

  let tripIndex = 0;
  if (bpDest) {
    renderTrip(trips[tripIndex]);
    if (!prefersReducedMotion) {
      setInterval(() => {
        tripIndex = (tripIndex + 1) % trips.length;
        renderTrip(trips[tripIndex]);
      }, 4200);
    }
  }

  /* ---------- Premium toggle demo ---------- */
  const premiumToggle = document.getElementById("premiumToggle");
  if (premiumToggle) {
    premiumToggle.addEventListener("click", () => {
      const isChecked = premiumToggle.getAttribute("aria-checked") === "true";
      premiumToggle.setAttribute("aria-checked", String(!isChecked));
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    ".stack-card, .tag, .feature-tag, .stamp, .luggage-tag"
  );

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    revealTargets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }
})();
