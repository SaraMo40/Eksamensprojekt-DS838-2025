document.addEventListener("DOMContentLoaded", () => {
  // --- Fade Hover Logic ---
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.classList.add("fade-hover");
  }
  const tagline = document.querySelector(".tagline");
  if (tagline) {
    tagline.classList.add("fade-hover");
  }

  // --- Newsletter Popup after 30 Seconds with Visible Countdown ---
  setTimeout(() => {
    const newsletterPopup = document.getElementById("newsletter-popup");
    if (newsletterPopup) {
      newsletterPopup.style.display = "block";
      // Add a countdown timer that will auto-close the popup after 10 seconds
      let countdown = 10;
      const countdownElement = document.createElement("p");
      countdownElement.id = "newsletter-countdown";
      countdownElement.innerText = `This popup will close in ${countdown} seconds`;
      const modalContent = newsletterPopup.querySelector(".modal-content");
      if (modalContent) {
        modalContent.appendChild(countdownElement);
      }
      const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          countdownElement.innerText = `This popup will close in ${countdown} seconds`;
        } else {
          clearInterval(countdownInterval);
          newsletterPopup.style.display = "none";
        }
      }, 1000);
    }
  }, 30000); // 30 seconds

  // Close newsletter popup when clicking the close button
  const popupClose = document.getElementById("popup-close");
  if (popupClose) {
    popupClose.addEventListener("click", () => {
      document.getElementById("newsletter-popup").style.display = "none";
    });
  }


// --- Cookie Policy Notice Behavior ---
const cookieNotice = document.getElementById("cookie-notice");
const viewPreferencesBtn = document.getElementById("view-preferences");
const cookiePreferences = document.getElementById("cookie-preferences");


const allowCookiesBtn = document.getElementById("allow-cookies");
const disallowCookiesBtn = document.getElementById("disallow-cookies");

if (allowCookiesBtn) {
  allowCookiesBtn.addEventListener("click", () => {
    alert("Alle cookies er nu tilladt.");
    cookieNotice.style.display = "none";
  });
}

if (disallowCookiesBtn) {
  disallowCookiesBtn.addEventListener("click", () => {
    alert("Ingen cookies er nu tilladt.");
    cookieNotice.style.display = "none";
  });
}

if (viewPreferencesBtn) {
  viewPreferencesBtn.addEventListener("click", () => {
    cookiePreferences.style.display = (cookiePreferences.style.display === "block") ? "none" : "block";
  });
}


  // --- (Legacy) Privacy and Terms Modals Events ---
  const privacyModal = document.getElementById("privacy-modal");
  const privacyLink = document.getElementById("privacy-link");
  const privacyClose = document.getElementById("privacy-close");
  if (privacyLink) {
    privacyLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (privacyModal) privacyModal.style.display = "block";
    });
  }
  if (privacyClose) {
    privacyClose.addEventListener("click", () => {
      if (privacyModal) privacyModal.style.display = "none";
    });
  }
  const termsModal = document.getElementById("terms-modal");
  const termsLink = document.getElementById("terms-link");
  const termsClose = document.getElementById("terms-close");
  if (termsLink) {
    termsLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (termsModal) termsModal.style.display = "block";
    });
  }
  if (termsClose) {
    termsClose.addEventListener("click", () => {
      if (termsModal) termsModal.style.display = "none";
    });
  }
  window.addEventListener("click", (event) => {
    if (privacyModal && event.target === privacyModal) {
      privacyModal.style.display = "none";
    }
    if (termsModal && event.target === termsModal) {
      termsModal.style.display = "none";
    }
  });
});
