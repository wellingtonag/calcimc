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
  const msg = `
      <p class="nome__result">Olá ${nome}</p>    
      <p><span style="font-weight:bold">${
        diaSemana[data.getDay()]
      }</span>, ${data.getDate()} de ${
    meses[data.getMonth()]
  } de ${data.getFullYear()}.</p>
      <p> Hora: ${horas}:${minutos}</p>                   
      <p><span style="font-weight:bold">Idade:</span> ${calculaIdade(
        dataNasc
      )}</p>
      <p class="imc-result__p">Seu IMC é: <span class="imc__result">${imc}</span> ${nivelImc}</p>`;
  setResultado(msg, true);
});

function calculaIdade() {
  var userinput = document.getElementById("idade").value;
  var dataNasc = new Date(userinput);
  if (userinput == null || userinput == "") {
    document.getElementById("message").innerHTML = "**Escolha uma data!";
    return false;
  } else {
    //calculate month difference from current date in time
    var month_diff = Date.now() - dataNasc.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);

    //display the calculated age
    return (document.getElementById("idade").innerHTML =
      "Você tem " + age + " anos. ");
  }
}

function getNivelImc(imc) {
  const nivel = [
    "Peso baixo",
    "Peso normal",
    "Sobrepeso",
    "Obesidade (Grau I)",
    "Obesidade Severa (Grau II)",
    "Obesidade Mórbida - Grau III",
  ];

  if (imc >= 39.9) {
    return (nivel[5] = `<span class="nivel__result" style="background:#f82e00; color:#fff">${nivel[5]}</span>`);
  }
  if (imc >= 34.9) {
    return (nivel[4] = `<span class="nivel__result" style="background:#f8970d">${nivel[4]}</span>`);
  }
  if (imc >= 29.9) {
    return (nivel[3] = `<span class="nivel__result" style="background:#ffe406">${nivel[3]}</span>`);
  }
  if (imc >= 24.9) {
    return (nivel[2] = `<span class="nivel__result" style="background:#66ff00">${nivel[2]}</span>`);
  }
  if (imc >= 18.5) {
    return (nivel[1] = `<span class="nivel__result" style="background:#009900; color:#fff">${nivel[1]}</span>`);
  }
  if (imc < 18.5) {
    return (nivel[0] = `<span class="nivel__result" style="background:#ffe406">${nivel[0]}</span>`);
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
