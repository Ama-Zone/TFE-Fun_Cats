"use strict";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
console.log(gsap.version);
import Phaser from "phaser";
console.log(Phaser.VERSION);




/////chargement de page
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const main = document.querySelector("main");

  const minDuration = 3000; //durée minimum du loader en ms
  const startTime = performance.now(); //moment où le loader est affiché

  //fonction pour cacher le loader et montrer le main
  function hideLoader() {
    loader.classList.add("fade-out");

    setTimeout(() => {
      loader.style.display = "none";
      if (main) {
        main.classList.remove("hidden");
      }
    }, 1000); // durée du fade CSS
  }

  const elapsed = performance.now() - startTime;
  if (elapsed >= minDuration) {
    hideLoader(); // si plus de 3s déjà passées
  } else {
    setTimeout(hideLoader, minDuration - elapsed); // sinon, attendre le temps restant
  }
});



//date
let date = new Date().getFullYear();
document.getElementById('annee').innerHTML = date;


//////////anime Index
let animpc = document.querySelector('.sect01__txt');
if  ((animpc)) {
      
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
  immediateRender: false,   //empêche l'effet au chargement
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
    immediateRender: false,   
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
    immediateRender: false,   
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
    immediateRender: false,   
    scrollTrigger: {
      trigger: ".Jeux__01",
      start: "top 80%",
      toggleActions: "play none none none",
      markers: false
  }
});
}



// --- Slider Game ---
const sliders = document.querySelectorAll(".slider");
for (let slider of sliders) {
  console.log(slider);
}

// --- Boutons du slider ---
let buttons = document.querySelectorAll(".slider__js");
const sliderTransition = document.querySelector(".slider__transition"); 
let currentSound = null;

const sectionSounds = {
  chien: document.getElementById("sound-chien"),
  twocats: document.getElementById("sound-chat"),
  Game03: document.getElementById("sound-souris"),
  Game07: document.getElementById("sound-oiseau"),
  content37: document.getElementById("sound-catpurr")
};

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const tabId = e.currentTarget.getAttribute("data-tab"); 

    //afficher le fondu noir
    sliderTransition.classList.add("active");

    //changement de section au milieu du fondu
    setTimeout(() => {
      const tabs = document.querySelectorAll(".slider__switch");
      for (let tab of tabs) {
        tab.classList.add("slider--hidden", "hidden");
        tab.classList.remove("slider--show");
      }

      const currentTab = document.getElementById(tabId);
      if (currentTab) {
        currentTab.classList.remove("slider--hidden", "hidden");
        currentTab.classList.add("slider--show");
      }

      // --- Gestion des sons ---
      if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
      }
      if (sectionSounds[tabId]) {
        currentSound = sectionSounds[tabId];
        currentSound.play().catch(err => console.warn("Audio bloqué :", err));
      }

      // --- Animations GSAP ---
      animateSection(tabId);

    }, 500); // mi-chemin du fondu

    //retirer le fondu après la transition complète
    setTimeout(() => {
      sliderTransition.classList.remove("active");
    }, 900);
  });
}

// --- Fonction animateSection
function animateSection(tabId) {
  if (tabId === "twocats") {
    const illu = document.querySelector("#twocats .chat--trait");
    const illuchat = document.querySelector(".chats02");
    if (illu) {
      gsap.set(illu, { x: 0, opacity: 1 });
      gsap.to(illu, {
        duration: 1.2,
        x: -15,
        opacity: 0,
        repeat: 1,
        ease: "power2.inOut"
      });
      gsap.to(illuchat, {
        duration: 1,
        delay: 2,
        x: 1100,
        ease: "power2.inOut"
      });
    }
  }
  else if (tabId === "chien") {
    const illu = document.querySelector("#chien .illustration__chien");
    if (illu) {
      gsap.set(illu, { x: 0, opacity: 1 });
      gsap.to(illu, {
        duration: 1.2,
        x: 15,
        opacity: 0,
        repeat: -1,
        ease: "power2.inOut"
      });
    }
  }
}


////game souris et oiseau
let btnMouse = document.querySelector(".mouse__btn");
let btnOiseau = document.querySelector(".oiseau__btn");

 if  ((btnMouse)) {

  // GESTION GLOBALE DES INDICES
document.querySelectorAll('.indice__close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // On récupère le parent ".indice" du bouton cliqué
        const parentIndice = e.target.closest('.indice');
        
        // Animation de sortie avec GSAP
        gsap.to(parentIndice, { 
            autoAlpha: 0, 
            scale: 0.8, 
            duration: 0.3, 
            ease: "power2.in",
            onComplete: () => {
                parentIndice.style.display = 'none';
            }
        });
    });
});
                

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
      duration: 6,
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
    duration: 6,
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

  ///
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


//trouver les chats
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


const puzzle = document.querySelector("#puzzle-container");

if (puzzle) {
  gsap.registerPlugin(Draggable);

  const palette = document.querySelector(".palette");
  const pieces = document.querySelectorAll(".palette .piece");
  const activeZone = document.querySelector(".piece__active");
  const slots = document.querySelectorAll(".slot");
  const openBtn = document.getElementById("palette__open");
  const successDialogue = document.querySelector(".dialogue__game--puzzle");

  let currentPiece = null;
  let placedCount = 0;
  const TOTAL = 6;
  let paletteAnimating = false;

  /* --- Palette --- */
  function closePalette() {
    if (paletteAnimating || !palette) return;
    paletteAnimating = true;
    gsap.to(palette, { y: "110%", duration: 0.4, ease: "power3.out", onComplete: () => paletteAnimating = false });
  }

  function openPalette() {
    if (paletteAnimating || !palette) return;
    paletteAnimating = true;
    gsap.to(palette, { y: "0%", duration: 0.4, ease: "power3.out", onComplete: () => paletteAnimating = false });
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      resetCurrentPiece();
      openPalette();
    });
  }

  /* --- Sélection --- */
  pieces.forEach(piece => {
    piece.addEventListener("click", () => {
      if (!piece.classList.contains("piece__used")) {
        selectPiece(piece);
      }
    });
  });

  function selectPiece(piece) {
    resetCurrentPiece();

    const clone = piece.cloneNode(true);
    clone.classList.add("is-dragging"); // Optionnel: pour le style
    
    // CORRECTION 1: On lie explicitement le clone à l'index de l'original
    clone.dataset.piece = piece.dataset.piece; 
    piece.classList.add("piece__current");
    
    activeZone.appendChild(clone);
    currentPiece = clone;

    enableDrag(clone);
    closePalette();
  }

  function resetCurrentPiece() {
    // CORRECTION 2: On tue les instances Draggable avant de vider le HTML pour éviter les fuites mémoire
    if (currentPiece) {
      const draggables = Draggable.get(currentPiece);
      if (draggables) draggables.kill();
    }
    activeZone.innerHTML = "";
    currentPiece = null;
    pieces.forEach(p => p.classList.remove("piece__current"));
  }

  /* --- Drag --- */
  function enableDrag(piece) {
    Draggable.create(piece, {
      type: "x,y",
      bounds: ".game-viewport", // Assurez-vous que cette classe existe dans votre HTML
      onDragEnd: function() {
        checkSnap(this.target);
      }
    });
  }

  /* --- Snap --- */
  function checkSnap(piece) {
  const value = piece.dataset.piece;
  let snapped = false;

  slots.forEach((slot) => {
    // 1. On vérifie d'abord si c'est le BON slot (logique interne)
    if (slot.dataset.slot === value) {
      
      // 2. On utilise hitTest au moment du relâchement
      // "pointer" : le snap se déclenche si le CURSEUR est au-dessus du slot
      // C'est très intuitif car l'humain regarde où est sa souris/doigt
      if (Draggable.hitTest(piece, slot, "pointer")) {
        snapped = true;
        snapPiece(piece, slot);
      }
    }
  });

  if (!snapped) {
    // Retour à la case départ si on lâche au mauvais endroit
    gsap.to(piece, { x: 0, y: 0, duration: 0.3 });
  }
}

  function snapPiece(piece, slot) {
    const p = piece.getBoundingClientRect();
    const s = slot.getBoundingClientRect();

    const dx = (s.left + s.width / 2) - (p.left + p.width / 2);
    const dy = (s.top + s.height / 2) - (p.top + p.height / 2);

    gsap.to(piece, {
        x: piece._gsap.x + dx,
        y: piece._gsap.y + dy,
        duration: 0.3,
        onComplete: () => {
            // 1. Animation de disparition simultanée (Pièce + Slot)
            // On utilise un petit effet de scale pour rendre la disparition plus fluide
            gsap.to([piece, slot], {
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    // On les cache totalement pour qu'ils ne bloquent plus les clics
                    piece.style.display = "none";
                    slot.style.visibility = "hidden";
                    
                    // 2. Mise à jour des compteurs
                    placedCount++;
                    currentPiece = null;

                    // 3. Logique d'ouverture de la palette ou victoire
                    if (placedCount < TOTAL) {
                        // On réouvre la palette automatiquement pour la pièce suivante
                        openPalette(); 
                    } else {
                        checkWin(); 
                    }
                }
            });

            // 4. Gestion de la pièce d'origine dans la palette
            const targetValue = piece.dataset.piece;
            pieces.forEach(p => {
                if (p.dataset.piece === targetValue) {
                    p.classList.add("piece__used");
                    p.style.pointerEvents = "none";
                    p.style.opacity = 0; // On la cache aussi dans la palette
                }
            });
        }
    });
}
  function checkWin() {
  if (placedCount === TOTAL) {
    console.log("Puzzle terminé");

    // Désactive le bouton d'ouverture de la palette
    if (openBtn) {
      gsap.to(openBtn, { autoAlpha: 0, duration: 0.3 });
    }

    // Affiche et anime votre div de dialogue
    if (successDialogue) {
      // On retire la classe hidden (assurez-vous que .hidden ne force pas un display:none !important)
      successDialogue.classList.remove("hidden");

      // Animation d'apparition fluide avec GSAP
      gsap.fromTo(successDialogue, 
        { 
          opacity: 0, 
          y: 20 
        }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out",
          clearProps: "all" // Nettoie les styles inline après l'animation
        }
      );
    }
  }
}

}


/*document.addEventListener('DOMContentLoaded', () => {
    const colorContainer = document.querySelector("#color-container");

    if (colorContainer) {
        // --- 1. VARIABLES ET ÉTATS ---
        let selectedColor = null; 
        const paintedAreas = new Set();

        const btnOpenPalette = document.querySelector('#palette__open--color');
        const paletteElement = document.querySelector('.palette__color'); // Ta div palette
        const btnValidate = document.querySelector('#color__fin');
        const btnFleche = document.querySelector('#color__wow');
        
        const diagFelicitation = document.querySelector('.dialogue__game--color02');
        const diagAnecdote = document.querySelector('.dialogue__game--color03');
        const shapes = colorContainer.querySelectorAll('.cls-1, .cls-2, .cls-3, .cls-4, .area');

        // --- 2. FONCTIONS DE LA PALETTE (OUVRIR / FERMER) ---

        const openPalette = () => {
            gsap.to(paletteElement, { 
                autoAlpha: 1, y: 0, duration: 0.4, display: 'flex', ease: "power2.out" 
            });
        };

        const closePalette = () => {
            gsap.to(paletteElement, { 
                autoAlpha: 0, y: 20, duration: 0.3, display: 'none', ease: "power2.in" 
            });
        };

        if (btnOpenPalette) {
            btnOpenPalette.addEventListener('click', openPalette);
        }

        // --- 3. SÉLECTION DES COULEURS ---
        document.querySelectorAll('.color').forEach(div => {
            div.addEventListener('click', () => {
                selectedColor = div.getAttribute('data-color');
                
                // Feedback visuel sur les pastilles
                gsap.to(".color", { scale: 1, border: "2px solid white" });
                gsap.to(div, { scale: 1.2, border: "2px solid #000", duration: 0.2 });

                // Fermer la palette après sélection
                closePalette();
            });
        });

        // --- 4. LOGIQUE DE COLORIAGE ---
        shapes.forEach(shape => {
            shape.style.cursor = "pointer";
            shape.addEventListener('click', (e) => {
                if (selectedColor) {
                    // Application de la couleur (Style Inline pour priorité max)
                    gsap.set(e.target, { fill: selectedColor });
                    
                    paintedAreas.add(e.target);
                    
                    // Vérification du quota (5 formes)
                    if (paintedAreas.size >= 5 && btnValidate) {
                        btnValidate.disabled = false;
                        btnValidate.classList.remove('is-disabled');
                        // Apparition du bouton "J'ai fini"
                        gsap.to(btnValidate, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6 });
                    }
                } else {
                    // Si pas de couleur, on ouvre la palette
                    openPalette();
                    gsap.to(paletteElement, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
                }
            });
        });

        // --- 5. TRANSITIONS (LES BOUTONS UTILES) ---

        // BOUTON : "J'AI FINI"
        if (btnValidate) {
            btnValidate.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Évite les conflits

                // On cache la palette et l'indice pour de bon
                gsap.to([paletteElement, ".indice__color", btnOpenPalette], { 
                    autoAlpha: 0, y: 30, duration: 0.5,
                    onComplete: () => {
                        // On affiche "Quel beau coloriage !"
                        diagFelicitation.classList.remove('hidden');
                        gsap.fromTo(diagFelicitation, 
                            { autoAlpha: 0, y: 20 }, 
                            { autoAlpha: 1, y: 0, display: 'block', duration: 0.6 }
                        );
                    }
                });
            });
        }

        // BOUTON : LA FLÈCHE (Vers l'anecdote)
        if (btnFleche) {
            btnFleche.addEventListener('click', () => {
                gsap.to(diagFelicitation, { 
                    autoAlpha: 0, y: -10, duration: 0.4, 
                    onComplete: () => {
                        diagFelicitation.classList.add('hidden');
                        diagAnecdote.classList.remove('hidden');
                        // On affiche l'anecdote finale
                        gsap.fromTo(diagAnecdote, 
                            { autoAlpha: 0, y: 20 }, 
                            { autoAlpha: 1, y: 0, display: 'block', duration: 0.6 }
                        );
                    }
                });
            });
        }
    }
});*/


document.addEventListener('DOMContentLoaded', () => {
    const colorContainer = document.querySelector("#color-container");

    // On n'exécute le code que si le conteneur du jeu existe sur la page
    if (colorContainer) {
        let selectedColor = null; 
        const paintedAreas = new Set();

        const btnOpenPalette = document.querySelector('#palette__open--color');
        const paletteElement = document.querySelector('.palette__color');
        const btnValidate = document.querySelector('#color__fin');
        const btnFleche = document.querySelector('#color__wow');
        
        const diagFelicitation = document.querySelector('.dialogue__game--color02');
        const diagAnecdote = document.querySelector('.dialogue__game--color03');

        // --- GESTION DE LA PALETTE ---
        const togglePalette = (isOpen) => {
            if (paletteElement) {
                gsap.to(paletteElement, { 
                    autoAlpha: isOpen ? 1 : 0, 
                    y: isOpen ? 0 : 20, 
                    display: isOpen ? 'flex' : 'none', 
                    duration: 0.4 
                });
            }
        };

        if (btnOpenPalette) {
            btnOpenPalette.addEventListener('click', () => togglePalette(true));
        }

        // --- SÉLECTION DES COULEURS ---
        document.querySelectorAll('.color').forEach(div => {
            div.addEventListener('click', () => {
                selectedColor = div.getAttribute('data-color');
                gsap.to(".color", { scale: 1, border: "2px solid white" });
                gsap.to(div, { scale: 1.2, border: "2px solid #000", duration: 0.2 });
                togglePalette(false); // Ferme la palette après le choix
            });
        });

        // --- LOGIQUE DE COLORIAGE ---
        // On sélectionne TOUS les éléments du SVG pour ne rien rater
        const shapes = colorContainer.querySelectorAll('path, polygon, circle, ellipse, rect');

        shapes.forEach(shape => {
            // FORCE la zone de clic même si la forme n'a pas de couleur de fond (fill="none")
            shape.style.pointerEvents = "all";
            shape.style.cursor = "pointer";

            shape.addEventListener('click', (e) => {
                if (selectedColor) {
                    // On applique la couleur via GSAP (écrase le CSS)
                    gsap.set(e.target, { fill: selectedColor });
                    
                    paintedAreas.add(e.target);
                    
                    // Si on a colorié assez de zones
                    if (paintedAreas.size >= 5 && btnValidate) {
                        btnValidate.disabled = false;
                        btnValidate.classList.remove('is-disabled');
                        gsap.to(btnValidate, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6 });
                    }
                } else {
                    // Si clic sans couleur, on ouvre la palette
                    togglePalette(true);
                    if (paletteElement) {
                        gsap.to(paletteElement, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
                    }
                }
            });
        });

        // --- TRANSITIONS FINALES ---
        if (btnValidate) {
            btnValidate.addEventListener('click', (e) => {
                e.preventDefault();
                gsap.to([paletteElement, btnOpenPalette], { 
                    autoAlpha: 0, y: 30, duration: 0.5,
                    onComplete: () => {
                        if (diagFelicitation) {
                            diagFelicitation.classList.remove('hidden');
                            gsap.fromTo(diagFelicitation, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, display: 'block' });
                        }
                    }
                });
            });
        }

        if (btnFleche) {
            btnFleche.addEventListener('click', () => {
                gsap.to(diagFelicitation, { autoAlpha: 0, duration: 0.4, onComplete: () => {
                    if (diagFelicitation) diagFelicitation.classList.add('hidden');
                    if (diagAnecdote) {
                        diagAnecdote.classList.remove('hidden');
                        gsap.fromTo(diagAnecdote, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, display: 'block' });
                    }
                }});
            });
        }
    }
});

const miamPoup = document.querySelector("#miamPoup-container");

if (miamPoup) {
function initMiamGame(containerId, characterKey) {
  const container = document.querySelector(containerId);
  if (!container) return;

  class Start extends Phaser.Scene {
    constructor() {
      super('Start');
    }

    preload() {
      this.load.image('bonbon', 'assets/images/bonbon.png');

      this.load.image('poupee', 'assets/images/poupeeDeboutV2.png');
      this.load.image('poupee-happy', 'assets/images/poupeeDebout.png');
      this.load.image('poupee-triste', 'assets/images/poupeeDeboutV3.png');

      this.load.image('mimi', 'assets/images/kimiDeboutV1.png');
      this.load.image('mimi-happy', 'assets/images/kimiDeboutV2.png');
      this.load.image('mimi-triste', 'assets/images/kimiDeboutV3.png');
    }

    create() {
      const { width, height } = this.scale;
      this.characterKey = characterKey;

      this.character = this.physics.add.image(
        width * 0.15,
        height - 300,
        this.characterKey
      )
        .setScale(0.4)
        .setCollideWorldBounds(true);

      this.character.body.setCircle(190);

      this.character.setInteractive({ draggable: true });
      this.input.on('drag', (pointer, obj, dragX) => obj.setX(dragX));

      this.spawnBonbon();

      this.physics.add.overlap(
        this.character,
        this.bonbon,
        this.eatBonbon,
        null,
        this
      );

      this.score = 0;
      this.scoreText = container.querySelector('.score');
      if (this.scoreText) this.scoreText.textContent = '0/10';

      // Choix de la div de victoire selon le personnage
      if (this.characterKey === 'poupee') {
        this.winDialog = document.querySelector('.dialogue__game');
      } else if (this.characterKey === 'mimi') {
        this.winDialog = document.querySelector('.dialogue__game--mimi');
      }

      this.winShown = false;
    }

    update() {
      if (this.bonbon.y > this.scale.height + 5) {
        this.missBonbon();
      }
    }

    spawnBonbon() {
      const { width } = this.scale;
      this.bonbon = this.physics.add.image(
        Phaser.Math.Between(50, width - 50),
        -50,
        'bonbon'
      );
      this.resetBonbon();
    }

    resetBonbon() {
      const { width } = this.scale;
      this.bonbon.setPosition(
        Phaser.Math.Between(50, width - 50),
        -50
      );
      this.bonbon.setScale(Phaser.Math.Between(3, 4) / 20);
      this.bonbon.setVelocity(0, Phaser.Math.Between(120, 220));
    }

    eatBonbon() {
      this.score++;
      if (this.scoreText) this.scoreText.textContent = `${this.score}/10`;

      this.character.setTexture(`${this.characterKey}-happy`);
      this.time.delayedCall(300, () => {
        this.character.setTexture(this.characterKey);
      });

      // Affiche la bonne div de victoire
      if (this.score === 10 && this.winDialog && !this.winShown) {
          this.scene.pause();
          this.winDialog.classList.remove('hidden');

          gsap.fromTo(this.winDialog, 
          { 
            opacity: 0, 
            y: 20 
          }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out",
            clearProps: "all" 
          }
          );

          this.winShown = true;
          return;
      }

      this.resetBonbon();
    }

    missBonbon() {
      this.character.setTexture(`${this.characterKey}-triste`);
      this.time.delayedCall(300, () => {
        this.character.setTexture(this.characterKey);
      });
      this.resetBonbon();
    }
  }

  const config = {
    type: Phaser.AUTO,
    parent: containerId.replace('#', ''),
    backgroundColor: 'transparent',
    physics: {
      default: 'arcade',
      arcade: { gravity: { y: 0 } }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1280,
      height: 720
    },
    transparent: true,
    scene: [Start]
  };

  new Phaser.Game(config);
}

initMiamGame('#miamPoup-container', 'poupee');
initMiamGame('#miamMimi-container', 'mimi');


}






           



