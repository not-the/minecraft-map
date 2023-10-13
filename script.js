// DOM
const name_input = document.getElementById("name_input");
const size_input = document.getElementById("size_input");
const min_zoom_input = document.getElementById("min_zoom_input");
const cycle_layer = document.getElementById("cycle_layer");
const toggle_labels = document.getElementById("toggle_labels");
const dot_labels = document.getElementById("dot_labels");
const map_search = document.getElementById("map_search");
const map_search_results = document.getElementById("map_search_results");

// Create map
var map = L.map('map', { zoomControl:false }).setView([-46.8, 57.8], 6);
let mainLayer;
let layerString;
setLayer();

/** Creates map layer */
function setLayer(mode='normal') {
    mainLayer?.remove();

    // Normal
    if(mode === 'normal') {
        mainLayer = L.tileLayer('./tiles/level_{z}/{x}_{y}.png', {
            maxZoom: 9,
            maxNativeZoom: 4,
            nativeZooms: [0, 1, 4],
            crs: L.CRS.Simple, // Coordinate system
            noWrap: true,
            // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else if(mode === 'political') {
        mainLayer = L.tileLayer('./political/level_{z}/{x}_{y}.png', {
            maxZoom: 9,
            maxNativeZoom: 2,
            nativeZooms: [0, 2],
            crs: L.CRS.Simple, // Coordinate system
            noWrap: true,
            // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }

    // Ready page
    mode !== 'normal' ? document.body.classList.add('political') : document.body.classList.remove('political');
    layerString = mode;
}

L.control.zoom({
    position: 'topright'
}).addTo(map);

function r(min, max) { return Math.ceil(Math.random() * (max - min) + min); }

// Random location
function randomLocation() {
    // let coords = [r(-512, 512), r(-180, 180)];
    let coords = [512, 180];
    goTo(coords);
}

let goToMarker;
function goTo(coords, zoom=5, marker=true) {
    map.setView(coords, zoom, { animation: true });
    if(goToMarker !== undefined) map.removeLayer(goToMarker);
    if(marker) goToMarker = L.marker(coords).addTo(map);
}

// Labels
var spawn = L.marker([-51.47, -16.1]).addTo(map).bindPopup("<h3>Spawn</h3>");

let labelData = [
    {
        "latlng": [
            -51.47,
            -16.1
        ],
        "text": "Spawn",
        "fontSize": "24",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -51.71681946274874,
            -18.643798828125004
        ],
        "text": "Turtle Island",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -52.47274306920924,
            -16.116943359375004
        ],
        "text": "Kevin's Shop",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -53.26849833145893,
            -16.380615234375004
        ],
        "text": "Lighthouse",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -53.59250480903937,
            -12.595825195312502
        ],
        "text": "ForrestKnight's Base",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -54.42851751056347,
            -13.265991210937502
        ],
        "text": "NotNone Bunker",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -52.789475581398875,
            -11.381835937500002
        ],
        "text": "Nativitatis",
        "fontSize": "24",
        "min_zoom": "2"
    },
    {
        "latlng": [
            -50.84757295365388,
            -19.401855468750004
        ],
        "text": "Geode Courthouse",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -49.48597005571962,
            -16.611328125000004
        ],
        "text": "Pirate Cove",
        "fontSize": "18",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -49.43241258024849,
            -22.005615234375004
        ],
        "text": "Horse Island",
        "fontSize": "18",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -48.0707382642583,
            -25.169677734375004
        ],
        "text": "Mewtwo Island",
        "fontSize": "18",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -48.93693495409402,
            -21.288757324218754
        ],
        "text": "Bigmansjay's House",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -50.94458443495011,
            -11.211547851562502
        ],
        "text": "Old Burial Ground",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -48.654708389988656,
            -7.893709256364371
        ],
        "text": "Unnamed Building*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -52.59303784115742,
            -28.311767578125
        ],
        "text": "Gunther's Base",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -51.227527905265,
            -31.437377929687504
        ],
        "text": "Unnamed Village*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -49.49667452747044,
            -30.190429687500004
        ],
        "text": "Gunth Peninsula",
        "fontSize": "18",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -56.74669909639952,
            -42.47314453125001
        ],
        "text": "Gunther's<br/>Guardian Farm",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -59.72871575482183,
            -28.135986328125004
        ],
        "text": "Savannah Reserve*",
        "fontSize": "18",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -60.99974987461456,
            -35.07934570312501
        ],
        "text": "Siccum Archipelago",
        "fontSize": "18",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -55.37911044801049,
            -61.39160156250001
        ],
        "text": "Mare Centralis",
        "fontSize": "24",
        "min_zoom": "0",
        "color": "#2867c4"
    },
    {
        "latlng": [
            -41.82045509614033,
            -4.449462890625001
        ],
        "text": "Old Server Ruins",
        "fontSize": "18",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -34.47033512121749,
            -19.687500000000004
        ],
        "text": "Unnamed Town*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -36.597889133070204,
            -26.378173828125004
        ],
        "text": "Nut Ranch",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -24.387127324604506,
            -32.29980468750001
        ],
        "text": "Great Bay",
        "fontSize": "18",
        "min_zoom": "4",
        "color": "#2867c4"
    },
    {
        "latlng": [
            -62.48187744898419,
            -54.71191406250001
        ],
        "text": "Kevin's Island",
        "fontSize": "18",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -62.25897468419354,
            -13.227539062500002
        ],
        "text": "Laganrat (?)<br/>House*",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -52.464377026041284,
            -8.800048828125002
        ],
        "text": "Screeish's Base",
        "fontSize": "18",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -54.837081878207506,
            -8.646240234375002
        ],
        "text": "Orange Cabin*",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -56.8053897171152,
            -20.558166503906254
        ],
        "text": "Drowned Farm",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -54.96184803984159,
            -27.073059082031254
        ],
        "text": "Island House*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            19.84939395842279,
            -89.73632812500001
        ],
        "text": "Cor Mundi",
        "fontSize": "18",
        "min_zoom": "3",
        "color": "#2867c4"
    },
    {
        "latlng": [
            22.39071391683855,
            -71.67480468750001
        ],
        "text": "Unnamed*",
        "fontSize": "18",
        "min_zoom": "2"
    },
    {
        "latlng": [
            26.07652055985697,
            -72.27905273437501
        ],
        "text": "NotNone Castle*<br/>(Planned)",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            25.780107118422244,
            -70.33447265625001
        ],
        "text": "Iuxta Mare<br/>(Planned)",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            5.200364681183489,
            -33.70605468750001
        ],
        "text": "Shulker Island",
        "fontSize": "12",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -11.30770770776545,
            -24.093017578125004
        ],
        "text": "NotNone's Mob Farm",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -15.114552871944102,
            -79.45312500000001
        ],
        "text": "Styvis Desert",
        "fontSize": "24",
        "min_zoom": "2"
    },
    {
        "latlng": [
            -18.87510275035649,
            -79.73876953125001
        ],
        "text": "New West",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -15.813395760460573,
            -59.61181640625001
        ],
        "text": "Badlands",
        "fontSize": "18",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -29.305561325527698,
            -43.154296875
        ],
        "text": "Quam Superbia",
        "fontSize": "24",
        "min_zoom": "1"
    },
    {
        "latlng": [
            -34.96699890670367,
            -56.18408203125001
        ],
        "text": "Hollow's Island*",
        "fontSize": "18",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -33.7243396617476,
            -54.43725585937501
        ],
        "text": "Hollow's Cavern",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -58.763362919185056,
            -109.10209526737583
        ],
        "text": "Vincere Highlands",
        "fontSize": "12",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -62.163323972460205,
            -92.80544216493793
        ],
        "text": "Maplands",
        "fontSize": "12",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -39.65222681530652,
            -68.56567382812501
        ],
        "text": "JJ's Island*",
        "fontSize": "18",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -40.85952522899319,
            -68.17565917968751
        ],
        "text": "JJ's Castle*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -38.54816542304657,
            -68.05480957031251
        ],
        "text": "JJ's Starter Hall*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -27.313213898568247,
            -66.67602539062501
        ],
        "text": "Sand Excavation Site",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            22.59372606392931,
            18.369140625000004
        ],
        "text": "North Pole",
        "fontSize": "18",
        "min_zoom": "1"
    },
    {
        "latlng": [
            -66.44310650816469,
            -114.78515625000001
        ],
        "text": "South Pole",
        "fontSize": "18",
        "min_zoom": "1"
    },
    {
        "latlng": [
            -58.37003723692554,
            -16.600341796875004
        ],
        "text": "Bee Plateau<br/>(Planned)",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -43.66787161011749,
            -24.180908203125
        ],
        "text": "Nativitus<br/>Transitus",
        "fontSize": "12",
        "min_zoom": "5",
        "color": "#2867c4"
    },
    {
        "latlng": [
            -40.34654412118006,
            -84.10034179687501
        ],
        "text": "Rywoff Settlement*",
        "fontSize": "18",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -61.669024369272016,
            -49.866943359375
        ],
        "text": "Kevin's Base",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -42.03297433244139,
            -19.259033203125004
        ],
        "text": "Hithitites",
        "fontSize": "18",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -42.948381397653144,
            -18.127441406250004
        ],
        "text": "Town of Beravia<br/>(Planned)",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -41.64828831259534,
            -13.128662109375002
        ],
        "text": "Hithitites Mountain*<br/>(Planned)",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -45.70617928533085,
            -13.403320312500002
        ],
        "text": "North Nativitatis",
        "fontSize": "12",
        "min_zoom": "6"
    },
    {
        "latlng": [
            -39.60145584097,
            -28.905029296875004
        ],
        "text": "Nut Bridge*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -73.02900629225599,
            17.072753906250004
        ],
        "text": "East Wastes*",
        "fontSize": "18",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -25.48295117535532,
            -21.456298828125
        ],
        "text": "NotNone Settlement<br/>Ruins*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -6.053161295714067,
            -33.04687500000001
        ],
        "text": "Mari Magno",
        "fontSize": "24",
        "min_zoom": "1",
        "color": "#2867c4"
    },
    {
        "latlng": [
            -71.94837357786257,
            -89.45068359375
        ],
        "text": "Floating Rock",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -63.54121067354949,
            -53.4320068359375
        ],
        "text": "??? Ruins*",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -43.48406794429712,
            -36.5914348192759
        ],
        "text": "Dbzstar<br/>Encampment",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -49.468124067331644,
            -67.80761718750001
        ],
        "text": "Hollow Corp<br/>Recreation Center*",
        "fontSize": "12",
        "min_zoom": "3"
    },
    {
        "latlng": [
            -51.59072264312015,
            -66.93969726562501
        ],
        "text": "Hollow's Creeper Farm",
        "fontSize": "12",
        "min_zoom": "5"
    }
];
let labels = {};

// Create labels
function createLabel(data) {
    var label = L.tooltip({ permanent: true, direction:"center" })
    .setLatLng(data.latlng)
    .setContent(`<span
        style="${data.border_color ? `--stroke:${data.border_color};`:""}
        color: ${data.color ?? 'white'};
        font-size: ${data.fontSize}pt"
        data-min-zoom="${data.min_zoom}">${data.text}
    </span>`)
    .addTo(map);
    labels[data.text] = label;
}

for(let data of labelData) createLabel(data);

function exportData() {
    return labelData;
}

// DEV TOOLS

// Event Listeners
let clicked = [0, 0];
map.on('click', (e) => {
    console.log(e.latlng.lat, e.latlng.lng);
    clicked = [e.latlng.lat, e.latlng.lng];
    name_input.focus();

    // Close search results
    clearSearch();
});
map.on("moveend", e => {
    let coords = map.getCenter();
    location.hash = `#${Math.round(coords.lat*100)/100},${Math.round(coords.lng*100)/100}`;
});
map.on('zoomend', handleZoom);
function handleZoom() {
    let zoomLevel = map.getZoom();
    console.log(zoomLevel);
    document.querySelectorAll(`[data-min-zoom`).forEach(element => {
        let minZoom = Number(element.dataset.minZoom);
        if(minZoom > zoomLevel) element.classList.add('hidden');
        else element.classList.remove('hidden');
    });
}
handleZoom();

name_input.addEventListener('keydown', event => {
    if(event.key === 'Enter') {
        name_input.blur();
        if(name_input.value === "") return;

        let data = {
            latlng: clicked,
            text: name_input.value,
            fontSize: size_input.value,
            min_zoom: min_zoom_input.value,
        }

        createLabel(data);
        labelData.push(data);
        name_input.value = "";
    }

    if(event.key === 'Escape') document.activeElement.blur();
});

// Search bar
map_search.addEventListener('keyup', doSearch);
map_search.addEventListener('click', doSearch);
function doSearch(event) {
    console.log(event.key);
    if(event?.key === 'Escape') return clearSearch();
    let search = event.target.value.toUpperCase();
    // if(search === "") return;

    let html = '';
    for(let [key, label] of Object.entries(labels)) {
        if(search === "" || key.toUpperCase().includes(search)) {
            let coords = label._latlng
            html += `<div class="result" role="button" tabindex="0" onclick="goTo([${coords.lat}, ${coords.lng}], 6)">${key}</div>`;
        }
    }
    map_search_results.innerHTML = html;
}
function clearSearch() {
    map_search_results.innerHTML = "";
}

cycle_layer.addEventListener('click', event => {
    setLayer(layerString === 'normal' ? 'political' : 'normal');
})

toggle_labels.addEventListener('click', event => {
    document.body.classList.toggle('hide_labels');
})

dot_labels.addEventListener('click', event => {
    document.body.classList.toggle('dot_labels');
})

if(location.hash !== "") {
    let coords = location.hash.substring(1).split(',');
    for(let i in coords) coords[i] = Number(coords[i]);
    goTo(coords, 6, marker=true)
}
