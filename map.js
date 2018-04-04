$(function () {



    var osm = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var Fspouse = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: './spouse_e3857.geojson',
        }),
        style: function (feature) {
            feature.setStyle(myStyleFunctionLev(feature));
        }
    });





    var myStyles = {

        lev1: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#edf8fb'
            }),
            stroke: new ol.style.Stroke({
                color: '#159ff2',
                width: 3.0
            })
        }),
        lev2: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#b3cde3'
            }),
            stroke: new ol.style.Stroke({
                color: '#159ff2',
                width: 3.0
            })
        }),
        lev3: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#8c96c6'
            }),
            stroke: new ol.style.Stroke({
                color: '#159ff2',
                width: 3.0
            })
        }),
        lev4: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#8856a7'
            }),
            stroke: new ol.style.Stroke({
                color: '#159ff2',
                width: 3.0
            })
        }),
        lev5: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#810f7c'
            }),
            stroke: new ol.style.Stroke({
                color: '#159ff2',
                width: 3.0
            })
        }),

    };



    var view = new ol.View({
        center: ol.proj.transform([121.364604, 24.9875278], 'EPSG:4326', 'EPSG:3857'),
        zoom: 8
    });

    var map = new ol.Map({
        controls: ol.control.defaults().extend([
            new ol.control.ScaleLine({ className: 'ol-scale-line', target: document.getElementById('scale-line') })
        ]),
        layers: [osm, Fspouse],
        target: 'map',
        view: view
    });


    //console.log(feature.get('Tcount'));

    function myStyleFunctionLev(feature) {

        if (feature.get('Tcount') > 0 && feature.get('Tcount') <= 2500) {
            console.log(myStyles.lev1);
            return myStyles.lev1;
        }
        else if (feature.get('Tcount') > 2500 && feature.get('Tcount') <= 5000) {

            return myStyles.lev2;
        }
        else if (feature.get('Tcount') > 5000 && feature.get('Tcount') <= 7500) {

            return myStyles.lev3;
        }
        else if (feature.get('Tcount') > 7500 && feature.get('Tcount') <= 10000) {

            return myStyles.lev4;
        }
        else {
            return myStyles.lev5;
        }
    }
})
