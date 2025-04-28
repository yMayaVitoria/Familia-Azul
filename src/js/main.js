// Alterna a exibição das opções de acessibilidade com animação
document.getElementById('btn-acessibilidade-toggle').onclick = function () {
  const opcoes = document.getElementById('acessibilidade-opcoes');
  if (opcoes.classList.contains('hidden')) {
    opcoes.classList.remove('hidden');
    opcoes.style.opacity = 0;
    opcoes.style.transform = 'translateY(20px)';
    setTimeout(() => {
      opcoes.style.transition = 'opacity 0.25s, transform 0.25s';
      opcoes.style.opacity = 1;
      opcoes.style.transform = 'translateY(0)';
    }, 10);
  } else {
    opcoes.style.transition = 'opacity 0.25s, transform 0.25s';
    opcoes.style.opacity = 0;
    opcoes.style.transform = 'translateY(20px)';
    setTimeout(() => {
      opcoes.classList.add('hidden');
      opcoes.style.transition = '';
      opcoes.style.opacity = '';
      opcoes.style.transform = '';
    }, 250);
  }
};

// Contraste
document.getElementById('btn-contraste').onclick = function () {
  document.body.classList.toggle('contraste-alto');
};

// Aumentar fonte
document.getElementById('btn-fonte').onclick = function () {
  document.body.classList.toggle('fonte-grande');
};

// Leitura de texto (simples, lê o conteúdo principal)
document.getElementById('btn-leitura').onclick = function () {
  const texto = document.querySelector('main')?.innerText || '';
  if ('speechSynthesis' in window && texto) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = 'pt-BR';
    window.speechSynthesis.speak(utter);
  } else {
    alert('Leitura de texto não suportada neste navegador.');
  }
};

document.getElementById('menu-mobile-btn').onclick = function() {
  const menu = document.getElementById('menu-mobile');
  const icon = document.getElementById('menu-icon');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    setTimeout(() => {
      menu.style.opacity = '1';
      menu.style.transform = 'scale(1)';
    }, 10);
    icon.classList.add('fa-times');
    icon.classList.remove('fa-bars');
  } else {
    menu.style.opacity = '0';
    menu.style.transform = 'scale(0.95)';
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    setTimeout(() => {
      menu.classList.add('hidden');
    }, 300);
  }
};

// Fade-in animado nos cards de dicas ao rolar a página
function fadeInOnScroll() {
  const cards = document.querySelectorAll('.dicas-card');
  const trigger = window.innerHeight * 0.92;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < trigger) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

let lastScroll = window.scrollY;
const navbar = document.querySelector('header');
let ticking = false;

function handleNavbarHideShow() {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 80) {
    // Rolando para baixo, esconde a navbar
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';
  } else {
    // Rolando para cima, mostra a navbar
    navbar.style.transform = 'translateY(0)';
    navbar.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';
  }
  lastScroll = currentScroll;
  ticking = false;
}

window.addEventListener('scroll', function () {
  if (!ticking) {
    window.requestAnimationFrame(handleNavbarHideShow);
    ticking = true;
  }
});

// Explicações das áreas
const explicacoes = {
  campanha: `<h4 class="text-xl font-bold mb-2 flex items-center gap-2"><i class="fas fa-ribbon text-yellow-400"></i>Campanha Abril Azul</h4>
    <p>A Campanha Abril Azul visa conscientizar a sociedade sobre o autismo, promovendo respeito, inclusão e informação. Durante o mês de abril, diversas ações são realizadas para dar visibilidade à causa.</p>`,
  educacao: `<h4 class="text-xl font-bold mb-2 flex items-center gap-2"><i class="fas fa-book text-blue-700"></i>Educação</h4>
    <p>Trabalhamos para garantir o acesso à educação inclusiva, com apoio a professores, adaptações pedagógicas e orientação às famílias para o desenvolvimento escolar das crianças autistas.</p>`,
  saude: `<h4 class="text-xl font-bold mb-2 flex items-center gap-2"><i class="fas fa-heartbeat text-pink-500"></i>Saúde</h4>
    <p>Oferecemos informações sobre terapias, acompanhamento multidisciplinar e cuidados essenciais para o bem-estar físico e emocional das pessoas com autismo.</p>`,
  apoio: `<h4 class="text-xl font-bold mb-2 flex items-center gap-2"><i class="fas fa-users text-blue-900"></i>Apoio à família</h4>
    <p>Orientamos e acolhemos familiares, promovendo grupos de apoio, rodas de conversa e atividades que fortalecem a rede de suporte e o vínculo familiar.</p>`
};

// Detecta Android e adiciona classe ao <html>
if (/android/i.test(navigator.userAgent)) {
  document.documentElement.classList.add('android');
}

document.querySelectorAll('.area-icone-btn').forEach(el => {
  el.addEventListener('click', function() {
    const area = this.dataset.area;
    const box = document.getElementById('area-explicacao');
    if (explicacoes[area]) {
      box.innerHTML = explicacoes[area];
      box.classList.remove('hidden');
      box.classList.add('animate-fade-in');
      setTimeout(() => box.classList.remove('animate-fade-in'), 500);

      // Animação de rolagem suave apenas para mobile (Android ou telas pequenas)
      if (
        document.documentElement.classList.contains('android') ||
        window.innerWidth <= 767
      ) {
        setTimeout(() => {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const boxTop = box.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: boxTop - headerHeight - 16, // 16px de margem extra
            behavior: 'smooth'
          });
        }, 150);
      }
    }
  });
});

// Opcional: esconder explicação ao clicar fora
document.addEventListener('click', function(e) {
  const box = document.getElementById('area-explicacao');
  if (!e.target.closest('.area-icone-btn') && !e.target.closest('#area-explicacao')) {
    box.classList.add('hidden');
    box.style.opacity = '';
    box.style.transform = '';
  }
});

// FAQ toggle
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    // Fecha todos
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
    // Abre o clicado se não estava aberto
    if (!isOpen) {
      answer.classList.add('open');
      this.classList.add('active');
    }
  });
});