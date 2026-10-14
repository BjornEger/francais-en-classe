// Stable IDs preserve favorites when vocabulary is expanded.
function grammarEntry(type,key,group,fr,da,ex,exda,note='',extra={}){
  entries.push({id:`grammar-${type}-${key}`,type,group,fr,da,ex,exda,note,...extra});
}
const expressionLessons=[
 ['ago','Le temps','il y a dix ans','for ti år siden','J’ai visité Paris il y a dix ans.','Jeg besøgte Paris for ti år siden.','Il y a + durée : un moment dans le passé. / Et tidspunkt i fortiden.'],
 ['in','Le temps','dans trois jours','om tre dage','Nous partons dans trois jours.','Vi tager afsted om tre dage.','Dans + durée : un moment dans le futur. / Et tidspunkt i fremtiden.'],
 ['duration','Le temps','pendant dix jours','i ti dage','Nous sommes partis en vacances pendant dix jours.','Vi var afsted på ferie i ti dage.','Pendant indique la durée. Pour un séjour : Nous sommes restés dix jours. / Pendant angiver varigheden.'],
 ['since','Le temps','depuis dix ans','i ti år / siden for ti år siden','J’habite ici depuis dix ans.','Jeg har boet her i ti år.','Depuis : cela continue maintenant. Le français emploie le présent ici. / Det fortsætter stadig; fransk bruger nutid.'],
 ['since-monday','Le temps','depuis lundi','siden mandag','Il pleut depuis lundi.','Det har regnet siden mandag.'],
 ['takes','Le temps','en dix minutes','på ti minutter','J’ai fait cet exercice en dix minutes.','Jeg lavede denne øvelse på ti minutter.','En : le temps nécessaire pour finir. / Den tid, det tager at blive færdig.'],
 ['until','Le temps','jusqu’à demain','indtil i morgen','Je reste ici jusqu’à demain.','Jeg bliver her indtil i morgen.'],
 ['from','Le temps','à partir de lundi','fra mandag','Le magasin sera ouvert à partir de lundi.','Butikken vil være åben fra mandag.'],
 ['before','Le temps','avant le cours','før undervisningen','Je prends un café avant le cours.','Jeg drikker en kaffe før undervisningen.'],
 ['after','Le temps','après le cours','efter undervisningen','On se voit après le cours.','Vi ses efter undervisningen.'],
 ['yesterday','Le temps','hier / aujourd’hui / demain','i går / i dag / i morgen','Hier, j’étais à Paris ; demain, je serai à Munich.','I går var jeg i Paris; i morgen vil jeg være i München.'],
 ['day-before','Le temps','avant-hier / après-demain','i forgårs / i overmorgen','Elle arrive après-demain.','Hun ankommer i overmorgen.'],
 ['last','Le temps','la semaine dernière','i sidste uge','Je l’ai vu la semaine dernière.','Jeg så ham i sidste uge.'],
 ['next','Le temps','la semaine prochaine','i næste uge','Je pars la semaine prochaine.','Jeg tager afsted i næste uge.'],
 ['soon','Le temps','bientôt / tout à l’heure','snart / om lidt eller tidligere i dag','À tout à l’heure !','Vi ses om lidt!','Tout à l’heure peut désigner le passé ou le futur selon le contexte. / Afhænger af sammenhængen.'],
 ['now','Le temps','maintenant / tout de suite','nu / med det samme','Je viens tout de suite.','Jeg kommer med det samme.'],
 ['already','Le temps','déjà / pas encore','allerede / ikke endnu','Il est déjà là, mais elle n’est pas encore arrivée.','Han er her allerede, men hun er ikke kommet endnu.'],
 ['early','Le temps','tôt / tard','tidligt / sent','Nous arrivons tôt et nous repartons tard.','Vi kommer tidligt og tager afsted igen sent.'],
 ['ontime','Le temps','à l’heure / en retard / en avance','til tiden / forsinket / i god tid','Le train est en retard.','Toget er forsinket.'],
 ['every','Le temps','tous les jours','hver dag','Je parle français tous les jours.','Jeg taler fransk hver dag.'],
 ['route','Le lieu','de Paris à Munich','fra Paris til München','Nous allons de Paris à Munich en train.','Vi rejser fra Paris til München med tog.','De + ville : origine ; à + ville : destination. / Fra og til en by.'],
 ['under','Le lieu','sous la table','under bordet','Le chat est sous la table.','Katten er under bordet.'],
 ['floor','Le lieu','par terre / sur le sol','på gulvet / på jorden','Le livre est par terre.','Bogen ligger på gulvet.','Par terre : sur le sol, à l’intérieur ou dehors. / På gulvet indenfor eller på jorden udenfor.'],
 ['beside','Le lieu','à côté de la rivière','ved siden af floden','La maison est à côté de la rivière.','Huset ligger ved siden af floden.'],
 ['opposite','Le lieu','en face de la gare','overfor banegården','L’hôtel est en face de la gare.','Hotellet ligger overfor banegården.'],
 ['on','Le lieu','sur la table','på bordet','Les clés sont sur la table.','Nøglerne ligger på bordet.'],
 ['above','Le lieu','au-dessus de la table','over bordet','La lampe est au-dessus de la table.','Lampen hænger over bordet.','Au-dessus de : plus haut, sans contact nécessaire. Sur : généralement avec contact. / Over kontra på.'],
 ['below','Le lieu','au-dessous de / en dessous de','nedenunder / under','La cave est en dessous de la cuisine.','Kælderen ligger under køkkenet.'],
 ['front','Le lieu','devant / derrière','foran / bagved','Il attend devant la maison.','Han venter foran huset.'],
 ['between','Le lieu','entre les deux maisons','mellem de to huse','Le jardin est entre les deux maisons.','Haven ligger mellem de to huse.'],
 ['near','Le lieu','près de / loin de','tæt på / langt fra','J’habite près de la gare.','Jeg bor tæt på banegården.'],
 ['along','Le lieu','le long de la rivière','langs floden','Nous marchons le long de la rivière.','Vi går langs floden.'],
 ['inside','Le lieu','à l’intérieur / à l’extérieur','indenfor / udenfor','Les enfants jouent à l’extérieur.','Børnene leger udenfor.'],
 ['here','Le lieu','ici / là / là-bas','her / der / derovre','Viens ici ! Il habite là-bas.','Kom her! Han bor derovre.'],
 ['everywhere','Le lieu','partout / quelque part / nulle part','overalt / et sted / ingen steder','Je ne trouve mes clés nulle part.','Jeg kan ikke finde mine nøgler nogen steder.','Nulle part s’emploie avec ne : ne… nulle part. / Bruges i nægtende sætninger.'],
 ['direction','Le lieu','à gauche / à droite / tout droit','til venstre / til højre / ligeud','Tournez à droite, puis allez tout droit.','Drej til højre, og gå så ligeud.'],
 ['home','Le lieu','chez moi / chez toi / chez elle','hjemme hos mig / dig / hende','Nous dînons chez elle.','Vi spiser aftensmad hos hende.','Chez + personne ; à + ville. / Chez bruges om en person eller vedkommendes hjem.'],
 ['countries','Le lieu','en France / au Danemark / aux États-Unis','i Frankrig / Danmark / USA','Je vis au Danemark et je vais en France.','Jeg bor i Danmark og tager til Frankrig.','En + pays féminin ; au + pays masculin commençant par une consonne ; aux + pays pluriel. / Landets køn og tal bestemmer formen.'],
 ['origin','Le lieu','de France / du Danemark / des États-Unis','fra Frankrig / Danmark / USA','Il vient du Danemark.','Han kommer fra Danmark.'],
 ['towards','Le lieu','vers la gare','hen mod banegården','Nous marchons vers la gare.','Vi går hen mod banegården.'],
 ['always','La fréquence','toujours / souvent','altid / ofte','Je prends souvent le train.','Jeg tager ofte toget.','Toujours peut aussi signifier « stadig » : Il est toujours là.'],
 ['sometimes','La fréquence','parfois / de temps en temps','nogle gange / af og til','Nous allons de temps en temps au cinéma.','Vi går af og til i biografen.'],
 ['rarely','La fréquence','rarement / ne… jamais','sjældent / aldrig','Je ne mange jamais de viande.','Jeg spiser aldrig kød.'],
 ['usually','La fréquence','d’habitude / en général','som regel / generelt','D’habitude, je me lève à sept heures.','Som regel står jeg op klokken syv.'],
 ['again','Autres adverbes','encore / ne… plus','igen eller stadig / ikke længere','Il travaille encore, mais elle ne travaille plus.','Han arbejder stadig, men hun arbejder ikke længere.'],
 ['well','Autres adverbes','bien / mal','godt / dårligt','Elle parle bien français.','Hun taler godt fransk.','Bien décrit souvent une action ; bon décrit un nom. / Bien beskriver ofte en handling; bon et navneord.'],
 ['speed','Autres adverbes','vite / lentement','hurtigt / langsomt','Parlez lentement, s’il vous plaît.','Tal langsomt, tak.'],
 ['together','Autres adverbes','ensemble / séparément','sammen / hver for sig','Nous voyageons ensemble.','Vi rejser sammen.'],
 ['amount','Autres adverbes','beaucoup / un peu','meget / lidt','Je comprends un peu le français.','Jeg forstår lidt fransk.','Devant un nom : beaucoup de temps, un peu de pain. / Før navneord bruges de.'],
 ['degree','Autres adverbes','très / trop / assez','meget / for meget eller for / nok eller ret','Ce café est trop chaud.','Denne kaffe er for varm.','Très + adjectif/adverbe : très chaud. Beaucoup + verbe : travailler beaucoup.'],
 ['almost','Autres adverbes','presque / seulement','næsten / kun','J’ai seulement dix euros.','Jeg har kun ti euro.'],
 ['maybe','Autres adverbes','peut-être / probablement','måske / sandsynligvis','Il va peut-être venir demain.','Han kommer måske i morgen.'],
 ['also','Autres adverbes','aussi / non plus','også / heller ikke','Je parle aussi danois. Je ne parle pas espagnol non plus.','Jeg taler også dansk. Jeg taler heller ikke spansk.'],
 ['therefore','Autres adverbes','donc / pourtant','derfor eller altså / alligevel','Il pleut ; pourtant, nous sortons.','Det regner; alligevel går vi ud.']
];
expressionLessons.forEach(row=>grammarEntry('adverbes',...row));

const pronounRows=[
 ['je','jeg','me / m’','me / m’','moi'],['tu','du','te / t’','te / t’','toi'],
 ['il','han / den / det','le / l’','lui','lui'],['elle','hun / den / det','la / l’','lui','elle'],
 ['on','man / vi (uformelt)','—','—','soi / nous'],['nous','vi','nous','nous','nous'],
 ['vous','I / De','vous','vous','vous'],['ils','de (hankøn / blandet)','les','leur','eux'],['elles','de (hunkøn)','les','leur','elles']
];
const subjectExamples=[['Je suis danois.','Jeg er dansk.'],['Tu parles français.','Du taler fransk.'],['Il est ici.','Han er her.'],['Elle est ici.','Hun er her.'],['On part demain.','Vi tager afsted i morgen.'],['Nous sommes prêts.','Vi er klar.'],['Vous êtes ici.','I / De er her.'],['Ils arrivent demain.','De ankommer i morgen.'],['Elles arrivent demain.','De ankommer i morgen.']];
pronounRows.forEach((r,i)=>grammarEntry('pronoms','subject-'+r[0],'Sujet · grundled',r[0],r[1],...subjectExamples[i],r[0]==='on'?'On se conjugue comme il/elle. Soi renvoie à on impersonnel ; nous à on signifiant « vi ». / On bøjes som il/elle.':r[0]==='vous'?'Vous : plusieurs personnes ou une personne par politesse. / I eller høfligt De.':'', {paradigm:[['Sujet · grundled',r[0]],['COD · direkte objekt',r[2]],['COI · indirekte objekt',r[3]],['Tonique · trykstærk',r[4]]]}));
const objectLessons=[
 ['me','me / m’','mig','Il me voit.','Han ser mig.'],['te','te / t’','dig','Je t’écoute.','Jeg lytter til dig.'],
 ['le','le / l’','ham / den / det (hankøn)','Je le vois.','Jeg ser ham.'],['la','la / l’','hende / den / det (hunkøn)','Je la vois.','Jeg ser hende.'],
 ['nous','nous','os','Elle nous aide.','Hun hjælper os.'],['vous','vous','jer / Dem','Je vous connais.','Jeg kender jer / Dem.'],['les','les','dem','Je les attends.','Jeg venter på dem.']
];
objectLessons.forEach(r=>grammarEntry('pronoms','direct-'+r[0],'COD · direkte objekt',...r.slice(1),'Le COD remplace un complément sans préposition en français. Il se place généralement avant le verbe : Je le vois ; je l’ai vu ; je vais le voir. / Fransk og dansk bruger ikke altid samme konstruktion.'));
const indirectLessons=[
 ['me','me / m’','mig / til mig','Elle me donne un livre.','Hun giver mig en bog.'],['te','te / t’','dig / til dig','Je te téléphone.','Jeg ringer til dig.'],
 ['lui','lui','ham / hende / til ham eller hende','Je lui parle.','Jeg taler til ham / hende.'],['nous','nous','os / til os','Il nous écrit.','Han skriver til os.'],
 ['vous','vous','jer / Dem / til jer eller Dem','Je vous réponds.','Jeg svarer jer / Dem.'],['leur','leur','dem / til dem','Je leur donne les clés.','Jeg giver dem nøglerne.']
];
indirectLessons.forEach(r=>grammarEntry('pronoms','indirect-'+r[0],'COI · indirekte objekt',...r.slice(1),'Avec certains verbes construits avec à + personne : parler à Marie → lui parler. Lui vaut pour un homme ou une femme ; leur ne prend jamais de s ici. Attention : penser à elle, pas « lui penser ». / Lær konstruktionen sammen med verbet.'));
const tonicLessons=[
 ['moi','mig / jeg','C’est pour moi.','Det er til mig.'],['toi','dig / du','Je viens avec toi.','Jeg kommer med dig.'],['lui','ham / han','C’est chez lui.','Det er hjemme hos ham.'],['elle','hende / hun','Je suis avec elle.','Jeg er sammen med hende.'],['nous','os / vi','C’est pour nous.','Det er til os.'],['vous','jer / Dem / I / De','Je viens avec vous.','Jeg kommer med jer / Dem.'],['eux','dem / de (hankøn / blandet)','Je pars avec eux.','Jeg tager afsted med dem.'],['elles','dem / de (hunkøn)','Je pars avec elles.','Jeg tager afsted med dem.'],['soi','sig / sig selv (generelt)','Il faut prendre soin de soi.','Man skal passe på sig selv.']
];
tonicLessons.forEach(r=>grammarEntry('pronoms','tonic-'+r[0],'Toniques · trykstærke',...r,'Après une préposition (avec, pour, chez…), après c’est ou pour insister : Moi, je… / Efter forholdsord, efter c’est eller ved fremhævelse.'));
const possessiveRows=[
 ['je','min / mit / mine','mon','ma','mes','le mien','la mienne','les miens','les miennes'],
 ['tu','din / dit / dine','ton','ta','tes','le tien','la tienne','les tiens','les tiennes'],
 ['il / elle','hans / hendes / sin / sit / sine','son','sa','ses','le sien','la sienne','les siens','les siennes'],
 ['nous','vores','notre','notre','nos','le nôtre','la nôtre','les nôtres','les nôtres'],
 ['vous','jeres / Deres','votre','votre','vos','le vôtre','la vôtre','les vôtres','les vôtres'],
 ['ils / elles','deres','leur','leur','leurs','le leur','la leur','les leurs','les leurs']
];
const possExamples=[['C’est mon livre et ma voiture.','Det er min bog og min bil.'],['C’est ton livre et ta voiture.','Det er din bog og din bil.'],['Paul prend son livre. Marie prend son livre aussi.','Paul tager sin bog. Marie tager også sin bog.'],['C’est notre livre. Ce sont nos livres.','Det er vores bog. Det er vores bøger.'],['C’est votre livre. Ce sont vos livres.','Det er jeres / Deres bog. Det er jeres / Deres bøger.'],['C’est leur livre. Ce sont leurs livres.','Det er deres bog. Det er deres bøger.']];
possessiveRows.forEach((r,i)=>{
 grammarEntry('pronoms','poss-'+i,'Possessifs · min, din…',r.slice(2,5).filter((v,j,a)=>a.indexOf(v)===j).join(' / '),r[1],...possExamples[i],'Devant un nom : le genre et le nombre du nom déterminent la forme, pas le sexe du propriétaire. Son livre = hans/hendes/sin bog. Devant une voyelle ou un h muet : mon amie, ton école, son histoire. / Formen følger det ejede ord.',{paradigm:[['Nom masculin singulier',r[2]+' livre'],['Nom féminin singulier',r[3]+' voiture'],['Nom pluriel',r[4]+' livres / voitures']]});
 grammarEntry('pronoms','poss-pronoun-'+i,'Pronoms possessifs · min / mit alene',r.slice(5).filter((v,j,a)=>a.indexOf(v)===j).join(' / '),r[1]+' (erstatter navneordet)',`Ce livre est à ${['moi','toi','lui','nous','vous','eux'][i]}. C’est ${r[5]}.`,['Denne bog er min.','Denne bog er din.','Denne bog er hans.','Denne bog er vores.','Denne bog er jeres / Deres.','Denne bog er deres.'][i],'Le pronom remplace le nom : mon livre → le mien ; ma voiture → la mienne. Il s’accorde avec ce qui est possédé. Notre/votre devant un nom ; le nôtre/le vôtre avec un accent. / Stedordet erstatter navneordet og følger dets køn og tal.',{paradigm:[['Masculin singulier',r[5]],['Féminin singulier',r[6]],['Masculin pluriel',r[7]],['Féminin pluriel',r[8]]]});
});
[
 ['reflexive','Réfléchis, y et en','me / te / se / nous / vous / se','mig / dig / sig / os / jer / sig','Je me lave. Elle se lave.','Jeg vasker mig. Hun vasker sig.','Me, te, se deviennent m’, t’, s’ devant une voyelle ou un h muet. / Bruges med refleksive verber.'],
 ['y','Réfléchis, y et en','y','der / dertil / på det','Tu vas à Paris ? Oui, j’y vais.','Tager du til Paris? Ja, jeg tager dertil.','Remplace souvent un lieu ou à + chose : Je pense à ce voyage → J’y pense. Pour une personne : Je pense à elle.'],
 ['en','Réfléchis, y et en','en','derfra / af det / nogen af dem','Tu veux du café ? Oui, j’en veux.','Vil du have kaffe? Ja, det vil jeg gerne.','Remplace souvent de + chose ou une quantité : J’ai trois livres → J’en ai trois. / Bevar tallet, når du angiver en mængde.']
].forEach(r=>grammarEntry('pronoms',...r));

function grammarGuide(category){
 const table=(heads,rows)=>`<div class="grammar-table-wrap" tabindex="0" role="region" aria-label="Tableau des formes"><table><thead><tr>${heads.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>i===0?`<th scope="row">${esc(c)}</th>`:`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 if(category==='adverbes')return `<div class="grammar-guide"><p><strong>Temps, lieu et autres adverbes</strong> · Tid, sted og andre vigtige vendinger.</p><p>Ces fiches réunissent des adverbes et des expressions avec prépositions. / Her finder du både biord og vendinger med forholdsord.</p><div class="time-guide"><div><strong>il y a dix ans</strong><span>for ti år siden · passé</span></div><div><strong>dans trois jours</strong><span>om tre dage · futur</span></div><div><strong>pendant dix jours</strong><span>i ti dage · durée</span></div><div><strong>depuis dix ans</strong><span>i ti år · fortsætter stadig</span></div><div><strong>en dix minutes</strong><span>på ti minutter · tid til at blive færdig</span></div></div></div>`;
 if(category!=='pronoms')return '';
 return `<div class="grammar-guide"><details open><summary>Les pronoms personnels · personlige stedord</summary><p>Les formes changent selon leur rôle : sujet (grundled), COD (direkte objekt), COI (indirekte objekt), forme tonique (trykstærk form).</p>${table(['Sujet','Dansk','COD','COI','Tonique'],pronounRows)}<p>On : « man » ou « vi ». Les tirets ne sont pas des formes : pour un objet, choisir le pronom correspondant à la personne ou à la chose visée. / Vælg objektformen efter den person eller ting, der henvises til.</p></details><details><summary>Les possessifs · min, din, hans, hendes, deres</summary><p><strong>Son livre</strong> = hans bog, hendes bog ou sin bog. <strong>Sa voiture</strong> = hans bil, hendes bil ou sin bil. La forme suit le nom possédé. / Formen følger det ejede ord, ikke ejerens køn.</p>${table(['Personne','Dansk','Hankøn ental','Hunkøn ental','Flertal'],possessiveRows.map(r=>r.slice(0,5)))}<p>Mon amie, ton école, son histoire : mon/ton/son devant une voyelle ou un h muet, même au féminin. / Også ved hunkøn.</p><p>Avec un nom : <strong>mon livre</strong>. Sans le nom : <strong>le mien</strong>. / Med navneord: min bog. Uden navneord: min.</p></details></div>`;
}
