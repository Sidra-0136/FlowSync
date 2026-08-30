document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    const savedTheme = localStorage.getItem("flowsync-theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      themeToggle.textContent = "🌙";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      const isDark =
        document.body.classList.contains("dark-mode");

      if (isDark) {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
        localStorage.setItem("flowsync-theme", "dark");
      } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
        localStorage.setItem("flowsync-theme", "light");
      }
    });
  }

  const menuBtn = document.getElementById("menuBtn");
  const mainNav = document.getElementById("mainNav");

  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("open");

      const isOpen =
        mainNav.classList.contains("open");

      menuBtn.setAttribute("aria-expanded", isOpen);
      menuBtn.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );

      menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute(
          "aria-label",
          "Open navigation menu"
        );

        menuBtn.textContent = "☰";
      });
    });
  }

  const faqQuestions =
    document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;

      const isCurrentlyOpen =
        question.classList.contains("active");

      faqQuestions.forEach(otherQuestion => {
        const otherAnswer =
          otherQuestion.nextElementSibling;

        otherQuestion.classList.remove("active");

        otherQuestion.setAttribute(
          "aria-expanded",
          "false"
        );

        if (otherAnswer) {
          otherAnswer.style.display = "none";
        }
      });

      if (!isCurrentlyOpen) {
        question.classList.add("active");

        question.setAttribute(
          "aria-expanded",
          "true"
        );

        if (answer) {
          answer.style.display = "block";
        }
      }
    });
  });

  const form =
    document.getElementById("contactForm");

  const nameInput =
    document.getElementById("name");

  const emailInput =
    document.getElementById("email");

  const messageInput =
    document.getElementById("message");

  const nameMessage =
    document.getElementById("nameMessage");

  const emailMessage =
    document.getElementById("emailMessage");

  const messageMessage =
    document.getElementById("messageMessage");

  const formStatus =
    document.getElementById("formStatus");

  function validateName() {
    if (!nameInput) {
      return false;
    }

    const name =
      nameInput.value.trim();

    if (name.length < 2) {
      nameInput.classList.add("invalid");
      nameInput.classList.remove("valid");

      if (nameMessage) {
        nameMessage.textContent =
          "Please enter at least 2 characters.";

        nameMessage.className = "error";
      }

      return false;
    }

    nameInput.classList.add("valid");
    nameInput.classList.remove("invalid");

    if (nameMessage) {
      nameMessage.textContent = "Looks good!";
      nameMessage.className = "success";
    }

    return true;
  }

  function validateEmail() {
    if (!emailInput) {
      return false;
    }

    const email =
      emailInput.value.trim();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");

      if (emailMessage) {
        emailMessage.textContent =
          "Please enter a valid email.";

        emailMessage.className = "error";
      }

      return false;
    }

    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");

    if (emailMessage) {
      emailMessage.textContent = "Valid email!";
      emailMessage.className = "success";
    }

    return true;
  }

  function validateMessage() {
    if (!messageInput) {
      return false;
    }

    const message =
      messageInput.value.trim();

    if (message.length < 10) {
      messageInput.classList.add("invalid");
      messageInput.classList.remove("valid");

      if (messageMessage) {
        messageMessage.textContent =
          "Message must contain at least 10 characters.";

        messageMessage.className = "error";
      }

      return false;
    }

    messageInput.classList.add("valid");
    messageInput.classList.remove("invalid");

    if (messageMessage) {
      messageMessage.textContent =
        "Message looks good!";

      messageMessage.className = "success";
    }

    return true;
  }

  if (nameInput) {
    nameInput.addEventListener(
      "input",
      validateName
    );
  }

  if (emailInput) {
    emailInput.addEventListener(
      "input",
      validateEmail
    );
  }

  if (messageInput) {
    messageInput.addEventListener(
      "input",
      validateMessage
    );
  }

  if (form) {
    form.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const nameValid =
          validateName();

        const emailValid =
          validateEmail();

        const messageValid =
          validateMessage();

        if (
          nameValid &&
          emailValid &&
          messageValid
        ) {
          if (formStatus) {
            formStatus.textContent =
              "✓ Message submitted successfully!";

            formStatus.className = "success";
          }

          form.reset();

          if (nameInput) {
            nameInput.classList.remove("valid");
          }

          if (emailInput) {
            emailInput.classList.remove("valid");
          }

          if (messageInput) {
            messageInput.classList.remove("valid");
          }

          if (nameMessage) {
            nameMessage.textContent = "";
          }

          if (emailMessage) {
            emailMessage.textContent = "";
          }

          if (messageMessage) {
            messageMessage.textContent = "";
          }
        } else {
          if (formStatus) {
            formStatus.textContent =
              "Please fix the errors above.";

            formStatus.className = "error";
          }
        }
      }
    );
  }

  const modal =
    document.getElementById("demoModal");

  const demoBtn =
    document.getElementById("demoBtn");

  const ctaDemoBtn =
    document.getElementById("ctaDemoBtn");

  const modalClose =
    document.getElementById("modalClose");

  const modalDone =
    document.getElementById("modalDone");

  function openModal() {
    if (!modal) {
      return;
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) {
      return;
    }

    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  if (demoBtn) {
    demoBtn.addEventListener(
      "click",
      openModal
    );
  }

  if (ctaDemoBtn) {
    ctaDemoBtn.addEventListener(
      "click",
      openModal
    );
  }

  if (modalClose) {
    modalClose.addEventListener(
      "click",
      closeModal
    );
  }

  if (modalDone) {
    modalDone.addEventListener(
      "click",
      closeModal
    );
  }

  if (modal) {
    modal.addEventListener(
      "click",
      event => {
        if (event.target === modal) {
          closeModal();
        }
      }
    );
  }

  document.addEventListener(
    "keydown",
    event => {
      if (event.key === "Escape") {
        closeModal();

        if (
          mainNav &&
          mainNav.classList.contains("open")
        ) {
          mainNav.classList.remove("open");

          if (menuBtn) {
            menuBtn.setAttribute(
              "aria-expanded",
              "false"
            );

            menuBtn.setAttribute(
              "aria-label",
              "Open navigation menu"
            );

            menuBtn.textContent = "☰";
          }
        }
      }
    }
  );

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {
      link.addEventListener(
        "click",
        event => {
          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetId);

          if (target) {
            event.preventDefault();

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      );
    });

  document
    .querySelectorAll(
      "button, .primary-btn, .secondary-btn, .cta-primary, .cta-secondary, .nav-button"
    )
    .forEach(button => {
      button.addEventListener(
        "mousedown",
        () => {
          button.classList.add(
            "button-pressed"
          );
        }
      );

      button.addEventListener(
        "mouseup",
        () => {
          button.classList.remove(
            "button-pressed"
          );
        }
      );

      button.addEventListener(
        "mouseleave",
        () => {
          button.classList.remove(
            "button-pressed"
          );
        }
      );
    });

  console.log(
    "FlowSync Week 3 + Week 4 JavaScript loaded successfully!"
  );
});