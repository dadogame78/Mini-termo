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
 // A
"ABRIR", "ACASO", "ÁGAPE", "ÁGUIA", "AINDA", "ALADO", "ALBUM", "ALGAS", "ALIAR", "AMADO",
  "AMARO", "AMIGO", "ANEXO", "ANIMO", "ANZOL", "APEGO", "APICE", "APOIO", "APOLO", "APTOU",
  "ARARA", "AROMA", "ARROZ", "ASILO", "ATÉIA", "ÁTILA", "ÁTOMO", "ATRIZ", "AUREO", "AUTOR",
  "AVIÃO", "AZULU", "BAGRE", "BAIXO", "BANAL", "BANCO", "BANHO", "BARCO", "BARRO", "BATER",
  "BEIJO", "BEIRA", "BICHO", "BINGO", "BLOCO", "BOCAL", "BODAS", "BOLAS", "BOLSO", "BORDA",
  "BOSSA", "BRASA", "BRAVA", "BRAVO", "BRISA", "BRUXA", "BURRO", "CABER", "CAIXA", "CAJUS",
  "CALMA", "CALOR", "CAMPO", "CANAL", "CANTO", "CAPAZ", "CAPIM", "CAPUZ", "CARRO", "CASAL",
  "CASAR", "CAUSA", "CAVAL", "CEDRO", "CEGAR", "CENSO", "CERCA", "CERTO", "CHATO", "CHAVE",
  "CHUVA", "CINCO", "CÍNIC", "CLARO", "CLIMA", "COBRA", "COÇAR", "COISA", "COITO", "COMER",
  "COMUM", "CONTA", "CORAL", "CORDA", "CORNO", "CORPO", "CORVO", "COSER", "COSTA", "COXAS",
  "CRATO", "CREDO", "CRIME", "CRISE", "CRIVO", "CRUEL", "CRUZE", "CUBOS", "CUIDO", "CULPA",
  "CULTU", "CURAR", "CURSO", "DADOS", "DANÇA", "DEIXA", "DELTA", "DEMÃO", "DENTE", "DEPOR",
  "DERBY", "DESDE", "DEUSA", "DIABO", "DICAS", "DIGNO", "DILDO", "DINOS", "DIQUE", "DISCO",
  "DITAR", "DIVÃS", "DOBRA", "DOENT", "DOGMA", "DOLAR", "DOMAR", "DORES", "DORIR", "DORSO",
  "DOSAR", "DOTAR", "DOZER", "DUETO", "DUNAS", "DUPLO", "DURAR", "DUZIA", "ÉBANO", "ÉBRIO",
  "ECOAR", "EDUCA", "EFESO", "ÉGIDE", "EIXOS", "ELEGE", "ELMOS", "EMITE", "ENFIM", "ENJOO",
  "ENTÃO", "ERROS", "ESIMO", "ESPIA", "ESTAR", "ESTIO", "ETAPA", "ÉTICA", "EXAME", "EXATO",
  "EXIJO", "EXITO", "EXPOR", "FACAS", "FALAR", "FALSO", "FALTA", "FAROL", "FARSA", "FAUNA",
  "FAVOR", "FELIZ", "FENDA", "FERIR", "FESTA", "FEUDO", "FEZES", "FIADO", "FICAR", "FILHO",
  "FILME", "FINCA", "FINDO", "FIRME", "FOCAL", "FOCOS", "FOICE", "FOLGA", "FORÇA", "FORMA",
  "FORNO", "FORTE", "FORUM", "FOSCO", "FOSSA", "FOTOS", "FRACO", "FRASE", "FRETE", "FRUTO",
  "FUGIR", "FUNDO", "FURAR", "FUROR", "FUSÃO", "FÚTIL", "FUTUO", "GAFES", "GALHO", "GALÃO",
  "GANHO", "GARBO", "GAROA", "GARRA", "GASOS", "GASTO", "GATOS", "GELAR", "GEMER", "GENRO",
  "GIRAR", "GLEBA", "GOLFO", "GOSTO", "GRADE", "GRADO", "GRAMA", "GRATA", "GRAUS", "GRAVE",
  "GRITO", "GROSS", "GRUDO", "GRUPO", "GUETO", "HABIL", "HARPA", "HASTE", "HAVER", "HEROI",
  "HIATO", "HINOS", "HOMEM", "HONRA", "HORAS", "HORDA", "HORTA", "HOTEL", "HUMOR", "ÍCONE",
  "IDEAL", "ÍDOLO", "IGUAL", "ILESO", "IMPAR", "IMPOR", "ÍMPIO", "INATO", "ÍNDIO", "INFRA",
  "INGÊS", "INIBE", "ÍNSUA", "INTER", "INTUI", "IÔNICO", "IRADO", "IRMÃO", "ÍRIS", "ISCAO",
  "ÍSLEO", "ÍTALO", "JANDA", "JANEI", "JANTE", "JARRA", "JAZER", "JEITO", "JEJUM", "JOGAR",
  "JOGOS", "JOVEM", "JUDAS", "JULHO", "JUNHO", "JUNTO", "JURAR", "JUSTA", "LÁBIO", "LACRE",
  "LADOS", "LAGOA", "LARGO", "LASER", "LATÃO", "LAUDO", "LAVAR", "LEGAL", "LEITE", "LEITO",
  "LEMAS", "LENDA", "LENTO", "LEQUE", "LERDO", "LESÃO", "LEVES", "LIBRA", "LIDAR", "LIGAR",
  "LIMÃO", "LIMBO", "LIMPO", "LINDO", "LINHA", "LIRAS", "LÍTIO", "LIVRO", "LOCAL", "LOGRO",
  "LOIRA", "LOUCA", "LOUCO", "LUCRO", "LUGAR", "LUNAR", "LUSCO", "LUTAR", "LUXO", "MACHO",
  "MACIO", "MADRE", "MAGIA", "MAGMA", "MAGRO", "MAIOR", "MAJOR", "MALTE", "MAMÃO", "MANGA",
  "MANHA", "MANTA", "MARCA", "MARCO", "MARIA", "MARTA", "MASSA", "MATAR", "MATIZ", "MEADA",
  "MEÇAS", "MEDIR", "MELÃO", "MELHOR", "MENOR", "MENOS", "MESES", "MESMO", "METAL", "METRO",
  "MEUDA", "MIADO", "MICRO", "MIGUE", "MIMAR", "MINHA", "MIRAR", "MISSA", "MITO", "MIXAR",
  "MOÇAS", "MODAS", "MOLAS", "MONGE", "MONTE", "MORAR", "MORFO", "MORNO", "MORRO", "MOSCA",
  "MOTEL", "MOTOR", "MOURO", "MOUSE", "MUDAR", "MULTA", "MUNDO", "MURRO", "MUSGO", "MÚTUA",
  "NAÇÃO", "NADAR", "NAIPE", "NATAL", "NATAS", "NEGRO", "NERVO", "NESGA", "NESSA", "NESSE",
  "NESTA", "NESTO", "NEVAR", "NINAR", "NÍVEL", "NOBRE", "NODAL", "NOITE", "NORMA", "NOSSA",
  "NOSSO", "NOTAR", "NOVAS", "NOVEL", "NOVOS", "NOZES", "NUBLA", "NULOS", "NUNCA", "NUVEM",
  "ÓBVIO", "OCASO", "ÓDIO", "OESTE", "OITO", "OLHAR", "OLHOS", "OMBRO", "ONÇAS", "ONDAS",
  "ONDE", "ONTEM", "OPÇÃO", "OPERA", "OPOSTO", "ORADO", "ORDEM", "ORGIA", "ORIXA", "ORLA",
  "OSCAR", "OSSOS", "OSTRA", "OUTRA", "OUTRO", "OUVIR", "PACTO", "PADRE", "PAGÃO", "PAGAR",
  "PAIOL", "PAJEM", "PALCO", "PALMA", "PALMO", "PANOS", "PAPEL", "PARAR", "PARCO", "PARDO",
  "PAREO", "PARIR", "PARTO", "PASMA", "PASSE", "PASTA", "PASTO", "PATAS", "PAUSA", "PAUTA",
  "PAVIO", "PAVOR", "PEÇAS", "PEDAL", "PEDIR", "PEGAR", "PEITO", "PEIXE", "PELES", "PENAL",
  "PENAS", "PENIS", "PENSA", "PENTE", "PEQUI", "PERDA", "PERNA", "PERTO", "PESAR", "PESCA",
  "PESOS", "PESTE", "PETIZ", "PIADA", "PICAR", "PICHE", "PICOS", "PIFAR", "PILAR", "PILHA",
  "PINGO", "PINHO", "PINTAR", "PIRAR", "PISAR", "PISTA", "PITÃO", "PLACA", "PLANO", "PLATO",
  "PLEBE", "PLENO", "PLUMA", "PODER", "PODIO", "POEMA", "POETA", "POLAR", "POLIR", "POLVO",
  "POMAR", "POMBA", "POMBO", "PONHA", "PONTA", "PONTE", "PORCA", "PORCO", "PORNO", "PORTA",
  "PORTO", "POSAR", "POSTA", "POTRO", "POUCO", "POVOAR", "PRADO", "PRATO", "PRAZO", "PRECO",
  "PREGO", "PRELO", "PRESA", "PRETA", "PREVER", "PRIMO", "PRIVAR", "PROLE", "PROSA", "PROVA",
  "PRUMO", "PUDER", "PULGA", "PULSO", "PUMAS", "PUNHO", "PURGA", "PUXAR", "QUAIS", "QUASE",
  "QUATRO", "QUEIXA", "QUEM", "QUERER", "QUILO", "QUINA", "QUOTA", "RABO", "RAÇA", "RADAR",
  "RAIOS", "RAIVA", "RAIZ", "RAMPA", "RANCO", "RAPAR", "RAPAZ", "RARAS", "RASO", "RASPA",
  "RATÃO", "RATOS", "REAIS", "REBUS", "RECÉM", "REDE", "REDOR", "REFÉM", "REGAR", "REGER",
  "REINO", "RELAX", "REMAR", "RENAL", "RENDA", "RENOVO", "REPOR", "RÉPTIL", "RESES", "RESTA",
  "RETAS", "RETO", "REVER", "REVÉS", "RIACHO", "RIBA", "RICOS", "RIFLE", "RIMAS", "RIRAM",
  "RISCO", "RISO", "RITMO", "RIVAL", "ROÇAR", "ROCHA", "RODAS", "RODEO", "ROGAR", "ROLAR",
  "ROLDÃO", "ROSA", "ROSCA", "ROSTO", "ROTAS", "ROUBO", "ROUPA", "ROXO", "RUBLO", "RUBRO",
  "RUDES", "RUELA", "RUÍDO", "RUINS", "RUÍR", "RUMO", "RURAL", "SABER", "SABOR", "SACAR",
  "SACRO", "SADIO", "SAGAZ", "SAGRA", "SAIAS", "SAIR", "SALAS", "SALDO", "SALMO", "SALSA",
  "SALTO", "SALVA", "SANAR", "SANHA", "SANTA", "SAPOS", "SAQUE", "SARAR", "SARNA", "SAUDÁ",
  "SAUDA", "SAÚDE", "SAZON", "SEARA", "SECAR", "SEDAS", "SEGUE", "SEIOS", "SEITA", "SEIXO",
  "SELAR", "SELVA", "SENDA", "SENDO", "SENHA", "SENIL", "SENSO", "SENTA", "SENTO", "SEPIA",
  "SERÃO", "SERES", "SERIA", "SERRA", "SERVA", "SERVE", "SESSO", "SESTA", "SETAS", "SEXTA",
  "SEXTO", "SIGLA", "SIGNO", "SILVO", "SIMÃO", "SINAL", "SINHO", "SIRVA", "SISMO", "SITAR",
  "SOADO", "SOAR", "SOBRA", "SOBRE", "SÓCIO", "SOCOR", "SOFÁ", "SOFRA", "SOFRE", "SOLAR",
  "SOLDA", "SOLDO", "SOLTO", "SOLUX", "SOMAR", "SONDA", "SONHO", "SONSO", "SOPAS", "SOPRO",
  "SORRIR", "SORTE", "SORVO", "SOUBE", "SOUZA", "SUBIR", "SUCOS", "SUECO", "SUGAR", "SUÍNO",
  "SUÍTE", "SULCO", "SUMIR", "SUPER", "SUPOR", "SUPOR", "SURDO", "SURFE", "SURJA", "SURTO",
  "SUSHI", "TÁBUA", "TACAR", "TACTO", "TAIFA", "TALÃO", "TALCO", "TALHA", "TALHO", "TALOS",
  "TAMPA", "TANGA", "TANGO", "TANTO", "TAPAR", "TAPAS", "TARDE", "TARJA", "TATAR", "TATU",
  "TAXAR", "TAXAS", "TCHAU", "TEATRO", "TECER", "TEDIO", "TELAS", "TEMER", "TEMOR", "TENAZ",
  "TENDA", "TENHA", "TENOR", "TENRA", "TENRO", "TENSA", "TENSO", "TENTA", "TEPOR", "TERÇA",
  "TERMO", "TERNO", "TERRA", "TESÃO", "TESLA", "TESOU", "TESTO", "TETO", "TETRA", "TEXTO",
  "TIARA", "TIGRE", "TIMÃO", "TIMES", "TINHA", "TINTA", "TINTO", "TIRAR", "TITÃ", "TOCAR",
  "TOLAS", "TOMAR", "TONEL", "TÔNUS", "TOQUE", "TORÇA", "TORNA", "TORNE", "TORNO", "TORPE",
  "TORRE", "TOSAR", "TOSCO", "TOURO", "TRABU", "TRAGA", "TRAGO", "TRAIR", "TRAMA", "TRANS",
  "TRAPO", "TRATA", "TRAVA", "TRAVO", "TRAZE", "TREMA", "TREMO", "TREVA", "TREVO", "TRIBO",
  "TRIGO", "TRINO", "TRIO", "TROCA", "TROCO", "TRONO", "TROPA", "TROTA", "TROVA", "TRUCO",
  "TRUFA", "TSUGA", "TUBAS", "TUDO", "TURBA", "TURCO", "TURMA", "TURVA", "TURVO", "TUTOR",
  "UIVAR", "ULTRA", "ÚMIDO", "UNÇÃO", "UNHAS", "UNIDO", "UNTAR", "URANO", "URDIR", "URGIR",
  "ÚRICO", "URINA", "URROS", "URSAS", "URUBU", "USADO", "USINA", "ÚTIL", "UVAIA", "VACAS",
  "VADIA", "VAGÃO", "VAGAR", "VAGOS", "VAIDO", "VALAS", "VALER", "VALOR", "VAPOR", "VARAL",
  "VARÃO", "VARA", "VARIZ", "VASCO", "VASOS", "VASTA", "VASTO", "VATAP", "VÁTER", "VÉU",
  "VEADO", "VEDAR", "VEGAS", "VELAR", "VELHA", "VELHO", "VELOZ", "VENAL", "VENDA", "VENHO",
  "VENTO", "VERÃO", "VERBA", "VERBO", "VERDE", "VEREI", "VERGA", "VERME", "VERSO", "VERTE",
  "VESGA", "VESGO", "VESTE", "VETAR", "VEXAR", "VEZES", "VIADO", "VIANA", "VIBRA", "VICIO",
  "VIDA", "VIDRO", "VIELA", "VIGIA", "VIGOR", "VILÃO", "VIMAR", "VINCO", "VINDA", "VINHO",
  "VIOLA", "VIRAL", "VIRAR", "VIRIL", "VIRIS", "VIRTUA", "VISÃO", "VISCO", "VISSE", "VISTA",
  "VITAL", "VITRO", "VIÚVA", "VIUVE", "VIVAS", "VIVER", "VIVO", "VIZIR", "VOAR", "VOCÊ",
  "VODCA", "VOILE", "VOLTA", "VOLTE", "VOLTO", "VOLVA", "VÔMIT", "VOSSA", "VOTAR", "VOVÔ",
  "VULGO", "VULTO", "XALES", "XEQUE", "XERGA", "XEROS", "XIBIU", "XINGO", "XUCRO", "ZEBRA",
  "ZELAR", "ZERAR", "ZINCO", "ZIPAR", "ZOMBAR", "ZONZO", "ZUMBI", "ZUNIR"

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
