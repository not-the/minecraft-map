/** Get JSON - https://stackoverflow.com/a/22790025/11039898
 * @param {string} url JSON file URL
 * @param {boolean} parse Whether or not to convert into a JS object
 * @returns 
 */
function get(url, parse=false){
    var rq = new XMLHttpRequest(); // a new request
    rq.open("GET", url, false);
    rq.send(null);
    return parse ? JSON.parse(rq.responseText) : rq.responseText;          
}


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
var map = L.map('map', { zoomControl:false }).setView([-51.47, -16.1], 6);
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
var spawn = L.marker([-51.47, -16.1], { zIndexOffset:50 }).addTo(map).bindPopup("<h3>Spawn</h3>");

let labelData = get('./js/labels.json', true);
let labels = {};

// Create labels
function createLabel(data) {
    var label = L.tooltip({ permanent: true, direction:"center" })
    .setLatLng(data.latlng)
    .setContent(`<span
        class="${data.style}"
        style="${data.border_color ? `--stroke:${data.border_color};`:""}
        color: ${data.color ?? 'white'};
        font-size: ${data.fontSize}pt"
        data-min-zoom="${data.min_zoom}">${data.text}
    </span>`)
    .addTo(map);
    labels[data.text] = label;
}

for(let data of labelData) createLabel(data);

function labelExport() {
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
