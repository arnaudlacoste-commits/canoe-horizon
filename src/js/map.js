/* =============================================================
   Canoë Horizon — Carte interactive Leaflet
   Coordonnées réelles extraites d'OpenStreetMap (Way 5199444
   et Way 70175726) — lit exact de l'Hérault.
   V2 : remplacer par des fichiers GeoJSON.
   ============================================================= */

// ── RIVIÈRE COMPLÈTE : Laroque → Aubanel ─────────────────────────
// Source OSM : ways 5199444 + 70175726 (waterway=river, L'Hérault)
// Tracé du lit exact. Points sélectionnés pour couvrir tous
// les méandres significatifs sans surcharger le rendu.

var HERAULT = [
  // — Laroque (Base 13 km) —
  [43.9236504, 3.7214680],
  [43.9234719, 3.7218238],
  [43.9232523, 3.7221954],
  [43.9230361, 3.7224146],
  [43.9226277, 3.7225305],
  [43.9218176, 3.7228043],
  [43.9216006, 3.7234907],
  [43.9214243, 3.7244331],
  [43.9210434, 3.7250636],
  [43.9203822, 3.7251033],
  [43.9194762, 3.7252526],
  [43.9185942, 3.7258926],
  [43.9182647, 3.7268741],
  [43.9177030, 3.7275713],
  [43.9171516, 3.7275125],
  [43.9168599, 3.7271790],
  [43.9166173, 3.7265104],
  [43.9161631, 3.7265644],
  [43.9154916, 3.7269360],
  [43.9151953, 3.7276650],
  [43.9152433, 3.7280160],
  [43.9157124, 3.7287831],
  [43.9161963, 3.7303283],
  [43.9163998, 3.7316074],
  [43.9164434, 3.7326502],
  [43.9162469, 3.7338388],
  [43.9156552, 3.7354549],
  [43.9149507, 3.7365817],
  [43.9142743, 3.7372352],
  [43.9134140, 3.7374909],
  [43.9128625, 3.7367937],
  [43.9120334, 3.7361679],
  [43.9108600, 3.7357159],
  [43.9100482, 3.7356080],
  [43.9093981, 3.7364904],
  [43.9086418, 3.7370669],
  [43.9078900, 3.7371622],
  [43.9068168, 3.7363633],
  [43.9058648, 3.7358980],
  [43.9044196, 3.7356979],
  [43.9023038, 3.7354613],
  [43.9007681, 3.7352913],
  [43.8996581, 3.7347085],
  [43.8983650, 3.7344830],
  // — La Combe (Base 9 km) —
  [43.8974106, 3.7346164],
  [43.8964133, 3.7339676],
  [43.8957288, 3.7332045],
  [43.8946479, 3.7325994],
  [43.8931601, 3.7314178],
  [43.8919985, 3.7310208],
  [43.8907452, 3.7315083],
  [43.8889895, 3.7320531],
  [43.8877500, 3.7325518],
  [43.8857366, 3.7329679],
  [43.8841616, 3.7325375],
  [43.8832916, 3.7321103],
  [43.8822683, 3.7307127],
  [43.8816616, 3.7285226],
  [43.8817360, 3.7268185],
  [43.8812072, 3.7247968],
  [43.8803635, 3.7232182],
  [43.8793229, 3.7227036],
  [43.8782125, 3.7218571],
  [43.8774490, 3.7218809],
  [43.8774627, 3.7220938],
  [43.8772154, 3.7224447],
  [43.8766476, 3.7232626],
  [43.8757959, 3.7238264],
  [43.8748022, 3.7237724],
  [43.8735035, 3.7230979],
  [43.8724713, 3.7221843],
  [43.8714454, 3.7214426],
  [43.8705066, 3.7211980],
  [43.8698563, 3.7216665],
  [43.8686358, 3.7208852],
  [43.8677965, 3.7208248],
  [43.8667203, 3.7205008],
  [43.8656886, 3.7205914],
  [43.8646489, 3.7210710],
  [43.8636482, 3.7210281],
  [43.8631764, 3.7205961],
  [43.8630780, 3.7199577],
  [43.8633871, 3.7190667],
  [43.8640879, 3.7185649],
  [43.8648665, 3.7175294],
  [43.8651505, 3.7166178],
  [43.8649249, 3.7155855],
  [43.8644646, 3.7149042],
  [43.8636356, 3.7141085],
  [43.8628993, 3.7142054],
  [43.8621001, 3.7146326],
  [43.8617794, 3.7149534],
  [43.8610237, 3.7156352],
  [43.8598216, 3.7162083],
  [43.8586342, 3.7164301],
  [43.8578655, 3.7156686],
  [43.8576025, 3.7145825],
  [43.8577557, 3.7139773],
  [43.8581285, 3.7129634],
  [43.8586776, 3.7118131],
  [43.8595618, 3.7109394],
  [43.8604663, 3.7100657],
  [43.8612668, 3.7095527],
  [43.8618505, 3.7088514],
  [43.8620874, 3.7077773],
  // — Agonès (Base 6 & 7 km) —
  [43.8617551, 3.7069878],
  [43.8608449, 3.7065589],
  [43.8598999, 3.7068675],
  [43.8590475, 3.7076811],
  [43.8583134, 3.7084706],
  [43.8571084, 3.7082983],
  [43.8560588, 3.7080519],
  // — Aubanel (Arrivée) —
  [43.8554813, 3.7080578]
];

// Index de début de chaque parcours dans HERAULT[]
var IDX = {
  LAROQUE:     0,   // Base Laroque         (index 0)
  LA_COMBE:   44,   // Base La Combe        (index 44)
  // 7 km démarre sur Way 1, 2 indices avant la jonction Way1/Way2 (index 91).
  // Cela donne un tronçon nord-ouest visible avant le grand méandre est,
  // différenciant visuellement le 7 km du 6 km.
  AGONES_7KM: 88,   // Départ 7 km — amont Agonès (index 88)
  AGONES:     92,   // Départ 6 km — entrée méandre (index 92)
  AUBANEL:    HERAULT.length - 1
};

// ── DÉFINITION DES PARCOURS ──────────────────────────────────────
var PARCOURS = {
  '6': {
    nom:     'Découverte Sportive',
    couleur: '#7FAF59',
    coords:  HERAULT.slice(IDX.AGONES)       // méandre est → Aubanel
  },
  '7': {
    nom:     'Familial',
    couleur: '#7BC8C3',
    coords:  HERAULT.slice(IDX.AGONES_7KM)  // approche NO → méandre → Aubanel
  },
  '9': {
    nom:     'Découverte',
    couleur: '#F59E42',
    coords:  HERAULT.slice(IDX.LA_COMBE)
  },
  '13': {
    nom:     'Aventure',
    couleur: '#D62828',
    coords:  HERAULT.slice(IDX.LAROQUE)
  }
};

// ── MARQUEURS ────────────────────────────────────────────────────
var BASES = [
  {
    coords:  [43.9236528, 3.7223778],  // coordonnées officielles
    label:   'Base Laroque',
    detail:  'Départ 13 km — Aventure',
    couleur: '#D62828',
    routes:  ['13']
  },
  {
    coords:  [43.8974106, 3.7346164],  // point OSM le plus proche
    label:   'Base La Combe',
    detail:  'Départ 9 km — Découverte',
    couleur: '#F59E42',
    routes:  ['9', '13']
  },
  {
    coords:  [43.8617551, 3.7069878],  // point OSM exact
    label:   'Base Agonès',
    detail:  'Départ 6 km &amp; 7 km',
    couleur: '#264653',
    routes:  ['6', '7', '9', '13']
  },
  {
    coords:  [43.8554813, 3.7080578],  // point OSM le plus proche de l'arrivée
    label:   'Arrivée Aubanel',
    detail:  'Tous les parcours',
    couleur: '#264653',
    routes:  ['6', '7', '9', '13']
  }
];

// ── INIT ─────────────────────────────────────────────────────────
function initMap() {
  var el = document.getElementById('leaflet-map');
  if (!el || typeof L === 'undefined') {
    console.warn('Leaflet non disponible ou #leaflet-map absent');
    return;
  }

  var map = L.map('leaflet-map', {
    center:           [43.888, 3.710],
    zoom:             12,
    scrollWheelZoom:  false,
    zoomControl:      true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:     19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // ── Polylines ────────────────────────────────────────────────
  var polylines = {};
  Object.keys(PARCOURS).forEach(function (key) {
    var p = PARCOURS[key];
    polylines[key] = L.polyline(p.coords, {
      color:    p.couleur,
      weight:   6,
      opacity:  0.9,
      lineJoin: 'round',
      lineCap:  'round'
    });
  });

  // ── Icônes marqueurs ─────────────────────────────────────────
  function makeIcon(couleur, size) {
    size = size || 12;
    return L.divIcon({
      html: '<div style="' +
              'width:'  + (size * 2) + 'px;' +
              'height:' + (size * 2) + 'px;' +
              'background:' + couleur + ';' +
              'border:3px solid #fff;' +
              'border-radius:50%;' +
              'box-shadow:0 2px 8px rgba(0,0,0,0.3);' +
            '"></div>',
      className:  '',
      iconSize:   [size * 2, size * 2],
      iconAnchor: [size, size]
    });
  }

  var markers = {};
  BASES.forEach(function (b) {
    var isArrivee = b.label === 'Arrivée Aubanel';
    var m = L.marker(b.coords, { icon: makeIcon(b.couleur, isArrivee ? 14 : 12) });
    m.bindPopup(
      '<div style="font-family:Poppins,sans-serif;text-align:center;min-width:140px;padding:4px 0;">' +
        '<strong style="color:#264653;font-size:13px;">' + b.label + '</strong><br>' +
        '<span style="font-size:11px;color:#5c6b6e;">' + b.detail + '</span>' +
      '</div>',
      { closeButton: false, offset: [0, -10] }
    );
    markers[b.label] = { marker: m, routes: b.routes };
  });

  // Limites fixes de la rivière complète (13 km) — toujours utilisées pour
  // que les tracés plus courts paraissent proportionnels (6 km = 6/13 du tracé).
  var FULL_BOUNDS = polylines['13'].getBounds().pad(0.08);

  // ── Afficher un parcours ─────────────────────────────────────
  function showRoute(key) {
    Object.keys(polylines).forEach(function (k) { map.removeLayer(polylines[k]); });
    Object.keys(markers).forEach(function (lbl) { map.removeLayer(markers[lbl].marker); });

    map.addLayer(polylines[key]);

    Object.keys(markers).forEach(function (lbl) {
      if (markers[lbl].routes.indexOf(key) !== -1) {
        map.addLayer(markers[lbl].marker);
      }
    });

    // Vue fixe = la rivière entière, tous parcours à la même échelle.
    map.fitBounds(FULL_BOUNDS);
  }

  // ── Boutons filtre ───────────────────────────────────────────
  var btns = document.querySelectorAll('.route-btn');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      showRoute(btn.dataset.route);
    });
  });

  var activeBtn = document.querySelector('.route-btn.active');
  var defaultRoute = activeBtn ? activeBtn.dataset.route : '13';
  showRoute(defaultRoute);

  setTimeout(function () {
    map.invalidateSize();
    showRoute(defaultRoute);
  }, 350);
}

if (document.readyState === 'complete') {
  initMap();
} else {
  window.addEventListener('load', initMap);
}
