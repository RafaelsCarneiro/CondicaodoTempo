"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos três letras");
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=69b2458cd04623d45ca67e68b53461f1&lang=pt_br&units=metric`);
        const dados = yield resposta.json();
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
    }
    catch (err) {
        console.log("Deu um erro na obtenção dos dados da API", err);
    }
}));
