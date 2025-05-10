document.addEventListener("DOMContentLoaded", function () {
  const readNotesButton = document.querySelector(".hero-button a");

  if (readNotesButton) {
    readNotesButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "/notes";
    });
  }

  // Implement toggle for light and dark modes
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleSwitch.addEventListener('change', switchTheme, false);

  // Configure fonts and animations
  document.body.style.fontFamily = "'Inter', sans-serif";
  document.querySelectorAll('.animated-shiny-text').forEach(element => {
    element.style.animation = 'shiny 3s infinite';
  });
});
