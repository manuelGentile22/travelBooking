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

// controlli di validazione

function validateEmail(inputText){
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w*)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailFormat)) {
        return true;
    } else {
        alert('Mail non valida');
        return false;
    }
}

function validateCreditCard(inputText, inputText2, inputText3){

    let numberFormat = /\D/g;

    if(inputText.value.match(numberFormat)) {
        document.getElementById('errorNumero').style.display='flex';
        return false;
    }else{
        document.getElementById('errorNumero').style.display='none'; 
    }
    let cvvFormat = /\D/g;
    if(inputText2.value.match(cvvFormat)) {
        document.getElementById('errorCvv').style.display='flex';
        return false;
    }else{
        document.getElementById('errorCvv').style.display='none';
    }
    let scadenzaFormat = /^\d\d\d\d\/\d\d$/;
    if(scadenzaFormat.test(inputText3.value)) {
        let date = new Date(inputText3.value)
        let dateOggi = new Date();
        let index = dateOggi - date;
        if(index<0){
            document.getElementById('errorScadenza').style.display='none';
            return true;
        }else{
            document.getElementById('errorScadenza').style.display='flex';
            return false;
        };
    } else {
        document.getElementById('errorScadenza').style.display='flex';
        return false;
    }
}

//let radioCreditCard = document.getElementById('radioCredito');
//let radioPaypal = document.getElementById('radioPaypal');

/*radioCreditCard.onchange = () =>{
    document.getElementById('paypalID').style.display="none"
    document.getElementById('creditCardID').style.display="flex"
}*/
/*
radioPaypal.onchange = () =>{
    document.getElementById('creditCardID').style.display="none"
    document.getElementById('paypalID').style.display="flex"
}
*/
 
let dataRitorno = leggiCookie('dataRitorno');
let container = document.getElementById('container');
function totale(){
    let prezzoTotaleA = leggiCookie('prezzoTotAndata');
    let totale = prezzoTotaleA;
    if(dataRitorno!='false'){
        let prezzoTotaleR = leggiCookie('prezzoTotRitorno');
        totale += prezzoTotaleR;
    }
    let boxPrezzoTot = document.createElement('div');
    boxPrezzoTot.className='contenitorePrezzoTot';
    container.appendChild(boxPrezzoTot);
    let paragrafoPrezzoTot = document.createElement('p');
    paragrafoPrezzoTot.className='paragrafiElementi';
    let stringaPrezzoTot = 'Prezzo Totale: '+totale+'€';
    paragrafoPrezzoTot.innerText = stringaPrezzoTot;
    boxPrezzoTot.appendChild(paragrafoPrezzoTot);
};

totale();