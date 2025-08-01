// ---------- utilitários de normalização (remove acentos) ----------
function normalize(word) {
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

// ---------- Vocabulário de exemplo (palavras de 5 letras, pt-BR) ----------
// Para produção você pode trocar por uma lista maior carregando de arquivo.
const vocabulario = [
  "CARTA", "FELIZ", "AMIGO", "BRISA", "MUNDO",
  "LIVRO", "JOGAR", "PLANO", "MAGIA", "SONHO",
  "CASAS", "VIVER", "RAIOS", "FORTE", "LUGAR",
  "SABER", "TRAGO", "FASES", "BOMBA", "FOLHA",
  "CORES", "FIMES", "VENTO", "TEMPO", "SORTE",
  "GRAÇA", "NIVEL", "PONTE", "REDEZ", "PAREM" // alguns exemplos adicionais
].map(w => normalize(w)); // mantemos normalizado internamente

// palavra secreta e estado
let palavra = "";
let tentativas = 0;
const maxTentativas = 6;
let ganhou = false;
let chuteAtual = "";

// layout do teclado
const tecladoLayout = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Enter","Z","X","C","V","B","N","M","←"]
];

// escolhe uma palavra secreta aleatória do vocabulário
function escolhaAleatoria() {
  const idx = Math.floor(Math.random() * vocabulario.length);
  return vocabulario[idx];
}

function novoJogo() {
  palavra = escolhaAleatoria();
  tentativas = 0;
  ganhou = false;
  chuteAtual = "";
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("status").textContent = "Jogo iniciado! Boa sorte.";
  atualizarDisplay();
  resetTeclado();
  console.log("Palavra secreta (para dev):", palavra); // remover em produção
}

// teclado visual
function montarTeclado() {
  const container = document.getElementById("keyboard");
  container.innerHTML = "";
  tecladoLayout.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("key-row");
    row.forEach(key => {
      const keyDiv = document.createElement("div");
      keyDiv.textContent = key;
      keyDiv.classList.add("key");
      if (key === "Enter" || key === "←") keyDiv.classList.add("small");
      keyDiv.addEventListener("click", () => handleKey(key));
      keyDiv.id = `key-${key}`;
      rowDiv.appendChild(keyDiv);
    });
    container.appendChild(rowDiv);
  });
}

function resetTeclado() {
  document.querySelectorAll(".key").forEach(k => {
    k.classList.remove("certa", "existe", "errada");
  });
}

// lidar com clique no teclado
function handleKey(key) {
  if (ganhou || tentativas >= maxTentativas) return;
  if (key === "Enter") {
    chutar();
  } else if (key === "←") {
    apagar();
  } else if (/^[A-Z]$/.test(key)) {
    if (chuteAtual.length < 5) {
      chuteAtual += key;
      atualizarDisplay();
    }
  }
}

function apagar() {
  if (ganhou || tentativas >= maxTentativas) return;
  chuteAtual = chuteAtual.slice(0, -1);
  atualizarDisplay();
}

function atualizarDisplay() {
  const disp = document.getElementById("display-guess");
  disp.textContent = chuteAtual;
}

function chutar() {
  if (ganhou || tentativas >= maxTentativas) return;

  const tentativaRaw = chuteAtual.trim();
  if (tentativaRaw.length !== 5) {
    alert("Digite exatamente 5 letras!");
    return;
  }

  const tentativa = normalize(tentativaRaw);

  // valida no vocabulário
  if (!vocabulario.includes(tentativa)) {
    alert("Palavra inválida! Use uma palavra do português.");
    return;
  }

  tentativas++;
  mostrarResultado(tentativa);
  atualizarTeclado(tentativa);
  chuteAtual = "";
  atualizarDisplay();
}

function mostrarResultado(tentativa) {
  const divResultado = document.getElementById("resultado");
  const linha = document.createElement("div");

  const solArray = palavra.split("");
  const feedback = Array(5).fill("absent");

  // primeira: corretas
  for (let i = 0; i < 5; i++) {
    if (tentativa[i] === solArray[i]) {
      feedback[i] = "correct";
      solArray[i] = null;
    }
  }

  // segunda: presentes
  for (let i = 0; i < 5; i++) {
    if (feedback[i] !== "correct") {
      const idx = solArray.indexOf(tentativa[i]);
      if (idx !== -1) {
        feedback[i] = "present";
        solArray[idx] = null;
      }
    }
  }

  // renderiza letras
  for (let i = 0; i < 5; i++) {
    const letraDiv = document.createElement("div");
    letraDiv.classList.add("letra");
    letraDiv.textContent = tentativa[i];

    if (feedback[i] === "correct") {
      letraDiv.classList.add("certa");
      setTimeout(() => {
        letraDiv.classList.add("bounce");
        letraDiv.addEventListener("animationend", () => {
          letraDiv.classList.remove("bounce");
        }, { once: true });
      }, 50);
    } else if (feedback[i] === "present") {
      letraDiv.classList.add("existe");
    } else {
      letraDiv.classList.add("errada");
    }

    linha.appendChild(letraDiv);
  }

  divResultado.appendChild(linha);

  // status de fim
  if (tentativa === palavra) {
    ganhou = true;
    document.getElementById("status").textContent = `🎉 Parabéns! Você acertou em ${tentativas} tentativa(s).`;
  } else if (tentativas >= maxTentativas) {
    document.getElementById("status").textContent = `❌ Acabaram as tentativas. A palavra era: ${palavra}`;
  } else {
    document.getElementById("status").textContent = `Tentativa ${tentativas} de ${maxTentativas}.`;
  }
}

// atualiza teclado com base no feedback (prioridade: certa > existe > errada)
function atualizarTeclado(tentativa) {
  const solArray = palavra.split("");
  const feedback = Array(5).fill("absent");

  for (let i = 0; i < 5; i++) {
    if (tentativa[i] === solArray[i]) {
      feedback[i] = "correct";
      solArray[i] = null;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === "correct") continue;
    const idx = solArray.indexOf(tentativa[i]);
    if (idx !== -1) {
      feedback[i] = "present";
      solArray[idx] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    const letter = tentativa[i];
    const keyEl = document.getElementById(`key-${letter}`);
    if (!keyEl) continue;

    if (feedback[i] === "correct") {
      keyEl.classList.remove("existe", "errada");
      keyEl.classList.add("certa");
    } else if (feedback[i] === "present") {
      if (!keyEl.classList.contains("certa")) {
        keyEl.classList.remove("errada");
        keyEl.classList.add("existe");
      }
    } else {
      if (!keyEl.classList.contains("certa") && !keyEl.classList.contains("existe")) {
        keyEl.classList.add("errada");
      }
    }
  }
}

// captura teclado físico
document.addEventListener("keydown", (e) => {
  if (ganhou || tentativas >= maxTentativas) return;
  const key = e.key.toUpperCase();
  if (key === "ENTER") {
    chutar();
  } else if (key === "BACKSPACE") {
    apagar();
  } else if (/^[A-Z]$/.test(key)) {
    if (chuteAtual.length < 5) {
      chuteAtual += key;
      atualizarDisplay();
    }
  }
});

// inicialização
montarTeclado();
novoJogo();
