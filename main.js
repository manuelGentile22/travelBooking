//Lettura e presa file json
let tratteJson = function(){
    let tmp = null;
    $.ajax({
        async: false,
        url : 'https://manuelgentile22.github.io/travelBooking//DBJson/tratte.json',
        method: 'GET',
        success: function(data){
            tmp = data;
        }
    });
    return tmp;
}();

// funzione al caricamento della pagina
function loadPagina(){
    $('.partenzaList').remove();
    $('.destinazioneList').remove();
    caricaListaPartenze('citiesP', tratteJson.partenza);
    checkboxRitornoL();
    document.getElementById('giornoP').innerText
    cencellaCookie('partenza');
    cencellaCookie('destinazione');
    cencellaCookie('dataAndata');
    cencellaCookie('dataRitorno');
    cencellaCookie('passeggeri');
}

// verifica cookie

//Caricamento lista partenza

function caricaListaPartenze(select, cittàP){
    for (i in cittàP) {
        let valoreP = cittàP[i].città;
        $('#'+select).append("<option value='" + valoreP + "' class='partenzaList'>" +  valoreP + "</option>")
      }
};

document.getElementById('citiesP').onblur = function(){
    $('.destinazioneList').remove();
    let checkCittàD = document.getElementById('citiesD');
    if(!valoreP.value == 'partenza'){
        if(checkCittàD.value == 'ritorno'){
            caricaListaDestinazione('citiesD', tratteJson.partenza);
        }
    }
}

//Caricamento lista destinazione

let valoreP = document.getElementById("citiesP");
let ritorno = document.getElementById('citiesD');
ritorno.onfocus = function(){
    $('.destinazioneList').remove();
    if(valoreP.value != 'partenza'){
        caricaListaDestinazione('citiesD', tratteJson.partenza);
    }
}

function caricaListaDestinazione(select, cittàP){
    for (i in cittàP) {
        if(valoreP.value == cittàP[i].città){
            for (j in cittàP[i].destinazione){
                let valoreD = cittàP[i].destinazione[j].città;
                $('#'+select).append("<option value='" + valoreD + "' class='destinazioneList'>" + valoreD + "</option>")
            }
        }
    }
};

//caricamento scelta data

let giornoP = document.getElementById('giornoP');

giornoP.onfocus = function(){
    $('.giornoPartenza').remove();
    let year = document.getElementById('annoP').value;
    let month = document.getElementById('meseP').value;
    if(year != 'Anno' && month != 'Mese'){
        if(month == '3' || month == '5' || month == '8' || month == '10'){
            let i = 1;
            let max = 31
            for(i; i<max;i++){
                let data = new Date(year, month, i);
                data = data.toLocaleString('it-EU', {
                    weekday: 'long',
                    day: 'numeric'
                  });
                let option = document.createElement("option");
                option.text = data;
                option.value = i;
                option.className='giornoPartenza';
                giornoP.appendChild(option);
            }
        } else if (month == '1'){
            if(year != '2024'){
                let i = 1;
                let max = 29
                for(i; i<max;i++){
                    let data = new Date(year, month, i);
                    data = data.toLocaleString('it-EU', {
                        weekday: 'long',
                        day: 'numeric'
                    });
                    let option = document.createElement("option");
                    option.text = data;
                    option.value = i;
                    option.className='giornoPartenza';
                    giornoP.appendChild(option);
                }
            }else{
                let i = 1;
                let max = 30
                for(i; i<max;i++){
                    let data = new Date(year, month, i);
                    data = data.toLocaleString('it-EU', {
                        weekday: 'long',
                        day: 'numeric'
                    });
                    let option = document.createElement("option");
                    option.text = data;
                    option.value = i;
                    option.className='giornoPartenza';
                    giornoP.appendChild(option);
                }
            }
        } else {
            let i = 1;
            let max = 32
            for(i; i<max;i++){
                let data = new Date(year, month, i);
                data = data.toLocaleString('it-EU', {
                    weekday: 'long',
                    day: 'numeric'
                });
                let option = document.createElement("option");
                option.text = data;
                option.value = i;
                option.className='giornoPartenza';
                giornoP.appendChild(option);
            }
        }
    }
}

let giornoR = document.getElementById('giornoR');

giornoR.onfocus = function(){
    $('.giornoRitorno').remove();
    let year = document.getElementById('annoR').value;
    let month = document.getElementById('meseR').value;
    if(year != 'Anno' && month != 'Mese'){
        if(month == '3' || month == '5' || month == '8' || month == '10'){
            let i = 1;
            let max = 31
            for(i; i<max;i++){
                let data = new Date(year, month, i);
                data = data.toLocaleString('it-EU', {
                    weekday: 'long',
                    day: 'numeric'
                });
                let option = document.createElement("option");
                option.text = data;
                option.value = i;
                option.className='giornoRitorno';
                giornoR.appendChild(option);
            }
        } else if (month == '1'){
            if(year != '2024'){
                let i = 1;
                let max = 29
                for(i; i<max;i++){
                    let data = new Date(year, month, i);
                    data = data.toLocaleString('it-EU', {
                        weekday: 'long',
                        day: 'numeric'
                    });
                    let option = document.createElement("option");
                    option.text = data;
                    option.value = i;
                    option.className='giornoRitorno';
                giornoR.appendChild(option);
                }
            }else{
                let i = 1;
                let max = 30
                for(i; i<max;i++){
                    let data = new Date(year, month, i);
                    data = data.toLocaleString('it-EU', {
                        weekday: 'long',
                        day: 'numeric'
                    });
                    let option = document.createElement("option");
                    option.text = data;
                    option.value = i;
                    option.className='giornoRitorno';
                    giornoR.appendChild(option);
                }
            }
        } else {
            let i = 1;
            let max = 32
            for(i; i<max;i++){
                let data = new Date(year, month, i);
                data = data.toLocaleString('it-EU', {
                    weekday: 'long',
                    day: 'numeric'
                });
                let option = document.createElement("option");
                option.text = data;
                option.value = i;
                option.className='giornoRitorno';
                giornoR.appendChild(option);
            }
        }
    }
}

// Checkbox ritorno

let checkbox = document.getElementById('checkSoloandata');
let boxRitorno = document.getElementById('boxDataOraRitorno');

checkbox.addEventListener('change', () => {
  if(checkbox.checked) {
    boxRitorno.style.visibility = 'hidden';
    boxRitorno.style.display = 'none';
    document.getElementById('annoR').value = 'Anno';
    document.getElementById('meseR').value = 'Mese';
    $('.giornoRitorno').remove();
    document.getElementById('oraR').value = 'HH';
  } else {
    boxRitorno.style.visibility = 'visible';
    boxRitorno.style.display = 'flex';
  }
});  

function checkboxRitornoL(){
    let checkbox2 = document.getElementById('checkSoloandata');
    let boxRitorno2 = document.getElementById('boxDataOraRitorno');
    if(checkbox2.checked) {
        boxRitorno2.style.visibility = 'hidden';
        boxRitorno2.style.display = 'none';
        document.getElementById('annoR').value = 'Anno';
        document.getElementById('meseR').value = 'Mese';
        $('.giornoRitorno').remove();
        document.getElementById('oraR').value = 'HH';
      } else {
        boxRitorno2.style.visibility = 'visible';
        boxRitorno2.style.display = 'flex';
      }
}

// Controllo change anno e mese

let annoP = document.getElementById('annoP');
annoP.onchange = function(){
    $('.giornoPartenza').remove();
};
let annoR = document.getElementById('annoR');
annoR.onchange = function(){
    $('.giornoRitorno').remove();
};
let meseP = document.getElementById('meseP');
meseP.onchange = function(){
    $('.giornoPartenza').remove();
};
let meseR = document.getElementById('meseR');
meseR.onchange = function(){
    $('.giornoRitorno').remove();
};

//Bottone
let objForm = {};
let btn = document.getElementById('invioDatiTesto');
btn.onclick = () =>{
    if(controllo()){
        createOggettoParametri();
        scriviCookie('partenza',objForm.partenza);
        scriviCookie('destinazione',objForm.destinazione);
        scriviCookie('dataAndata',objForm.dataAndata);
        scriviCookie('orarioAndata',objForm.orarioAndata);
        scriviCookie('dataRitorno',objForm.dataRitorno);
        scriviCookie('orarioRitorno',objForm.orarioRitorno);
        scriviCookie('passeggeri',objForm.passeggeri);
        scriviCookie('prezzoAndata',objForm.prezzoAndata);
        scriviCookie('prezzoRitorno',objForm.prezzoRitorno);
        EnterPage();
    }
};

//creazione cookie

function scriviCookie(nomeCookie,valoreCookie){
  document.cookie = nomeCookie + '=' + escape(valoreCookie)+ '; path=/';
}

//cancellazzione cookie

function cencellaCookie(nomeCookie)
{
  scriviCookie(nomeCookie,'',-1);
}

// indirizzamento nuova pagina

function EnterPage(){
    window.open("/pagina2/index2.html", "_self");
}

//creazione oggetto con dati dell'utente
const parametriUtente = (partenza, destinazione, dataAndata, orarioAndata, dataRitorno, orarioRitorno, passeggeri, prezzoAndata, prezzoRitorno)=>{
    return{
        partenza : partenza,
        destinazione : destinazione,
        dataAndata : dataAndata,
        orarioAndata : orarioAndata,
        dataRitorno : dataRitorno,
        orarioRitorno : orarioRitorno,
        passeggeri : passeggeri,
        prezzoAndata : prezzoAndata,
        prezzoRitorno : prezzoRitorno
    }
};

function createOggettoParametri(){
    let cittàDiPartenza = document.getElementById('citiesP').value;
    let cittàDiDestinazione = document.getElementById('citiesD').value;
    let annoDiPartenza = document.getElementById('annoP').value;
    let meseDiPartenza = document.getElementById('meseP').value;
    let giornoDiPartenza = document.getElementById('giornoP').value;
    let dataDiPartenza = [annoDiPartenza, meseDiPartenza, giornoDiPartenza];
    let orarioPartenza = document.getElementById('oraP').value;
    let dataDiRitorno;
    let orarioRitorno;
    let prezzoRitorno = []
    let passeggeriAdulti = document.getElementById('adulti').value;
    let passeggeriAdolescenti = document.getElementById('adolescenti').value;
    passeggeriNeonati = document.getElementById('neonati').value;
    let prezzoAndata = []
    for (i in tratteJson.partenza) {
        if(cittàDiPartenza == tratteJson.partenza[i].città){
            for (j in tratteJson.partenza[i].destinazione){
                if(cittàDiDestinazione == tratteJson.partenza[i].destinazione[j].città){
                    let y=0;
                    for (y in tratteJson.partenza[i].destinazione[j].prezzo){
                        prezzoAndata[y] = tratteJson.partenza[i].destinazione[j].prezzo[y].prezzo
                    }
                }
            }
        }
    }
    if(checkbox.checked) {
        dataDiRitorno = false;
        orarioRitorno = false;
        prezzoRitorno = false;
    } else {
        let annoDiRitorno = document.getElementById('annoR').value;
        let meseDiRitorno = document.getElementById('meseR').value;
        let giornoDiRitorno = document.getElementById('giornoR').value;
        dataDiRitorno = [annoDiRitorno, meseDiRitorno, giornoDiRitorno];
        orarioRitorno = document.getElementById('oraR').value;
        for (i in tratteJson.partenza) {
            if(cittàDiDestinazione == tratteJson.partenza[i].città){
                for (j in tratteJson.partenza[i].destinazione){
                    if(cittàDiPartenza == tratteJson.partenza[i].destinazione[j].città){
                        let y=0;
                        for (y in tratteJson.partenza[i].destinazione[j].prezzo){
                            prezzoRitorno[y] = tratteJson.partenza[i].destinazione[j].prezzo[y].prezzo
                        }
                    }
                }
            }
        }
    }
    let passeggeriViaggio = [passeggeriAdulti, passeggeriAdolescenti, passeggeriNeonati];
    objForm = parametriUtente(cittàDiPartenza, cittàDiDestinazione, dataDiPartenza, orarioPartenza, dataDiRitorno, orarioRitorno, passeggeriViaggio, prezzoAndata, prezzoRitorno);
}


// controlli del form

let generalError = false;
function controllo(){
    let errorCittà = false;
    //controllo città partenza
    let checkCittàP = document.getElementById('citiesP');
        for (i in tratteJson.partenza) {
            if(checkCittàP.value != tratteJson.partenza[i].città){
                errorCittà = true;
            }else{
                errorCittà = false;
                break;
            }
        }
    //controllo città destinazione
        let checkCittàD = document.getElementById('citiesD');
        if(checkCittàD.value != checkCittàP.value){
            for (i in tratteJson.partenza) {
                if(checkCittàP.value==tratteJson.partenza[i].città){
                    for (j in tratteJson.partenza[i].destinazione){
                        if(checkCittàD.value != tratteJson.partenza[i].destinazione[j].città){
                            errorCittà = true;
                        }else{
                            errorCittà = false;
                            break;
                        }
                    }
                }
            }
        } else{
            errorCittà = true;
        }

    //controllo data andata tutta compilata
    let erroreDataPartenza = false;
    let checkAnnoP = document.getElementById('annoP').value;
    let checkMeseP = document.getElementById('meseP').value;
    let checkGiornoP = document.getElementById('giornoP').value;
    let checkOraP = document.getElementById('oraP').value;
        if(checkAnnoP != 'Anno' && checkMeseP != 'Mese' && checkGiornoP != 'Giorno' && checkOraP != 'HH'){
            erroreDataPartenza = false;  
        } else{
            erroreDataPartenza = true;
        }

    //controllo data ritorno tutta compilata
    let erroreDataRitorno = false;
    let checkAnnoR = document.getElementById('annoR').value;
    let checkMeseR = document.getElementById('meseR').value;
    let checkGiornoR = document.getElementById('giornoR').value;
    let checkOraR = document.getElementById('oraR').value;
    let checkbox = document.getElementById('checkSoloandata');
        if(!checkbox.checked){
            if(checkAnnoR != 'Anno' && checkMeseR != 'Mese' && checkGiornoR != 'Giorno' && checkOraR != 'HH'){
                erroreDataRitorno = false;
            } else{
                erroreDataRitorno = true;
            }
        }

    //controllo data inserita correttamente
    let errorAnnoIncorretto = false;
    let errorMeseIncorretto = false;
    let errorGiornoIncorretto = false;
        if(!checkbox.checked){
            checkAnnoP = parseInt(checkAnnoP);
            checkAnnoR = parseInt(checkAnnoR);
            if(checkAnnoP>checkAnnoR){
                errorAnnoIncorretto = true;
                console.log('Inserire anno corretto');
            } else if(checkAnnoP == checkAnnoR){
                checkMeseP = parseInt(checkMeseP);
                checkMeseR = parseInt(checkMeseR);
                if(checkMeseR >= checkMeseP){
                    if(checkMeseR > checkMeseP){

                    }else{
                        checkGiornoP = parseInt(checkGiornoP);
                        checkGiornoR = parseInt(checkGiornoR);
                        if(checkGiornoR < checkGiornoP){
                            errorGiornoIncorretto = true;
                            console.log('Inserire giorno corretto');
                        } else if (checkGiornoR == checkGiornoP) {
                            //implementazione controllo orario
                        }
                    }
                }else{
                    errorMeseIncorretto = true;
                    console.log('Inserire mese corretto');
                }
            }
        }
    //controllo data partenza corretta
        let errorDataPartenzaInvalida = false;
        let dataOggi = new Date();
        let partenzaAnno = document.getElementById('annoP').value;
        let partenzaMese = document.getElementById('meseP').value;
        let partenzaGiorno = document.getElementById('giornoP').value;
        let dataPartenza = new Date(partenzaAnno, partenzaMese, partenzaGiorno);
        let valoreNP = dataPartenza.getTime();
        let valoreNO = dataOggi.getTime();
        let differenza = valoreNP - valoreNO;
        if(differenza < 0 ){
            errorDataPartenzaInvalida = true;
        }

    //attivazione errori nel form

    if(errorCittà == true){
        activeError()
    }else{
        InactiveError()
    }

    if(erroreDataPartenza == true || erroreDataRitorno == true || errorAnnoIncorretto == true || errorMeseIncorretto == true || errorGiornoIncorretto == true || errorDataPartenzaInvalida == true){
        activeErrorData();
    }else {
        InactiveErrorData();
    }

    //controllo errori finale
    if(errorCittà == false && erroreDataPartenza == false && erroreDataRitorno == false && errorAnnoIncorretto == false && errorMeseIncorretto == false && errorGiornoIncorretto == false && errorDataPartenzaInvalida == false){
        generalError = true;
    } else{
        generalError = false;
    }

    return generalError;
}

//funzioni di errore ( città )

function activeError(){
    let spanCittà = document.getElementById('errorCittà');
    if(!spanCittà.classList.contains('active')){
        spanCittà.classList.add('active');
    }
}

function InactiveError(){
    let spanCittà = document.getElementById('errorCittà');
    spanCittà.classList.remove("active");
}

//funzioni di errore ( data )

function activeErrorData(){
    let spanData = document.getElementById('errorData');
    if(!spanData.classList.contains('active')){
        spanData.classList.add('active');
    }
}

function InactiveErrorData(){
    let spanData = document.getElementById('errorData');
    spanData.classList.remove("active");
}