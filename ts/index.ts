const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info");
form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter pelo menos três letras");
    return;
  }
  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=69b2458cd04623d45ca67e68b53461f1&lang=pt_br&units=metric`
    );
    const dados = await resposta.json();

    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
      tempmax: Math.round(dados.main.temp_max),
      tempmin: Math.round(dados.main.temp_min),
      descr: dados.weather[0].description,
    };
    sectionTempoInfo.innerHTML = `
  <div class="tempo-dados">
    <h2>${infos.local}</h2>
    <span>${infos.temperatura}°C</span>
  
   <div class="temp">
      <p>MAX   ${infos.tempmax}°<p> 
      <p>MIN   ${infos.tempmin}°<p>
    </div> 
    
  </div>
    <div class="descr">
      <img src="${infos.icone}"/>
        <h3>${infos.descr}<h3>
    </div>

`;
  } catch (err) {
    console.log("Deu um erro na obtenção dos dados da API", err);
  }
});
