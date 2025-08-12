function entrar() {
  alert("Você está prestes a zarpar com os Mugiwaras!");
  // window.location.href = "cadastro.html";
}

const characters = [
  {
    name: "Luffy",
    role: "Criador de conteúdo",
    description: "Compartilha suas aventuras e inspira outros a seguir seus sonhos!",
    image: "https://static.wikia.nocookie.net/onepiece/images/6/6f/Luffy_Anime_Pre_Timeskip_Infobox.png"
  },
  {
    name: "Zoro",
    role: "Moderador",
    description: "Mantém a ordem na comunidade e protege os nakamas de trolls.",
    image: "https://static.wikia.nocookie.net/onepiece/images/5/5e/Zoro_Anime_Pre_Timeskip_Infobox.png"
  },
  {
    name: "Sanji",
    role: "Criador de conteúdos",
    description: "Sempre mantém os conteúdos novos e atualizados.",
    image: "https://static.wikia.nocookie.net/onepiece/images/5/5e/Zoro_Anime_Pre_Timeskip_Infobox.png"
  },
  {
    name: "Nami",
    role: "Influenciadora",
    description: "Conecta pessoas com informações valiosas e tendências do mundo.",
    image: "https://static.wikia.nocookie.net/onepiece/images/3/3e/Nami_Anime_Pre_Timeskip_Infobox.png"
  },
  {
    name: "Usopp",
    role: "Monitorador",
    description: "Monitora as atividades suspeitas para que não seja espalhadas mentiras.",
    image: "https://static.wikia.nocookie.net/onepiece/images/3/3e/Nami_Anime_Pre_Timeskip_Infobox.png"
  },
  {
    name: "Chopper",
    role: "Curador",
    description: "Ajuda a manter todos bem cuidados.",
    image: "https://static.wikia.nocookie.net/onepiece/images/3/3e/Nami_Anime_Pre_Timeskip_Infobox.png"
  },
  {
    name: "Nicco Robbin",
    role: "Pesquisador",
    description: "Sempre trazendo novidades e pesquisas importantes",
    image: "https://static.wikia.nocookie.net/onepiece/images/3/3e/Nami_Anime_Pre_Timeskip_Infobox.png"
  }
];

let currentIndex = 0;

function renderSlide() {
  const slide = document.getElementById("character-slide");
  const char = characters[currentIndex];
  slide.innerHTML = `
    <h3>${char.name}</h3>
    <img src="${char.image}" alt="${char.name}" style="width:150px; border-radius:8px;">
    <h4>${char.role}</h4>
    <p>${char.description}</p>
  `;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % characters.length;
  renderSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + characters.length) % characters.length;
  renderSlide();
}

function renderSlide() {
  const slide = document.getElementById("character-slide");
  slide.classList.remove("show");

  setTimeout(() => {
    const char = characters[currentIndex];
    slide.innerHTML = `
      <h3>${char.name}</h3>
      <img src="${char.image}" alt="${char.name}" style="width:150px; border-radius:8px;">
      <h4>${char.role}</h4>
      <p>${char.description}</p>
    `;
    slide.classList.add("show");
  }, 100);
}

document.addEventListener("DOMContentLoaded", renderSlide);

function playSound() {
  const sound = document.getElementById("pirate-sound");
  sound.currentTime = 0;
  sound.play();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % characters.length;
  playSound();
  renderSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + characters.length) % characters.length;
  playSound();
  renderSlide();
}