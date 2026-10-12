let preferredFrenchVoice='';
try{preferredFrenchVoice=localStorage.getItem('francais-voice')||''}catch{}
function frenchVoices(){
  if(!('speechSynthesis' in window))return [];
  return speechSynthesis.getVoices().filter(v=>/^fr(?:[-_]|$)/i.test(v.lang)).sort((a,b)=>{
    const score=v=>/^fr[-_]FR$/i.test(v.lang)?0:1;
    return score(a)-score(b)||a.name.localeCompare(b.name,'fr');
  });
}
function chooseFrenchVoice(voices){return voices.find(v=>v.voiceURI===preferredFrenchVoice)||voices.find(v=>/^fr[-_]FR$/i.test(v.lang))||voices[0]||null}
function refreshFrenchVoiceSelect(){
  const select=document.getElementById('frenchVoice');if(!select)return;
  const voices=frenchVoices(),chosen=chooseFrenchVoice(voices);
  select.innerHTML=voices.length?voices.map(v=>`<option value="${esc(v.voiceURI)}">${esc(v.name)} · ${esc(v.lang)}</option>`).join(''):'<option>Aucune voix française disponible</option>';
  select.disabled=!voices.length;if(chosen)select.value=chosen.voiceURI;
  const hint=document.getElementById('voiceHint');if(hint)hint.textContent=voices.length?'Seules les voix françaises sont proposées.':'Ajoute une voix française aux réglages de langue de ton appareil, ou ouvre le site dans un navigateur qui en propose une.';
  select.onchange=()=>{preferredFrenchVoice=select.value;try{localStorage.setItem('francais-voice',preferredFrenchVoice)}catch{}};
}
function waitForFrenchVoices(){
  const ready=frenchVoices();if(ready.length)return Promise.resolve(ready);
  return new Promise(resolve=>{
    let timer;
    const finish=()=>{const voices=frenchVoices();if(voices.length){clearTimeout(timer);speechSynthesis.removeEventListener('voiceschanged',finish);resolve(voices)}};
    speechSynthesis.addEventListener('voiceschanged',finish);
    timer=setTimeout(()=>{speechSynthesis.removeEventListener('voiceschanged',finish);resolve(frenchVoices())},2500);
    finish();
  });
}
let speechRequest=0,activeFrenchUtterance=null;
async function speakFrench(text,status){
  if(!('speechSynthesis' in window)){status.textContent='La lecture audio n’est pas disponible dans ce navigateur.';return}
  const request=++speechRequest;status.textContent='Chargement de la voix française…';
  const voices=await waitForFrenchVoices();if(request!==speechRequest)return;
  refreshFrenchVoiceSelect();const voice=chooseFrenchVoice(voices);
  if(!voice){status.textContent='Aucune voix française disponible. Ajoute une voix française aux réglages de ton appareil, ou essaie un navigateur qui en propose une.';return}
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);
  activeFrenchUtterance=utterance;utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.85;
  utterance.onstart=()=>{if(request===speechRequest)status.textContent='Voix française : '+voice.name+' ('+voice.lang+').'};
  utterance.onend=()=>{if(request===speechRequest){activeFrenchUtterance=null;status.textContent='Voix française : '+voice.name+' ('+voice.lang+').'}};
  utterance.onerror=event=>{if(request===speechRequest&&event.error!=='canceled'&&event.error!=='interrupted'){activeFrenchUtterance=null;status.textContent='La voix française n’a pas pu démarrer. Choisis une autre voix française ou essaie un autre navigateur.'}};
  status.textContent='Voix française : '+voice.name+' ('+voice.lang+').';
  speechSynthesis.speak(utterance);
}
if('speechSynthesis' in window){speechSynthesis.getVoices();speechSynthesis.addEventListener('voiceschanged',refreshFrenchVoiceSelect)}
