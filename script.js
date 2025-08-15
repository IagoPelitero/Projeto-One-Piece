document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.crew-container');
  const members = Array.from(document.querySelectorAll('.crew-member'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  let visibleCards = getVisibleCards();
  let cardWidth = members[0].offsetWidth + 20;
  let currentIndex = visibleCards;

  // Clonar elementos
  const clonesStart = members.slice(-visibleCards).map(el => el.cloneNode(true));
  const clonesEnd = members.slice(0, visibleCards).map(el => el.cloneNode(true));
  clonesStart.forEach(clone => container.prepend(clone));
  clonesEnd.forEach(clone => container.append(clone));

  function updateCarousel(animate = true) {
    container.style.transition = animate ? 'transform 0.4s ease' : 'none';
    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
    if (currentIndex === members.length + visibleCards) {
      setTimeout(() => {
        currentIndex = visibleCards;
        updateCarousel(false);
      }, 400);
    }
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = members.length;
        updateCarousel(false);
      }, 400);
    }
  });

  // Swipe / Drag
  let startX = 0;
  let isDragging = false;

  container.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  container.addEventListener('touchend', e => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
    isDragging = false;
  });

  container.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
  });

  container.addEventListener('mouseup', e => {
    if (!isDragging) return;
    const endX = e.clientX;
    handleSwipe(endX - startX);
    isDragging = false;
  });

  function handleSwipe(deltaX) {
    if (deltaX > 50) {
      prevBtn.click();
    } else if (deltaX < -50) {
      nextBtn.click();
    }
  }

  function getVisibleCards() {
    const width = window.innerWidth;
    if (width < 600) return 1;
    if (width < 900) return 2;
    return 3;
  }

  window.addEventListener('resize', () => {
    visibleCards = getVisibleCards();
    cardWidth = members[0].offsetWidth + 20;
    updateCarousel(false);
  });

  updateCarousel(false);
});

  // Recupera os dados salvos no cadastro
  const nome = localStorage.getItem("pirateName") || "Pirata Desconhecido";
  const fruta = localStorage.getItem("akumaNoMi") || "Prefiro poder nadar!";

  // Exibe os dados no cartaz
  document.getElementById("pirateName").textContent = nome;
  document.getElementById("pirateTitle").textContent = `Portador da ${fruta}`;

  // Tabela de recompensas por Akuma no Mi
  const frutas = {
    "Gomu Gomu no Mi": 1500000000,
    "Mera Mera no Mi": 1800000000,
    "Hie Hie no Mi": 1600000000,
    "Yami Yami no Mi": 2500000000,
    "Gura Gura no Mi": 2200000000,
    "Ope Ope no Mi": 2000000000,
    "Nikyu Nikyu no Mi": 1700000000,
    "Uo Uo no Mi (Seiryu)": 3000000000,
    "Hana Hana no Mi": 1400000000,
    "Yomi Yomi no Mi": 1300000000,
    "Prefiro poder nadar!": 500000
  };

  // Função para detectar a Vontade do D.
  function temVontadeDoD(nome) {
    return /(^|\s)[Dd](\.|\s|$)/.test(nome);
  }

  // Define a recompensa base
  let bounty = frutas[fruta] || 1000000;

  // Aplica bônus se tiver "D." no nome
  if (temVontadeDoD(nome)) {
    bounty *= 2;
  }

  // Easter egg secreto para nomes lendários
  if (nome.toLowerCase().includes("roger") || nome.toLowerCase().includes("imu")) {
    document.getElementById("pirateTitle").textContent = "Este nome não deveria existir...";
    bounty = 999999999999;
  }

  // Animação de contagem cinematográfica
  let current = 0;
  let display = document.getElementById("bountyAmount");

  let interval = setInterval(() => {
    current += Math.ceil(bounty / 100);
    if (current >= bounty) {
      current = bounty;
      clearInterval(interval);
    }
    display.textContent = current.toLocaleString();
  }, 50);

  // Botão de compartilhamento (placeholder)
  function compartilhar() {
    alert("Compartilhe seu cartaz com a tripulação! (Função em construção)");
  }

  const coresPorFruta = {
  "Mera Mera no Mi": "#FF4500",
  "Hie Hie no Mi": "#00BFFF",
  "Yami Yami no Mi": "#2F4F4F",
  "Gomu Gomu no Mi": "#FFD700",
  "Prefiro poder nadar!": "#228B22"
};

document.querySelector(".bounty-poster").style.backgroundColor = coresPorFruta[fruta] || "#8B4513";