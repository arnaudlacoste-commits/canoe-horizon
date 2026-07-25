/* =============================================================
   Zones cliquables sur images responsives.
   Positionnement en % (jamais en px) pour rester aligné avec
   l'image quelle que soit sa taille affichée. `top`/`left` sont
   le CENTRE de la zone (pas le coin) — le bouton est recentré en
   CSS via `transform: translateY(-50%)`, voir .poster-hotspot.
   Chaque zone déclenche une action nommée : "open-details" (ouvre
   un <details> et y scrolle) ou "scroll-to" (scrolle jusqu'à un
   élément existant et le fait brièvement clignoter pour le repérer).
   ============================================================= */

var POSTER_HOTSPOTS = [
  // Fiches "PARCOURS" de l'affiche (colonne de gauche), vers les
  // cartes correspondantes en section #parcours.
  {
    top: 32.32, left: 4.4, width: 19.0, height: 16.73,
    action: 'scroll-to', target: '.course-card--sportif',
    label: 'Parcours 6 km Sportif — voir la fiche complète'
  },
  {
    top: 49.97, left: 4.4, width: 19.0, height: 14.65,
    action: 'scroll-to', target: '.course-card--famille',
    label: 'Parcours 7 km Familial — voir la fiche complète'
  },
  {
    top: 66.25, left: 4.4, width: 19.0, height: 14.65,
    action: 'scroll-to', target: '.course-card--decouverte',
    label: 'Parcours 9 km Découverte — voir la fiche complète'
  },
  {
    top: 81.38, left: 4.4, width: 19.0, height: 12.37,
    action: 'scroll-to', target: '.course-card--aventure',
    label: 'Parcours 13 km Aventure — voir la fiche complète'
  },
  // Encarts de localisation sur l'illustration de rivière, vers
  // l'adresse correspondante dans le footer ("Nos bases").
  {
    top: 28.65, left: 30.57, width: 18.75, height: 13.67,
    action: 'scroll-to', target: '#base-laroque',
    label: "Base Laroque — voir l'adresse complète"
  },
  {
    top: 52.25, left: 65.92, width: 21.48, height: 10.35,
    action: 'scroll-to', target: '#base-la-combe',
    label: "Base La Combe — voir l'adresse complète"
  },
  {
    top: 58.30, left: 28.13, width: 16.60, height: 10.74,
    action: 'scroll-to', target: '#base-agones',
    label: "Base Agonès — voir l'adresse complète"
  },
  {
    top: 78.22, left: 59.38, width: 28.02, height: 12.17,
    action: 'scroll-to', target: '#base-aubanel',
    label: "Arrivée Aubanel — voir l'adresse complète"
  },
  // Bandeau "Pour votre sécurité" de l'affiche poster-parcours.png
  // (image source 1024×1536px). Bande mesurée par analyse de
  // pixels entre y=1403 et y=1528, divisée en 4 quarts ÉGAUX
  // (et non calés sur le texte) pour garantir 4 zones contiguës
  // sans le moindre chevauchement, quelle que soit la taille
  // d'affichage — un ajustement au pixel près du texte a été
  // essayé puis abandonné : un pas de hauteur trop généreux a
  // provoqué un chevauchement sur petit écran qui rendait
  // certaines zones injoignables. Si l'affiche est un jour
  // redessinée, cette bande doit être re-mesurée.
  {
    top: 92.36, left: 44.9, width: 27.3, height: 2.03,
    action: 'open-details', target: '#faq-nager',
    label: 'Savoir nager 25 mètres — voir la question sécurité correspondante'
  },
  {
    top: 94.39, left: 44.9, width: 27.3, height: 2.03,
    action: 'open-details', target: '#faq-consignes',
    label: 'Respecter les consignes et la nature — voir la question correspondante'
  },
  {
    top: 96.43, left: 44.9, width: 27.3, height: 2.03,
    action: 'open-details', target: '#faq-nager',
    label: 'Port du gilet obligatoire — voir la question sécurité correspondante'
  },
  {
    top: 98.46, left: 44.9, width: 27.3, height: 2.03,
    action: 'open-details', target: '#faq-enfants-accompagnes',
    label: "Enfants accompagnés d'un adulte — voir la question correspondante"
  }
];

var HOTSPOT_ACTIONS = {
  'open-details': function (target) {
    var el = document.querySelector(target);
    if (!el) return;
    el.open = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Le scroll seul ne prévient pas les utilisateurs de lecteur d'écran
    // qu'un contenu s'est ouvert plus bas sur la page : on déplace le
    // focus sur la question pour qu'elle soit annoncée.
    var summary = el.querySelector('summary');
    if (summary) summary.focus();
  },
  'scroll-to': function (target) {
    var el = document.querySelector(target);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // On focalise un intitulé lisible (titre de carte, adresse...) plutôt
    // que le conteneur lui-même, pour une annonce plus claire en lecteur
    // d'écran ; on retombe sur l'élément cible si aucun titre n'est trouvé.
    var focusEl = el.querySelector('h3') || el;
    if (!focusEl.hasAttribute('tabindex')) focusEl.setAttribute('tabindex', '-1');
    focusEl.focus({ preventScroll: true });
    el.classList.add('hotspot-highlight');
    window.setTimeout(function () {
      el.classList.remove('hotspot-highlight');
    }, 1600);
  }
};

function initHotspotLayer(wrapId, zones) {
  var wrap = document.getElementById(wrapId);
  if (!wrap) return;

  zones.forEach(function (zone) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'poster-hotspot';
    btn.style.top = zone.top + '%';
    btn.style.left = zone.left + '%';
    btn.style.width = zone.width + '%';
    btn.style.height = zone.height + '%';
    btn.setAttribute('aria-label', zone.label);
    if (zone.action === 'open-details') {
      btn.setAttribute('aria-controls', zone.target.replace('#', ''));
    }
    btn.addEventListener('click', function () {
      var run = HOTSPOT_ACTIONS[zone.action];
      if (run) run(zone.target);
    });
    wrap.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initHotspotLayer('poster-wrap', POSTER_HOTSPOTS);
});
