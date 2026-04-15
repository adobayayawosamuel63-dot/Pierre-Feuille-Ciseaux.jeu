// ============les variables=============
const btnP = document.getElementById('btn1')
const btnF = document.getElementById('btn2')
const btC = document.getElementById('btn3')
const Result = document.getElementById('result')
const rejoue = document.getElementById('restart')
const maxscore = document.getElementById('max')
const tableauCoeur = document.getElementById('grid')
let highscore=0;
let scorehum = 0;
let scorerob = 0;
let vie = 2;
let i ;
let temp ='';
let pluschoisit = ''
let variables = {
Ciseaux : 0,
Feuille : 0,
Pierre : 0,
}

console.log(variables.ciseaux)

// ========afficher score max==========
maxscore.innerText='Score max: \n'+ sessionStorage.getItem('high score')

// ================afficher coeur de base ==============
tableauCoeur.innerText = "💛💛💛"
// ==========function rejouer===========
    function reset(){
    scorehum = 0;
     scorerob = 0;
     vie = 2;
    btC.removeAttribute('disabled');
    btnF.removeAttribute('disabled');
    btnP.removeAttribute('disabled');
    rejoue.style.display= 'none';
    pluschoisit = ''
    Result.style.color = 'black';
    Result.innerText="Score: \nHumain = "+scorehum+" vs robot = "+ scorerob ;
  tableauCoeur.innerText = "💛💛💛" 
    }
    // ==================function add coeur========================
   let victoire = false;
     function addcoeur(Boolean){
         if(victoire == true){
            vie++;
            victoire= false;
         }else{
            victoire= true;
         }
     }



// ====================function coeur==================
function dessin(number,div){
    let des = '💛'
    let nvie = ''
    for(let y = 0 ; y <= number ; y++){
     nvie+=des;
    }
    div.innerText = nvie;
}
// ==========logic pour Transform choix robot en nom claire========

function robot (){
    // 0= P ; 1 = F ; 2 = C
    if(i==0){
      temp = 'Pierre'

    }else if(i==1){
      temp = 'Feuille'

    }else if( i ==2){
      temp = 'Ciseaux'

    }
}
robot()

// ============== score<0;score=0===================

function limiterNote(note) {
     if(note<0){
       return note = 0 ;
     }   else{
        return note = note;
     }
}
// ===============declencheur jeu========================
function humainChoix(choix){
 i = Math.floor(Math.random()*3);
 balencerandom(i)

 
  robot();
  gamer(temp,choix);
//   =========================suivie du choix==========
  let choixdujouer = choix.innerText;
  variables[choixdujouer]++;  
  console.log(variables);
   choixPlus(variables);
   
}
//============function balence randome=================
function balencerandom(varie){
    // 0= P ; 1 = F ; 2 = C
    if(varie < 1){
         varie = Math.floor(Math.random()*3); 
    }else if (pluschoisit === 'Feuille'){ 
      varie = 2;  
    }else if( pluschoisit === 'Piere'){
        varie = 2;
    }else if(pluschoisit === 'Ciseaux'){
        varie = 0;
    }
}
// ================function choix plus utilisé==========

function choixPlus (variables){
   if(variables.Ciseaux > variables.Feuille && variables.Ciseaux >variables.Pierre){
     pluschoisit='Ciseaux';
   }else if(variables.Feuille>variables.Ciseaux && variables.Feuille >variables.Pierre){
     pluschoisit='Feuille';
   }else if(variables.Pierre > variables.Ciseaux && variables.Feuille <variables.Pierre){
     pluschoisit='Pierre';
   }else if(variables.Ciseaux === variables.Feuille && variables.ciseaux === variables.Pierre){
    pluschoisit='tous au meme';
   }
  
}


 
// ======================decision du jeu====================

function gamer(choixrob,choixhum){

// ==================quand je gagne================
    if(choixrob===choixhum.innerText){
           Result.style.color = 'black';
        Result.innerText="vous avez fais le meme choix ...partie null \nrobot : "+choixrob+" \nhumain : "+ choixhum.innerText+ "\n \nScore: \nHumain = "+ limiterNote(scorehum) +" vs robot = "+ limiterNote(scorerob) ;
        victoire = false;
        dessin(vie,tableauCoeur); 

    }else if (choixrob==='Ciseaux' && choixhum.innerText ==='Pierre'){
         scorerob-=10;
         scorerob=limiterNote(scorerob);         
         scorehum+=50;
        Result.style.color = 'green';
        Result.innerText=" robot : "+choixrob+" \nhumain : "+ choixhum.innerText+ "\n gagnée\nScore: \nHumain = "+ limiterNote(scorehum) +" vs robot = "+ limiterNote(scorerob) ;
        addcoeur(victoire);
        dessin(vie,tableauCoeur); 
       

    }else if (choixrob==='Feuille' && choixhum.innerText ==='Feuille'){
       scorerob-=10;
       scorerob=limiterNote(scorerob);  
       scorehum+=50;
          Result.style.color = 'green';
       Result.innerText="robot : "+choixrob+" \nhumain : "+ choixhum.innerText+ " \n gagnée\nScore: \nHumain = "+scorehum+" vs robot = "+limiterNote(scorerob) ;
       addcoeur(victoire);
       dessin(vie,tableauCoeur); 
        // ==================quand je perd================
    }else if (choixrob==='Pierre' && choixhum.innerText ==='Feuille'){
        scorerob-=10;
         scorerob=limiterNote(scorerob);  
         scorehum+=50;
            Result.style.color = 'green';
        Result.innerText="robot : "+ choixrob +" \nhumain : "+ choixhum.innerText+ " \n gagnée\nScore: \nHumain = "+scorehum+" vs robot = "+limiterNote(scorerob) ; 
        addcoeur(victoire);
        dessin(vie,tableauCoeur);  
                 
    }else{
        scorerob+=50;
        scorehum-=10;
        scorehum=limiterNote(scorehum);  
           Result.style.color = 'red';
        Result.innerText=" robot : "+choixrob+" \nhumain : "+ choixhum.innerText+ "\n Perdu \nScore: \nHumain = "+limiterNote(scorehum)+"vs robot = "+scorerob;       
        vie = vie - 1;
       victoire = false;
        dessin(vie,tableauCoeur); 
    }

//  =====================desactive btn=============    
    if( vie < 0){
        btC.setAttribute('disabled', '');
        btnF.setAttribute('disabled', '');
        btnP.setAttribute('disabled', '');
        // =================enregistre le meilleur score======
       highscore = Math.max(highscore,scorehum); 
       Number(sessionStorage.setItem('high score', highscore));
       rejoue.style.display= 'block';
       tableauCoeur.innerText = '⚰️'
}

// ============decision final===========
    if(scorehum < scorerob && vie < 0){
           Result.style.color = 'red';
    Result.innerText=" robot : "+choixrob+" \nhumain : "+ choixhum.innerText+ "\n Game Over \nScore: \nHumain = "+limiterNote(scorehum)+" vs robot = "+scorerob +' \nvous avez perdu(e) !!! '; 
          tableauCoeur.innerText = '⚰️'
    }

    if(scorehum > scorerob && vie < 0){
           Result.style.color = 'green';
    Result.innerText=" robot : "+choixrob+" \nhumain : "+ choixhum.innerText+ "\n Game Over \nScore: \nHumain = "+limiterNote(scorehum)+" vs robot = "+scorerob +' \nvous avez gagnée !!! \nAppuiyer sur Rejouer pour une nouvelle partie'; 
    tableauCoeur.innerText = '⚰️'
    }

}

// =================evenement=======================
rejoue.addEventListener('click', () => reset());
btC.addEventListener('click', () => humainChoix(btC));
btnF.addEventListener('click', () => humainChoix(btnF));
btnP.addEventListener('click', () => humainChoix(btnP));




