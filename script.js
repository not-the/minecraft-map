// DOM
const name_input = document.getElementById("name_input");
const size_input = document.getElementById("size_input");
const min_zoom_input = document.getElementById("min_zoom_input");

// Create map
var map = L.map('map').setView([-46.8, 57.8], 4);
L.tileLayer('./tiles/level_{z}/{x}_{y}.png', {
    maxZoom: 8,
    maxNativeZoom: 3,
    crs: L.CRS.Simple, // Coordinate system
    noWrap: true,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Labels
// var spawn = L.marker([-46.8, 57.8]).addTo(map).bindPopup("<h3>Spawn</h3>");

let labelData = [
    {
        "latlng": [
            -46.8,
            57.8
        ],
        "text": "Spawn",
        "fontSize": "24",
        "min_zoom": 0
    },
    {
        "latlng": [
            -50.62,
            68.4
        ],
        "text": "Nativitatis",
        "fontSize": "12",
        "min_zoom": 2
    },
    {
        "latlng": [
            -59.7563950493563,
            56.42578125000001
        ],
        "text": "Bee Plateau*<br/>(Planned)",
        "fontSize": "12",
        "min_zoom": 3
    },
    {
        "latlng": [
            -57.302789656350086,
            -27.158203125000004
        ],
        "text": "Mare Centralis",
        "fontSize": "24",
        "color": "#2867c4",
        "min_zoom": 0
    },
    {
        "latlng": [
            -48.89361536148019,
            32.25585937500001
        ],
        "text": "Gunther's Base",
        "fontSize": "24",
        "min_zoom": 3
    },
    {
        "latlng": [
            -42.32606244456203,
            56.16210937500001
        ],
        "text": "Pirate Cove",
        "fontSize": "16",
        "min_zoom": 3
    },
    {
        "latlng": [
            -41.86956082699455,
            45.87890625
        ],
        "text": "Horse Island",
        "fontSize": "12",
        "min_zoom": 4
    },
    {
        "latlng": [
            -39.027718840211605,
            39.55078125
        ],
        "text": "Mewtwo Island",
        "fontSize": "12",
        "min_zoom": 4
    },
    {
        "latlng": [
            -23.664650731631625,
            80.61767578125001
        ],
        "text": "Old server ruins",
        "fontSize": "12",
        "min_zoom": 2
    },
    {
        "latlng": [
            8.928487062665504,
            27.685546875000004
        ],
        "text": "Great Bay",
        "fontSize": "12",
        "min_zoom": 2
    },
    {
        "latlng": [
            -68.22052325573338,
            -19.204101562500004
        ],
        "text": "Kevin's Island",
        "fontSize": "24",
        "min_zoom": 2
    },
    {
        "latlng": [
            -65.53117097417716,
            19.687500000000004
        ],
        "text": "Siccum Archipelago",
        "fontSize": "18",
        "min_zoom": 2
    },
    {
        "latlng": [
            -63.035039315529765,
            33.44238281250001
        ],
        "text": "Savannah Reserve*",
        "fontSize": "18",
        "min_zoom": 3
    },
    {
        "latlng": [
            -9.838979375579331,
            38.23242187500001
        ],
        "text": "Nut Ranch",
        "fontSize": "18",
        "min_zoom": 2
    },
    {
        "latlng": [
            -5.7690358661221355,
            50.27343750000001
        ],
        "text": "Unnamed Town*",
        "fontSize": "18",
        "min_zoom": 3
    },
    {
        "latlng": [
            -52.988337253395414,
            63.43505859375001
        ],
        "text": "NotNone Bunker",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -51.282534682474655,
            64.80834960937501
        ],
        "text": "ForrestKnight's Base",
        "fontSize": "12",
        "min_zoom": "4"
    },
    {
        "latlng": [
            -47.264320080254784,
            52.71240234375001
        ],
        "text": "Turtle Island",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -40.35491675079061,
            74.20166015625001
        ],
        "text": "Unnamed Building",
        "fontSize": "12",
        "min_zoom": "5"
    },
    {
        "latlng": [
            -67.58200288439504,
            63.52294921875001
        ],
        "text": "Laganrat (?)<br/>House*",
        "fontSize": "12",
        "min_zoom": "3"
    }
];

let labels = [];

// Create labels
function createLabel(data) {
    var label = L.tooltip({ permanent: true, direction:"center" })
    .setLatLng(data.latlng)
    .setContent(`<span style="color: ${data.color ?? 'white'}; font-size: ${data.fontSize}pt" data-min-zoom="${data.min_zoom}">${data.text}</span>`)
    .addTo(map);
    labels.push(label);
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
