const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const form = document.getElementById('inquiryForm');
const note = document.getElementById('formNote');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);

  const subject = encodeURIComponent(`Tutoring inquiry from ${data.get('parentName')}`);
  const body = encodeURIComponent(
`Hi Bailey,\n\nI'd like to ask about tutoring.\n\nParent/Guardian: ${data.get('parentName')}\nEmail: ${data.get('email')}\nStudent grade: ${data.get('grade') || 'Not provided'}\nSupport needed: ${data.get('support')}\nPreferred schedule: ${data.get('schedule') || 'Not provided'}\n\nMore details:\n${data.get('message') || 'None provided'}\n`
  );

  note.textContent = 'Opening your email app with the inquiry details…';
  window.location.href = `mailto:desertbloomtutoringAZ@gmail.com?subject=${subject}&body=${body}`;
});
