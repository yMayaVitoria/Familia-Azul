// Menu mobile igual index
document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
  const btn = document.getElementById('menu-mobile-btn');
  const menu = document.getElementById('menu-mobile');
  if (btn && menu) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('hidden');
      } else {
        menu.classList.add('show');
        menu.classList.remove('hidden');
      }
    });
    // Fecha ao clicar fora
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('show');
        menu.classList.add('hidden');
      }
    });
  }

  // Animação da barra de navegação ao rolar (igual index.js)
  let lastScroll = window.scrollY;
  const navbar = document.querySelector('header');
  let ticking = false;

  function handleNavbarHideShow() {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 80) {
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';
    } else {
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

  // Explicações MVV
  const explicacoes = {
    missao: `<h4 class="text-xl font-bold mb-2 flex items-center gap-2"><i class="fas fa-bullseye text-blue-900"></i>Missão</h4>
      <p>A missão da Associação Família Azul é fornecer apoio, orientação e recursos para famílias de pessoas com Transtorno do Espectro Autista (TEA), promovendo a inclusão, o desenvolvimento e a qualidade de vida dessas pessoas e suas famílias.<br><br>
      Hoje, somos uma comunidade de mais de 100 famílias associadas, onde cerca de 60 famílias recebem atendimentos com profissionais especializados e qualificados, oferecendo suporte e cuidado personalizado.<br><br>
      Nosso sonho é construir uma sede própria, onde possamos ampliar nossos serviços e oferecer um espaço seguro e acolhedor para nossas famílias, promovendo o crescimento e o desenvolvimento de nossos membros.</p>`,
    visao: `<h4 class="text-xl font-bold mb-2 flex items-center gap-2"><i class="fas fa-eye text-blue-900"></i>Visão</h4>
      <p>Ser uma referência em apoio e inclusão para pessoas com TEA e suas famílias, contribuindo para uma sociedade mais compreensiva e acolhedora, onde essas pessoas possam ter acesso a oportunidades e recursos para desenvolver seu potencial.</p>`,
    valores: `<h4 class="text-xl font-bold mb-2 flex items-center gap-2"><i class="fas fa-heart text-blue-900"></i>Valores</h4>
      <ul class="list-disc pl-5 space-y-1">
        <li><b>Apoio e solidariedade:</b> Oferecer apoio emocional e prático para famílias de pessoas com TEA.</li>
        <li><b>Inclusão e acessibilidade:</b> Promover a inclusão e a acessibilidade de pessoas com TEA em todas as áreas da vida.</li>
        <li><b>Empoderamento:</b> Empoderar famílias de pessoas com TEA para que possam tomar decisões informadas e defender seus direitos.</li>
        <li><b>Colaboração:</b> Trabalhar em colaboração com outras organizações e profissionais para promover a inclusão e o desenvolvimento de pessoas com TEA.</li>
        <li><b>Respeito e dignidade:</b> Respeitar a dignidade e os direitos de pessoas com TEA e suas famílias.</li>
        <li><b>União:</b> Fortalecer a união entre as famílias e a comunidade, promovendo a solidariedade e o apoio mútuo.</li>
      </ul>`
  };

  document.querySelectorAll('.mvv-icone-btn').forEach(el => {
    el.addEventListener('click', function() {
      const mvv = this.dataset.mvv;
      const box = document.getElementById('mvv-explicacao');
      if (explicacoes[mvv]) {
        box.innerHTML = explicacoes[mvv];
        box.classList.remove('hidden');
        box.classList.add('animate-fade-in');
        setTimeout(() => box.classList.remove('animate-fade-in'), 500);
        // Scroll suave para mobile
        if (window.innerWidth <= 767) {
          setTimeout(() => {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const boxTop = box.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: boxTop - headerHeight - 16,
              behavior: 'smooth'
            });
          }, 150);
        }
      }
    });
  });

  // Opcional: esconder explicação ao clicar fora
  document.addEventListener('click', function(e) {
    const box = document.getElementById('mvv-explicacao');
    if (!e.target.closest('.mvv-icone-btn') && !e.target.closest('#mvv-explicacao')) {
      box.classList.add('hidden');
      box.style.opacity = '';
      box.style.transform = '';
    }
  });

  // Botão de modo escuro com animação e troca de ícone
  const btnDark = document.getElementById('btn-darkmode');
  const icon = document.getElementById('icon-darkmode');
  if (btnDark && icon) {
    btnDark.onclick = function () {
      const html = document.documentElement;
      icon.classList.add('scale-0', 'rotate-180');
      setTimeout(() => {
        html.classList.toggle('dark');
        // Troca o ícone
        if (html.classList.contains('dark')) {
          icon.innerHTML = '<i class="fas fa-sun text-xl" style="color:#facc15"></i>';
          localStorage.setItem('tema', 'dark');
        } else {
          icon.innerHTML = '<i class="fas fa-moon text-xl"></i>';
          localStorage.setItem('tema', 'light');
        }
        icon.classList.remove('scale-0');
        icon.classList.add('scale-100');
      }, 250);
      setTimeout(() => {
        icon.classList.remove('rotate-180');
      }, 600);
    };

    // Aplica preferência salva ao carregar
    const tema = localStorage.getItem('tema');
    if (tema === 'dark') {
      document.documentElement.classList.add('dark');
      icon.innerHTML = '<i class="fas fa-sun text-xl" style="color:#facc15"></i>';
    }
  }

  // Botão de acessibilidade
  const btnAcess = document.getElementById('btn-acessibilidade-toggle');
  const opcoes = document.getElementById('acessibilidade-opcoes');
  if (btnAcess && opcoes) {
    btnAcess.onclick = function () {
      opcoes.classList.toggle('hidden');
    };
  }

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
});