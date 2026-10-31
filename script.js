//  Makeland - Simulação de compra

const PRECO_RIMEL = 15.0;
const PRECO_BATOM = 9.5;
const PRECO_BLUSH = 20.0;
const PRECO_SOMBRA = 40.0;



const VALOR_MINIMO_DESCONTO = 50.0; // compras a partir deste valor têm desconto
const PERCENTUAL_DESCONTO = 0.10;   // 10%

// Formata um número como dinheiro
function formatarReais(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// Pergunta a quantidade de um produto e só aceita número inteiro >= 0
function perguntarQuantidade(nomeProduto, preco) {
  let quantidade = Number(
    prompt("Quantas unidades de " + nomeProduto + " (" + formatarReais(preco) + ") você deseja?\nDigite 0 para não comprar.")
  );

  while (isNaN(quantidade) || quantidade < 0 || !Number.isInteger(quantidade)) {
    quantidade = Number(
      prompt("Valor inválido! Digite um número inteiro igual ou maior que 0 para " + nomeProduto + ":")
    );
  }

  return quantidade;
}

// Função chamada pelo botão "Simular compra" (onclick)
function simularCompra() {
  // 1 e 2. Perguntar e converter as quantidades
  const qtdRimel = perguntarQuantidade("Rimel", PRECO_RIMEL);
  const qtdBatom = perguntarQuantidade("Batom", PRECO_BATOM);
  const qtdBlush = perguntarQuantidade("Blush", PRECO_BLUSH);
  const qtdSombra = perguntarQuantidade("Sombra", PRECO_SOMBRA);

  // Se nada foi escolhido, avisa e encerra
  if (qtdRimel === 0 && qtdBatom === 0 && qtdBlush === 0 && qtdSombra === 0) {
    alert("Nenhum produto foi selecionado. Volte sempre à Makeland!");
    return;
  }
  

  // Calcular preço × quantidade
  const valorRimel = PRECO_RIMEL * qtdRimel;
  const valorBatom = PRECO_BATOM * qtdBatom;
  const valorBlush = PRECO_BLUSH * qtdBlush;
  const valorSombra = PRECO_SOMBRA * qtdSombra;

  const subtotal = valorRimel + valorBatom + valorBlush + valorSombra;

  // Verificar direito ao desconto
  let desconto = 0;
  if (subtotal >= VALOR_MINIMO_DESCONTO) {
    desconto = subtotal * PERCENTUAL_DESCONTO;
  }
  const total = subtotal - desconto;

  // Montar e exibir o resumo
  let resumo = " RESUMO DA COMPRA - MAKELAND\n\n";
  resumo += "Rimel: " + qtdRimel + " un. = " + formatarReais(valorRimel) + "\n";
  resumo += "Batom: " + qtdBatom + " un. = " + formatarReais(valorBatom) + "\n";
  resumo += "Blush: " + qtdBlush + " un. = " + formatarReais(valorBlush) + "\n";
  resumo += "Sombra: " + qtdSombra + " un. = " + formatarReais(valorSombra) + "\n\n";
  resumo += "Subtotal: " + formatarReais(subtotal) + "\n";

  if (desconto > 0) {
    resumo += "Desconto (10%): -" + formatarReais(desconto) + "\n";
  } else {
    const falta = VALOR_MINIMO_DESCONTO - subtotal;
    resumo += "Sem desconto (faltaram " + formatarReais(falta) + " para ganhar 10%)\n";
  }

  resumo += "\nTOTAL A PAGAR: " + formatarReais(total);

  alert(resumo);
  
  // Mostra o resumo também no painel lateral
  document.getElementById("resumo").innerText = resumo;
  abrirPainel();
}

function abrirPainel() {
  document.getElementById("painel").classList.add("aberto");
  document.getElementById("fundo").classList.add("aberto");
}

function fecharPainel() {
  document.getElementById("painel").classList.remove("aberto");
  document.getElementById("fundo").classList.remove("aberto");
}

