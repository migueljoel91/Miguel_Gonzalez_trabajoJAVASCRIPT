// CONFIGURACION DEL MAPA BASE
const LAT_VULKANIA = 28.46718;
const LNG_VULKANIA = -16.25243;
let controlRuta = null;

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

const iconoCliente = L.icon({
    iconUrl: "../assets/images/pene.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [2, -40],
});


const map = L.map('map').setView([LAT_VULKANIA, LNG_VULKANIA], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

L.marker([LAT_VULKANIA, LNG_VULKANIA], { icon: iconoVulkania })
    .bindTooltip("Clica en el mapa para ver la ruta", { className: "custom-tooltip" })
    .bindPopup("<b><span>Vulkania Heavy</span></b><br> Calle Castillo 45, S/C de Tenerife", {
        className: "custom-popup"
    })
    .addTo(map)
    .openPopup();


// CONFIGURACION DE LA RUTA DESDE LA UBICACION ACTUAL HASTA LA EMPRESA
function calcularUbicacion() {
    // Calcula la ubicación del cliente
    const options = {
        enableHighAccuracy: true,  // Ubicación máx exacta posible
        timeout: 10000,             // 10 segundos para obtener la ubicación 
        maximumAge: 0              // No usa el caché de ubicación, sino que las calcula en tiempo real
    };

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            success,
            error,
            options
        );
    } else {
        alert("Tu navegador no permite obtener la ubicación.");
    }

    // Función para calcular la ruta
    function success(position) {
        const origen = L.latLng(position.coords.latitude, position.coords.longitude);
        const destino = L.latLng(LAT_VULKANIA, LNG_VULKANIA);

        if (controlRuta) {
            controlRuta.setWaypoints([origen, destino]);  // Si la ruta ya existe, solo actualiza los puntos y sale de la función
            return;
        }
        
        // En caso de que no exista la ruta, crea el control de ruta
        controlRuta = L.Routing.control({
            waypoints: [origen, destino],
            language: 'es',
            addWaypoints: false,   // evita que el usuario añada paradas al hacer clic en la línea
            createMarker: function(i, wp) {
                if (i === 0) {
                    return L.marker(wp.latLng, { icon: iconoCliente }).bindPopup("Eres un homosexual curioso");
                } else {
                    return null;
                }
            }
        }).addTo(map);
    }
    // Si no se puede obtener la ubicación, se ejecuta la función error
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert("No se pudo obtener tu ubicación actual.");
    }
}

map.on('click', calcularUbicacion)