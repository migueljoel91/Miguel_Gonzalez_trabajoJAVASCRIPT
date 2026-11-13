const LAT_VULKANIA = 28.46718;
const LNG_VULKANIA = -16.25243;
const iconoVulkania = L.icon({
    iconUrl: "../assets/favicon/favicon-96x96.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],

    shadowUrl: "../assets/favicon/favicon-96x96-shadow.png",
    shadowSize: [68, 30],
    shadowAnchor: [25, 25],

    popupAnchor: [2, -40],
    tooltipAnchor: [20, -20],
});

const map = L.map('map').setView([LAT_VULKANIA, LNG_VULKANIA], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

L.marker([LAT_VULKANIA, LNG_VULKANIA], { icon: iconoVulkania })
    .bindTooltip("Clica para saber la ubicación", { className: "custom-tooltip" })
    .bindPopup("<b><span>Vulkania Heavy</span></b><br> Calle Castillo 45, S/C de Tenerife", {
        className: "custom-popup"
    })
    .addTo(map)
    .openPopup();

// Configuración de la ruta desde la ubicación actual hasta Vulkania Heavy
function calcularUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            L.Routing.control({
                waypoints: [
                    L.latLng(lat, lng),
                    L.latLng(LAT_VULKANIA, LNG_VULKANIA)
                ],
                routeWhileDragging: true
            }).addTo(map);
        });
    }
}

map.on('click', () => {
    calcularUbicacion();
});