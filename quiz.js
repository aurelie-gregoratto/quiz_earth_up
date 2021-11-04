// DOM => Document Object Model

const els = {                           //variable de structure (objet)
    welcomeScreen: null,
    questionScreen: null,
    endScreen: null,
    welcomeBtn: null,
    answers: null,
    endBtn: null,
    answersContainer: null,
};

let questionIndex = 0;  //pour savoir à quelle question on est / let pour pouvoir modifié la nombre 0

const questions = [{
        question : 'Qu\'est-ce qui vous rend le plus fier/fière ?',     //propriété
        answers: [{
            title: 'Votre capacité à obtenir ce que vous voulez',       //objet
            house: 'Bee'
        }, {
            title: 'Votre capacité d\'adaptation',
            house: 'Bee'
        }, {
            title: 'Votre capacité à comprendre de nouvelles informations ',
            house: 'Turtle'
        }, {
            title: 'Votre esprit critique',
            house: 'Turtle'
        }]
    },
    {
        question: 'Comment décrivriez-vous vos relations amicales ?',
        answers: [{
            title: 'J\'adore être entouré de beaucoup de personnes. Plus on est de fous, plus on rit',
            house: 'Bee'
        }, {
            title: 'J\'ai quelques ami(e)s très proches à qui je pourrais confier mes secrets',
            house: 'Turtle'
        }]
    },
    {
        question: 'Ce qui vous ferait le plus mal, ce serait qu\'on vous dise que vous êtes... :',
        answers: [{
            title: 'Ignorant(e)',
            house: 'Turtle'
        }, {
            title: 'Ennuyeux(se)',
            house: 'Bee'
        }]
    },
    {
        question: 'Pendant votre concours d\'entrée, vous découvrez que votre voisin triche. Que faites-vous ?',
        answers: [{
            title: 'Vous en informer directement le professeur (tricher c\'est mal dans tous les cas)',
            house: 'Bee'
        }, {
            title: 'Vous ne faites rien',
            house: 'Turtle'
        }, {
            title: 'Vous incitez vos amis à en parler au professeur après le concours',
            house: 'Turtle'
        }, {
            title: 'Vous félicitez votre camarade d\'avoir réussi à tricher pendant le concours',
            house: 'Bee'
        }]
    },
    {
        question: 'De quelle manière voulez-vous qu\'on se souvienne de vous après votre mort ?',
        answers: [{
            title: 'En racontant tout le temps les récits de vos aventures',
            house: 'Bee'
        }, {
            title: 'Peu importe ce que les gens pensent de moi lorsque je serai mort(e), l\'essentiel c\'est ce que j\'ai fait lorsque j\'étais vivant',
            house: 'Turtle'
        }, {
            title: 'En éprouvant de l\'admiration quand on pense à vos exploits',
            house: 'Bee'
        }, {
            title: 'En gardant le sourire et de bons souvenirs',
            house: 'Turtle'
        }]
    },
    {
        question: 'On vous propose une nuit blanche, laquelle choisissez-vous :',
        answers: [{
            title: 'Vous partez dormir',
            house: 'Turtle'
        }, {
            title: 'Une grosse soirée entre amis',
            house: 'Bee'
        }, {
            title: 'Faire un marathon de Star Wars entre amis',
            house: 'Turtle'            
        }]
    },
    {
        question: 'Un braconnier est en train d\'attacher un éléphanteau, que faites-vous ?',
        answers: [{
            title: 'Vous mettez en place une stratégie',
            house: 'Turtle'
        }, {
            title: 'Vous foncez dans le tas !',
            house: 'Bee'
        }, {
            title: 'Vous avez peur mais vous prenez votre courage à deux mains',
            house: 'Bee'
        }, {
            title: 'Vous avez peur mais vous appelez quelqu\'un qui pourrait le neutraliser ',
            house: 'Turtle'
        }]
    },
    {
        question: 'Quel est votre passe-temps ?',
        answers: [{
            title: 'Lire un bon livre',
            house: 'Turtle'
        }, {
            title: 'Faire du sport, il n\'y a rien de mieux que de se défouler',
            house: 'Bee'
        }, {
            title: 'Jouer à des jeux vidéo',
            house: 'Bee'
        }, {
            title: 'Jouer d\'un instrument de musique ',
            house: 'Turtle'
        }]
    },
    {
        question: 'Vous avez beaucoup de travail et quelqu’un vous raconte ses malheurs :',
        answers: [{
            title: 'Vous l\'écoutez attentivement ',
            house: 'Turtle'
        }, {
            title: 'Vous lui expliquez gentiment que vous êtes occupé(e), mais vous revenez vers lui rapidement',
            house: 'Bee'
        }]
    },
    {
        question: 'Vous avez raison sur un sujet mais votre ami(e) ne l\'admet pas',
        answers: [{
            title: 'Vous lui expliquez mais vous n\'insistez pas plus ',
            house: 'Turtle'
        }, {
            title: 'Vous insistez jusqu\'à ce qu\'il/elle comprenne que vous avez bien raison',
            house: 'Bee'
        }, {
            title: 'Vous le/la laissez dans l\'ignorance',
            house: 'Bee'
        }]
    },
];

const recordedAnswers = [];         //constance pour enregistrer la réponse à chaque question


const init = () => {
    console.log('Page chargé');         //la page est chargé à partir d'ici
    //attache chaque selecteur à un élément (ici à une class HTML)
    els.welcomeScreen = document.querySelector('.welcome-screen');
    els.questionScreen = document.querySelector('.question-screen');
    els.endScreen = document.querySelector('.end-screen');
    els.welcomeBtn = els.welcomeScreen.querySelector('button');     //le boutton dans WelcomeScreen (pour que ce soit plus facil (optimiser))
    els.answersContainer = els.questionScreen.querySelector('ul');

    els.welcomeBtn.addEventListener('click', () => {
        displayScreen('question');
        displayQuestion(questionIndex);
    });
    

    els.answersContainer.addEventListener('click', ({ target }) => {        //on va récupéré la target de l'évênement, les {} est event alors on récupère la target directement dans l'event
        if (target.tagName !== 'LI') {               //si tagName n'est pas égale à LI alors ...
            return;                                  //On arrête la fonction
        }

        const house = target.getAttribute('data-house');        //Sinon on récupère le target qui sera dans data-house
        recordedAnswers.push(house);                            //Et on met cela dans RecordedAnswers

        questionIndex++;

        if (questionIndex >= questions.length) {
            calculateScore();                               //fonction pour calculer le score (avant l'écran de fin)
            displayScreen('end');
        } else {
            displayQuestion(questionIndex);            
            /*const random = (max, min) =>{
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            if (question = 0){
                console.log(displayQuestion(questionIndex.innerHTML = random(15,10)));
                question++;
            }
            else{
                question1.display=none;    
            }*/
            
        }
    });

};




//Calculer le score
const calculateScore = () => {
    const house = recordedAnswers.sort((a, b) => {                                                                                   //le "sort" prendre les éléments deux par deux en les mettant d'abord dans l'ordre alphabétique (turtle / bee). Le "sort" il attend un résultat avec un - ou un + (ici c'est -) et il va ordonné du coup les mots suivant le résultat, celui qui apparait le moins souvent en premier et l'autre en deuxième.
        return recordedAnswers.filter(answer => answer === a).length - recordedAnswers.filter(answer => answer === b).length        //le "recordedAnswers.filter(answer => answer === b)" va prendre tous les éléments et le ".length" va donner le nombre de l'élément (par exemple il y a 3 bee)
    }).pop();                                                                                                                       //pop va récupérer le dernier élément
    // console.log('house', house);


    els.endScreen.querySelector('span').textContent = house;

    /*let SPAN = document.getElementById('span');

    if(houseInFrench = Turtle){
        SPAN.style.color="#74d17c";
    }
    else{
        SPAN.style.color="#ff931e";
    }*/
};





//Changer la question
const displayQuestion = (index) => {

    const currentQuestion = questions[index];
    //changer la question
    const questionEl = els.questionScreen.querySelector('h2');      //constante qui fait appelle le h2
    //changer les réponses
    const answerEls = currentQuestion.answers.map((answer) => {     //boucle (action) à chaque question
        const liEl = document.createElement('li');                  //écrase et recré des li à chaque question
        liEl.textContent = answer.title;                            //récupère le title
        liEl.setAttribute('data-house', answer.house);              //et la maison
        return liEl;
    });

    questionEl.textContent = currentQuestion.question;              //change la question grâce à la constante
    els.answersContainer.textContent = '';                          
    els.answersContainer.append(...answerEls);                      //append sert à récupérer l'arrêt / le spred (...), ça remplace les virgules (normalement il devrait avoir tous les éléments séparer par des virgules) sinon fallait tout écrire à la main -> answerEls[0], answerEls[1]...) 
};

const displayScreen = (screenName) => {
    // console.log('screenName', screenName);
    els.welcomeScreen.style.display = 'none';
    els.questionScreen.style.display = 'none';
    els.endScreen.style.display = 'none';

    const screen = els[screenName + 'Screen'];
    // console.log('screen', screen);
    screen.style.display = 'flex';
};


window.addEventListener('load', init);  //attendre que la page se charge

//loader
$(window).on("load", function(){
	$(".loader").fadeOut(1000);
});

