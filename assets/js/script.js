'use strict';

document.addEventListener("DOMContentLoaded", function() {

  // --- Element toggle function ---
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // --- Sidebar toggle ---
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // --- Projects modal ---
  const projectItems = document.querySelectorAll("[data-project]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const projectModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  projectItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const img = this.querySelector("[data-project-img]");
      const title = this.querySelector("[data-project-title]");
      const text = this.querySelector("[data-project-text]");

      if (img && title && text) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalTitle.innerHTML = title.innerHTML;
        modalText.innerHTML = text.innerHTML;
        projectModalFunc();
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", projectModalFunc);
  if (overlay) overlay.addEventListener("click", projectModalFunc);

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      document.getElementById('popupMessage').style.display = 'block';
      const formData = new FormData(event.target);
      fetch(event.target.action, {
          method: 'POST',
          body: formData,
      })
      .then(response => console.log('Form successfully submitted!', response))
      .catch(error => console.error('Error submitting form:', error));
    });
  }

  // Form validation
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  // --- Page navigation ---
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      pages.forEach((page, i) => {
        if (link.dataset.navLink === page.dataset.page) {
          page.classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      });
    });
  });

});
