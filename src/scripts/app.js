"use strict";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
console.log(gsap.version);

let game = document.querySelector('.loader');
 if  ((game)) {
  window.addEventListener("load", function() {
      const loader = document.querySelector(".loader");
      const site = document.querySelector(".site");

      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s ease";

      setTimeout(() => {
        loader.style.display = "none";  // masque définitivement le loader
        site.classList.remove("hidden"); // affiche ton slider d’un coup
      }, 500);
    });

}


//date

let date = new Date().getFullYear();
document.getElementById('annee').innerHTML = date;


//////////anime Index

let animpc = document.querySelector('.sect01__txt');
if  ((window.matchMedia('(min-width: 1000px)').matches) && (animpc)) {
      
      gsap.from('.sect01__txt', { 
        duration: 1.5,
        
        x: -200,
        opacity: 0,
      });


//////personnage section

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".perso__info",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "linear",
    scrollTrigger: {
      trigger: ".perso",
      start: "top 50%",
      toggleActions: "play none none none",
      markers: false
    }
  }
);


gsap.fromTo(".decouverte__info", {
  y: 50,
    opacity: 0,
    scale: 0.95,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    scale: 1,
    ease: "linear",
  immediateRender: false,   // 🔑 empêche l'effet au chargement
  scrollTrigger: {
    trigger: ".decouverte__sect03",
    start: "top 80%",
    toggleActions: "play none none none",
    markers: false
  }
});




} else {

  gsap.registerPlugin(ScrollTrigger);
    gsap.from('.sect01__txt', { 
        duration: 1.5,
        
        y: -70,
        opacity: 0,
      });


      
  gsap.fromTo(".anec", {
    y: 20,
    opacity: 0,
    scale: 0.95,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    scale: 1,
    ease: "linear",
    immediateRender: false,   // 🔑 empêche l'effet au chargement
    scrollTrigger: {
      trigger: ".decouverte__sect03",
      start: "top 80%",
      toggleActions: "play none none none",
      markers: false
  }
});

gsap.fromTo(".Jeux__01", {
    y: 20,
    opacity: 0,
    scale: 0.95,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    scale: 1,
    ease: "linear",
    immediateRender: false,   // 🔑 empêche l'effet au chargement
    scrollTrigger: {
      trigger: ".anec",
      start: "top 70%",
      toggleActions: "play none none none",
      markers: false
  }
});

gsap.fromTo(".Jeux__02", {
    y: 20,
    opacity: 0,
    scale: 0.95,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    scale: 1,
    ease: "linear",
    immediateRender: false,   // 🔑 empêche l'effet au chargement
    scrollTrigger: {
      trigger: ".Jeux__01",
      start: "top 80%",
      toggleActions: "play none none none",
      markers: false
  }
});




}















////////GAME/////////////

//slider game

const sliders = document.querySelectorAll(".slider");
for(let slider of sliders){
    console.log(slider);
}



      //suite slider

            let buttons = document.querySelectorAll(".slider__js");
for (let button of buttons) {
  button.addEventListener("click", (e) => {
    let tabs = document.querySelectorAll(".slider__switch");
    for (let tab of tabs) {
      tab.classList.add("slider--hidden", "hidden");
      tab.classList.remove("slider--show");
    }

    let tabId = e.currentTarget.getAttribute("data-tab");
    let currentTab = document.getElementById(tabId);
    currentTab.classList.remove("slider--hidden", "hidden");
    currentTab.classList.add("slider--show");

    // --- 🔊 Gestion des sons ---
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }

    animateSection(tabId);

    function animateSection(tabId) {
  if (tabId === "content2") {
    const illu = document.querySelector("#content2 .chat--trait");
    const illuchat = document.querySelector(".chats02");
    if (illu) {
      // remettre l’illu visible avant d’animer (au cas où on revient sur la section)
      gsap.set(illu, { x: 0, opacity: 1 });

      gsap.to(illu, {
        duration: 1.2,        // durée en secondes
        x: -15,   
        opacity:0,
        repeat: 1,         // disparaît progressivement
        ease: "power2.inOut"
      });

      gsap.to(illuchat, {
        duration: 1,        // durée en secondes
        delay: 2,           // délai AVANT le début de l’animation
        x: 1100,
                 // déplacement vers la droite
        ease: "power2.inOut"
      });
    }
  }
  else if (tabId === "content1") {
    const illu = document.querySelector("#content1 .illustration__chien");
    if (illu) {
      // remettre l’illu visible avant d’animer (au cas où on revient sur la section)
      gsap.set(illu, { x: 0, opacity: 1 });

      gsap.to(illu, {
        duration: 1.2,        // durée en secondes
        x: 15,   
        opacity:0,
        repeat: -1,         // disparaît progressivement
        ease: "power2.inOut"
      });
    }
  }
}



    if (sectionSounds[tabId]) {
      currentSound = sectionSounds[tabId];
      currentSound.play().catch(err => {
        console.warn("Audio bloqué par le navigateur :", err);
      });
    }
  });
}

const sectionSounds = {
  content1: document.getElementById("sound-chien"),
  content2: document.getElementById("sound-chat"),
  content11: document.getElementById("sound-souris"),
  content18: document.getElementById("sound-oiseau"),
  content21: document.getElementById("sound-catpurr")
};

let currentSound = null;




////////////////////// 
let btnMouse = document.querySelector(".mouse__btn");
let btnOiseau = document.querySelector(".oiseau__btn");

 if  ((btnMouse)) {
                

    gsap.registerPlugin(MotionPathPlugin);

  const btn = document.getElementById("mouse");

  // Position initiale au centre
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  gsap.set(btn, { x: centerX, y: centerY });

  function randomPath(startX, startY) {
    const padding = 50;
    const points = [];

    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < 3; i++) {
      const x = Math.random() * (window.innerWidth - padding * 2) + padding;
      const y = Math.random() * (window.innerHeight - padding * 2) + padding;
      points.push({ x, y });
      currentX = x;
      currentY = y;
    }

    return points;
  }

  function moveAlongPath(startX, startY) {
    const path = randomPath(startX, startY);

    gsap.to(btn, {
      duration: 2,
      ease: "power1.inOut",
      motionPath: {
        path: [{ x: startX, y: startY }, ...path],
        autoRotate: true,
      },
      onComplete: () => {
        const last = path[path.length - 1];
        moveAlongPath(last.x, last.y); // relance à la fin du chemin
      }
    });
  }

  moveAlongPath(centerX, centerY);

 }
if  ((btnOiseau)) {



  gsap.registerPlugin(MotionPathPlugin);

  const btn = document.getElementById("oiseau");

  // Position initiale au centre
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  gsap.set(btn, { x: centerX, y: centerY });

  function randomPath(startX, startY) {
    const padding = 50;
    const points = [];

    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < 3; i++) {
      const x = Math.random() * (window.innerWidth - padding * 2) + padding;
      const y = Math.random() * (window.innerHeight - padding * 2) + padding;
      points.push({ x, y });
      currentX = x;
      currentY = y;
    }

    return points;
  }

  function moveAlongPath(startX, startY) {
  const path = randomPath(startX, startY);
  const last = path[path.length - 1];

  // Détermine la direction (droite ou gauche)
  if (last.x > startX) {
    // Va vers la droite → on inverse l’image
    gsap.set(btn, { scaleX: -1 });
  } else {
    // Va vers la gauche → orientation normale
    gsap.set(btn, { scaleX: 1 });
  }

  gsap.to(btn, {
    duration: 2,
    ease: "power1.inOut",
    motionPath: {
      path: [{ x: startX, y: startY }, ...path],
      autoRotate: false // pas de rotation automatique
    },
    onComplete: () => {
      moveAlongPath(last.x, last.y); // relance le mouvement
    }
  });
}

  moveAlongPath(centerX, centerY);




  /////////////////////////////////////////////


     document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.btn__anecdotes');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = button.getAttribute('data-target');
      const targetDiv = document.getElementById(targetId);
      
      if (targetDiv) {
        targetDiv.classList.remove('hidden');
        div.classList.add('anecdotes__anime');
      }
    });
  });
});

document.querySelectorAll(".btn__close").forEach(btn => {
  btn.addEventListener("click", e => {
    const anecdoteDiv = e.currentTarget.closest(".anecdotes");
    if (anecdoteDiv) anecdoteDiv.classList.add("hidden");
  });
});



//trouver chats

let poupCuisine = document.querySelector(".poupFind");
let cercleCuisine = document.querySelector(".cerclePoup");
let kimiSalon = document.querySelector(".kimiFind02");
let cercleSalon = document.querySelector(".cercleKimi02");

poupCuisine.addEventListener("click", (e) =>{
      cercleCuisine.classList.remove("hidden");

})

kimiSalon.addEventListener("click", (e) =>{
      cercleSalon.classList.remove("hidden");

})






        
 }


           



