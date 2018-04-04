
var url = "./O-B0045-001.xml";
var method = "GET";

//let geojson = [];

makeCorsRequest(method, url)
    .then(function (geojson) {
        //console.log(geojson);

        ImportGeojson(geojson);
    })
    .catch(function (err) {
        console.log('Augh, there was an error!');
    })

function ImportGeojson(geojson) {
    console.log("geojson:", geojson)
    //console.warn(geojson);

    //geojson = jQuery.parseJSON(JSON.stringify(geojson));
    //geojson_str = JSON.stringify(geojson);
    //console.warn(geojson_str);

    var osm = new ol.layer.Tile({
        source: new ol.source.OSM()
    });


    var styles = {
        'Point': [new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({ color: [255, 255, 255, 1] }),
                stroke: new ol.style.Stroke({ color: [0, 0, 0, 1] }),
                radius: 5
            })
        })],
        'LineString': [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 5
            })
        })]
    };

    var features = new ol.format.GeoJSON().readFeatures(geojson, {
        featureProjection: 'EPSG:3857'
    });
    var vectorSource = new ol.source.Vector({
        features: features
    });
    var Fspouse = new ol.layer.Vector({
        source: vectorSource,
        style: function (feature) {
            feature.setStyle(myStyleFunctionLev(feature));
            //return styles[feature.getGeometry().getType()];
        }
    });


    function myStyleFunctionLev(feature) {

        if (feature.get('longtitude') == 117.975) {
            console.log(feature.get('longtitude'));
        }

        /*if (feature.get('Tcount') > 0 && feature.get('Tcount') <= 2500) {
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
        }*/
    }



    /*var Fspouse = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: geojson
            //url: './spouse_e3857.geojson'
        }),
        style: function (feature) {
            feature.setStyle(myStyleFunctionLev(feature));
        }
    });*/

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

}


//console.log(geojson);

function fn() {
    alert("Hello! Uncle Namaste...Chalo Kaaam ki Baat p Aate h...");
    return 1;
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

//create geojson
function CreateGeojson(arr_raindata) {
    var features = [], geojson = [],
        x, y;

    //var file = new File(textfile, "write");

    for (var row = 0; row < arr_raindata.length; row++) {


        for (var column = 0; column < 75; column++) {

            x = parseFloat(arr_raindata[row][column][1]) * 20037508.34 / 180;
            y = Math.log(Math.tan((90 + parseFloat(arr_raindata[row][column][2])) * Math.PI / 360)) / (Math.PI / 180);
            y = y * 20037508.34 / 180;

            features.push({
                "type": "Feature",
                "properties": {
                    "longtitude": parseFloat(arr_raindata[row][column][1]),
                    "latitude": parseFloat(arr_raindata[row][column][2]),
                    "rainfall": arr_raindata[row][column][0]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [parseFloat(arr_raindata[row][column][1]), parseFloat(arr_raindata[row][column][2])]
                }
            })
        }
    }

    geojson = {
        "type": "FeatureCollection",
        "crs": {
            "type": "name",
            "properties": {
                "name": "EPSG:4326"              //坐標系統改成EPSG:4326
            }
        },
        "features": features
    }




    //geojson.replace(/<(?:.|\n)*?>/gm, '');



    return geojson;


}

//gettime
function GetTime(XML) {

    var time, time_value;

    time = XML.getElementsByTagName('sent');
    time_value = time[0].childNodes[0].nodeValue;

    return time_value;
    //console.log(time_value);
}

//取得陣列大小
function GetMatrixSize(XML, parameter_loc) {

    var matrix = XML.getElementsByTagName('parameterValue'),
        matrix_value = matrix[parameter_loc].childNodes[0].nodeValue;

    var size = matrix_value.split('*');

    return size;


}

function GetResolution(XML, parameter_loc) {

    var resolution = XML.getElementsByTagName('parameterValue'),
        resolution_value = resolution[parameter_loc].childNodes[0].nodeValue;

    return resolution_value;


}

//取得初始經緯度
function GetInitialPosition(XML, parameter_loc) {

    var initial_position = XML.getElementsByTagName('parameterValue'),
        initial_position_value = initial_position[parameter_loc].childNodes[0].nodeValue,
        longitude, latitude;

    var position = initial_position_value.split(',');



    return position;


}


//取的降雨資料
function GetContent(XML, size, initial_position, resolution) {

    var content, content_value,
        arr_raindata = [], //arr_raindata = [[雨量][經度][緯度]]，[95][75]
        count = 0,
        resolution,
        longitude, latitude, temp_longitude;


    //將初始點從左下角轉為左上角
    longitude = parseFloat(initial_position[0]);
    latitude = parseFloat(initial_position[1]) + (size[1] - 1) * resolution; //position[1] => latitude，size[1] =>  Y    
    console.log(latitude);

    resolution = parseFloat(resolution);

    longitude = new Number(longitude);
    latitude = new Number(latitude);

    content = XML.getElementsByTagName('content');

    content_value = content[0].childNodes[0].nodeValue.split(',');


    //console.log(content_value);

    for (var row = 0; row < size[1]; row++) {         //size[1] => size of y

        arr_raindata[row] = [];

        temp_longitude = longitude; //每一列經度起始位置都是固定的，故先暫存

        for (var column = 0; column < size[0]; column++) {

            value = parseFloat(content_value[count]); //將科學記號轉為數字

            arr_raindata[row].push([value, longitude.toFixed(4), latitude.toFixed(4)]);

            longitude = longitude + resolution;　//依次向右遞減

            count++;

        }

        longitude = temp_longitude;

        latitude = latitude - resolution;　//依次向下遞減

    }

    //console.log(arr_raindata);

    return arr_raindata;


}

// 建立 CORS request.
function makeCorsRequest(method, url) {

    // promise aviod callback hell
    return new Promise(function (reslove, reject) {

        var xhr = createCORSRequest(method, url);

        if (!xhr) {
            console.log('CORS not supported');
            return;
        }

        // Response handlers main
        xhr.onload = function () {

            var text = xhr.responseXML,
                size, initial_position, resolution, time,
                arr_raindata = [], geojson = [],
                parameter, parameter_child, parameter_name;


            time = GetTime(text);
            parameter = text.getElementsByTagName('parameter');

            for (var i = 0; i < parameter.length; i++) {

                //讀取參數名稱進行判定進入哪個函式
                parameter_child = parameter[i].getElementsByTagName('parameterName');
                parameter_name = parameter_child[0].childNodes[0].nodeValue;

                if (parameter_name == "左下角") {

                    initial_position = GetInitialPosition(text, i);　//i為參數位置
                }

                else if (parameter_name == "解析度") {

                    resolution = GetResolution(text, i);
                }


                else if (parameter_name == "維度(nx*ny)") {

                    size = GetMatrixSize(text, i);

                }

            }

            if (size && resolution && initial_position) {

                arr_raindata = GetContent(text, size, initial_position, resolution);

                geojson = CreateGeojson(arr_raindata);


                reslove(geojson);
            }
            else {
                if (!size) {
                    console.log("lost parameter size");
                }
                if (!resolution) {
                    console.log("lost parameter resolution");
                }
                if (!parameter_name) {
                    console.log("lost parameter initial position");
                }
            }



        };



        //event handler
        xhr.onerror = function () {
            console.log('Woops, there was an error making the request.');
            reject({
                status: this.status,
                statusText: xhr.statusText
            });

        };

        xhr.send();

    });
}



