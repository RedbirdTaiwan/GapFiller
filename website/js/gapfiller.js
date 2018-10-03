//參數
var highest = 1500; //網格顏色最高量級, 以此量級等區分為4級，例如設為1500時, 則分為>1500, 1500~1001, 1000~501, <500，值為0時網格為透明
var init_map = {"lat":23.39,"lng":120.5,"level":6}; //地圖初始中心座標及放大級
var locinterval = 5000; //定位時間間隔,單位毫秒
var total_girds = 40594; //總網格數
var start_grids = 10566; //活動開始前已有資料的網格數
var taiwanID = 'EffortMeterTaiwan' //台灣累積圖DOM id
var donutID = "EffortMeterDonut" //甜甜圈圖DOM id
var targets = [500,1000,2000,3399]; //甜甜圈圖階段目標
var boardID = "Leaderboards"; //名人榜DOM id
var boardsets = [10,5]; //名人榜頁面設定: [每榜人數,榜單數]

//由座標計算網格編號
function girdcode(lat,lng,level=4){
    var code = [];
    var init_x = 116;
    var init_y = 20;
    var unit_x = 0.01;
    var unit_y = (50/60)/100;
    if(lng < 116){lng = 116.00001;}
    if(lng > 124){lng = 123.99999;}
    if(lat < 20){lat = 20.00001;}
    if(lat > 26.66666666){lat = 26.66666;}
    var code1_x = Math.floor(init_x - 100) + Math.floor((lng-init_x)/(unit_x*100))
    var code1_y = Math.floor(init_y * 1.2) + Math.floor((lat-init_y)/(unit_y*100))
    code[0] = code1_y.toString() + code1_x.toString()
    var code2_x = Math.floor(((lng-init_x)%(unit_x*100))/(unit_x*10))
    var code2_y = Math.floor(((lat-init_y)%(unit_y*100))/(unit_y*10))
    code[1] = code[0] + "-" + code2_y.toString() + code2_x.toString()
    var code3_x = Math.floor((((lng-init_x)%(unit_x*100))%(unit_x*10))/(unit_x*5))
    var code3_y = Math.floor((((lat-init_y)%(unit_y*100))%(unit_y*10))/(unit_y*5))
    code[2] = code[1] + "-" + code3_y.toString() + code3_x.toString()
    var code4_x = Math.floor(((((lng-init_x)%(unit_x*100))%(unit_x*10))%(unit_x*5))/unit_x)
    var code4_y = Math.floor(((((lat-init_y)%(unit_y*100))%(unit_y*10))%(unit_y*5))/unit_y)
    code[3] = code[2] + "-" + code4_y.toString() + code4_x.toString()
    return code[level-1]
}

//由網格編號計算西南角座標
function baselatlng(code){
    var base = {level:"",lat:"",lng:""};
    unit_x = 0.01;
    unit_y = (50/60)/100;
    codes = code.split("-");
    base.level = codes.length;
    if (base.level > 0) {
        base.lat = parseInt(codes[0].substr(0,2)) / 1.2;
        base.lng = parseInt(codes[0].substr(2,2)) + 100;
    }
    if (base.level > 1 ){
        base.lat += parseInt(codes[1].substr(0,1)) * unit_y * 10;
        base.lng += parseInt(codes[1].substr(1,1)) * unit_x * 10;
    }
    if (base.level > 2 ){
        base.lat += parseInt(codes[2].substr(0,1)) * unit_y * 5;
        base.lng += parseInt(codes[2].substr(1,1)) * unit_x * 5;
    }
    if (base.level > 3 ){
        base.lat += parseInt(codes[3].substr(0,1)) * unit_y;
        base.lng += parseInt(codes[3].substr(1,1)) * unit_x;
    }
    return base
}

//由西南角座標計算網格的四角座標
function grid(lat,lng,level=1){
    var g = [];
    var unit_x = 0.01;
    var unit_y = (50/60)/100;
    if(level==1){
        unit_x = unit_x * 100;
        unit_y = unit_y * 100;
    }else if(level==2){
        unit_x = unit_x * 10;
        unit_y = unit_y * 10;
    }else if(level==3){
        unit_x = unit_x * 5;
        unit_y = unit_y * 5;
    }
    g[0] = [lat,lng];
    g[1] = [lat,lng+unit_x];
    g[2] = [lat+unit_y,lng+unit_x];
    g[3] = [lat+unit_y,lng];
    return g
}

//由資料量得到網格顏色級
function fcolor(Effort){
    if ( Effort > highest ){
        return 'hsl(8,81.6%,36.3%)';
    }else if (Effort > highest*2/3){
        return 'hsl(8,73.1%,53.4%)';
    }else if (Effort > highest/3){
        return 'hsl(8,64.7%,70.4%)';
    }else{
        return 'hsl(8,56.2%,87.5%)';
    }     
}

//主function
function init() {
	//地圖製作
    //圖資選擇事件
    document.getElementById('basemaps').onchange = function() {setBasemap(this.value);}
    
    //初始化地圖
    var mymap = L.map('mapid').setView([init_map['lat'], init_map['lng']], init_map['level']);

    //導航彈跳視窗
    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("<a href=\"https://www.google.com/maps/place/"+e.latlng.lat.toString()+"N+"+e.latlng.lng.toString()+"E/@"+e.latlng.lat.toString()+","+e.latlng.lng.toString()+",17z\" target=_blank>導航</a>")
            .openOn(mymap);
    }
    mymap.on('click', onMapClick);

    //定時定位(含誤差)    
    var current_position, current_accuracy;

    function onLocationFound(e) {
        //定位成功時顯示marker和精確度
        if (current_position) {
            mymap.removeLayer(current_position);
            mymap.removeLayer(current_accuracy);
        }
        var radius = e.accuracy / 2;
        current_position = L.marker(e.latlng).addTo(mymap)
        .bindPopup("我的位置(誤差" + radius + "公尺)");
        current_accuracy = L.circle(e.latlng, radius).addTo(mymap);
		document.getElementById('whereyouare').value = e.latlng.lat + ',' + e.latlng.lng;
    }
    //定位失敗
    function onLocationError(e) {
        //alert(e.message);
    }

    mymap.on('locationfound', onLocationFound);
    mymap.on('locationerror', onLocationError);

    //定位    
    function locate() {
        mymap.locate({watch: true});
    }
    //定時
    setInterval(locate, locinterval);    
	
    //載入esri plugin圖資
    var layerLabels = L.esri.basemapLayer('ImageryLabels');

    //載入OMProvider plugin圖資
    var layer = L.tileLayer.OMProvider('Google.Hybrid.Map', {
        attribution: 'Map data &copy; <a href="http://www.google.com">Google Map</a>'
    }).addTo(mymap);

    //建立layerGroup
    var group = L.layerGroup();
    
    //地圖動後依放大等級重新讀取網格圖層
    mymap.on('moveend', function() {
        var zoomLev = mymap.getZoom(); //放大等級
        var South = mymap.getBounds().getSouth(); //南界緯度
        var North = mymap.getBounds().getNorth(); //北界緯度
        var West = mymap.getBounds().getWest(); //西界經度
        var East = mymap.getBounds().getEast(); //東界經度
        var level = 2;
        if(zoomLev>10){
            level = 4;
        }else if(zoomLev>7){
            level = 3;
        }
        var startpoint = baselatlng(girdcode(South,West,level));
        var endpoint = baselatlng(girdcode(North,East,level));
        group.clearLayers();
        var t = "";
        for ( var k in WGS84Grid){
            if (k.split("-").length == level){
                if( baselatlng(k).lat >=  (startpoint.lat-0.01) && baselatlng(k).lng >=  (startpoint.lng-0.01) && baselatlng(k).lat <=  (endpoint.lat+0.01) && baselatlng(k).lng <=  (endpoint.lng+0.01) ){
                    var polygon = L.polygon(grid(baselatlng(k).lat,baselatlng(k).lng,level));
                    var fillo = 0.0;
                    if(WGS84Grid[k]>0){
                        fillo = 0.5;
                    }
                    polygon.setStyle({weight: 0.5, color: '#e9e9e9', fillColor: fcolor(WGS84Grid[k]), fillOpacity: fillo});
                    group.addLayer(polygon);
                }
            } 
        }
        group.addTo(mymap);
    });
	//改變放大等級以渲染網格
    mymap.setZoom(7);

    //載入插旗點geojson
    var geojson = L.geoJSON(flag, {
        pointToLayer: function (feature, latlng) {
            if (teamcolor[feature.properties.name]) {
                flagimage = 'images/' + teamcolor[feature.properties.name];
            }else{
                flagimage = 'images/flagR.png';
            }
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: flagimage,
                    iconSize:     [32, 45], // size of the icon
                    iconAnchor:   [12, 45],
                    popupAnchor:  [0, 0]
                })}
            );
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<h2>'+feature.properties.namelist+'</h2><p>觀察時間：'+feature.properties.time+'</p>');
        }
    });
	var markers = L.markerClusterGroup();
	markers.addLayer(geojson);
	mymap.addLayer(markers);

	//定位使用者位置並放大移動地圖
	document.getElementById('focu').onclick = function(e) {
		var whereyouare = document.getElementById('whereyouare').value;
		if( whereyouare != ''){
			mymap.panTo(new L.LatLng(whereyouare.split(",")[0], whereyouare.split(",")[1]));
			mymap.setZoom(15);
			mymap.panTo(new L.LatLng(whereyouare.split(",")[0], whereyouare.split(",")[1]));
			mymap.setZoom(18);
			mymap.panTo(new L.LatLng(whereyouare.split(",")[0], whereyouare.split(",")[1]));
		}else{
			alert('定位失敗，請稍候再試。');
		}
	};

    //插旗數累計
    var totalnow = 0;
    var gapid = [];
    if (flag[0]['features'].length > 0){
        flag[0]['features'].forEach(function(e) {
            id = e['id'];
            if (gapid.indexOf(id) < 0){
                gapid.push(id);
                totalnow += 1;
            }
        });
    }
	
	//執行台灣累積圖
	filltaiwan(0,total_girds,start_grids+totalnow,start_grids,taiwanID);
	
	//執行甜甜圈圖
	simpledonut(0,total_girds,start_grids+totalnow,start_grids,targets,donutID);
	
	//執行名人榜
	leaderboard(ebirders,boardsets,boardID);
	
}


//圖資選擇器
function setBasemap(basemap) {
	if (layer) {
	  mymap.removeLayer(layer);
	}
	if (layerLabels) {
		mymap.removeLayer(layerLabels);
	}
	if (basemap === 'OpenStreetMap'){
		layer = L.tileLayer.OMProvider('OSM.Normal.Map', {
			attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
		});
	}else if (basemap === 'GoogleMap'){
		layer = L.tileLayer.OMProvider('Google.Normal.Map', {
			attribution: 'Map data &copy; <a href="http://www.google.com">Google Map</a>'
		});
	}else if (basemap === 'GoogleHybrid'){
		layer = L.tileLayer.OMProvider('Google.Hybrid.Map', {
			attribution: 'Map data &copy; <a href="http://www.google.com">Google Map</a>'
		});
	}else{
		layer = L.esri.basemapLayer(basemap);
		if (basemap === 'ShadedRelief'
			|| basemap === 'Oceans'
			|| basemap === 'Gray'
			|| basemap === 'DarkGray'
			|| basemap === 'Imagery'
			|| basemap === 'Terrain'
			) {
			layerLabels = L.esri.basemapLayer(basemap + 'Labels');
			mymap.addLayer(layerLabels);
		}
	}
	mymap.addLayer(layer);
}