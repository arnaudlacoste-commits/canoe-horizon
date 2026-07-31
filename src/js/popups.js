/* =============================================================
   Popups indicatives déclenchées depuis l'affiche des parcours
   (voir js/hotspots.js pour les zones qui les ouvrent).
   Deux types de contenu : une base (adresse + mini-carte Mapbox
   centrée sur le point) et un parcours (stats + description,
   scrapées depuis la fiche .course-card déjà traduite, + mini-carte
   Mapbox du tracé). Réutilise les données HERAULT/PARCOURS/BASES
   définies dans js/map.js (chargé avant ce fichier).
   ============================================================= */

var MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2lpY21lbnUiLCJhIjoiY20wNDUwZmt0MDMxNDJpc2JsY3c2MnAyYiJ9.xJD2n7HZpcWxFrdChH8APg';

var POPUP_BASES = {
  laroque:  { label: 'Base Laroque',    address: '111 Avenue des Platanes, 34190 Laroque' },
  lacombe:  { label: 'Base La Combe',   address: '462 Avenue du Chemin Neuf, 34190 Saint-Bauzille-de-Putois' },
  agones:   { label: 'Base Agonès',     address: "38 Traverse de Beaux, 34190 Agonès" },
  aubanel:  { label: 'Aubanel',         address: "2180 l'Usine Électrique, 34190 Brissac" }
};

// Coordonnées [lng, lat] (Mapbox) des 4 bases — reprises des marqueurs
// définis dans js/map.js (BASES y est en [lat, lng], ordre Leaflet).
// agones et aubanel : resynchronisés avec BASES.coords dans map.js
// à chaque correctif de position — voir map.js pour le détail.
var POPUP_BASE_LNGLAT = {
  laroque: [3.7223778, 43.9236528],
  lacombe: [3.7375738, 43.9076640],
  agones:  [3.7312254, 43.8929018],
  aubanel: [3.7069878, 43.8617551]
};

var popupMapInstance = null;
var popupTriggerEl = null;

function ensurePopupDOM() {
  if (document.getElementById('popup-overlay')) return;
  var overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.id = 'popup-overlay';
  overlay.hidden = true;
  overlay.innerHTML =
    '<div class="popup-dialog" role="dialog" aria-modal="true" aria-labelledby="popup-title">' +
      '<button type="button" class="popup-close" aria-label="Fermer">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button>' +
      '<div class="popup-body"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });
  overlay.querySelector('.popup-close').addEventListener('click', closePopup);
  document.addEventListener('keydown', function (e) {
    if (overlay.hidden) return;
    if (e.key === 'Escape') { closePopup(); return; }
    if (e.key === 'Tab') trapFocus(e, overlay.querySelector('.popup-dialog'));
  });
}

// Empêche Tab/Maj+Tab de sortir de la popup tant qu'elle est ouverte
// (sinon, avec les contrôles zoom de la mini-carte, le focus peut
// s'échapper vers le reste de la page derrière l'overlay).
function trapFocus(e, dialog) {
  var focusable = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  var first = focusable[0];
  var last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function openPopup(bodyHTML, triggerEl) {
  ensurePopupDOM();
  var overlay = document.getElementById('popup-overlay');
  overlay.querySelector('.popup-body').innerHTML = bodyHTML;
  overlay.hidden = false;
  popupTriggerEl = triggerEl || null;
  overlay.querySelector('.popup-close').focus();
}

function closePopup() {
  var overlay = document.getElementById('popup-overlay');
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  if (popupMapInstance) {
    popupMapInstance.remove();
    popupMapInstance = null;
  }
  if (popupTriggerEl) popupTriggerEl.focus();
  popupTriggerEl = null;
}

function mapboxUnavailableNotice() {
  return '<p class="popup-map-fallback">Carte indisponible pour le moment.</p>';
}

function showBasePopup(baseKey, triggerEl) {
  var base = POPUP_BASES[baseKey];
  if (!base) return;
  var html =
    '<h3 id="popup-title" class="popup-title">' + base.label + '</h3>' +
    '<p class="popup-address">' + base.address + '</p>' +
    '<div id="popup-map" class="popup-map"></div>';
  openPopup(html, triggerEl);

  if (typeof mapboxgl === 'undefined') {
    document.querySelector('#popup-map').outerHTML = mapboxUnavailableNotice();
    return;
  }
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  var lngLat = POPUP_BASE_LNGLAT[baseKey];
  popupMapInstance = new mapboxgl.Map({
    container: 'popup-map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: lngLat,
    zoom: 13,
    interactive: true
  });
  popupMapInstance.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
  new mapboxgl.Marker({ color: '#264653' }).setLngLat(lngLat).addTo(popupMapInstance);
}

function showRoutePopup(routeKey, cardSelector, triggerEl) {
  var card = document.querySelector(cardSelector);
  if (!card) return;

  var name = card.querySelector('h3').textContent;
  var badge = card.querySelector('.badge').textContent;
  var desc = card.querySelector('.course-text').textContent;
  var metaItems = Array.prototype.map.call(card.querySelectorAll('.course-meta li'), function (li) {
    return '<li>' + li.textContent.trim() + '</li>';
  }).join('');
  var priceHTML = card.querySelector('.course-price').innerHTML;
  var color = (typeof PARCOURS !== 'undefined' && PARCOURS[routeKey]) ? PARCOURS[routeKey].couleur : '#264653';

  var html =
    '<span class="popup-route-badge" style="background:' + color + '">' + badge + '</span>' +
    '<h3 id="popup-title" class="popup-title">' + name + '</h3>' +
    '<p class="popup-route-desc">' + desc + '</p>' +
    '<ul class="popup-route-meta">' + metaItems + '</ul>' +
    '<p class="popup-route-price">' + priceHTML + '</p>' +
    '<div id="popup-map" class="popup-map"></div>';
  openPopup(html, triggerEl);

  if (typeof mapboxgl === 'undefined' || typeof PARCOURS === 'undefined' || !PARCOURS[routeKey]) {
    document.querySelector('#popup-map').outerHTML = mapboxUnavailableNotice();
    return;
  }
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  var coords = PARCOURS[routeKey].coords.map(function (latLng) { return [latLng[1], latLng[0]]; });

  var map = new mapboxgl.Map({
    container: 'popup-map',
    style: 'mapbox://styles/mapbox/streets-v12',
    interactive: true
  });
  popupMapInstance = map;
  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
  map.on('load', function () {
    // La popup a pu être fermée (et sa carte détruite) avant la fin du
    // chargement du style — sans ce garde-fou, ce callback tardif
    // agirait sur une carte remplacée ou déjà nulle.
    if (map !== popupMapInstance) return;
    map.addSource('popup-route', {
      type: 'geojson',
      data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords } }
    });
    map.addLayer({
      id: 'popup-route-line',
      type: 'line',
      source: 'popup-route',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': color, 'line-width': 5 }
    });
    var bounds = coords.reduce(function (b, c) { return b.extend(c); }, new mapboxgl.LngLatBounds(coords[0], coords[0]));
    map.fitBounds(bounds, { padding: 32, duration: 0 });
  });
}
