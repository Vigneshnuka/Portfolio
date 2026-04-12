(function () {
  "use strict";

  const projects = {
    stock: {
      number: "Project 01",
      title: "Stock Price Intelligence via Ensemble ML",
      problem:
        "Financial markets are non-linear and highly sensitive to model selection. Single-algorithm approaches suffer from high variance and inconsistent performance across different stocks and time windows.",
      approach:
        "Combined SVM, Decision Tree, and KNN via ensemble voting and gradient boosting to reduce variance and improve generalization. Models were trained and evaluated across multiple stock datasets to validate cross-stock stability.",
      tech: "Python · Scikit-learn · Gradient Boosting · SVM · KNN · Decision Tree · Google Colab · MSE/MAE/R² evaluation",
      outcome:
        "Gradient boosting outperformed individual models across all three evaluation metrics (MSE, MAE, R²) on every stock tested. The ensemble framework provides a reusable baseline for financial forecasting tasks.",
    },
    legal: {
      number: "Project 02",
      title: "Legal Document Intelligence Pipeline",
      problem:
        "Legal case files contain unstructured audio and dense text that is difficult to process programmatically. Existing ASR models vary significantly in accuracy on legal domain vocabulary.",
      approach:
        "Built a hybrid pipeline: BERT for text extraction from legal case PDFs, gTTS for speech synthesis to create a custom dataset, and benchmarked Whisper, Wav2Vec 2.0, and Vosk for audio transcription accuracy on the resulting legal corpus.",
      tech: "Python · Whisper · Wav2Vec 2.0 · Vosk · BERT (Hugging Face) · gTTS · WER/CER/BLEU evaluation",
      outcome:
        "Whisper achieved the best results: WER 16.07, CER 6, BLEU 0.76 — significantly outperforming Vosk and Wav2Vec 2.0 on legal transcription benchmarks. The pipeline demonstrates a replicable approach to domain-specific ASR evaluation.",
    },
    robotic: {
      number: "Project 03",
      title: "Motion-Mimicking Robotic Arm",
      problem:
        "Demonstrating real-time hardware control and motion replication requires tight integration between embedded firmware, wireless communication, and precise servo control logic.",
      approach:
        "Designed and assembled a robotic arm with servo motors, programmed motion logic on Arduino UNO in C++, and implemented wireless control via NodeMCU. Motion mimicking was achieved by reading sensor input and mapping it to joint angles in real time.",
      tech: "NodeMCU · Arduino UNO · Servo Motors · C++ · Embedded Systems · Wireless Control",
      outcome:
        "Successfully demonstrated pick-and-place and real-time motion-mimicking operations. Showcases hardware-software co-design fundamentals applicable to robotics, IoT, and embedded automation.",
    },
  };

  const overlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  let lastFocus = null;

  function openModal(key) {
    const p = projects[key];
    if (!p || !modalBody || !overlay) return;

    lastFocus = document.activeElement;

    modalBody.innerHTML = `
      <p class="modal-kicker">${p.number}</p>
      <h3 class="modal-title" id="modal-title">${p.title}</h3>
      <div class="modal-section"><h4>The Problem</h4><p>${p.problem}</p></div>
      <div class="modal-section"><h4>Approach</h4><p>${p.approach}</p></div>
      <div class="modal-section"><h4>Tech Stack</h4><p class="modal-tech">${p.tech}</p></div>
      <div class="modal-section"><h4>Outcome</h4><p>${p.outcome}</p></div>
    `;

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeBtn.focus({ preventScroll: true });
  }

  function closeModal() {
    if (overlay) {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
    if (modalBody) modalBody.innerHTML = "";

    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
    lastFocus = null;
  }

  function onOverlayClick(e) {
    if (e.target === overlay) closeModal();
  }

  document.querySelectorAll(".proj-card[data-project]").forEach(function (card) {
    card.addEventListener("click", function () {
      const key = card.getAttribute("data-project");
      openModal(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", onOverlayClick);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay && overlay.classList.contains("open")) {
      e.preventDefault();
      closeModal();
    }
  });

  /* Mobile navigation */
  function setNavOpen(open) {
    if (!header || !navToggle) return;
    header.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  }

  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!header.classList.contains("is-open"));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (header) setNavOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header && header.classList.contains("is-open")) {
      setNavOpen(false);
    }
  });

  /* Scroll reveal */
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".proj-card, .skill-group, .tl-item, .stat-row").forEach(function (el) {
      el.classList.add("js-reveal");
      obs.observe(el);
    });
  }
})();
