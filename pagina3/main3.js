//scrivi cookie

function scriviCookie(nomeCookie,valoreCookie){
    document.cookie = nomeCookie + '=' + escape(valoreCookie)+ '; path=/';
}
  
//cancellazzione cookie
  
function cencellaCookie(nomeCookie)
  {
    scriviCookie(nomeCookie,'',-1);
}

//leggi cookie

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

//cookie riepilogo viaggio 
//Andata 
let partenza = leggiCookie('partenza');
let destinazione = leggiCookie('destinazione');
let dataAndata = leggiCookie('dataAndata');
let orarioPartenza = leggiCookie('orarioPartenzaScelto');
let passeggeri = leggiCookie('passeggeri');
passeggeri = passeggeri.split(',');
passeggeri[0] = parseInt(passeggeri[0]);
passeggeri[1] = parseInt(passeggeri[1]);
passeggeri[2] = parseInt(passeggeri[2]);
dataAndata = dataAndata.split(',');
let yPartenza = dataAndata[0];
let mPartenza = dataAndata[1];
let dPartenza = dataAndata[2];
let dataPartenza = new Date(yPartenza, mPartenza, dPartenza);
dataPartenza = dataPartenza.toLocaleString('it-EU', {
  weekday: 'long', 
  day: 'numeric',
  month: 'long', 
  year: 'numeric'
});
let tariffaPartenza = leggiCookie('tariffaPartenzaScelta');
let prezzoPA = leggiCookie('prezzoAndata');
prezzoPA = prezzoPA.split(',');
prezzoPA[0] = parseInt(prezzoPA[0]);
prezzoPA[1] = parseInt(prezzoPA[1]);
prezzoPA[2] = parseInt(prezzoPA[2]);
let prezzoPR = leggiCookie('prezzoRitorno');
//Ritorno?
let partenzaRitorno = false;
let destinazioneRitorno = false;
let passeggeriRitorno = false;
let dataRitorno = leggiCookie('dataRitorno');
let orarioRitorno = false;
let yRitorno 
let mRitorno
let dRitorno
let dataPartenzaR
let tariffaRitorno
if(dataRitorno=='false'){
  //solo andata
}else{
  partenzaRitorno = destinazione;
  destinazioneRitorno = partenza;
  passeggeriRitorno = leggiCookie('passeggeri');
  passeggeriRitorno = passeggeriRitorno.split(',');
  passeggeriRitorno[0] = parseInt(passeggeriRitorno[0]);
  passeggeriRitorno[1] = parseInt(passeggeriRitorno[1]);
  passeggeriRitorno[2] = parseInt(passeggeriRitorno[2]);
  dataRitorno = dataRitorno.split(',');
  orarioRitorno = leggiCookie('orarioPartenzaSceltoR');
  yRitorno = dataRitorno[0];
  mRitorno = dataRitorno[1];
  dRitorno = dataRitorno[2];
  dataPartenzaR = new Date(yRitorno, mRitorno, dRitorno);
  dataPartenzaR = dataPartenzaR.toLocaleString('it-EU', {
    weekday: 'long', 
    day: 'numeric',
    month: 'long', 
    year: 'numeric'
  });
  tariffaRitorno = leggiCookie('tariffaRitornoScelta');
  prezzoPR = prezzoPR.split(',');
  prezzoPR[0] = parseInt(prezzoPR[0]);
  prezzoPR[1] = parseInt(prezzoPR[1]);
  prezzoPR[2] = parseInt(prezzoPR[2]);
}
let prezzoTotAndata = 0;
let prezzoTotRitorno = 0;

function generaRiepilogo(){
  let box = document.getElementById('containerRiepilogo');
  let containerRiepilogoA = document.createElement('div');
  containerRiepilogoA.className='containerRiepilogoAndata';
  box.appendChild(containerRiepilogoA);
  let andataTitle = document.createElement('h2');
  andataTitle.className='stileTitleRiepilogo';
  let stringaAndataTitle = 'Andata';
  andataTitle.innerText = stringaAndataTitle;
  containerRiepilogoA.appendChild(andataTitle);
  let boxCittàPD = document.createElement('div');
  boxCittàPD.className='contenitoreCittàPD';
  containerRiepilogoA.appendChild(boxCittàPD);
  //Creazioni del contenitore città P
  let boxCittàPartenza = document.createElement('div');
  boxCittàPartenza.className='contenitoreCittàPartenza';
  boxCittàPD.appendChild(boxCittàPartenza);
  let paragrafoCittàPartenza = document.createElement('p');
  paragrafoCittàPartenza.className='paragrafiElementi';
  let stringaCittàPartenza = 'Da: '+partenza;
  paragrafoCittàPartenza.innerText = stringaCittàPartenza;
  boxCittàPartenza.appendChild(paragrafoCittàPartenza);
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
  containerRiepilogoA.appendChild(boxPasseggeri);

  //Creazioni del contenitore passeggeroAdulto
  let boxAdulto = document.createElement('div');
  boxAdulto.className='contenitoreAdulto';
  boxPasseggeri.appendChild(boxAdulto);
  let paragrafoAdulto = document.createElement('p');
  paragrafoAdulto.className='paragrafiElementi';
  let stringaAdulto = 'Adulti: '+passeggeri[0]+' ('+prezzoPA[0]+'€)';
  paragrafoAdulto.innerText = stringaAdulto;
  boxAdulto.appendChild(paragrafoAdulto);
  //Creazioni del contenitore passeggeroAdolescente
  if(passeggeri[1]!=0){
      let boxAdolescente = document.createElement('div');
      boxAdolescente.className='contenitoreAdolescente';
      boxPasseggeri.appendChild(boxAdolescente);
      let paragrafoAdolescenti = document.createElement('p');
      paragrafoAdolescenti.className='paragrafiElementi';
      let stringaAdolescenti = 'Adolescenti: '+passeggeri[1]+' ('+prezzoPA[1]+'€)';
      paragrafoAdolescenti.innerText = stringaAdolescenti;
      boxAdolescente.appendChild(paragrafoAdolescenti);
  }
  //Creazioni del contenitore passeggeroNeonato
  if(passeggeri[2]!=0){
      let boxNeonato = document.createElement('div');
      boxNeonato.className='contenitoreNeonato';
      boxPasseggeri.appendChild(boxNeonato);
      let paragrafoNeonati = document.createElement('p');
      paragrafoNeonati.className='paragrafiElementi';
      let stringaNeonati = 'Neonati: '+passeggeri[2]+' ('+prezzoPA[2]+'€)';
      paragrafoNeonati.innerText = stringaNeonati;
      boxNeonato.appendChild(paragrafoNeonati);
  }

  //Creazioni del contenitore data 
  let boxData = document.createElement('div');
  boxData.className='contenitoreData';
  containerRiepilogoA.appendChild(boxData);

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
  containerRiepilogoA.appendChild(boxOrario);
  let paragrafoOrarioAndata = document.createElement('p');
  paragrafoOrarioAndata.className='paragrafiElementi';
  let stringaOrarioAndata = 'Alle ore: '+orarioPartenza;
  paragrafoOrarioAndata.innerText = stringaOrarioAndata;
  boxOrario.appendChild(paragrafoOrarioAndata);

  //Creazioni del contenitore tariffa
  let boxTariffa = document.createElement('div');
  boxTariffa.className='contenitoreTariffa';
  containerRiepilogoA.appendChild(boxTariffa);
  let paragrafoTariffaAndata = document.createElement('p');
  paragrafoTariffaAndata.className='paragrafiElementi';
  let stringaTariffaAndata;
  if(tariffaPartenza == 'Plus'){
    stringaTariffaAndata = 'Tariffa: '+tariffaPartenza+' 40€';
  }else{
    stringaTariffaAndata = 'Tariffa: '+tariffaPartenza;
  }
  paragrafoTariffaAndata.innerText = stringaTariffaAndata;
  boxTariffa.appendChild(paragrafoTariffaAndata);

  //Creazioni del contenitore Prezzo Tot
  if(tariffaPartenza=='Plus'){
    prezzoTotAndata += 40; 
  }
  let m,a,n;
  for(m=0;m<passeggeri[0];m++){
    prezzoTotAndata += prezzoPA[0];
  }
  for(a=0;a<passeggeri[1];a++){
    prezzoTotAndata += prezzoPA[1];
  }
  for(n=0;n<passeggeri[2];n++){
    prezzoTotAndata += prezzoPA[2];
  }
  let boxPrezzoTotAndata = document.createElement('div');
  boxPrezzoTotAndata.className='contenitorePrezzoTot';
  containerRiepilogoA.appendChild(boxPrezzoTotAndata);
  let paragrafoPrezzoTotAndata = document.createElement('p');
  paragrafoPrezzoTotAndata.className='paragrafiElementi';
  let stringaPrezzoTotAndata = 'Prezzo Totale: '+prezzoTotAndata+'€';
  scriviCookie('prezzoTotAndata',prezzoTotAndata);
  paragrafoPrezzoTotAndata.innerText = stringaPrezzoTotAndata;
  boxPrezzoTotAndata.appendChild(paragrafoPrezzoTotAndata);

  if(dataRitorno!='false'){
    let containerRiepilogoR = document.createElement('div');
    containerRiepilogoR.className='containerRiepilogoRitorno';
    box.appendChild(containerRiepilogoR);
    let ritornoTitle = document.createElement('h2');
    ritornoTitle.className='stileTitleRiepilogo';
    let stringaRitornoTitle = 'Ritorno';
    ritornoTitle.innerText = stringaRitornoTitle;
    containerRiepilogoR.appendChild(ritornoTitle);

    //Creazioni del contenitore città P e D
    let boxCittàPDR = document.createElement('div');
    boxCittàPDR.className='contenitoreCittàPDR';
    containerRiepilogoR.appendChild(boxCittàPDR);
    
    //Creazioni del contenitore città P
    let boxCittàPartenzaR = document.createElement('div');
    boxCittàPartenzaR.className='contenitoreCittàPartenzaR';
    boxCittàPDR.appendChild(boxCittàPartenzaR);
    let paragrafoCittàPartenzaR = document.createElement('p');
    paragrafoCittàPartenzaR.className='paragrafiElementi';
    let stringaCittàPartenzaR = 'Da: '+partenzaRitorno;
    paragrafoCittàPartenzaR.innerText = stringaCittàPartenzaR;
    boxCittàPartenzaR.appendChild(paragrafoCittàPartenzaR);
    
    //Creazioni del contenitore città D
    let boxCittàDestinazioneR = document.createElement('div');
    boxCittàDestinazioneR.className='contenitoreCittàDestinazioneR';
    boxCittàPDR.appendChild(boxCittàDestinazioneR);
    let paragrafoCittàDestinazioneR = document.createElement('p');
    paragrafoCittàDestinazioneR.className='paragrafiElementi';
    let stringaCittàDestinazioneR = 'A: '+destinazioneRitorno;
    paragrafoCittàDestinazioneR.innerText = stringaCittàDestinazioneR;
    boxCittàDestinazioneR.appendChild(paragrafoCittàDestinazioneR);

      //Creazioni del contenitore passeggeri
    let boxPasseggeriR = document.createElement('div');
    boxPasseggeriR.className='contenitorePasseggeri';
    containerRiepilogoR.appendChild(boxPasseggeriR);
    
    //Creazioni del contenitore passeggeroAdulto
    let boxAdultoR = document.createElement('div');
    boxAdultoR.className='contenitoreAdulto';
    boxPasseggeriR.appendChild(boxAdultoR);
    let paragrafoAdultoR = document.createElement('p');
    paragrafoAdultoR.className='paragrafiElementi';
    let stringaAdultoR = 'Adulti: '+passeggeriRitorno[0]+' ('+prezzoPR[0]+'€)';
    paragrafoAdultoR.innerText = stringaAdultoR;
    boxAdultoR.appendChild(paragrafoAdultoR);
    
    //Creazioni del contenitore passeggeroAdolescente
    if(passeggeriRitorno[1]!=0){
        let boxAdolescenteR = document.createElement('div');
        boxAdolescenteR.className='contenitoreAdolescente';
        boxPasseggeriR.appendChild(boxAdolescenteR);
        let paragrafoAdolescentiR = document.createElement('p');
        paragrafoAdolescentiR.className='paragrafiElementi';
        let stringaAdolescentiR = 'Adolescenti: '+passeggeriRitorno[1]+' ('+prezzoPR[1]+'€)';
        paragrafoAdolescentiR.innerText = stringaAdolescentiR;
        boxAdolescenteR.appendChild(paragrafoAdolescentiR);
    }
    //Creazioni del contenitore passeggeroNeonato
    if(passeggeriRitorno[2]!=0){
        let boxNeonatoR = document.createElement('div');
        boxNeonatoR.className='contenitoreNeonato';
        boxPasseggeriR.appendChild(boxNeonatoR);
        let paragrafoNeonatiR = document.createElement('p');
        paragrafoNeonatiR.className='paragrafiElementi';
        let stringaNeonatiR = 'Neonati: '+passeggeriRitorno[2]+' ('+prezzoPR[2]+'€)';
        paragrafoNeonatiR.innerText = stringaNeonatiR;
        boxNeonatoR.appendChild(paragrafoNeonatiR);
    }

    //Creazioni del contenitore data 
    let boxDataR = document.createElement('div');
    boxDataR.className='contenitoreDataR';
    containerRiepilogoR.appendChild(boxDataR);
    
    //Creazioni del contenitore di dataA
    let boxDataRP = document.createElement('div');
    boxDataRP.className='contenitoreDataRit';
    boxDataR.appendChild(boxDataRP);
    let paragrafoDataRitorno = document.createElement('p');
    paragrafoDataRitorno.className='paragrafiElementi';
    let stringaDataRitorno = 'Partenza: '+dataPartenzaR;
    paragrafoDataRitorno.innerText = stringaDataRitorno;
    boxDataRP.appendChild(paragrafoDataRitorno);
    
    //Creazioni del contenitore orario
    let boxOrarioR = document.createElement('div');
    boxOrarioR.className='contenitoreOrario';
    containerRiepilogoR.appendChild(boxOrarioR);
    let paragrafoOrarioRitorno = document.createElement('p');
    paragrafoOrarioRitorno.className='paragrafiElementi';
    let stringaOrarioRitorno = 'Alle ore: '+orarioRitorno;
    paragrafoOrarioRitorno.innerText = stringaOrarioRitorno;
    boxOrarioR.appendChild(paragrafoOrarioRitorno);

    //Creazioni del contenitore tariffa
    let boxTariffaR = document.createElement('div');
    boxTariffaR.className='contenitoreTariffa';
    containerRiepilogoR.appendChild(boxTariffaR);
    let paragrafoTariffaRitorno = document.createElement('p');
    paragrafoTariffaRitorno.className='paragrafiElementi';
    let stringaTariffaRitorno;
    if(tariffaRitorno == 'Plus'){
      stringaTariffaRitorno = 'Tariffa: '+tariffaRitorno+' 40€';
    }else{
      stringaTariffaRitorno = 'Tariffa: '+tariffaRitorno;
    }
    paragrafoTariffaRitorno.innerText = stringaTariffaRitorno;
    boxTariffaR.appendChild(paragrafoTariffaRitorno);
    //Creazioni del contenitore Prezzo Tot
    if(tariffaRitorno == 'Plus'){
      prezzoTotRitorno += 40; 
    }
    let mr,ar,nr;
    for(mr=0;mr<passeggeriRitorno[0];mr++){
      prezzoTotRitorno += prezzoPR[0];
      console.log(prezzoTotRitorno)
    }
    for(ar=0;ar<passeggeriRitorno[1];ar++){
      prezzoTotRitorno += prezzoPR[1];
    }
    for(nr=0;nr<passeggeriRitorno[2];nr++){
      prezzoTotRitorno += prezzoPR[2];
    }
    let boxPrezzoTotRitorno = document.createElement('div');
    boxPrezzoTotRitorno.className='contenitorePrezzoTot';
    containerRiepilogoR.appendChild(boxPrezzoTotRitorno);
    let paragrafoPrezzoTotRitorno = document.createElement('p');
    paragrafoPrezzoTotRitorno.className='paragrafiElementi';
    let stringaPrezzoTotRitorno = 'Prezzo Totale: '+prezzoTotRitorno+'€';
    scriviCookie('prezzoTotRitorno',prezzoTotRitorno);
    paragrafoPrezzoTotRitorno.innerText = stringaPrezzoTotRitorno;
    boxPrezzoTotRitorno.appendChild(paragrafoPrezzoTotRitorno);
  }
}

function generaInserimentoDati(){
  let box = document.getElementById('containerInserimentoDati');
  for(let i=0; i < passeggeri[0]; i++ ){
    let boxPasseggeroA = document.createElement('div');
    boxPasseggeroA.className = 'boxPasseggero';
    boxPasseggeroA.id = 'passaggeroAdulto'+(i+1);
    box.appendChild(boxPasseggeroA);
    // titolo 
    let passeggeroTitle = document.createElement('h2');
    passeggeroTitle.className='stileTitlePasseggero';
    let stringaTitleAdulto = 'Passeggero Adulto N°'+(i+1);
    passeggeroTitle.innerText = stringaTitleAdulto;
    boxPasseggeroA.appendChild(passeggeroTitle);
    // box nome e cognome
    let boxNominativo = document.createElement('div');
    boxNominativo.className='contenitoreNominativo';
    boxPasseggeroA.appendChild(boxNominativo);
    let labelNome = document.createElement("label");
    labelNome.setAttribute("for", "name");
    labelNome.id = 'labelNomeAdulto'+(i+1);
    let stringaLabelNome = 'Nome: ';
    labelNome.innerHTML = stringaLabelNome;
    let nome = document.createElement("input");
    nome.setAttribute("type", "text");
    nome.className='inputNomeAdulto';
    nome.name = 'name';
    nome.placeholder='Nome'
    boxNominativo.appendChild(labelNome);
    boxNominativo.appendChild(nome);
    let labelCognome = document.createElement("label");
    labelCognome.setAttribute("for", "surname");
    labelCognome.id = 'labelCognomeAdulto'+(i+1);
    let stringaLabelCognome = 'Cognome: ';
    labelCognome.innerHTML = stringaLabelCognome;
    let cognome = document.createElement("input");
    cognome.setAttribute("type", "text");
    cognome.className='inputCognomeAdulto';
    cognome.name = 'surname';
    cognome.placeholder='Cognome'
    boxNominativo.appendChild(labelCognome);
    boxNominativo.appendChild(cognome);
    // box età 
    let boxEtà = document.createElement('div');
    boxEtà.className='contenitoreEtà';
    boxPasseggeroA.appendChild(boxEtà);
    let labelEtà = document.createElement("label");
    labelEtà.setAttribute("for", "età");
    labelEtà.id = 'labelEtàAdulto'+(i+1);
    let stringaLabelEtà = 'Età: ';
    labelEtà.innerHTML = stringaLabelEtà;
    let età = document.createElement("input");
    età.setAttribute("type", "text");
    età.className='inputEtàAdulto';
    età.name = 'etàAdulto';
    età.placeholder='yyyy/mm/dd'
    boxEtà.appendChild(labelEtà);
    boxEtà.appendChild(età);
  }
  for(let y=0; y < passeggeri[1]; y++ ){
    let boxPasseggeroA = document.createElement('div');
    boxPasseggeroA.className = 'boxPasseggero';
    boxPasseggeroA.id = 'passaggeroAdolescente'+(y+1);
    box.appendChild(boxPasseggeroA);
    // titolo 
    let passeggeroTitle = document.createElement('h2');
    passeggeroTitle.className='stileTitlePasseggero';
    let stringaTitleAdulto = 'Passeggero Adolescente N°'+(y+1);
    passeggeroTitle.innerText = stringaTitleAdulto;
    boxPasseggeroA.appendChild(passeggeroTitle);
    // box nome e cognome
    let boxNominativo = document.createElement('div');
    boxNominativo.className='contenitoreNominativo';
    boxPasseggeroA.appendChild(boxNominativo);
    let labelNome = document.createElement("label");
    labelNome.setAttribute("for", "name");
    labelNome.id = 'labelNomeAdolescenti'+(y+1);
    let stringaLabelNome = 'Nome: ';
    labelNome.innerHTML = stringaLabelNome;
    let nome = document.createElement("input");
    nome.setAttribute("type", "text");
    nome.className='inputNomeAdolescenti';
    nome.name = 'name';
    nome.placeholder='Nome'
    boxNominativo.appendChild(labelNome);
    boxNominativo.appendChild(nome);
    let labelCognome = document.createElement("label");
    labelCognome.setAttribute("for", "surname");
    labelCognome.id = 'labelCognomeAdolescenti'+(y+1);
    let stringaLabelCognome = 'Cognome: ';
    labelCognome.innerHTML = stringaLabelCognome;
    let cognome = document.createElement("input");
    cognome.setAttribute("type", "text");
    cognome.className='inputCognomeAdolescenti';
    cognome.name = 'surname';
    cognome.placeholder='Cognome'
    boxNominativo.appendChild(labelCognome);
    boxNominativo.appendChild(cognome);
    // box età 
    let boxEtà = document.createElement('div');
    boxEtà.className='contenitoreEtà';
    boxPasseggeroA.appendChild(boxEtà);
    let labelEtà = document.createElement("label");
    labelEtà.setAttribute("for", "età");
    labelEtà.id = 'labelAdolescentiEtà'+(y+1);
    let stringaLabelEtà = 'Età: ';
    labelEtà.innerHTML = stringaLabelEtà;
    let età = document.createElement("input");
    età.setAttribute("type", "text");
    età.className='inputEtàAdolescenti';
    età.name = 'età';
    età.placeholder='yyyy/mm/dd'
    boxEtà.appendChild(labelEtà);
    boxEtà.appendChild(età);
  }
  for(let z=0; z < passeggeri[2]; z++ ){
    let boxPasseggeroA = document.createElement('div');
    boxPasseggeroA.className = 'boxPasseggero';
    boxPasseggeroA.id = 'passaggeroNeonato'+(z+1);
    box.appendChild(boxPasseggeroA);
    // titolo 
    let passeggeroTitle = document.createElement('h2');
    passeggeroTitle.className='stileTitlePasseggero';
    let stringaTitleAdulto = 'Passeggero Neonato N°'+(z+1);
    passeggeroTitle.innerText = stringaTitleAdulto;
    boxPasseggeroA.appendChild(passeggeroTitle);
    // box nome e cognome
    let boxNominativo = document.createElement('div');
    boxNominativo.className='contenitoreNominativo';
    boxPasseggeroA.appendChild(boxNominativo);
    let labelNome = document.createElement("label");
    labelNome.setAttribute("for", "name");
    labelNome.id = 'labelNomeNeonati'+(z+1);
    let stringaLabelNome = 'Nome: ';
    labelNome.innerHTML = stringaLabelNome;
    let nome = document.createElement("input");
    nome.setAttribute("type", "text");
    nome.className='inputNomeNeonati';
    nome.name = 'name';
    nome.placeholder='Nome'
    boxNominativo.appendChild(labelNome);
    boxNominativo.appendChild(nome);
    let labelCognome = document.createElement("label");
    labelCognome.setAttribute("for", "surname");
    labelCognome.id = 'labelCognomeNeonati'+(z+1);
    let stringaLabelCognome = 'Cognome: ';
    labelCognome.innerHTML = stringaLabelCognome;
    let cognome = document.createElement("input");
    cognome.setAttribute("type", "text");
    cognome.className='inputCognomeNeonati';
    cognome.name = 'surname';
    cognome.placeholder='Cognome'
    boxNominativo.appendChild(labelCognome);
    boxNominativo.appendChild(cognome);
    // box età 
    let boxEtà = document.createElement('div');
    boxEtà.className='contenitoreEtà';
    boxPasseggeroA.appendChild(boxEtà);
    let labelEtà = document.createElement("label");
    labelEtà.setAttribute("for", "età");
    labelEtà.id = 'labelNeonatiEtà'+(z+1);
    let stringaLabelEtà = 'Età: ';
    labelEtà.innerHTML = stringaLabelEtà;
    let età = document.createElement("input");
    età.setAttribute("type", "text");
    età.className='inputEtàNeonati';
    età.name = 'età';
    età.placeholder='yyyy/mm/dd'
    boxEtà.appendChild(labelEtà);
    boxEtà.appendChild(età);
  }
}

let btnPagamento = document.getElementById('btn');
btnPagamento.onclick = () => {
  let erroreGenerale = false;
  if(checkDatiAdulti()){
    erroreGenerale = true;
  }

  if(passeggeri[1]>0){
    if(checkDatiAdolescenti()){
      erroreGenerale = true;
    }
  }

  if(passeggeri[2]>0){
    if(checkDatiNeonati()){
      erroreGenerale = true;
    }
  }

  if(!erroreGenerale){
    console.log('ciao');
    document.getElementById('erroreDati').style.display = 'none';
    let changePage = setTimeout(EnterPage, 2000);
  } else{
    document.getElementById('erroreDati').style.display = 'flex';
  }
}

function checkDatiAdulti(){
  let erroreCheckDatiAdulto = false;
  let allAdultoNome = document.querySelectorAll('.inputNomeAdulto');
  let allAdultoCognome = document.querySelectorAll('.inputCognomeAdulto');
  let allAdultoEtà = document.querySelectorAll('.inputEtàAdulto');
  let indexNome = 0, lengthNome = allAdultoNome.length;
  let indexEtà = 0, lengthEtà = allAdultoEtà.length;
  for(indexNome; indexNome < lengthNome; indexNome++){
    document.getElementById('labelNomeAdulto'+(indexNome+1)).style.color = 'black';
    document.getElementById('labelCognomeAdulto'+(indexNome+1)).style.color = 'black';
    if(allAdultoNome[indexNome].value==''){
        document.getElementById('labelNomeAdulto'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiAdulto = true;
    }else{
      let format = /^[A-Za-z]{2,}$/g;
      if(format.test(allAdultoNome[indexNome].value)){
      }else{
        document.getElementById('labelNomeAdulto'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiAdulto = true;
      }
    }
    if(allAdultoCognome[indexNome].value==''){
      document.getElementById('labelCognomeAdulto'+(indexNome+1)).style.color = 'red';
      erroreCheckDatiAdulto = true;
    }else{
      let format = /^[A-Za-z]{2,}$/g;
      if(format.test(allAdultoCognome[indexNome].value)){
      }else{
        document.getElementById('labelCognomeAdulto'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiAdulto = true;
      }
    }
  }
  for(indexEtà; indexEtà < lengthEtà; indexEtà++){
    let labelEtà = document.getElementById('labelEtàAdulto'+(indexEtà+1));
    let checkData = allAdultoEtà[indexEtà].value;
    let etàFormat = /^\d\d\d\d\/\d\d\/\d\d$/;
    if(etàFormat.test(checkData)) {
      let data = new Date (checkData)
      let toThisYear = new Date
      let checkdate = toThisYear - data;
      labelEtà.style.color = 'black';
      if(isNaN(Date.parse(data))){
        labelEtà.style.color = 'red';
        erroreCheckDatiAdulto = true;
      }
      if(checkdate < 0){
        labelEtà.style.color = 'red';
        erroreCheckDatiAdulto = true;
      } 
      let toYear = toThisYear.getFullYear();
      let yPasseggero = data.getFullYear();
      let checkYear = toYear - yPasseggero;
      if(checkYear < 17) {
        labelEtà.style.color = 'red';
        erroreCheckDatiAdulto = true;
      }
      if(checkYear == 17){
        let mPasseggero = data.getMonth();
        let toMonth = toThisYear.getMonth();
        let checkMonth = toMonth - mPasseggero;
        if(checkMonth<0){
          labelEtà.style.color = 'red';
          erroreCheckDatiAdulto = true;
        } 
        if(checkMonth == 0){
          let dPasseggero = data.getDate();
          let toDay = toThisYear.getDate();
          let checkDay =  toDay - dPasseggero;
          if(checkDay < 0) {
            labelEtà.style.color = 'red';
            erroreCheckDatiAdulto = true;
          }
        }
      }  
    } else {
      labelEtà.style.color = 'red';
      erroreCheckDatiAdulto = true;
    }
  }
  return erroreCheckDatiAdulto;
}

function checkDatiAdolescenti(){
  let erroreCheckDatiAdolescenti = false;
  let allAdolescentiNome = document.querySelectorAll('.inputNomeAdolescenti');
  let allAdolescentiCognome = document.querySelectorAll('.inputCognomeAdolescenti');
  let allAdolescentiEtà = document.querySelectorAll('.inputEtàAdolescenti');
  let indexNome = 0, lengthNome = allAdolescentiNome.length;
  let indexEtà = 0, lengthEtà = allAdolescentiEtà.length;
  for(indexNome; indexNome < lengthNome; indexNome++){
    document.getElementById('labelNomeAdolescenti'+(indexNome+1)).style.color = 'black';
    document.getElementById('labelCognomeAdolescenti'+(indexNome+1)).style.color = 'black';
    if(allAdolescentiNome[indexNome].value==''){
        document.getElementById('labelNomeAdolescenti'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiAdolescenti = true;
    }else{
      let format = /^[A-Za-z]{2,}$/g;
      if(format.test(allAdolescentiNome[indexNome].value)){
      }else{
        document.getElementById('labelNomeAdolescenti'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiAdolescenti = true;
      }
    }
    if(allAdolescentiCognome[indexNome].value==''){
      document.getElementById('labelCognomeAdolescenti'+(indexNome+1)).style.color = 'red';
      erroreCheckDatiAdolescenti = true;
    }else{
      let format = /^[A-Za-z]{2,}$/g;
      if(format.test(allAdolescentiCognome[indexNome].value)){
      }else{
        document.getElementById('labelCognomeAdolescenti'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiAdolescenti = true;
      }
    }
  }
  for(indexEtà; indexEtà < lengthEtà; indexEtà++){
    let labelEtà = document.getElementById('labelAdolescentiEtà'+(indexEtà+1));
    let checkData = allAdolescentiEtà[indexEtà].value;
    let etàFormat = /^\d\d\d\d\/\d\d\/\d\d$/;
    if(etàFormat.test(checkData)){
      let data = new Date (checkData)
      let toThisYear = new Date
      let checkdate = toThisYear - data;
      labelEtà.style.color = 'black';
      if(isNaN(Date.parse(data))){
        labelEtà.style.color = 'red';
        erroreCheckDatiAdolescenti = true;
      }
      if(checkdate < 0){
        labelEtà.style.color = 'red';
        erroreCheckDatiAdolescenti = true;
      } 
      let toYear = toThisYear.getFullYear();
      let yPasseggero = data.getFullYear();
      let checkYear = toYear - yPasseggero;
      if(checkYear > 17 || checkYear <=2){
        labelEtà.style.color = 'red';
        erroreCheckDatiAdolescenti = true;
      }
      if(checkYear == 3){
        let mPasseggero = data.getMonth();
        let toMonth = toThisYear.getMonth();
        let checkMonth = toMonth - mPasseggero;
        if(checkMonth<0){
        labelEtà.style.color = 'red';
        erroreCheckDatiAdolescenti = true;
        }
        if(checkMonth == 0){
          let dPasseggero = data.getDate();
          let toDay = toThisYear.getDate();
          let checkDay =  toDay - dPasseggero;
          if(checkDay < 0) {
            labelEtà.style.color = 'red';
            erroreCheckDatiAdolescenti = true;
          }
        }
      }
      if(checkYear == 17){
        let mPasseggero = data.getMonth();
        let toMonth = toThisYear.getMonth();
        let checkMonth = toMonth - mPasseggero;
        if(checkMonth>0){
        labelEtà.style.color = 'red';
        erroreCheckDatiAdolescenti = true;
        }
        if(checkMonth == 0){
          let dPasseggero = data.getDate();
          let toDay = toThisYear.getDate();
          let checkDay =  toDay - dPasseggero;
          if(checkDay >= 0) {
            labelEtà.style.color = 'red';
            erroreCheckDatiAdolescenti = true;
          }
        }
      }
    } else {
      labelEtà.style.color = 'red';
      erroreCheckDatiAdolescenti = true;
    }
  }
  return erroreCheckDatiAdolescenti;
}

function checkDatiNeonati(){
  let erroreCheckDatiNeonati = false;
  let allNeonatiNome = document.querySelectorAll('.inputNomeNeonati');
  let allNeonatiCognome = document.querySelectorAll('.inputCognomeNeonati');
  let allNeonatiEtà = document.querySelectorAll('.inputEtàNeonati');
  let indexNome = 0, lengthNome = allNeonatiNome.length;
  let indexEtà = 0, lengthEtà = allNeonatiEtà.length;
  for(indexNome; indexNome < lengthNome; indexNome++){
    document.getElementById('labelNomeNeonati'+(indexNome+1)).style.color = 'black';
    document.getElementById('labelCognomeNeonati'+(indexNome+1)).style.color = 'black';
    if(allNeonatiNome[indexNome].value==''){
        document.getElementById('labelNomeNeonati'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiNeonati = true;
    }else{
      let format = /^[A-Za-z]{2,}$/g;
      if(format.test(allNeonatiNome[indexNome].value)){
      }else{
        document.getElementById('labelNomeNeonati'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiNeonati = true;
      }
    }
    if(allNeonatiCognome[indexNome].value==''){
      document.getElementById('labelCognomeNeonati'+(indexNome+1)).style.color = 'red';
      erroreCheckDatiNeonati = true;
    }else{
      let format = /^[A-Za-z]{2,}$/g;
      if(format.test(allNeonatiCognome[indexNome].value)){
      }else{
        document.getElementById('labelCognomeNeonati'+(indexNome+1)).style.color = 'red';
        erroreCheckDatiNeonati = true;
      }
    }
  }
  for(indexEtà; indexEtà < lengthEtà; indexEtà++){
    let labelEtà = document.getElementById('labelNeonatiEtà'+(indexEtà+1));
    let checkData = allNeonatiEtà[indexEtà].value;
    let etàFormat = /^\d\d\d\d\/\d\d\/\d\d$/;
    if(etàFormat.test(checkData)){
      let data = new Date (checkData)
      let toThisYear = new Date
      let checkdate = toThisYear - data;
      labelEtà.style.color = 'black';
      if(isNaN(Date.parse(data))){
        labelEtà.style.color = 'red';
        erroreCheckDatiNeonati = true;
      }
      if(checkdate >= 0){
        let toYear = toThisYear.getFullYear();
        let yPasseggero = data.getFullYear();
        let checkYear = toYear - yPasseggero;
        if(checkYear > 3 || checkYear < 0 ){
          labelEtà.style.color = 'red';
          erroreCheckDatiNeonati = true;
        }
        if(checkYear == 3){
          let mPasseggero = data.getMonth();
          let toMonth = toThisYear.getMonth();
          let checkMonth = toMonth - mPasseggero;
          if(checkMonth>0){
            labelEtà.style.color = 'red';
            erroreCheckDatiNeonati = true;
          }
          if(checkMonth == 0){
            let dPasseggero = data.getDate();
            let toDay = toThisYear.getDate();
            let checkDay =  toDay - dPasseggero;
            if(checkDay >= 0) {
            labelEtà.style.color = 'red';
            erroreCheckDatiNeonati = true;
            }
          }
        }
        if(checkYear == 0){
          let mPasseggero = data.getMonth();
          let toMonth = toThisYear.getMonth();
          let checkMonth = toMonth - mPasseggero;
          if(checkMonth<0){
            labelEtà.style.color = 'red';
            erroreCheckDatiNeonati = true;
          }
          if(checkMonth == 0){
            let dPasseggero = data.getDate();
            let toDay = toThisYear.getDate();
            let checkDay =  toDay - dPasseggero;
            if(checkDay < 0) {
              labelEtà.style.color = 'red';
              erroreCheckDatiNeonati = true;
            }
          }
        }
      }else {
        labelEtà.style.color = 'red';
        erroreCheckDatiNeonati = true;
      }
    } else {
      labelEtà.style.color = 'red';
      erroreCheckDatiNeonati = true;
    }
  }
  return erroreCheckDatiNeonati;
}

function EnterPage(){
  window.open("https://manuelgentile22.github.io/travelBooking/pagina4/index4.html", "_self");
}

console.log(partenza+' '+destinazione+' '+passeggeri+' '+prezzoPA+' '+dataPartenza+' '+orarioPartenza+' '+tariffaPartenza);
console.log(partenzaRitorno+' '+destinazioneRitorno+' '+passeggeriRitorno+' '+prezzoPR+' '+dataPartenzaR+' '+orarioRitorno+' '+tariffaRitorno);