document.documentElement.classList.add("js");

// Defeitos comuns por aparelho
const defeitos = {
  pc: {
    titulo: "PC",
    itens: ["Não dá vídeo ao ligar", "Lento ou travando", "Superaquecimento e limpeza", "Troca de fonte, memória ou SSD"]
  },
  notebook: {
    titulo: "Notebook",
    itens: ["Não carrega a bateria", "Lento ou travando fazemos upgrade", "Teclado com teclas falhando", "Ventoinha barulhenta e esquentando"]
  }
};

const painel = document.getElementById("painel");
const abas = document.querySelectorAll(".aba");

function mostrar(chave) {
  const d = defeitos[chave];
  painel.innerHTML = `<h3>${d.titulo}: defeitos mais comuns</h3><ul>${d.itens.map(i => `<li>${i}</li>`).join("")}</ul>`;
  painel.classList.remove("troca");
  void painel.offsetWidth; // reinicia a animação
  painel.classList.add("troca");
}

abas.forEach(aba => {
  aba.addEventListener("click", () => {
    abas.forEach(a => { a.classList.remove("ativa"); a.setAttribute("aria-selected", "false"); });
    aba.classList.add("ativa");
    aba.setAttribute("aria-selected", "true");
    mostrar(aba.dataset.alvo);
  });
});
mostrar("pc");

// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
});
menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menu.classList.remove("aberto");
  menuBtn.setAttribute("aria-expanded", "false");
}));

// Brilho no topo ao rolar
const topo = document.getElementById("topo");
const marcarTopo = () => topo.classList.toggle("rolou", window.scrollY > 10);
window.addEventListener("scroll", marcarTopo, { passive: true });
marcarTopo();

// Elementos aparecem ao entrar na tela
const itens = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visivel"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  itens.forEach(el => obs.observe(el));
} else {
  itens.forEach(el => el.classList.add("visivel"));
}

// Ano do rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
