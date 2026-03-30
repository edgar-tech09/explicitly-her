const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeBtn.querySelector('i');

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if(body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  reveals.forEach((reveal) => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
}

window.addEventListener('scroll', checkReveal);
checkReveal();

const textArray = ["Pioneering.", "Leading.", "Innovating.", "Ours."];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typedTextSpan = document.querySelector(".typewriter-text");

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const interactiveCards = document.querySelectorAll('.card');

interactiveCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8; 
    const rotateY = ((x - centerX) / centerX) * 8;  

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none'; 
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease'; 
  });
});

const modal = document.getElementById('card-modal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modal-title');
const modalRole = document.getElementById('modal-role');
const modalBody = document.getElementById('modal-body');
const modalIcon = document.getElementById('modal-icon');

const clickableCards = document.querySelectorAll('.clickable-card');

clickableCards.forEach(card => {
  card.addEventListener('click', () => {
    const titleText = card.querySelector('.card-title').innerText;
    const iconClass = card.querySelector('.card-icon').className;
    
    const roleElem = card.querySelector('.card-role');
    if (roleElem) {
      modalRole.innerText = roleElem.innerText;
      modalRole.style.display = 'inline-block';
    } else {
      modalRole.style.display = 'none';
    }

    const fullTextElem = card.querySelector('.full-text');
    const previewTextElem = card.querySelector('.card-preview');
    modalBody.innerText = fullTextElem ? fullTextElem.innerText : previewTextElem.innerText;

    modalTitle.innerText = titleText;
    modalIcon.className = iconClass; 

    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto'; 
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});