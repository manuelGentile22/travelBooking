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

// lettura cookie

function leggiCookie(nomeCookie)
{
  if (document.cookie.length > 0)
  {
    let inizio = document.cookie.indexOf(nomeCookie + "=");
    if (inizio != -1)
    {
      inizio = inizio + nomeCookie.length + 1;
      let fine = document.cookie.indexOf(";",inizio);
      if (fine == -1) fine = document.cookie.length;
      return unescape(document.cookie.substring(inizio,fine));
    }else{
       return "";
    }
  }
  return "";
}


// Assegnazione cookie a variabile
let spanAndata = document.getElementById('spanAndata');
let spanRitorno = document.getElementById('spanRitorno');
let partenza = leggiCookie('partenza');
let destinazione = leggiCookie('destinazione');
let dataAndata = leggiCookie('dataAndata');
let orarioAndata = leggiCookie('orarioAndata');
orarioAndata = parseInt(orarioAndata);
let dataRitorno = leggiCookie('dataRitorno');
let orarioRitorno = leggiCookie('orarioRitorno');
let passeggeri = leggiCookie('passeggeri');
dataAndata = dataAndata.split(',');
let prezzoPA = leggiCookie('prezzoAndata');
prezzoPA = prezzoPA.split(',');
let prezzoPR = leggiCookie('prezzoRitorno');
let nuovaPartenza;
let nuovaDestinazione;
let nuovaDataRitorno;
if(dataRitorno=='false'){
    spanAndata.className='sSoloAndata';
    spanRitorno.className='nascondiSpanRitorno';
}else{
    spanAndata.className='sAndata';
    spanRitorno.className='sRitorno';
    dataRitorno = dataRitorno.split(',');
    orarioRitorno = parseInt(orarioRitorno);
    nuovaPartenza = destinazione;
    nuovaDestinazione = partenza;
    nuovaDataRitorno = dataRitorno;
    prezzoPR = prezzoPR.split(',');
}
passeggeri = passeggeri.split(',');


// creazione del box di scelta
function caricaOpzioniAndataRitorno(){
    let boxScelte = document.getElementById('scelteContainer');
    let paragrafoInfo = document.createElement('p');
    paragrafoInfo.className='paragrafoSelezionareOrario';
    let stringaparagrafoInfo = "Selezionare l'orario desiderato";
    paragrafoInfo.innerText = stringaparagrafoInfo;
    boxScelte.appendChild(paragrafoInfo);
    for(i in tratteJson.partenza){
        if(partenza == tratteJson.partenza[i].città){
            for (j in tratteJson.partenza[i].destinazione){
                if(destinazione == tratteJson.partenza[i].destinazione[j].città){
                    let yPartenza = dataAndata[0];
                    let mPartenza = dataAndata[1];
                    let dPartenza = dataAndata[2];
                    let datePartenza = new Date(yPartenza, mPartenza, dPartenza);
                    let dataPartenza = new Date(yPartenza, mPartenza, dPartenza);
                    datePartenza = datePartenza.toLocaleString('it-EU', {
                        weekday: 'long'
                      });
                    dataPartenza = dataPartenza.toLocaleString('it-EU', {
                        weekday: 'long', 
                        day: 'numeric',
                        month: 'long', 
                        year: 'numeric'
                      });
                    for(let x=0;x<tratteJson.partenza[i].destinazione[j].orario.length;x++){
                        for(let z=0; z<tratteJson.partenza[i].destinazione[j].orario[x].giorno.length;z++){
                            if(datePartenza == tratteJson.partenza[i].destinazione[j].orario[x].giorno[z]){
                                for(let y=0; y<tratteJson.partenza[i].destinazione[j].orario[x].orariPartenze.length; y++){
                                    let oraLimite = parseInt(tratteJson.partenza[i].destinazione[j].orario[x].orariPartenze[y]);
                                    if(orarioAndata>oraLimite){
                                        continue
                                    }else{
                                        let orarioPartenza = tratteJson.partenza[i].destinazione[j].orario[x].orariPartenze[y];
                                        
                                        //Creazioni dei contenitori opzioni
                                        let boxScelte = document.getElementById('scelteContainer');
                                        let box = document.createElement('div');
                                        box.className='contenitoreOpzioni';
                                        box.id='box'+(y+1);
                                        boxScelte.appendChild(box);
    
                                        //Creazioni del contenitore città P e D
                                        let boxCittàPD = document.createElement('div');
                                        boxCittàPD.className='contenitoreCittàPD';
                                        box.appendChild(boxCittàPD);
                                        //Creazioni del contenitore città P
                                        let boxCittàPartenza = document.createElement('div');
                                        boxCittàPartenza.className='contenitoreCittàPartenza';
                                        boxCittàPD.appendChild(boxCittàPartenza);
                                        let paragrafoCittàPartenza = document.createElement('p');
                                        paragrafoCittàPartenza.className='paragrafiElementi';
                                        let stringaCittàPartenza = 'Da: '+partenza;
                                        paragrafoCittàPartenza.innerText = stringaCittàPartenza;
                                        boxCittàPartenza.appendChild(paragrafoCittàPartenza);
                                        //Creazioni del contenitore città D
                                        let boxCittàDestinazione = document.createElement('div');
                                        boxCittàDestinazione.className='contenitoreCittàDestinazione';
                                        boxCittàPD.appendChild(boxCittàDestinazione);
                                        let paragrafoCittàDestinazione = document.createElement('p');
                                        paragrafoCittàDestinazione.className='paragrafiElementi';
                                        let stringaCittàDestinazione = 'A: '+destinazione;
                                        paragrafoCittàDestinazione.innerText = stringaCittàDestinazione;
                                        boxCittàDestinazione.appendChild(paragrafoCittàDestinazione);
                                        
                                        //Creazioni del contenitore passeggeri
                                        let boxPasseggeri = document.createElement('div');
                                        boxPasseggeri.className='contenitorePasseggeri';
                                        box.appendChild(boxPasseggeri);
    
                                        //Creazioni del contenitore passeggeroAdulto
                                        let boxAdulto = document.createElement('div');
                                        boxAdulto.className='contenitoreAdulto';
                                        boxPasseggeri.appendChild(boxAdulto);
                                        let containerAdulti = document.createElement('div');
                                        containerAdulti.className='contenitoreTesti';
                                        boxAdulto.appendChild(containerAdulti);
                                        let paragrafoAdulto = document.createElement('p');
                                        paragrafoAdulto.className='paragrafiElementi';
                                        let stringaAdulto = 'Adulti: '+passeggeri[0];
                                        paragrafoAdulto.innerText = stringaAdulto;
                                        let paragrafoAdultiPrezzo = document.createElement('p');
                                        paragrafoAdultiPrezzo.className='paragrafiElementi';
                                        let stringaAdultiPrezzo = ' x '+prezzoPA[0]+'€';
                                        paragrafoAdultiPrezzo.innerText = stringaAdultiPrezzo;
                                        containerAdulti.appendChild(paragrafoAdulto);
                                        containerAdulti.appendChild(paragrafoAdultiPrezzo);
                                        //Creazioni del contenitore passeggeroAdolescente
                                        if(passeggeri[1]!=0){
                                            let boxAdolescente = document.createElement('div');
                                            boxAdolescente.className='contenitoreAdolescente';
                                            boxPasseggeri.appendChild(boxAdolescente);
                                            let containerAdolescente = document.createElement('div');
                                            containerAdolescente.className='contenitoreTesti';
                                            boxAdolescente.appendChild(containerAdolescente);
                                            let paragrafoAdolescenti = document.createElement('p');
                                            paragrafoAdolescenti.className='paragrafiElementi';
                                            let stringaAdolescenti = 'Adolescenti: '+passeggeri[1];
                                            paragrafoAdolescenti.innerText = stringaAdolescenti;
                                            let paragrafoAdolescentePrezzo = document.createElement('p');
                                            paragrafoAdolescentePrezzo.className='paragrafiElementi';
                                            let stringaAdolescentePrezzo = ' x '+prezzoPA[1]+'€';
                                            paragrafoAdolescentePrezzo.innerText = stringaAdolescentePrezzo;
                                            containerAdolescente.appendChild(paragrafoAdolescenti);
                                            containerAdolescente.appendChild(paragrafoAdolescentePrezzo);
                                        }
                                        //Creazioni del contenitore passeggeroNeonato
                                        if(passeggeri[2]!=0){
                                            let boxNeonato = document.createElement('div');
                                            boxNeonato.className='contenitoreNeonato';
                                            boxPasseggeri.appendChild(boxNeonato);
                                            let containerNeonato = document.createElement('div');
                                            containerNeonato.className='contenitoreTesti';
                                            boxNeonato.appendChild(containerNeonato);
                                            let paragrafoNeonati = document.createElement('p');
                                            paragrafoNeonati.className='paragrafiElementi';
                                            let stringaNeonati = 'Neonati: '+passeggeri[2];
                                            paragrafoNeonati.innerText = stringaNeonati;
                                            let paragrafoNeonatiPrezzo = document.createElement('p');
                                            paragrafoNeonatiPrezzo.className='paragrafiElementi';
                                            let stringaNeonatiPrezzo = ' x '+prezzoPA[2]+'€';
                                            paragrafoNeonatiPrezzo.innerText = stringaNeonatiPrezzo;
                                            containerNeonato.appendChild(paragrafoNeonati);
                                            containerNeonato.appendChild(paragrafoNeonatiPrezzo);
                                        }
    
                                        //Creazioni del contenitore data 
                                        let boxData = document.createElement('div');
                                        boxData.className='contenitoreData';
                                        box.appendChild(boxData);
    
                                        //Creazioni del contenitore di dataA
                                        let boxDataA = document.createElement('div');
                                        boxDataA.className='contenitoreDataA';
                                        boxData.appendChild(boxDataA);
                                        let paragrafoDataAndata = document.createElement('p');
                                        paragrafoDataAndata.className='paragrafiElementi';
                                        let stringaDataAndata = 'Partenza: '+dataPartenza;
                                        paragrafoDataAndata.innerText = stringaDataAndata;
                                        boxDataA.appendChild(paragrafoDataAndata);
    
                                        //Creazioni del contenitore orario
                                        let boxOrario = document.createElement('div');
                                        boxOrario.className='contenitoreOrario';
                                        box.appendChild(boxOrario);
                                        let paragrafoOrarioAndata = document.createElement('p');
                                        paragrafoOrarioAndata.className='paragrafiElementi';
                                        let stringaOrarioAndata = 'Alle ore: '+orarioPartenza;
                                        paragrafoOrarioAndata.innerText = stringaOrarioAndata;
                                        boxOrario.appendChild(paragrafoOrarioAndata);

                                        //check button andata
                                        let boxButtonScelta = document.createElement('div');
                                        boxButtonScelta.className='contenitoreButtonScelta';
                                        box.appendChild(boxButtonScelta);
                                        let spanCheck = document.createElement('span');
                                        spanCheck.id='buttonCheck'+(y+1);
                                        spanCheck.className='buttonCheck';
                                        spanCheck.innerHTML='Scelta';
                                        boxButtonScelta.appendChild(spanCheck);
                                        let spanAnnullaCheck = document.createElement('span');
                                        spanAnnullaCheck.id='buttonAnnullaCheck'+(y+1);
                                        spanAnnullaCheck.className='buttonAnnullaCheck';
                                        spanAnnullaCheck.innerHTML='Annulla';
                                        boxButtonScelta.appendChild(spanAnnullaCheck);

                                        //bagaglio
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    //ritorno
    if(dataRitorno!='false'){
        let boxScelteR = document.getElementById('scelteContainerRitorno');
        let paragrafoInfoR = document.createElement('p');
        paragrafoInfoR.className='paragrafoSelezionareOrarioR';
        let stringaparagrafoInfoR = "Selezionare l'orario desiderato";
        paragrafoInfoR.innerText = stringaparagrafoInfoR;
        boxScelteR.appendChild(paragrafoInfoR);
        for(i in tratteJson.partenza){
            if(nuovaPartenza == tratteJson.partenza[i].città){
                for (j in tratteJson.partenza[i].destinazione){
                    if(nuovaDestinazione == tratteJson.partenza[i].destinazione[j].città){
                        let yRitorno = nuovaDataRitorno[0];
                        let mRitorno = nuovaDataRitorno[1];
                        let dRitorno = nuovaDataRitorno[2];
                        let dateRitorno = new Date(yRitorno, mRitorno, dRitorno);
                        let dataRitorno = new Date(yRitorno, mRitorno, dRitorno);
                        dateRitorno = dateRitorno.toLocaleString('it-EU', {
                            weekday: 'long'
                          });
                          dataRitorno = dataRitorno.toLocaleString('it-EU', {
                            weekday: 'long', 
                            day: 'numeric',
                            month: 'long', 
                            year: 'numeric'
                          });
                        for(let x=0;x<tratteJson.partenza[i].destinazione[j].orario.length;x++){
                            for(let z=0; z<tratteJson.partenza[i].destinazione[j].orario[x].giorno.length;z++){
                                if(dateRitorno == tratteJson.partenza[i].destinazione[j].orario[x].giorno[z]){
                                    for(let y=0; y<tratteJson.partenza[i].destinazione[j].orario[x].orariPartenze.length; y++){
                                        let oraLimiteRitorno = parseInt(tratteJson.partenza[i].destinazione[j].orario[x].orariPartenze[y]);
                                        if(orarioRitorno>oraLimiteRitorno){
                                            continue
                                        }else{
                                            let orarioPartenzaRitorno = tratteJson.partenza[i].destinazione[j].orario[x].orariPartenze[y];
                                            
                                            //Creazioni dei contenitori opzioni
                                            let boxScelteR = document.getElementById('scelteContainerRitorno');
                                            let boxR = document.createElement('div');
                                            boxR.className='contenitoreOpzioniRitorno';
                                            boxR.id='boxR'+(y+1);
                                            boxScelteR.appendChild(boxR);
                                            
                                            //Creazioni del contenitore città P e D
                                            let boxCittàPDR = document.createElement('div');
                                            boxCittàPDR.className='contenitoreCittàPDR';
                                            boxR.appendChild(boxCittàPDR);
                                            
                                            //Creazioni del contenitore città P
                                            let boxCittàPartenzaR = document.createElement('div');
                                            boxCittàPartenzaR.className='contenitoreCittàPartenzaR';
                                            boxCittàPDR.appendChild(boxCittàPartenzaR);
                                            let paragrafoCittàPartenzaR = document.createElement('p');
                                            paragrafoCittàPartenzaR.className='paragrafiElementi';
                                            let stringaCittàPartenzaR = 'Da: '+nuovaPartenza;
                                            paragrafoCittàPartenzaR.innerText = stringaCittàPartenzaR;
                                            boxCittàPartenzaR.appendChild(paragrafoCittàPartenzaR);
                                            
                                            //Creazioni del contenitore città D
                                            let boxCittàDestinazioneR = document.createElement('div');
                                            boxCittàDestinazioneR.className='contenitoreCittàDestinazioneR';
                                            boxCittàPDR.appendChild(boxCittàDestinazioneR);
                                            let paragrafoCittàDestinazioneR = document.createElement('p');
                                            paragrafoCittàDestinazioneR.className='paragrafiElementi';
                                            let stringaCittàDestinazioneR = 'A: '+nuovaDestinazione;
                                            paragrafoCittàDestinazioneR.innerText = stringaCittàDestinazioneR;
                                            boxCittàDestinazioneR.appendChild(paragrafoCittàDestinazioneR);
                                            
                                            //Creazioni del contenitore passeggeri
                                            let boxPasseggeriR = document.createElement('div');
                                            boxPasseggeriR.className='contenitorePasseggeri';
                                            boxR.appendChild(boxPasseggeriR);
                                            
                                            //Creazioni del contenitore passeggeroAdulto
                                            let boxAdultoR = document.createElement('div');
                                            boxAdultoR.className='contenitoreAdulto';
                                            boxPasseggeriR.appendChild(boxAdultoR);
                                            let containerAdultiR = document.createElement('div');
                                            containerAdultiR.className='contenitoreTesti';
                                            boxAdultoR.appendChild(containerAdultiR);
                                            let paragrafoAdultoR = document.createElement('p');
                                            paragrafoAdultoR.className='paragrafiElementi';
                                            let stringaAdultoR = 'Adulti: '+passeggeri[0];
                                            paragrafoAdultoR.innerText = stringaAdultoR;
                                            let paragrafoAdultiRPrezzo = document.createElement('p');
                                            paragrafoAdultiRPrezzo.className='paragrafiElementi';
                                            let stringaAdultiRPrezzo = ' x '+prezzoPR[0]+'€';
                                            paragrafoAdultiRPrezzo.innerText = stringaAdultiRPrezzo;
                                            containerAdultiR.appendChild(paragrafoAdultoR);
                                            containerAdultiR.appendChild(paragrafoAdultiRPrezzo);
                                            
                                            //Creazioni del contenitore passeggeroAdolescente
                                            if(passeggeri[1]!=0){
                                                let boxAdolescenteR = document.createElement('div');
                                                boxAdolescenteR.className='contenitoreAdolescente';
                                                boxPasseggeriR.appendChild(boxAdolescenteR);
                                                let containerAdolescenteR = document.createElement('div');
                                                containerAdolescenteR.className='contenitoreTesti';
                                                boxAdolescenteR.appendChild(containerAdolescenteR);
                                                let paragrafoAdolescentiR = document.createElement('p');
                                                paragrafoAdolescentiR.className='paragrafiElementi';
                                                let stringaAdolescentiR = 'Adolescenti: '+passeggeri[1];
                                                paragrafoAdolescentiR.innerText = stringaAdolescentiR;
                                                let paragrafoAdolescenteRPrezzo = document.createElement('p');
                                                paragrafoAdolescenteRPrezzo.className='paragrafiElementi';
                                                let stringaAdolescenteRPrezzo = ' x '+prezzoPR[1]+'€';
                                                paragrafoAdolescenteRPrezzo.innerText = stringaAdolescenteRPrezzo;
                                                containerAdolescenteR.appendChild(paragrafoAdolescentiR);
                                                containerAdolescenteR.appendChild(paragrafoAdolescenteRPrezzo);
                                            }
                                            //Creazioni del contenitore passeggeroNeonato
                                            if(passeggeri[2]!=0){
                                                let boxNeonatoR = document.createElement('div');
                                                boxNeonatoR.className='contenitoreNeonato';
                                                boxPasseggeriR.appendChild(boxNeonatoR);
                                                let containerNeonatoR = document.createElement('div');
                                                containerNeonatoR.className='contenitoreTesti';
                                                boxNeonatoR.appendChild(containerNeonatoR);
                                                let paragrafoNeonatiR = document.createElement('p');
                                                paragrafoNeonatiR.className='paragrafiElementi';
                                                let stringaNeonatiR = 'Neonati: '+passeggeri[2];
                                                paragrafoNeonatiR.innerText = stringaNeonatiR;
                                                let paragrafoNeonatiRPrezzo = document.createElement('p');
                                                paragrafoNeonatiRPrezzo.className='paragrafiElementi';
                                                let stringaNeonatiRPrezzo = ' x '+prezzoPR[2]+'€';
                                                paragrafoNeonatiRPrezzo.innerText = stringaNeonatiRPrezzo;
                                                containerNeonatoR.appendChild(paragrafoNeonatiR);
                                                containerNeonatoR.appendChild(paragrafoNeonatiRPrezzo);
                                            }
                                            
                                            //Creazioni del contenitore data 
                                            let boxDataR = document.createElement('div');
                                            boxDataR.className='contenitoreDataR';
                                            boxR.appendChild(boxDataR);
                                            
                                            //Creazioni del contenitore di dataA
                                            let boxDataRP = document.createElement('div');
                                            boxDataRP.className='contenitoreDataRit';
                                            boxDataR.appendChild(boxDataRP);
                                            let paragrafoDataRitorno = document.createElement('p');
                                            paragrafoDataRitorno.className='paragrafiElementi';
                                            let stringaDataRitorno = 'Partenza: '+dataRitorno;
                                            paragrafoDataRitorno.innerText = stringaDataRitorno;
                                            boxDataRP.appendChild(paragrafoDataRitorno);
                                            
                                            //Creazioni del contenitore orario
                                            let boxOrarioR = document.createElement('div');
                                            boxOrarioR.className='contenitoreOrario';
                                            boxR.appendChild(boxOrarioR);
                                            let paragrafoOrarioRitorno = document.createElement('p');
                                            paragrafoOrarioRitorno.className='paragrafiElementi';
                                            let stringaOrarioRitorno = 'Alle ore: '+orarioPartenzaRitorno;
                                            paragrafoOrarioRitorno.innerText = stringaOrarioRitorno;
                                            boxOrarioR.appendChild(paragrafoOrarioRitorno);
                                            
                                            //check button ritorno
                                            let boxButtonSceltaR = document.createElement('div');
                                            boxButtonSceltaR.className='contenitoreButtonSceltaR';
                                            boxR.appendChild(boxButtonSceltaR);
                                            let spanCheckR = document.createElement('span');
                                            spanCheckR.id='buttonCheckR'+(y+1);
                                            spanCheckR.className='buttonCheckR';
                                            spanCheckR.innerHTML='Scelta';
                                            boxButtonSceltaR.appendChild(spanCheckR);
                                            let spanAnnullaCheckR = document.createElement('span');
                                            spanAnnullaCheckR.id='buttonAnnullaCheckR'+(y+1);
                                            spanAnnullaCheckR.className='buttonAnnullaCheckR';
                                            spanAnnullaCheckR.innerHTML='Annulla';
                                            boxButtonSceltaR.appendChild(spanAnnullaCheckR);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


spanAndata.addEventListener('click', function(){
    document.getElementById('boxContainerAndata').style.display='flex';
    document.getElementById('boxContainerRitorno').style.display='none';
    document.getElementById('spanRitorno').style.width = '20%';
    document.getElementById('spanAndata').style.width = '80%';
    document.getElementById('scelteContainerBagaglio').style.visibility = 'visible';
    document.getElementById('scelteContainerBagaglioR').style.visibility = 'hidden';
})

function nascondiRitorno(){
    document.getElementById('boxContainerAndata').style.display='flex';
    document.getElementById('boxContainerRitorno').style.display='none';
    document.getElementById('spanRitorno').style.width = '20%';
    document.getElementById('spanAndata').style.width = '80%';
}

spanRitorno.addEventListener('click', function(){
    document.getElementById('boxContainerAndata').style.display='none';
    document.getElementById('boxContainerRitorno').style.display='flex';
    document.getElementById('spanRitorno').style.width = '80%';
    document.getElementById('spanAndata').style.width = '20%';
    document.getElementById('scelteContainerBagaglioR').style.visibility = 'visible';
    document.getElementById('scelteContainerBagaglio').style.visibility = 'hidden';
});

// funzione se checkbutton in check andata
$('#scelteContainer').on('click', '.buttonCheck', function(){
    let allCheckButton = document.querySelectorAll(".buttonCheck");
    let boxScelte = document.querySelectorAll(".contenitoreOpzioni");
    let allCheckButtonAnnulla = document.querySelectorAll(".buttonAnnullaCheck");
    let paragrafoOrarioSelect = document.querySelector(".paragrafoSelezionareOrario");
    let index = 0, length = allCheckButton.length;
    for ( ; index < length; index++) {
        if(allCheckButton[index].getAttribute('id')==$(this).attr('id')){
            allCheckButton[index].style.display = 'flex';
            allCheckButtonAnnulla[index].style.display = 'flex';
            paragrafoOrarioSelect.style.display = 'none';
            document.getElementById('scelteContainerBagaglio').style.display = 'flex';
        }else{
            allCheckButton[index].style.display = 'none';
            allCheckButtonAnnulla[index].style.display = 'none';
            boxScelte[index].style.display = 'none';
        }
    } 
});

$('#scelteContainer').on('click', '.buttonAnnullaCheck', function(){
    let allCheckButton = document.querySelectorAll(".buttonCheck");
    let boxScelteAnnulla = document.querySelectorAll(".contenitoreOpzioni");
    let allCheckButtonAnnulla = document.querySelectorAll(".buttonAnnullaCheck");
    let paragrafoOrarioSelect = document.querySelector(".paragrafoSelezionareOrario");
    let index = 0, length = allCheckButton.length;
    for ( ; index < length; index++) {
        if(allCheckButton[index].getAttribute('id')==$(this).attr('id')){
            allCheckButton[index].style.display = 'flex';
            allCheckButtonAnnulla[index].style.display = 'flex';
            document.getElementById('scelteContainerBagaglio').style.display = 'none';
        }else{
            paragrafoOrarioSelect.style.display = 'flex';
            allCheckButton[index].style.display = 'flex';
            allCheckButtonAnnulla[index].style.display = 'flex';
            boxScelteAnnulla[index].style.display = 'flex';
            document.getElementById('scelteContainerBagaglio').style.display = 'none';
        }
    } 
});

// funzione se checkbutton in check ritorno

$('#scelteContainerRitorno').on('click', '.buttonCheckR', function(){
    let allCheckButtonR = document.querySelectorAll(".buttonCheckR"); // bottone di scelta
    let allCheckButtonAnnulla = document.querySelectorAll(".buttonAnnullaCheckR");  // bottone di annulla
    let boxScelteR = document.querySelectorAll(".contenitoreOpzioniRitorno");
    let paragrafoOrarioSelectR = document.querySelector(".paragrafoSelezionareOrarioR");
    let indexR = 0, lengthR = allCheckButtonR.length;
    for ( ; indexR < lengthR; indexR++){
        if(allCheckButtonR[indexR].getAttribute('id')==$(this).attr('id')){
            allCheckButtonR[indexR].style.display = 'flex';
            allCheckButtonAnnulla[indexR].style.display = 'flex';
            document.getElementById('scelteContainerBagaglioR').style.display = 'flex';
        }else{
            paragrafoOrarioSelectR.style.display = 'none';
            allCheckButtonR[indexR].style.display = 'none';
            allCheckButtonAnnulla[indexR].style.display = 'none';
            boxScelteR[indexR].style.display = 'none';
        }
    }
});

$('#scelteContainerRitorno').on('click', '.buttonAnnullaCheckR', function(){
    let allCheckButtonR = document.querySelectorAll(".buttonCheckR"); // bottone di scelta
    let allCheckButtonAnnulla = document.querySelectorAll(".buttonAnnullaCheckR");  // bottone di annulla
    let boxScelteR = document.querySelectorAll(".contenitoreOpzioniRitorno");
    let paragrafoOrarioSelectR = document.querySelector(".paragrafoSelezionareOrarioR");
    //let boxBagaglioR = document.getElementById('scelteContainerBagaglioR');
    let indexR = 0, lengthR = allCheckButtonR.length;
    for ( ; indexR < lengthR; indexR++){
        if(allCheckButtonR[indexR].getAttribute('id')==$(this).attr('id')){
            allCheckButtonR[indexR].style.display = 'flex';
            allCheckButtonAnnulla[indexR].style.display = 'flex';
            document.getElementById('scelteContainerBagaglioR').style.display = 'none';
        }else{
            document.getElementById('scelteContainerBagaglioR').style.display = 'none';
            paragrafoOrarioSelectR.style.display = 'flex';
            allCheckButtonR[indexR].style.display = 'flex';
            allCheckButtonAnnulla[indexR].style.display = 'flex';
            boxScelteR[indexR].style.display = 'flex';
        }
    }
});

let infoTariffe = document.getElementById('Tariffe');
infoTariffe.addEventListener('mouseover', tariffeInfoOn);
function tariffeInfoOn(){
    document.getElementById('boxInfoTariffe').style.display="flex";
}
infoTariffe.addEventListener('mouseleave', tariffeInfoOff);
function tariffeInfoOff(){
    document.getElementById('boxInfoTariffe').style.display="none";
}

let infoTariffeR = document.getElementById('TariffeR');
infoTariffeR.addEventListener('mouseover', tariffeRInfoOn);
function tariffeRInfoOn(){
    document.getElementById('boxInfoTariffeR').style.display="flex";
}
infoTariffeR.addEventListener('mouseleave', tariffeRInfoOff);
function tariffeRInfoOff(){
    document.getElementById('boxInfoTariffeR').style.display="none";
}


let error1 = true;
let error2= true;
let error3 = true;
let error4 = true;
function checkall(){
    let errore1 = document.querySelector(".paragrafoSelezionareOrario");
    let radioCheck = document.querySelectorAll(".radio");
    for(let r=0; r<2; r++){
        if(radioCheck[r].checked){
            error3 = false;
        }
    }
    if(errore1.style.display=='none'){
        error1 = false;
    }else if(errore1.style.display=='flex'){
        error1 = true;
    }
    if(dataRitorno!='false'){
        let errore2 = document.querySelector(".paragrafoSelezionareOrarioR");
        if(errore2.style.display=='none'){
            error2 = false;
        }else if(errore2.style.display=='flex'){
            error2 = true;
        }
        let radioCheckR = document.querySelectorAll(".radioR");
        for(let p=0; p<2; p++){
            if(radioCheckR[p].checked){
                error4 = false;
            }
        }
    }

}

let btnAvanti = document.getElementById('btnAvanti');
btnAvanti.onclick = ()=>{
    if(dataRitorno!='false'){
        checkall();
        if(error1 == false && error2 == false && error3 == false && error4 == false){
            let allCheckButtonA = document.querySelectorAll(".buttonCheck");
            let boxScelteA = document.querySelectorAll(".contenitoreOpzioni");
            let allCheckButtonR = document.querySelectorAll(".buttonCheckR");
            let boxScelteR = document.querySelectorAll(".contenitoreOpzioniRitorno");
            let indexControlA = 0, lengthControlA  = allCheckButtonA.length;
            let indexControlR = 0, lengthControlR = allCheckButtonR.length;
            let indexOptionA = 0, lengthOptionA = allCheckButtonA.length;
            let indexOptionR = 0, lengthOptionR = allCheckButtonR.length;
            for ( ; indexControlA < lengthControlA; indexControlA++) {
                let checkDisplay = allCheckButtonA[indexControlA].style.display
                if(checkDisplay == 'flex'){
                    let parentButton = allCheckButtonA[indexControlA].parentElement;
                    let parentBoxButton  = parentButton.parentElement;
                    for ( ; indexOptionA < lengthOptionA; indexOptionA++){  
                        if(parentBoxButton.getAttribute('id') == boxScelteA[indexOptionA].getAttribute('id')){
                            let contenitoreOrario = boxScelteA[indexOptionA].childNodes[3];
                            let paragrafoOrario = contenitoreOrario.childNodes[0];
                            let testoOrario = paragrafoOrario.textContent;
                            testoOrario = testoOrario.split(' ');
                            testoOrario = testoOrario[2];
                            scriviCookie('orarioPartenzaScelto',testoOrario);
                            let radioCheckP = document.querySelectorAll(".radio");
                            for(let r=0; r<2; r++){
                                if(radioCheckP[r].checked){
                                    scriviCookie('tariffaPartenzaScelta',radioCheckP[r].value);
                                }
                            }
                        }
                    }
                } else {
                }
            }
            for ( ; indexControlR < lengthControlR; indexControlR++) {
                let checkDisplayR = allCheckButtonR[indexControlR].style.display
                if(checkDisplayR == 'flex'){
                    let parentButtonR = allCheckButtonR[indexControlR].parentElement;
                    let parentBoxButtonR  = parentButtonR.parentElement;
                    for ( ; indexOptionR < lengthOptionR; indexOptionR++){  
                        if(parentBoxButtonR.getAttribute('id') == boxScelteR[indexOptionR].getAttribute('id')){
                            let contenitoreOrarioR = boxScelteR[indexOptionR].childNodes[3];
                            let paragrafoOrarioR = contenitoreOrarioR.childNodes[0];
                            let testoOrarioR = paragrafoOrarioR.textContent;
                            testoOrarioR = testoOrarioR.split(' ');
                            testoOrarioR = testoOrarioR[2];
                            scriviCookie('orarioPartenzaSceltoR',testoOrarioR);
                            let radioCheckR = document.querySelectorAll(".radioR");
                            for(let p=0; p<2; p++){
                                if(radioCheckR[p].checked){
                                    scriviCookie('tariffaRitornoScelta',radioCheckR[p].value);
                                }
                            }
                            EnterPage();
                        }
                    }
                } else {
                }
            }
        } else {
            console.log("gli errori sono vero");
        }
    } else {
        checkall();
        if(error1 == false && error3 == false ){
            let allCheckButtonA = document.querySelectorAll(".buttonCheck");
            let boxScelteA = document.querySelectorAll(".contenitoreOpzioni");
            let indexControlA = 0, lengthControlA  = allCheckButtonA.length;
            let indexOptionA = 0, lengthOptionA = allCheckButtonA.length;
            for ( ; indexControlA < lengthControlA; indexControlA++) {
                let checkDisplay = allCheckButtonA[indexControlA].style.display
                if(checkDisplay == 'flex'){
                    let parentButton = allCheckButtonA[indexControlA].parentElement;
                    let parentBoxButton  = parentButton.parentElement;
                    for ( ; indexOptionA < lengthOptionA; indexOptionA++){  
                        if(parentBoxButton.getAttribute('id') == boxScelteA[indexOptionA].getAttribute('id')){
                            let contenitoreOrario = boxScelteA[indexOptionA].childNodes[3];
                            let paragrafoOrario = contenitoreOrario.childNodes[0];
                            let testoOrario = paragrafoOrario.textContent;
                            testoOrario = testoOrario.split(' ');
                            testoOrario = testoOrario[2];
                            scriviCookie('orarioPartenzaScelto',testoOrario);
                            let radioCheck = document.querySelectorAll(".radio");
                            for(let r=0; r<2; r++){
                                if(radioCheck[r].checked){
                                    scriviCookie('tariffaPartenzaScelta',radioCheck[r].value);
                                }
                            }
                            EnterPage();
                        }
                    }
                } else {
                }
            }
        } else {
            console.log("l'errore è vero");
        }
    } 
}

//creazione cookie

function scriviCookie(nomeCookie,valoreCookie){
    document.cookie = nomeCookie + '=' + escape(valoreCookie)+ '; path=/';
}
  
//cancellazzione cookie
  
function cencellaCookie(nomeCookie)
{
    scriviCookie(nomeCookie,'',-1);
}

function EnterPage(){
    window.open("../pagina3/index3.html", "_self");
}


//radio change

let standard = document.getElementById('standard');
let plus = document.getElementById('plus');

standard.onchange = () =>{
    document.getElementById('boxSpanTariffa').style.display="none"
}

plus.onchange = () =>{
    document.getElementById('boxSpanTariffa').style.display="none"
}

let standardR = document.getElementById('standardR');
let plusR = document.getElementById('plusR');

standardR.onchange = () =>{
    document.getElementById('boxSpanTariffaR').style.display="none"
}

plusR.onchange = () =>{
    document.getElementById('boxSpanTariffaR').style.display="none"
}