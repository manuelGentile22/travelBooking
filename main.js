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


// Checkbox ritorno

let checkbox = document.getElementById('checkSoloandata');
let boxRitorno = document.getElementById('boxDataOraRitorno');

checkbox.addEventListener('change', () => {
  if(checkbox.checked) {
    boxRitorno.style.visibility = 'hidden';
    boxRitorno.style.display = 'none';
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
    window.open("https://manuelgentile22.github.io/travelBooking/pagina2/index2.html", "_self");
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
    let dataPartenzaPicker = document.getElementById('datePickerAndata').value;
    dataPartenzaPicker = Date.parse(dataPartenzaPicker);
    dataPartenzaPicker = new Date(dataPartenzaPicker)
    dataPartenzaPicker = dataPartenzaPicker.toLocaleString('it-EU', {
        weekday: 'long', 
        day: 'numeric',
        month: 'long', 
        year: 'numeric'
      });
    let dataDiPartenza = dataPartenzaPicker;
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
        let dataRitornoPicker = document.getElementById('datePickerRitorno').value;
        dataRitornoPicker = Date.parse(dataRitornoPicker);
        dataRitornoPicker = new Date(dataRitornoPicker)
        dataRitornoPicker = dataRitornoPicker.toLocaleString('it-EU', {
            weekday: 'long', 
            day: 'numeric',
            month: 'long', 
            year: 'numeric'
          });
        dataDiRitorno = dataRitornoPicker;
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


// CONTROLLI DEL FORM

let generalError = false;
function controllo(){

    //controllo città partenza
    let errorCittà = false;
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
        let dataPartenzaPicker = document.getElementById('datePickerAndata').value;
        dataPartenzaPicker = Date.parse(dataPartenzaPicker);
        dataPartenzaPicker = new Date(dataPartenzaPicker)
            if(isNaN(dataPartenzaPicker.getTime())){
                erroreDataPartenza = true;  
            } 
    
    //controllo data ritorno tutta compilata
        let erroreDataRitorno = false;
        let dataRitornoPicker = document.getElementById('datePickerRitorno').value;
        dataRitornoPicker = Date.parse(dataRitornoPicker);
        dataRitornoPicker = new Date(dataRitornoPicker)
        let checkbox = document.getElementById('checkSoloandata');
            if(!checkbox.checked){
                if(isNaN(dataRitornoPicker.getTime())){
                    erroreDataRitorno = true;  
                } 
            }
    
    
    //controllo data partenza corretta
        let errorDataPartenzaInvalida = false;
        let checkStessoGiorno = false;
        if(erroreDataPartenza == false){
            let dataOggi = new Date();
            let differenza = dataOggi - dataPartenzaPicker;
            if(differenza > 0 ){
                if(dataOggi.getDate() == dataPartenzaPicker.getDate() && dataOggi.getMonth() == dataPartenzaPicker.getMonth() && dataOggi.getFullYear() == dataPartenzaPicker.getFullYear()){
                    errorDataPartenzaInvalida = false;
                    checkStessoGiorno = true;
                }else{
                    errorDataPartenzaInvalida = true;
                }
            }
        }  

    //controllo data ritorno corretta
    let errorDataRitornoInvalida = false;
    if(errorDataPartenzaInvalida == false){
        let differenza = dataPartenzaPicker - dataRitornoPicker;
        if(differenza >= 0 ){
            errorDataRitornoInvalida = true;
        }else{
            errorDataRitornoInvalida = false;
        }
        
    } 

    //controllo orario andata
    let erroreOrarioPartenza = false;
    let checkOraP = document.getElementById('oraP').value;
        if(checkOraP != 'HH'){
            erroreOrarioPartenza = false;  
        } else{
            erroreOrarioPartenza = true;
        }

    //controllo orario ritorno
    let erroreOrarioRitorno = false;
    let checkOraR = document.getElementById('oraR').value;
        if(!checkbox.checked){
            if(checkOraR != 'HH'){
                erroreOrarioRitorno = false;
            } else{
                erroreOrarioRitorno = true;
            }
        }
    
    //controllo orario andata
    let erroreOrarioPartenzaValido = false;
    if(checkStessoGiorno == true){
        let dataOggi = new Date();
        let orarioNow = dataOggi.getHours();
        let differenza = orarioNow - checkOraP
        if(differenza >= 0){
            erroreOrarioPartenzaValido = true;
        }else{
            erroreOrarioPartenzaValido = false;
        }
    }

    //controllo passeggeri
    let errorePasseggeri = false;
    let checkAdultiN = document.getElementById('adulti');
    let checkAdolescentiN = document.getElementById('adolescenti');
    let checkNeonatiN = document.getElementById('neonati');
        if(isNaN(checkAdultiN.value) || checkAdultiN.value<=0){
            errorePasseggeri = true;
        } 
        if(isNaN(checkAdolescentiN.value) || checkAdolescentiN.value<0){
            errorePasseggeri = true;
        }
        if(isNaN(checkNeonatiN.value) || checkNeonatiN.value<0){
            errorePasseggeri = true;
        }

    //attivazione errori nel form

    if(errorCittà == true){
        activeError()
    }else{
        InactiveError()
    }

    //data partenza mancante
    if(erroreDataPartenza == true){
        activeErrorData();
    }else {
        InactiveErrorData();
    }
    //data ritorno mancante
    if(erroreDataRitorno == true){
        activeErrorDataR();
    }else{
        InactiveErrorDataR();
    }

    //data partenza invalida
    if(errorDataPartenzaInvalida == true){
        activeErrorDataPartenzaNonValida();
    }else{
        InactiveErrorDataPartenzaNonValida();
    }

    //data ritorno invalida
    if(errorDataRitornoInvalida ==true){
        activeErrorDataRitornoNonValida();
    }else{
        InactiveErrorDataRitornoNonValida();
    }

    //orario partenza mancante
    if(erroreOrarioPartenza == true){
        activeErrorOraA();
    }else{
        InactiveErrorOraA();
    }

    //orario partenza invalido
    if(erroreOrarioPartenzaValido == true){
        activeErroreOrarioPartenzaInvalido();
    }else{
        InactiveErroreOrarioPartenzaInvalido();
    }

    //orario ritorno mancante
    if(erroreOrarioRitorno == true){
        activeErrorOraR();
    }else{
        InactiveErrorOraR();
    }

    //errore passeggeri
    if(errorePasseggeri == true){
        activeErrorPasseggeri()
    }else{
        InactiveErrorPasseggeri()
    }

    //controllo errori finale
    if(errorCittà == false && erroreDataPartenza == false && errorDataPartenzaInvalida == false && erroreDataRitorno == false && errorDataRitornoInvalida == false && erroreOrarioPartenza == false && erroreOrarioPartenzaValido == false && erroreOrarioRitorno == false && errorePasseggeri == false){
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

//funzioni di errore ( data andata )

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

//funzioni di errore ( data ritorno )

function activeErrorDataR(){
    let spanData = document.getElementById('errorDataR');
    if(!spanData.classList.contains('active')){
        spanData.classList.add('active');
    }
}

function InactiveErrorDataR(){
    let spanData = document.getElementById('errorDataR');
    spanData.classList.remove("active");
}

//funzioni di errore ( data partenza non valida )

function activeErrorDataPartenzaNonValida(){
    let spanData = document.getElementById('errorDataValida');
    if(!spanData.classList.contains('active')){
        spanData.classList.add('active');
    }
}

function InactiveErrorDataPartenzaNonValida(){
    let spanData = document.getElementById('errorDataValida');
    spanData.classList.remove("active");
}

//funzioni di errore ( data ritorno non valida )

function activeErrorDataRitornoNonValida(){
    let spanData = document.getElementById('errorDataRValida');
    if(!spanData.classList.contains('active')){
        spanData.classList.add('active');
    }
}

function InactiveErrorDataRitornoNonValida(){
    let spanData = document.getElementById('errorDataRValida');
    spanData.classList.remove("active");
}

//funzioni di errore ( ora andata )

function activeErrorOraA(){
    let spanData = document.getElementById('errorOrario');
    if(!spanData.classList.contains('active')){
        spanData.classList.add('active');
    }
}

function InactiveErrorOraA(){
    let spanData = document.getElementById('errorOrario');
    spanData.classList.remove("active");
}

//funzioni di errore ( ora andata invalida)

function activeErroreOrarioPartenzaInvalido(){
    let spanData = document.getElementById('errorOrarioValido');
    if(!spanData.classList.contains('active')){
        spanData.classList.add('active');
    }
}

function InactiveErroreOrarioPartenzaInvalido(){
    let spanData = document.getElementById('errorOrarioValido');
    spanData.classList.remove("active");
}
//funzioni di errore ( ora ritorno )

function activeErrorOraR(){
    let spanData = document.getElementById('errorOrarioR');
    if(!spanData.classList.contains('active')){
        spanData.classList.add('active');
    }
}

function InactiveErrorOraR(){
    let spanData = document.getElementById('errorOrarioR');
    spanData.classList.remove("active");
}

//funzioni di errore ( passeggeri )

function activeErrorPasseggeri(){
    let spanData = document.getElementById('errorPasseggeri');
    if(!spanData.classList.contains('active')){
        spanData.classList.add('active');
    }
}

function InactiveErrorPasseggeri(){
    let spanData = document.getElementById('errorPasseggeri');
    spanData.classList.remove("active");
}


