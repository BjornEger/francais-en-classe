function numberEntry(id,display,fr,da,group,note=''){
  entries.push({id:'measure-'+id,type:'nombres',fr:display+' · '+fr,da,group,note,speechText:fr});
}
[
['1900','mille neuf cents','1900'],['1999','mille neuf cent quatre-vingt-dix-neuf','1999'],
['2000','deux mille','2000'],['2021','deux mille vingt et un','2021'],['2026','deux mille vingt-six','2026']
].forEach(([year,fr,da])=>numberEntry(year,year,fr,da+' (årstal)','Années','Pour une année : en '+fr+'. Exemple : Nous avons déménagé en '+year+'.'));
numberEntry('m2','m²','un mètre carré','en kvadratmeter','Surfaces · m²','m² mesure une surface, par exemple la superficie d’un appartement.');
numberEntry('80m2','80 m²','quatre-vingts mètres carrés','80 kvadratmeter','Surfaces · m²','L’appartement fait quatre-vingts mètres carrés. = Lejligheden er 80 kvadratmeter.');
numberEntry('85-5m2','85,5 m²','quatre-vingt-cinq virgule cinq mètres carrés','85,5 kvadratmeter','Surfaces · m²','En français, le séparateur décimal est une virgule.');
numberEntry('m3','m³','un mètre cube','en kubikmeter / rummeter','Volumes · m³','m³ mesure un volume. Un mètre cube = mille litres.');
numberEntry('30m3','30 m³','trente mètres cubes','30 kubikmeter','Volumes · m³','La pièce a un volume de trente mètres cubes. = Rummet har et rumfang på 30 kubikmeter.');
numberEntry('1-5m3','1,5 m³','un virgule cinq mètre cube','1,5 kubikmeter','Volumes · m³','Avec une quantité inférieure à deux, le nom peut rester au singulier.');
numberEntry('euro','1 €','un euro','en euro','Devises','Un euro, deux euros. Un centime, deux centimes.');
numberEntry('12-50eur','12,50 €','douze euros et cinquante centimes','12 euro og 50 cent','Devises','À l’oral, on peut aussi dire : douze euros cinquante.');
numberEntry('800eur','800 €','huit cents euros','800 euro','Devises','Le loyer est de huit cents euros par mois. = Huslejen er 800 euro om måneden.');
numberEntry('dkk','100 DKK','cent couronnes danoises','100 danske kroner','Devises');
numberEntry('usd','50 USD','cinquante dollars américains','50 amerikanske dollar','Devises');
numberEntry('gbp','20 GBP','vingt livres sterling','20 britiske pund','Devises');
const currencyUnits={EUR:['euro','euros'],DKK:['couronne danoise','couronnes danoises'],USD:['dollar américain','dollars américains'],GBP:['livre sterling','livres sterling']};
function spokenQuantity(raw,mode,currency='EUR'){
  const text=String(raw).trim().replace(/[\s\u00a0\u202f]/g,'').replace('.',',');
  if(!/^\d+(?:,\d{1,2})?$/.test(text))return null;
  const [whole,decimal='']=text.split(','),n=Number(whole),value=Number(text.replace(',','.'));
  if(value>1000000||(['nombre','annee'].includes(mode)&&decimal))return null;
  if(mode==='annee'&&n<1)return null;
  let spoken=numberFr(n)+(decimal?' virgule '+decimal.split('').map(d=>units[Number(d)]).join(' '):'');
  if(mode==='surface')spoken+=' '+(value<2?'mètre carré':'mètres carrés');
  if(mode==='volume')spoken+=' '+(value<2?'mètre cube':'mètres cubes');
  if(mode==='devise'){
    if(!currencyUnits[currency])return null;
    if(currency==='EUR'){
      const cents=Number(decimal.padEnd(2,'0'));
      spoken=numberFr(n)+' '+currencyUnits.EUR[n<2?0:1]+(cents?' et '+numberFr(cents)+' '+(cents===1?'centime':'centimes'):'');
    }else spoken+=' '+currencyUnits[currency][value<2?0:1];
  }
  return mode==='annee'?'en '+spoken:spoken;
}
function initNumberTool(){
  $('#numberTool').innerHTML=`<div class="number-controls"><label for="numberMode">Lire <select id="numberMode"><option value="nombre">Un nombre</option><option value="annee">Une année</option><option value="surface">Une surface · m²</option><option value="volume">Un volume · m³</option><option value="devise">Un montant</option></select></label><label for="num">Valeur <input id="num" type="text" inputmode="decimal" value="71" autocomplete="off"></label><label id="currencyLabel" for="currency" hidden>Devise <select id="currency"><option value="EUR">EUR · euro</option><option value="DKK">DKK · couronne danoise</option><option value="USD">USD · dollar américain</option><option value="GBP">GBP · livre sterling</option></select></label></div><div id="numberResult" aria-live="polite"></div><button id="listenNumber" class="quiet" type="button">Écouter 🔊</button><p id="numberAudioStatus" class="note" role="status"></p><div class="note">De 0 à 1 000 000 · Jusqu’à deux décimales pour les mesures et les devises.</div>`;
  function update(){
    const mode=$('#numberMode').value,result=spokenQuantity($('#num').value,mode,$('#currency').value);
    $('#currencyLabel').hidden=mode!=='devise';
    $('#numberResult').textContent=result||'Entre une valeur valide (une année ou un nombre entier, ou une mesure avec deux décimales maximum).';
    $('#listenNumber').disabled=!result;
    $('#listenNumber').onclick=()=>speakFrench(result,$('#numberAudioStatus'));
  }
  $('#numberMode').onchange=()=>{const defaults={nombre:'71',annee:'2021',surface:'80',volume:'30',devise:'12,50'};$('#num').value=defaults[$('#numberMode').value];update()};
  $('#num').oninput=update;$('#currency').onchange=update;update();
}
