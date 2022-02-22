//台灣累積圖
function filltaiwan(minpoint,maxpoint,nowpoint,startpoint,targetelementid){
	targetelementid = '#'+targetelementid;
	minpoint = minpoint || 0;
	startpoint = startpoint || 0;

	var svg = d3.select(targetelementid).append('svg').attr('width', "80%").attr('viewBox', "0 0 250 500");
	var i;
	var c = []; //20w*39h, 406points 10371/43199
	var taiwan = [
		[9,39], 
		[8,38], [9,38], 
		[8,37],[9,37],
		[7,36],[8,36],[9,36],
		[7,35],[8,35],[9,35],
		[7,34],[8,34],[9,34],
		[5,33],[6,33],[7,33],[8,33],[9,33],[10,33],
		[4,32],[5,32],[6,32],[7,32],[8,32],[9,32],[10,32],
		[3,31],[4,31],[5,31],[6,31],[7,31],[8,31],[9,31],[10,31],
		[3,30],[4,30],[5,30],[6,30],[7,30],[8,30],[9,30],[10,30],[11,30],
		[3,29],[4,29],[5,29],[6,29],[7,29],[8,29],[9,29],[10,29],[11,29],[12,29],
		[2,28],[3,28],[4,28],[5,28],[6,28],[7,28],[8,28],[9,28],[10,28],[11,28],[12,28],[13,28],
		[2,27],[3,27],[4,27],[5,27],[6,27],[7,27],[8,27],[9,27],[10,27],[11,27],[12,27],[13,27],
		[1,26],[2,26],[3,26],[4,26],[5,26],[6,26],[7,26],[8,26],[9,26],[10,26],[11,26],[12,26],[13,26],[14,26],
		[1,25],[2,25],[3,25],[4,25],[5,25],[6,25],[7,25],[8,25],[9,25],[10,25],[11,25],[12,25],[13,25],[14,25],[15,25],
		[1,24],[2,24],[3,24],[4,24],[5,24],[6,24],[7,24],[8,24],[9,24],[10,24],[11,24],[12,24],[13,24],[14,24],[15,24],
		[1,23],[2,23],[3,23],[4,23],[5,23],[6,23],[7,23],[8,23],[9,23],[10,23],[11,23],[12,23],[13,23],[14,23],[15,23],
		[2,22],[3,22],[4,22],[5,22],[6,22],[7,22],[8,22],[9,22],[10,22],[11,22],[12,22],[13,22],[14,22],[15,22],
		[2,21],[3,21],[4,21],[5,21],[6,21],[7,21],[8,21],[9,21],[10,21],[11,21],[12,21],[13,21],[14,21],[15,21],[16,21],
		[2,20],[3,20],[4,20],[5,20],[6,20],[7,20],[8,20],[9,20],[10,20],[11,20],[12,20],[13,20],[14,20],[15,20],[16,20],
		[2,19],[3,19],[4,19],[5,19],[6,19],[7,19],[8,19],[9,19],[10,19],[11,19],[12,19],[13,19],[14,19],[15,19],[16,19],
		[2,18],[3,18],[4,18],[5,18],[6,18],[7,18],[8,18],[9,18],[10,18],[11,18],[12,18],[13,18],[14,18],[15,18],[16,18],
		[3,17],[4,17],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[11,17],[12,17],[13,17],[14,17],[15,17],[16,17],[17,17],
		[3,16],[4,16],[5,16],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16],[13,16],[14,16],[15,16],[16,16],[17,16],
		[4,15],[5,15],[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],[12,15],[13,15],[14,15],[15,15],[16,15],[17,15],
		[5,14],[6,14],[7,14],[8,14],[9,14],[10,14],[11,14],[12,14],[13,14],[14,14],[15,14],[16,14],[17,14],
		[5,13],[6,13],[7,13],[8,13],[9,13],[10,13],[11,13],[12,13],[13,13],[14,13],[15,13],[16,13],[17,13],
		[6,12],[7,12],[8,12],[9,12],[10,12],[11,12],[12,12],[13,12],[14,12],[15,12],[16,12],[17,12],[18,12],
		[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11],[14,11],[15,11],[16,11],[17,11],[18,11],
		[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[15,10],[16,10],[17,10],[18,10],[19,10],
		[7,9],[8,9],[9,9],[10,9],[11,9],[12,9],[13,9],[14,9],[15,9],[16,9],[17,9],[18,9],[19,9],
		[8,8],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[15,8],[16,8],[17,8],[18,8],[19,8],
		[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7],[16,7],[17,7],[18,7],[19,7],
		[10,6],[11,6],[12,6],[13,6],[14,6],[15,6],[16,6],[17,6],[18,6],[19,6],
		[10,5],[11,5],[12,5],[13,5],[14,5],[15,5],[16,5],[17,5],[18,5],[19,5],
		[11,4],[12,4],[13,4],[14,4],[15,4],[16,4],[17,4],[18,4],[19,4],[20,4],
		[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[17,3],[18,3],[19,3],[20,3],
		[14,2],[15,2],[16,2],[17,2],[18,2],[19,2],[20,2],
		[15,1],[16,1],[17,1]
	];
	var valvalue = Math.floor((startpoint-minpoint)/(maxpoint-minpoint)*406);
	var nowvalue = Math.floor((nowpoint-minpoint)/(maxpoint-minpoint)*406);
	for (i = 0; i < taiwan.length; i++) { 
		if( i == nowvalue + 1 ){
			pointcolor = "#FFC000";
		}else if ( i > nowvalue ){
			pointcolor = "#D5D5D5";
		}else if ( i <= valvalue ){
			pointcolor = "#656565";
		}else{
			pointcolor = "#EC6D58";
		}
		svg.append('circle').attr('cx', taiwan[i][0]*10).attr('cy', taiwan[i][1]*10).attr('r', 5).style("fill",pointcolor);
	}
	//給svg用的中文字型-王漢中細黑體http://lms.ltu.edu.tw/course_open.php?courseID=12961&f=open_doc&cid=684505
	svg.append('text').attr("text-anchor", "end").attr('x', 250).attr('y', 330).style('fill', '#656565').style('font-size', '46px').style('font-family', 'wt011').text('eBirder');
	svg.append('text').attr("text-anchor", "end").attr('x', 250).attr('y', 380).style('fill', '#656565').style('font-size', '46px').style('font-family', 'wt011').text('已占領');
	svg.append('text').attr("text-anchor", "end").attr('x', 250).attr('y', 430).style('fill', '#656565').style('font-size', '46px').style('font-family', 'wt011').text(Math.floor((nowpoint-minpoint)/(maxpoint-minpoint)*100)+'%網格');
}

//甜甜圈圖
function simpledonut(minpoint,maxpoint,nowpoint,startpoint,targets,targetelementid){
	targetelementid = '#'+targetelementid;
	var nowvalue = nowpoint-startpoint;
	var ir = 70, or = 130;
	var p = [], t = [], f = [], s = [], arc = [], piecolor = [];
	var i = 1;
	var fontsize = 90/targets.length;
	targets.forEach(function(e) {
		p.push(nowvalue/e);
		t.push('目標'+i+' '+e+'格：' + Math.floor(nowvalue/e*100)+'%');
		f.push('#555555');
		s.push(fontsize+'px');
		if( nowvalue >= e){
			t[i-1] = '目標'+(i)+' '+e+'格：已達標';
			f[i-1] = '#B5B5B5';
			s[i-1] = (fontsize*.8)+'px';
		}
		i += 1;
	});

	arc.push(d3.arc().innerRadius(ir).outerRadius(or).startAngle(0).endAngle(Math.PI*2));
	for (var j = 0; j < p.length; j++) {
		var r_in = ir + (or-ir)/(p.length)*j;
		var r_out = r_in + (or-ir)/(p.length);
		arc.push(d3.arc().innerRadius(r_in).outerRadius(r_out).startAngle(0).endAngle(Math.PI*2*p[j]));
	}

	var svg = d3.select(targetelementid).append("svg")
		.attr("width", "100%")
		.attr('viewBox', "0 0 260 360")
		.append("g")
		.attr("transform", "translate(105,80)");
	
	var piechart = svg.append("g").attr("transform", "translate(25,60)");

	piechart.append("path")
		.attr("d", arc[0])
		.style("fill", "#D5D5D5");

	var color1 = [244,181,170];
	var color2 = [200,63,48];
	for (var k = 0; k < targets.length; k++) {
		c = "rgb("+(color1[0]+((color2[0]-color1[0])/targets.length*k))+","+(color1[1]+((color2[1]-color1[1])/targets.length*k))+","+(color1[2]+((color2[2]-color1[2])/targets.length*k))+")";
		piechart.append("path").attr("d", arc[k+1]).style("fill", c);
	}
		
	var txt = svg.append("g").attr("transform", "translate(0,10)");
	y = 175;
	for (var k = 0; k < targets.length; k++) {
		y += parseInt(s[k].replace("px",""))+3;
		txt.append("text").attr('x', 25).attr('y', y).attr("text-anchor", "middle").style('fill', f[k]).style('font-size', s[k]).style('font-family', 'wt011').text(t[k]);
	}
	
	var flag = svg.append("g");
	flag.append("path").attr("d", "M22.771,92.826c-0.504,0-0.985-0.175-1.34-0.487c-0.357-0.316-0.556-0.74-0.556-1.186V5.725c0-0.923,0.85-1.675,1.897-1.675c1.049,0,1.898,0.752,1.898,1.675v85.428c0.001,0.445-0.2,0.869-0.556,1.186C23.757,92.651,23.272,92.826,22.771,92.826L22.771,92.826z").attr("fill", "#E6E7EC");
	flag.append("polygon").attr("points", "50.022,16.002 74.022,16.002 64.422,31.337 74.022,46.669 50.022,46.669").attr("fill", "#D7543F");
	flag.append("path").attr("d", "M22.771,90.981C10.194,90.981,0,96.768,0,103.911h45.541C45.541,96.77,35.345,90.981,22.771,90.981L22.771,90.981z").attr("fill", "#E7AB50");
	flag.append("polyline").attr("points", "50.022,46.669 59.329,42.702 59.329,12.032 50.022,12.032").attr("fill", "#BF3F30");
	flag.append("path").attr("d", "M59.288,42.702H24.209V12.032h35.079V42.702z").attr("fill", "#E16B56");
	flag.append("ellipse").attr("cx", "22.771").attr("cy", "4.714").attr("rx", "4.843").attr("ry", "4.714").attr("fill", "#FFFFFF");

	txt.append("text").attr('x', 20).attr('y', 76).attr("text-anchor", "middle").style('fill', '#555555').style('font-size', '48px').style('font-family', 'wt011').text(nowvalue);
}

//名人榜
function leaderboard(ebirders,boardsets,targetelementid){
	var board = document.getElementById(targetelementid);
	targetelementid = "#"+targetelementid;
	var div1 = document.createElement("div");
	div1.setAttribute("class", "carousel-inner");
	var boartchart = "";
	var n = 1;
	for (var m = 0; m < boardsets[1]; m++) {
		var chartid = "Leaderboard"+m;
		var act ="";
		if(m==0){
			act = "active";
		}
		boartchart += '<div class="carousel-item '+act+'"><div id="'+chartid+'" ></div><div class="carousel-caption d-none d-md-block"><h5 class="text-warning">TOP '+n+'~'+(n+boardsets[0]-1)+'</h5></div></div>';
		n += boardsets[0];
	}
	div1.innerHTML = boartchart;
	board.appendChild(div1);
	for (var w = 0; w < boardsets[1]; w++) {
		var i = w*boardsets[0] + 1;
		var j = (w+1)*boardsets[0];
		var chartid = "#Leaderboard"+w;
		leaderboard1(ebirders,chartid,i,j);
	}
	var prev = document.createElement("a");
	prev.setAttribute("class", "carousel-control-prev");
	prev.setAttribute("href", targetelementid);
	prev.setAttribute("role", "button");
	prev.setAttribute("data-slide", "prev");
	prev.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
	board.appendChild(prev);
	var next = document.createElement("a");
	next.setAttribute("class", "carousel-control-next");
	next.setAttribute("href", targetelementid);
	next.setAttribute("role", "button");
	next.setAttribute("data-slide", "next");
	next.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
	board.appendChild(next);
	var indicators = document.createElement("ol");
	indicators.setAttribute("class", "carousel-indicators");
	var idc = '<li data-target="'+targetelementid+'" data-slide-to="0" class="active"></li>';
	for (var n = 1; n < boardsets[1]; n++) {
		idc += '<li data-target="'+targetelementid+'" data-slide-to="'+n+'"></li>';
	}
	indicators.innerHTML = idc;
	board.appendChild(indicators);
}
//名人榜柱狀圖
function leaderboard1(ebirders,targetelementid,i,j){
	var data = [];
	i -= 1;
	j -= 1;
	if ( j >= ebirders.length) {
		j = ebirders.length-1;
	}
	if ( i >= ebirders.length){
		i = j-9;
		if ( i < 0){
			i = 0;
		}
	}
	for (j; j >= i; j--) { 
		data.push(ebirders[j]);
	}
	// set the dimensions and margins of the graph
	var margin = {top: 0, right: 40, bottom: 180, left: 170},
		width = 400 - margin.left - margin.right,
		height = 700 - margin.top - margin.bottom;

	// set the ranges
	var y = d3.scaleBand()
			  .range([height, 0])
			  .padding(0.1);

	var x = d3.scaleLinear()
			  .range([0, width]);
			  
	// append the svg object to the body of the page
	// append a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select(targetelementid).append("svg")
		.attr("width", "100%")
		.attr('viewBox', "0 0 430 800")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  // format the data
	  data.forEach(function(d) {
		d[1] = +d[1];
	  });

	  // Scale the range of the data in the domains
	  x.domain([0, d3.max(data, function(d){ return d[1]; })])
	  y.domain(data.map(function(d) { return d[0]; }));
	  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

	  // append the rectangles for the bar chart
	  svg.selectAll(".bar")
		  .data(data)
		  .enter().append("rect")
		  .attr("fill","#F0B04E")
		  .attr("width", function(d) {
			return x(d[1]);
		  })
		  .attr("y", function(d) { return y(d[0]); })
		  .attr("height", y.bandwidth()-5);

	  // add the x Axis
	  /*
	  svg.append("g")
		  .attr("transform", "translate(0," + height + ")")
		  .call(d3.axisBottom(x));
		*/
	  // add the y Axis
	  svg.append("g")
		  .call(d3.axisLeft(y).tickSize(0)).style('font-size', '20px');
		  
		svg.selectAll(".bar")
		.data(data)
		.enter().append("text")
		.attr("y", function (d) {
			return y(d[0]) + y.bandwidth() / 2 +1.5;
		})
		.attr("x", function (d) {
			return x(d[1]) + 4;
		})
		.style('font-size', '20px')
		.text(function (d) {
			return d[1];
		});
	var flagman = svg.append("g").attr("transform", "translate(60,475)");
	flagman.append("path").attr("d","M200.49,100.244c0,55.367-44.883,100.246-100.246,100.246C44.885,200.49,0,155.611,0,100.245C0,44.881,44.885,0,100.244,0C155.609,0,200.49,44.881,200.49,100.244z").attr("fill", "#EFB134").attr("opacity","0.55").attr("enable-background","new");
	flagman.append("path").attr("d", "M100.361,161.865c-0.746,0-1.457-0.266-1.982-0.74c-0.527-0.479-0.82-1.125-0.82-1.801V29.572c0-1.402,1.256-2.545,2.805-2.545c1.551,0,2.807,1.143,2.807,2.545v129.752c0.002,0.676-0.295,1.32-0.82,1.801C101.818,161.601,101.104,161.865,100.361,161.865L100.361,161.865z").attr("fill", "#E6E7EC");
	flagman.append("polygon").attr("points","140.656,45.183 176.143,45.183 161.947,68.474 176.143,91.761 140.656,91.761").attr("fill", "#D7543F");
	flagman.append("path").attr("d","M100.361,159.063c-18.596,0-33.67,8.791-33.67,19.639h67.338C134.029,167.855,118.953,159.063,100.361,159.063L100.361,159.063z").attr("fill", "#E7AB50");
	flagman.append("circle").attr("cx","57.291").attr("cy","89.058").attr("r","11.751").attr("fill", "#656565");
	flagman.append("path").attr("d","M47,102.715l-10.73-5.896l-3.408-14.27c-0.553-2.318-2.881-3.748-5.195-3.195c-2.318,0.553-3.75,2.881-3.195,5.197l3.85,16.131c0.285,1.184,1.057,2.192,2.119,2.779l17.068,9.377l0.162,1.566c0.104-0.01,0.172-0.018,0.172-0.018C47.986,110.345,47.479,106.599,47,102.715z").attr("fill", "#656565");
	flagman.append("path").attr("d","M68.578,141.012c2.559,0,5.113,0,7.67,0c1.242,0,2.482,0,3.727,0c0.365,0,1.309-0.17,1.629-0.002c0.781,0.41,0.139,4.229,0.105,5.077c-0.078,2.008-0.158,4.016-0.236,6.021c-0.094,2.371-0.189,4.742-0.279,7.113c-0.092,2.381,1.762,4.389,4.143,4.479c0.213,0.01,0.424,0.002,0.629-0.02c2.1-0.223,3.768-1.953,3.854-4.121c0.203-5.172,0.406-10.344,0.609-15.516c0.082-2.098,0.842-5.323,0.357-7.365c-0.686-2.899-3.482-3.298-6.031-3.33c-4.391-0.056-8.863-0.215-13.244,0.006c-0.021,0.501,0.195,1.506-0.021,1.949c-0.158,0.32-0.479,0.266-0.688,0.595c-0.369,0.587-0.359,1.75-0.523,2.428").attr("fill", "#656565");
	flagman.append("path").attr("d","M98.76,92.935c-1.803-1.559-4.527-1.357-6.084,0.445c-0.961,1.113-1.922,2.229-2.885,3.34c-0.824,0.959-1.65,1.916-2.479,2.871c-0.289,0.334-0.578,0.672-0.871,1.008c-0.139,0.164,0.021,0.033-0.426,0.369c0,0-0.479,0.211-0.813,0.279c-1.781,0.365-3.691,0.408-5.502,0.604c-1.932,0.205-3.863,0.41-5.799,0.615c-0.721,0.076-1.439,0.152-2.162,0.229c-0.229,0.025-0.463,0.041-0.691,0.074c-0.473,0.066-0.59,0.041-0.986-0.234c-0.215-0.146-0.447-0.184-0.691-0.26c-1.051-0.336-1.725-0.307-2.805-0.189c-0.74,0.08-1.482,0.158-2.225,0.234c-2.656,0.283-5.313,0.576-7.969,0.865c-1.461,0.158-2.922,0.352-4.389,0.465c-0.732,0.061-1.414,0.311-2.15,0.188c-0.561-0.096-1.199-0.355-1.732-0.547c-0.279-0.104-0.773-0.494-1.041-0.514c-0.809-0.059-0.439,1.508-0.396,2.068c0.082,1.043,0.23,2.082,0.088,3.125c-0.166,1.213,0.119,2.537,0.244,3.75c0.393,3.836,0.777,7.674,1.164,11.512c0.418,4.146,0.793,7.844,0.916,8.994c0.064,0.604,0.459,6.545,0.627,7.066c0.23,0.713,0.439,1.512,0.895,2.115c0.273,0.371,0.666,0.473,1.023,0.672c-0.207,0.814-0.455,1.592-0.607,2.441c-0.457,2.504-1.027,4.982-1.539,7.477c-0.475,2.313-0.949,4.623-1.422,6.936c-0.502,2.443-1.004,4.885-1.506,7.328c-0.396,1.936-0.793,3.869-1.191,5.803c-0.16,0.789-0.324,1.578-0.486,2.363c-0.479,2.334,1.027,4.613,3.361,5.096c0.445,0.092,0.891,0.109,1.322,0.064c1.816-0.193,3.385-1.537,3.771-3.426l6.863-33.434c1.521-0.162,3.041-0.323,4.563-0.485c2.328-0.248,4.607-0.192,6.826-1.038c0.873-0.332,1.754-0.786,2.332-1.549c0.311-0.406,1.15-2.179,0.635-2.645l-0.25-0.229c-0.002-0.137-0.008-0.271-0.021-0.412l-2.662-25.125l17.059-1.807c1.09-0.117,2.098-0.643,2.813-1.471l7.73-8.955C100.766,97.215,100.564,94.49,98.76,92.935zM57.5,103.078l4.059-0.43L57.5,103.078z").attr("fill", "#656565");
	flagman.append("polyline").attr("points","140.656,91.761 154.418,85.734 154.418,39.152 140.656,39.152").attr("fill", "#BF3F30");
	flagman.append("path").attr("d","M154.357,85.734h-51.869V39.152h51.869V85.734z").attr("fill", "#E16B56");
	flagman.append("path").attr("d","M40.313,90.05c-0.127-0.078-0.275-0.152-0.41-0.205").attr("fill", "none");
	flagman.append("circle").attr("cx","100.361").attr("cy","28.038").attr("r","7.161").attr("fill", "#FFFFFF");
}
