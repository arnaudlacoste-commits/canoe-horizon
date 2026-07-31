/* =============================================================
   Canoë Horizon — Carte interactive Leaflet
   Coordonnées réelles extraites d'OpenStreetMap (Way 5199444
   et Way 70175726) — lit exact de l'Hérault.
   V2 : remplacer par des fichiers GeoJSON.

   CORRECTIF (audit géodata) : le point historiquement étiqueté
   « Agonès » (43.8617551, 3.7069878) ne correspond en réalité
   pas à Agonès mais à un lieu situé à Brissac, à ~700 m en amont
   d'Aubanel (vérifié par reverse-geocoding Nominatim : nœud OSM
   « Aubanel », commune de Brissac). L'index IDX.AGONES pointait
   en plus vers un autre point du tableau (92) que celui réellement
   annoté "Agonès" dans le fichier (105) — un bug d'indexation
   distinct, qui aggravait encore l'écart. Le point Agonès a été
   repositionné sur le lit réel de la rivière, à proximité de la
   véritable zone d'Agonès (rue Traverse de Beaux, cf. way OSM
   837482215), de façon à ce que les distances Laroque→Agonès et
   Agonès→Aubanel se rapprochent des distances commerciales
   affichées (6 km / 7 km). Le tableau HERAULT a par ailleurs été
   densifié (330 points, échantillonnage complet des ways OSM
   plutôt qu'un sous-échantillon épars) pour un calcul de distance
   plus fidèle et un tracé plus fin.
   ============================================================= */

// ── RIVIÈRE COMPLÈTE : Laroque → Aubanel ─────────────────────────
// Source OSM : ways 5199444 + 70175726 (waterway=river, L'Hérault)
// Tracé du lit exact, échantillonnage dense (tous les nœuds OSM
// entre Laroque et Aubanel) pour que les distances calculées par
// somme de segments (haversine) reflètent fidèlement la réalité.
var HERAULT = [
  // — Laroque (Base 6 & 13 km) —
  [43.9232523, 3.7221954],
  [43.9230361, 3.7224146],
  [43.9226277, 3.7225305],
  [43.9220729, 3.7226861],
  [43.9218176, 3.7228043],
  [43.9216806, 3.7230482],
  [43.9216006, 3.7234907],
  [43.9214243, 3.7244331],
  [43.9212608, 3.7248047],
  [43.9210434, 3.7250636],
  [43.9207448, 3.7251668],
  [43.9203822, 3.7251033],
  [43.9199704, 3.7251208],
  [43.9194762, 3.7252526],
  [43.9190758, 3.7254670],
  [43.9188081, 3.7256449],
  [43.9185942, 3.7258926],
  [43.9184283, 3.7264072],
  [43.9182647, 3.7268741],
  [43.9180759, 3.7272918],
  [43.9179261, 3.7274760],
  [43.9177030, 3.7275713],
  [43.9176127, 3.7275719],
  [43.9174570, 3.7275729],
  [43.9171516, 3.7275125],
  [43.9168999, 3.7274030],
  [43.9168599, 3.7271790],
  [43.9168747, 3.7269472],
  [43.9168404, 3.7267883],
  [43.9167500, 3.7266152],
  [43.9166173, 3.7265104],
  [43.9164675, 3.7265120],
  [43.9161631, 3.7265644],
  [43.9159073, 3.7266899],
  [43.9158199, 3.7267328],
  [43.9154916, 3.7269360],
  [43.9153520, 3.7270710],
  [43.9152719, 3.7272314],
  [43.9152227, 3.7274474],
  [43.9151953, 3.7276650],
  [43.9151987, 3.7278159],
  [43.9152433, 3.7280160],
  [43.9154882, 3.7283860],
  [43.9157124, 3.7287831],
  [43.9160693, 3.7297661],
  [43.9161963, 3.7303283],
  [43.9163998, 3.7316074],
  [43.9164434, 3.7321071],
  [43.9164434, 3.7326502],
  [43.9164022, 3.7331886],
  [43.9163382, 3.7334999],
  [43.9162469, 3.7338388],
  [43.9161025, 3.7343337],
  [43.9159057, 3.7348371],
  [43.9156552, 3.7354549],
  [43.9154996, 3.7358265],
  [43.9153600, 3.7361140],
  [43.9151175, 3.7364344],
  [43.9149507, 3.7365817],
  [43.9144832, 3.7370239],
  [43.9142743, 3.7372352],
  [43.9137898, 3.7373225],
  [43.9136659, 3.7373819],
  [43.9134140, 3.7374909],
  [43.9130719, 3.7370558],
  [43.9128625, 3.7367937],
  [43.9124295, 3.7364047],
  [43.9120334, 3.7361679],
  [43.9115914, 3.7359393],
  [43.9113386, 3.7358361],
  [43.9108600, 3.7357159],
  [43.9104677, 3.7355646],
  [43.9100482, 3.7356080],
  [43.9096317, 3.7358585],
  [43.9095583, 3.7359869],
  [43.9094587, 3.7362283],
  [43.9093981, 3.7364904],
  [43.9093374, 3.7366381],
  [43.9091921, 3.7367651],
  [43.9089908, 3.7368620],
  [43.9086418, 3.7370669],
  [43.9084782, 3.7371098],
  [43.9081647, 3.7371669],
  [43.9078900, 3.7371622],
  [43.9076007, 3.7370886],
  [43.9073031, 3.7369573],
  [43.9071394, 3.7367635],
  // — La Combe (Base 9 km) — nœud rivière le plus proche du
  // 462 Av. du Chemin Neuf, décalé ~600 m plus au nord sur demande
  // (position vérifiée par numérotation métrique de la voie :
  // n°11 et n°1133-mairie comme repères)
  [43.9070033, 3.7365396],
  [43.9068168, 3.7363633],
  [43.9065570, 3.7362029],
  [43.9061611, 3.7360123],
  [43.9058648, 3.7358980],
  [43.9053522, 3.7358488],
  [43.9048395, 3.7358027],
  [43.9044196, 3.7356979],
  [43.9036953, 3.7356502],
  [43.9029778, 3.7355438],
  [43.9023038, 3.7354613],
  [43.9013266, 3.7353739],
  [43.9007681, 3.7352913],
  [43.9002131, 3.7350452],
  [43.8996581, 3.7347085],
  [43.8992599, 3.7345354],
  [43.8988205, 3.7344877],
  [43.8983650, 3.7344830],
  [43.8979404, 3.7345671],
  [43.8974106, 3.7346164],
  [43.8971497, 3.7346068],
  [43.8970877, 3.7345808],
  [43.8969151, 3.7345084],
  [43.8966610, 3.7343098],
  [43.8964133, 3.7339676],
  [43.8961586, 3.7336158],
  [43.8957288, 3.7332045],
  [43.8950954, 3.7328392],
  [43.8946479, 3.7325994],
  [43.8939567, 3.7321103],
  [43.8935607, 3.7317609],
  [43.8931601, 3.7314178],
  [43.8929018, 3.7312254],
  [43.8927870, 3.7311399],
  [43.8925364, 3.7310176],
  [43.8922400, 3.7309858],
  [43.8919985, 3.7310208],
  [43.8916185, 3.7311939],
  [43.8912797, 3.7312860],
  [43.8907452, 3.7315083],
  [43.8902233, 3.7316640],
  [43.8896350, 3.7318355],
  [43.8889895, 3.7320531],
  [43.8885042, 3.7323644],
  [43.8881551, 3.7324787],
  [43.8877500, 3.7325518],
  [43.8860868, 3.7329393],
  // — Agonès (Base 6 & 7 km) — repositionné (voir correctif en tête de fichier)
  [43.8857366, 3.7329679],
  [43.8853005, 3.7328694],
  [43.8850006, 3.7327677],
  [43.8847696, 3.7327043],
  [43.8841616, 3.7325375],
  [43.8837964, 3.7325232],
  [43.8835423, 3.7324438],
  [43.8832916, 3.7321103],
  [43.8828933, 3.7315226],
  [43.8826575, 3.7311049],
  [43.8824537, 3.7308588],
  [43.8822683, 3.7307127],
  [43.8820909, 3.7302966],
  [43.8819306, 3.7298662],
  [43.8817704, 3.7293723],
  [43.8816719, 3.7289752],
  [43.8816616, 3.7285226],
  [43.8817005, 3.7280986],
  [43.8817291, 3.7274506],
  [43.8817360, 3.7268185],
  [43.8816879, 3.7264421],
  [43.8814991, 3.7256814],
  [43.8813983, 3.7253114],
  [43.8812072, 3.7247968],
  [43.8810148, 3.7243902],
  [43.8807504, 3.7238487],
  [43.8803635, 3.7232182],
  [43.8801071, 3.7231054],
  [43.8798850, 3.7230562],
  [43.8793229, 3.7227036],
  [43.8787197, 3.7221906],
  [43.8784815, 3.7220477],
  [43.8782125, 3.7218571],
  [43.8780339, 3.7216777],
  [43.8778897, 3.7214887],
  [43.8777695, 3.7214617],
  [43.8777075, 3.7214793],
  [43.8776688, 3.7214903],
  [43.8775909, 3.7215713],
  [43.8774902, 3.7217269],
  [43.8774490, 3.7218809],
  [43.8774627, 3.7220938],
  [43.8774455, 3.7222367],
  [43.8773391, 3.7223336],
  [43.8772154, 3.7224447],
  [43.8769372, 3.7228545],
  [43.8767297, 3.7231469],
  [43.8766476, 3.7232626],
  [43.8762286, 3.7235437],
  [43.8757959, 3.7238264],
  [43.8755051, 3.7239344],
  [43.8752665, 3.7238931],
  [43.8751285, 3.7238693],
  [43.8748022, 3.7237724],
  [43.8743488, 3.7234802],
  [43.8735035, 3.7230979],
  [43.8730574, 3.7228608],
  [43.8728525, 3.7225639],
  [43.8727277, 3.7223495],
  [43.8724713, 3.7221843],
  [43.8721232, 3.7219874],
  [43.8719099, 3.7217764],
  [43.8717683, 3.7216364],
  [43.8714454, 3.7214426],
  [43.8713035, 3.7213219],
  [43.8711878, 3.7211726],
  [43.8711736, 3.7211640],
  [43.8710275, 3.7210758],
  [43.8709688, 3.7210633],
  [43.8708192, 3.7210313],
  [43.8706680, 3.7210646],
  [43.8705066, 3.7211980],
  [43.8703360, 3.7213410],
  [43.8702318, 3.7215188],
  [43.8701780, 3.7216364],
  [43.8700498, 3.7217031],
  [43.8698563, 3.7216665],
  [43.8696159, 3.7215331],
  [43.8691121, 3.7214029],
  [43.8690171, 3.7213299],
  [43.8689564, 3.7211472],
  [43.8687938, 3.7209884],
  [43.8686358, 3.7208852],
  [43.8684022, 3.7208423],
  [43.8680759, 3.7208042],
  [43.8677965, 3.7208248],
  [43.8675057, 3.7207613],
  [43.8670523, 3.7206295],
  [43.8667203, 3.7205008],
  [43.8664890, 3.7203770],
  [43.8661970, 3.7203754],
  [43.8660195, 3.7204214],
  [43.8656886, 3.7205914],
  [43.8650669, 3.7209312],
  [43.8646489, 3.7210710],
  [43.8642974, 3.7211186],
  [43.8639264, 3.7211028],
  [43.8636482, 3.7210281],
  [43.8633963, 3.7208280],
  [43.8631764, 3.7205961],
  [43.8630654, 3.7202976],
  [43.8630780, 3.7199577],
  [43.8631604, 3.7195972],
  [43.8632726, 3.7193764],
  [43.8633871, 3.7190667],
  [43.8634501, 3.7188190],
  [43.8635783, 3.7186999],
  [43.8638245, 3.7186586],
  [43.8640879, 3.7185649],
  [43.8642951, 3.7184235],
  [43.8644623, 3.7181599],
  [43.8646089, 3.7178836],
  [43.8648665, 3.7175294],
  [43.8650062, 3.7172737],
  [43.8651173, 3.7169672],
  [43.8651505, 3.7166178],
  [43.8651367, 3.7161938],
  [43.8650531, 3.7158190],
  [43.8649249, 3.7155855],
  [43.8647509, 3.7154680],
  [43.8645940, 3.7152520],
  [43.8644646, 3.7149042],
  [43.8643558, 3.7145834],
  [43.8641978, 3.7143197],
  [43.8639825, 3.7142054],
  [43.8636356, 3.7141085],
  [43.8633619, 3.7140339],
  [43.8631272, 3.7140672],
  [43.8628993, 3.7142054],
  [43.8627047, 3.7143960],
  [43.8624058, 3.7144547],
  [43.8621001, 3.7146326],
  [43.8617794, 3.7149534],
  [43.8614370, 3.7152304],
  [43.8610237, 3.7156352],
  [43.8603851, 3.7160641],
  [43.8598216, 3.7162083],
  [43.8592801, 3.7163624],
  [43.8591269, 3.7163695],
  [43.8589614, 3.7164149],
  [43.8587999, 3.7163709],
  [43.8587536, 3.7163874],
  [43.8586342, 3.7164301],
  [43.8584753, 3.7163379],
  [43.8582759, 3.7161536],
  [43.8580967, 3.7160333],
  [43.8579435, 3.7158890],
  [43.8578655, 3.7156686],
  [43.8578193, 3.7154522],
  [43.8577730, 3.7153239],
  [43.8576228, 3.7150835],
  [43.8576314, 3.7148711],
  [43.8576025, 3.7145825],
  [43.8576257, 3.7142458],
  [43.8577557, 3.7139773],
  [43.8578222, 3.7137930],
  [43.8579667, 3.7134082],
  [43.8581285, 3.7129634],
  [43.8583106, 3.7125305],
  [43.8584406, 3.7121818],
  [43.8586776, 3.7118131],
  [43.8588943, 3.7115807],
  [43.8591342, 3.7113362],
  [43.8595618, 3.7109394],
  [43.8598653, 3.7105948],
  [43.8600849, 3.7103984],
  [43.8604663, 3.7100657],
  [43.8606975, 3.7099134],
  [43.8609634, 3.7097491],
  [43.8612668, 3.7095527],
  [43.8615297, 3.7093283],
  [43.8616453, 3.7091560],
  [43.8618505, 3.7088514],
  [43.8620788, 3.7083384],
  [43.8620874, 3.7077773],
  [43.8620232, 3.7075688],
  [43.8619603, 3.7073645],
  [43.8617551, 3.7069878],
  [43.8614951, 3.7067393],
  [43.8613188, 3.7065830],
  [43.8608449, 3.7065589],
  [43.8603074, 3.7067433],
  [43.8598999, 3.7068675],
  [43.8597092, 3.7070840],
  [43.8593682, 3.7073445],
  [43.8590475, 3.7076811],
  [43.8589174, 3.7078134],
  [43.8585909, 3.7081099],
  [43.8583134, 3.7084706],
  [43.8578857, 3.7085147],
  [43.8574523, 3.7084746],
  [43.8571084, 3.7082983],
  [43.8566944, 3.7081760],
  [43.8562674, 3.7080498],
  [43.8560588, 3.7080519],
  // — Aubanel (Arrivée) —
  [43.8554813, 3.7080578]
];

// Index de début de chaque parcours dans HERAULT[]
var IDX = {
  LAROQUE:    0,     // Base Laroque         (index 0)
  LA_COMBE:   87,    // Base La Combe        (index 87) — recalé sur le
                     // 462 Av. du Chemin Neuf puis décalé ~600 m plus
                     // au nord (ajustements demandés)
  AGONES:     134,   // Base Agonès          (index 134) — point réel repositionné
  AUBANEL:    HERAULT.length - 1
};

// ── DÉFINITION DES PARCOURS ──────────────────────────────────────
// Modèle 2026 : 2 seules bases avec parking (Laroque et Aubanel).
// 6 km  : Laroque → Agonès (parking Laroque, navette RETOUR incluse)
// 13 km : Laroque → Aubanel (parking Laroque, navette RETOUR incluse)
// 7 km  : Agonès → Aubanel (parking Aubanel, navette ALLER incluse jusqu'à Agonès)
// 9 km  : La Combe → Aubanel (parking Aubanel, navette ALLER incluse jusqu'à La Combe)
// Les parcours 6 km et 7 km partagent désormais le même point de
// jonction réel (IDX.AGONES) — plus de décalage artificiel.
var PARCOURS = {
  '6': {
    nom:     'Sportif',
    couleur: '#F59E42',
    coords:  HERAULT.slice(IDX.LAROQUE, IDX.AGONES + 1)  // Laroque → Agonès
  },
  '7': {
    nom:     'Familial',
    couleur: '#7FAF59',
    coords:  HERAULT.slice(IDX.AGONES)  // Agonès → Aubanel
  },
  '9': {
    nom:     'Découverte',
    couleur: '#2F80C4',
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
    detail:  'Départ 6 km &amp; 13 km — Parking gratuit',
    couleur: '#264653',
    routes:  ['6', '13']
  },
  {
    // Position du 462 Avenue du Chemin Neuf (déterminée par la
    // numérotation métrique de la voie — repères vérifiés : n°11 au
    // nord, n°1133-mairie au sud, écart modèle/terrain ≈ 12 m),
    // puis décalée ~600 m plus au nord sur demande. Ce point est
    // proche de l'extrémité nord connue de la voie dans OSM.
    coords:  [43.9069454, 3.7375738],
    label:   'Base La Combe',
    detail:  'Départ 9 km — Découverte',
    couleur: '#2F80C4',
    routes:  ['9']
  },
  {
    // Corrigé : l'ancienne valeur (43.8617551, 3.7069878) pointait en
    // réalité vers un lieu-dit de Brissac (à ~700 m d'Aubanel), pas
    // vers Agonès — cf. correctif détaillé en tête de fichier.
    // Repositionné sur le point réel utilisé par HERAULT/IDX.AGONES.
    coords:  [43.8857366, 3.7329679],  // point OSM le plus proche (repositionné)
    label:   'Base Agonès',
    detail:  'Arrivée 6 km · Départ 7 km',
    couleur: '#264653',
    routes:  ['6', '7']
  },
  {
    coords:  [43.8554813, 3.7080578],  // point OSM le plus proche de l'arrivée
    label:   'Arrivée Aubanel',
    detail:  'Arrivée 7, 9 &amp; 13 km — Parking gratuit',
    couleur: '#264653',
    routes:  ['7', '9', '13']
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
