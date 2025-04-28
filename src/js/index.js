window.addEventListener('DOMContentLoaded', function () {
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
          icon.innerHTML = '<i class="fas fa-sun text-yellow-400 text-xl"></i>';
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
      icon.innerHTML = '<i class="fas fa-sun text-yellow-400 text-xl"></i>';
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

  // Quiz Interativo
  const quizData = [
    {
      question: "O autismo é:",
      options: [
        "Uma doença contagiosa",
        "Um transtorno do neurodesenvolvimento",
        "Um problema de criação"
      ],
      answer: 1
    },
    {
      question: "Pessoas autistas podem aprender e se desenvolver?",
      options: [
        "Sim, cada pessoa tem seu ritmo e potencial",
        "Não, nunca aprendem",
        "Apenas algumas"
      ],
      answer: 0
    },
    {
      question: "O que é importante ao conviver com uma pessoa autista?",
      options: [
        "Respeitar, ouvir e acolher",
        "Ignorar suas necessidades",
        "Forçar a agir como todo mundo"
      ],
      answer: 0
    }
  ];

  let quizIndex = 0;
  let quizScore = 0;

  function showQuizQuestion() {
    const q = quizData[quizIndex];
    document.getElementById('quiz-question').textContent = q.question;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = "px-4 py-2 rounded-full border border-blue-300 hover:bg-blue-100 transition font-semibold text-blue-900";
      btn.textContent = opt;
      btn.onclick = () => selectQuizOption(idx, btn);
      optionsDiv.appendChild(btn);
    });
    document.getElementById('quiz-next').classList.add('hidden');
    document.getElementById('quiz-result').textContent = '';
  }

  function selectQuizOption(idx, btn) {
    const q = quizData[quizIndex];
    const options = document.querySelectorAll('#quiz-options button');
    options.forEach(b => b.disabled = true);
    if (idx === q.answer) {
      btn.classList.add('bg-green-200', 'border-green-500');
      quizScore++;
      document.getElementById('quiz-result').textContent = "Correto!";
    } else {
      btn.classList.add('bg-red-200', 'border-red-500');
      document.getElementById('quiz-result').textContent = "Ops! Resposta incorreta.";
    }
    document.getElementById('quiz-next').classList.remove('hidden');
  }

  document.getElementById('quiz-next').onclick = function() {
    quizIndex++;
    if (quizIndex < quizData.length) {
      showQuizQuestion();
    } else {
      document.getElementById('quiz').innerHTML = `<div class="text-2xl font-bold text-blue-900 text-center">Você acertou ${quizScore} de ${quizData.length} perguntas!<br><span class="text-lg font-normal">Obrigado por participar 💙</span></div>`;
    }
  };

  if (document.getElementById('quiz')) showQuizQuestion();
});