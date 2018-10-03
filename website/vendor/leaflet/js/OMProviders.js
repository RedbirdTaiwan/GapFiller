L.TileLayer.OMProvider = L.TileLayer.extend({

    initialize: function(type, options) { // (type, Object)
        var providers = L.TileLayer.OMProvider.providers;

        var parts = type.split('.');

        var providerName = parts[0];
        var mapName = parts[1];
        var mapType = parts[2];

        var url = providers[providerName][mapName][mapType];
        options.subdomains = providers[providerName].Subdomains;

        L.TileLayer.prototype.initialize.call(this, url, options);
    }
});

L.TileLayer.OMProvider.providers = {

    Google: {
        Normal: {
            Map: "https://www.google.com/maps/vt?lyrs=m@189&&x={x}&y={y}&z={z}"
        },
        Satellite: {
            Map: "https://www.google.com/maps/vt?lyrs=s@189&&x={x}&y={y}&z={z}"
        },
        Hybrid: {
            Map: "https://www.google.com/maps/vt?lyrs=y@189&&x={x}&y={y}&z={z}"
        },
        Subdomains: []
    },

    OSM: {
        Normal: {
            Map: "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
        },
        Subdomains: []

    }
};

L.tileLayer.OMProvider = function(type, options) {
    return new L.TileLayer.OMProvider(type, options);
};
