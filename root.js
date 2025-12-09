    document.addEventListener('DOMContentLoaded', function() {
      const faqItems = document.querySelectorAll('.faq-item');
      const faqAnswers = document.querySelectorAll('.faq-answer');
      const faqIcons = document.querySelectorAll('.faq-item .icon svg');

      faqIcons.forEach(icon => {
        icon.style.transform = 'rotate(2deg)';
        icon.style.transition = 'transform 0.2s ease-out';
        icon.style.willChange = 'transform';
      });
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const arrow = button.querySelector(".arrow");
      answer.classList.toggle("hidden");
      arrow.classList.toggle("rotate-180");
    });
  });
      faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = faqIcons[index];

        const toggleFaq = (isExpanding) => {
          faqItems.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
              otherItem.setAttribute('aria-expanded', 'false');
              faqAnswers[otherIndex].style.maxHeight = '0px';
              faqIcons[otherIndex].style.transform = 'rotate(0deg)';
            }
          });

          item.setAttribute('aria-expanded', isExpanding);
          answer.style.maxHeight = isExpanding ? (answer.scrollHeight + 30) + 'px' : '0px';
          icon.style.transform = isExpanding ? 'rotate(180deg)' : 'rotate(0deg)';
        };
        
        question.addEventListener('click', () => {
          const isExpanded = item.getAttribute('aria-expanded') === 'true';
          window.requestAnimationFrame(() => toggleFaq(!isExpanded));
        });

        question.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isExpanded = item.getAttribute('aria-expanded') === 'true';
            window.requestAnimationFrame(() => toggleFaq(!isExpanded));
          }
        });
      });
    });
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#4F46E5',
                        secondary: '#7C3AED',
                        dark: '#1E1B4B',
                        light: '#EEF2FF'
                    },
                    fontFamily: {
                        inter: ['Inter', 'sans-serif'],
                    },
                }
            }
        }
        
            const container = document.getElementById("particles-container");

    function createParticle() {
      const particle = document.createElement("div");
      particle.className = "particle svelte-6lxrpp";
      
      const size = (Math.random() * 4 + 2).toFixed(2);
      const x = (Math.random() * 100).toFixed(2);
      const y = (Math.random() * 100).toFixed(2);
      const duration = (Math.random() * 60 + 20).toFixed(2);
      const delay = (Math.random() * -40).toFixed(2);

      particle.style.setProperty("--size", size + "px");
      particle.style.setProperty("--x", x + "vw");
      particle.style.setProperty("--y", y + "vh");
      particle.style.setProperty("--duration", duration + "s");
      particle.style.setProperty("--delay", delay + "s");

      container.appendChild(particle);
    }
  </script>
      <script>
function triggerScrollAnimations() {
  const animateElements = document.querySelectorAll('.scroll-animate');
  
  animateElements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    const triggerHeight = window.innerHeight * 0.85;
    
    if (elTop < triggerHeight) {
      el.classList.add('active');
    }
  });
window.addEventListener('DOMContentLoaded', triggerScrollAnimations);
window.addEventListener('scroll', triggerScrollAnimations);
        </script>
          <script>
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
        navbar.classList.add("nav-float");
        navbar.classList.remove("nav-top");
      } else {
        navbar.classList.add("nav-top");
        navbar.classList.remove("nav-float");
      }
    });
    
        function openModal() {
      const modal = document.getElementById("getScriptModal");
      const box = document.getElementById("modalBox");
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        box.classList.remove("opacity-0", "translate-y-10", "scale-95");
        box.classList.add("opacity-100", "translate-y-0", "scale-100");
      }, 10);
    }

    function closeModal(event) {
      const modal = document.getElementById("getScriptModal");
      const box = document.getElementById("modalBox");
      if (!event || event.target === modal) {
        box.classList.remove("opacity-100", "translate-y-0", "scale-100");
        box.classList.add("opacity-0", "translate-y-10", "scale-95");

        setTimeout(() => {
          modal.classList.add("hidden");
          document.body.style.overflow = "";
        }, 300);
      }
    }
  </script>
  <script>
let lastScrollY = window.scrollY;
const topNav = document.getElementById('topNav');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    topNav.style.transform = 'translateY(-100%)';
  } else {
    topNav.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
});