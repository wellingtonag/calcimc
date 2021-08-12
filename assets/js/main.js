// Capture form submit event

const form = document.querySelector("#formulario");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputNome = e.target.querySelector("#nome");
  const inputIdade = e.target.querySelector("#idade");
  const inputPeso = e.target.querySelector("#peso");
  const inputAltura = e.target.querySelector("#altura");

  const nome = String(inputNome.value);
  const dataNasc = inputIdade.value;
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  const diaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const zeroFill = (n) => {
    return ("0" + n).slice(-2);
  };

  const data = new Date();
  const dataFormatada =
    diaSemana[data.getDay()] +
    "," +
    data.getDate() +
    " " +
    meses[data.getMonth()] +
    " " +
    data.getFullYear();

  const horas = zeroFill(data.getHours());
  const minutos = zeroFill(data.getMinutes());
  const segundos = zeroFill(data.getSeconds());

  if (!nome) {
    setResultado("Nome inválido", false);
    return;
  }
  if (!dataNasc) {
    setResultado("Idade inválida", false);
    return;
  }
  if (!peso) {
    setResultado("Peso inválido", false);
    return;
  }

  if (!altura) {
    setResultado("Altura inválida", false);
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);
  const msg = `<p>${diaSemana[data.getDay()]},${data.getDate()} de ${
    meses[data.getMonth()]
  } de ${data.getFullYear()}. Hora: ${horas}:${minutos}.</p>
               <p>Nome: ${nome}</p>
               
               <p>Idade: ${calculaIdade(dataNasc)} Anos</p>
               <p>Seu IMC é ${imc} (${nivelImc}).</p>`;
  setResultado(msg, true);
  // continua o código
});

function calculaIdade(dataNasc) {
  const dataAtual = new Date();
  let anoAtual = dataAtual.getFullYear();
  let anoNascParts = dataNasc.split("/");
  let diaNasc = anoNascParts[0];
  let mesNasc = anoNascParts[1];

  let anoNasc = anoNascParts[2];
  let idade = anoAtual - anoNasc;
  let mesAtual = dataAtual.getMonth() + 1;

  //Se mês atual for menor que o nascimento, não fez aniversário ainda;

  if (mesAtual < mesNasc) {
    idade--;
  } else {
    // se tiver no mês de nascimento, verificar o dia;

    if (mesAtual === mesNasc) {
      if (new Date().getDate() < diaNasc) {
        //se a data atual for menor que o dia do nascimento, não fez aniversário ainda

        idade--;
      }
    }
  }

  //document.write(`Data do Aniversário: ${diaNasc}/${mesNasc} <br>`); //sem solução ainda
  return idade;
}

function getNivelImc(imc) {
  const nivel = [
    "Peso baixo",
    "Peso normal",
    "Sobrepeso",
    "Obesidade (Grau I)",
    "Obesidade Severa (Grau II)",
    "Obesidade Mórbida (Grau III)",
  ];

  if (imc >= 39.9) {
    return nivel[5];
  }
  if (imc >= 34.9) {
    return nivel[4];
  }
  if (imc >= 29.9) {
    return nivel[3];
  }
  if (imc >= 24.9) {
    return nivel[2];
  }
  if (imc >= 18.5) {
    return nivel[1];
  }
  if (imc < 18.5) {
    return nivel[0];
  }
}

function getImc(peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

function criaP() {
  const p = document.createElement("p");
  return p;
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector("#resultado");
  resultado.innerHTML = "";

  const p = criaP();

  if (isValid) {
    p.classList.add("paragrafo-resultado");
  } else {
    p.classList.add("bad");
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}
