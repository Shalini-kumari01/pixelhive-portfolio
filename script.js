// PIXELHIVEE site script. Plain JavaScript, no libraries.

document.addEventListener("DOMContentLoaded", function () {
  // ----- Mobile menu -----
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });

  // Close the menu after tapping a link
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // ----- Logo fallback -----
  // If images/logo.png is not added yet, hide the broken image icon.
  document.querySelectorAll(".logo-img").forEach(function (img) {
    function markMissing() { img.classList.add("missing"); }
    if (img.complete && img.naturalWidth === 0) { markMissing(); }
    img.addEventListener("error", markMissing);
  });

  // ----- Highlight the current section in the menu -----
  var links = document.querySelectorAll(".site-nav ul a");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) { observer.observe(section); }
    });
  }


  // ----- Email buttons -----
  // On a computer, open Gmail's compose window directly (many computers have no mail app set up).
  // On a phone, the normal mailto: link opens the phone's mail app.
  var isPhone = window.matchMedia("(pointer: coarse)").matches;
  document.querySelectorAll("[data-email-link]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (isPhone) { return; }
      e.preventDefault();
      var to = link.getAttribute("href").replace("mailto:", "");
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to), "_blank", "noopener");
    });
  });

  // ----- Footer year -----
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }
});
