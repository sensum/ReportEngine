var Test = {
    init:function(){
    var that = this;
    that.closeBuilder;
    $('ul.tabs').tabs();
    that.currentType = "#line";
    $("#reportBuilderContent").reportBuilder();
    $("#reportBuilderDownload").click(function(){
        $.reportZipAndDownload();
    });
    $(".add-content").click(function(){
        if ($("#textarea1").val()!="") {
            $.addReportContent($("#textarea1").val());
            that.popoutReportBuilder();
        }
    });
    
    $("#reportBuilderOpen").click(function(){
        $("#reportBuilder").animate({"width":"20em"},350).addClass("active");
    });
    $("#reportBuilderClose").click(function(){
        $("#reportBuilder").animate({"width":0},350).removeClass("active");
    });
    this.time = new Date().getTime();
    this.setTestData();
    this.loadLineCharts = function(){
        $('.graph-line').data("series",that.testdata).reportLineChart("normal",{highlightSeries:true,addTooltip:true,yAxisFactor:.1,interpolation:"cardinal",showAllDots:true,showGrid:true,showLegend:true,margin:{top:5,left:30,bottom:40,right:30}});
        $('.graph-line2').data("series",that.testdata10).reportLineChart("radial",{showLegend:true,gridVerticalLines:20,gridCircleLines:true,showGrid:true,xAxis:{on:false,orient:"left"},yAxis:{on:true,ticks:3,orient:"left"},margin:{top:5,left:0,bottom:0,right:0},yAxisMin:1});;
        $('.graph-line3').data("series",that.testdata11).reportLineChart("radial",{radialFill:true,gridVerticalLines:8,gridCircleLines:true,showGrid:true,xAxis:{on:false,orient:"left"},yAxis:{on:true,ticks:3,orient:"left"},margin:{top:5,left:0,bottom:0,right:0},yAxisMin:1});;
        $('.graph-line4').data("series",that.testdata12).reportLineChart("radial",{showLegend:true,xAxis:{on:false,orient:"left"},yAxis:{on:false,ticks:3,orient:"left"},margin:{top:5,left:0,bottom:0,right:0},yAxisMin:0,interpolation:"linear"});;
        $('.graph-line5').data("series",that.testdata13).reportLineChart("radial",{showLegend:true,xAxis:{on:false,orient:"left"},yAxis:{on:false,ticks:3,orient:"left"},margin:{top:5,left:0,bottom:0,right:0},yAxisMin:0,interpolation:"linear"});;
        $('.graph-line6').data("series",that.testdata14).reportLineChart("radial",{showGridBalls:true,showGridLabels:true,highlightSeries:true,addTooltip:true,showAllDots:true,showLegend:true,radialFill:true,showGrid:true,interpolation:"linear",yAxisMin:-50,xAxis:{on:false,orient:"left"},yAxis:{on:true,ticks:4,orient:"right"},margin:{top:40,left:40,bottom:40,right:40}});
        $('.graph-line7').data("series",that.testdata15).reportLineChart("radial",{showGridBalls:true,showGrid:true,showLegend:true,interpolation:"linear",xAxis:{on:false,orient:"left"},yAxis:{on:true,ticks:4,orient:"left"},margin:{top:15,left:0,bottom:15,right:0},yAxisMin:0.0001});
    };
    this.clearGraphs = function(){
        switch(that.currentType){
            case "#line":
                $('.graph-line,.graph-line2,.graph-line3,.graph-line4,.graph-line5,.graph-line6,.graph-line7').reportGraphDestroy();
                break;
            case "#bar":
                $('.graph-bar,.graph-bar3,.graph-bar4,.graph-bar5,.graph-bar6,.graph-bar7').reportGraphDestroy();
                break;
            case "#pie":
                $('.graph-pie,.graph-pie2,.graph-pie3,.graph-pie4,.graph-pie5,.graph-pie6').reportGraphDestroy();
                break;
            case "#word":
                break;
        }
    };
    $('.content').load('graphs/line-radar-radial.html',function(){
        that.loadLineCharts();
    });
    $('.toplink').click(function(){
        that.clearGraphs();
        that.currentType=$(this).attr("href");
        switch($(this).attr("href")){
            case "#line":
                $('.content').load('graphs/line-radar-radial.html',function(){
                    that.loadLineCharts();
                });
                break;
            case "#bar":
                $('.content').load('graphs/bar.html',function(){
                    $('.graph-bar').data("series",[that.testdata6[0],that.testdata6[1],that.testdata7]);
                    $('.graph-bar').reportBarChart("normal",{yAxis:{on:true,orient:"left"},margin:{top: 10, right: 10, bottom: 30, left: 40},yAxisMin:0});
                
                
                    $('.graph-bar3').data("series",[that.testdata6[0],that.testdata6[1],that.testdata7]);
                    $('.graph-bar3').reportBarChart("horizontal",{/*yAxis:{on:true,orient:"top"},*/barPadding:0,showLegend:true,margin:{top: 10, right: 10, bottom: 30, left: 40},xAxis:{on:true,orient:"left"},yAxisMin:0});
                    $('.graph-bar4').data("series",[that.testdata6[1]]);
                    $('.graph-bar4').reportBarChart("horizontal-axis-under",{margin:{top: 10, right: 40, bottom: 10, left: 10},barBacks:true,yAxisMin:0,xAxis:{on:true,orient:"left"},barPadding:.5,barLabels:true,styles:{
                        axis:{"stroke" : "none","fill" : "none"},
                        axisText:{
                            "stroke" : "#3e3e3e",
                            "fill" : "#3e3e3e",
                            "stroke-width" : "0px",
                            "font-size" : "12px",
                            "text-anchor" : "start"
                        }
                    }});
                    $('.graph-bar5').data("series",[that.testdata6[1]]);
                    $('.graph-bar5').reportBarChart("vertical",{barBacks:true,barLabels:true,yAxisMin:0});
                
                    $('.graph-bar6').data("series",that.testdata6);
                    $('.graph-bar6').reportBarChart("vertical",{barBacks:true,showLegend:true,barPadding:.1,barLabels:true,yAxisMin:0});
                    
                    $('.graph-bar7,.graph-bar8').data("series",[that.testdata6[0],that.testdata6[1],that.testdata7]);
                    $('.graph-bar7').reportBarChart("horizontal",{barPadding:.5,stack: true,stackOffset:"expand",yAxisMin:0,showLegend:true,margin:{top: 40, right: 10, bottom: 30, left: 40},xAxis:{on:true,orient:"left"}});
                    $('.graph-bar8').reportBarChart("horizontal-axis-under",{barBacks:true,barPadding:.5,stack: true,stackOffset:"zero",yAxisMin:0,showLegend:true,margin:{top: 10, right: 10, bottom: 30, left: 10},xAxis:{on:true,orient:"left"},styles:{
                        axis:{"stroke" : "none","fill" : "none"},
                        axisText:{
                            "stroke" : "#3e3e3e",
                            "fill" : "#3e3e3e",
                            "stroke-width" : "0px",
                            "font-size" : "12px",
                            "text-anchor" : "start"
                        }
                    }});
                    
                    $('.graph-bar9').data("series",that.testdata16).reportBarChart("horizontal",{barBacks:true,margin:{top: 10, right: 40, bottom: 10, left: 50},xAxis:{on:true,orient:"left"},barLabels:true});
                    $('.graph-bar10').data("series",that.testdata17).reportRangeChart('normal',{barLabels:true,barBacks:true,xAxisMax:100,xAxisMin:-100,barPadding:.6,xAxis:{on:false,orient:"left"},styles:{
                        axis:{"stroke" : "none","fill" : "none"},
                        axisText:{
                            "stroke" : "#3e3e3e",
                            "fill" : "#3e3e3e",
                            "stroke-width" : "0px",
                            "font-size" : "12px",
                            "text-anchor" : "start"
                        }
                    }});
                });
                break;
            case "#pie":
                $('.content').load('graphs/pie-donut-gauge.html',function(){
                    $('.graph-pie').data("series",that.testdata3);
                    $('.graph-pie').reportPieChart("single");
                
                    $('.graph-pie2').data("series",that.testdata4);
                    $('.graph-pie4').data("series",that.testdata5);
                    $('.graph-pie2,.graph-pie4').reportPieChart("double",{leftColor:randomColor({hue: 'red',seed: 'green'}),rightColor:randomColor({hue: 'green',seed: 'green'})});
                
                    $('.graph-pie3').data("series",that.testdata2);
                    $('.graph-pie3').reportPieChart("normal",{showLegend:true,margin:{top:10,left:10,bottom:10,right:10},innerRadius:0.75});
                
                    $('.graph-pie5').data("series",that.testdata2);
                    $('.graph-pie5').reportPieChart("normal",{showLegend:true,margin:{top:10,left:10,bottom:10,right:10},innerRadius:0});
                
                
                    $('.graph-pie6').data("series",that.testdata2);
                    $('.graph-pie6').reportPieChart("normal",{innerRadius:0.90});
                });
                break;
            case "#word":
                $('.content').load('graphs/word-cloud-heatmap.html',function(){
                    $('.graph-word').data('series',that.testWordCloud);
                    $('.graph-word').reportWordCloud();
                    $('.graph-heatmap').data('series',that.testHeatMap);
                    $('.graph-heatmap').reportHeatMap();
                });
                break;
        }
    });
   
   

   
    
    
    $('.graph-line,.graph-line2,.graph-line3,.graph-line4,.graph-line5,.graph-pie,.graph-pie2,.graph-pie3,.graph-pie4,.graph-pie5,.graph-pie6,.graph-bar,.graph-bar3').on('report-button',function(){
        that.popoutReportBuilder();
    });
    $(".animate-graphs").click(function(){
        
        var animation = function(){
        that.setTestData();
        $('.graph-line').data("series",that.testdata);
        $('.graph-line2').data("series",that.testdata10);
        $('.graph-line3').data("series",that.testdata11);
        $('.graph-line4').data("series",that.testdata12);
        $('.graph-line5').data("series",that.testdata13);
        $('.graph-line6').data("series",that.testdata14);
        $('.graph-line7').data("series",that.testdata15);
        $('.graph-pie').data("series",that.testdata3);
        $('.graph-pie2').data("series",that.testdata4);
        $('.graph-pie4').data("series",that.testdata5);
        $('.graph-pie3').data("series",that.testdata2);
        $('.graph-pie5').data("series",that.testdata2);
        $('.graph-pie6').data("series",that.testdata2);
        $('.graph-bar').data("series",[that.testdata6[0],that.testdata6[1],that.testdata7]);
        $('.graph-bar3').data("series",[that.testdata6[0],that.testdata6[1],that.testdata7]);
        $('.graph-bar4').data("series",[that.testdata6[1]]);
        $('.graph-bar5').data("series",[that.testdata6[1]]);
        $('.graph-bar6').data("series",that.testdata6);
        $('.graph-bar9').data("series",that.testdata16);
        $('.graph-bar7,.graph-bar8').data("series",[that.testdata6[0],that.testdata6[1],that.testdata7]);
        $('.graph-word').data('series',that.testWordCloud);
        $('.graph-word,.graph-bar7,.graph-bar8,.graph-bar9,.graph-bar6,.graph-line,.graph-line2,.graph-line3,.graph-line4,.graph-line5,.graph-line6,.graph-line7,.graph-pie,.graph-pie2,.graph-pie3,.graph-pie4,.graph-pie5,.graph-pie6,.graph-bar,.graph-bar3,.graph-bar4,.graph-bar5').reportGraphRender();
        };
        if ($(this).hasClass("fired")) {
            $(".animate-graphs").html("ANIMATE");
            clearInterval(that.testInterval);
            $(".animate-graphs").removeClass("fired");
        }else{
            $(".animate-graphs").html("STOP");
            that.testInterval = setInterval(animation,1500);
            animation();
            $(".animate-graphs").addClass("fired");
        }
        
    });
    },
    setTestData:function(){
    var that = this;
    this.testHeatMap = [
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()},
        {x:1000*Math.random(),y:500*Math.random(),z:200*Math.random()}
    ];
    this.testWordCloud = [
        {"key": "Cat", "value": 26},
        {"key": "fish", "value": (10+(90*Math.random()))},
        {"key": "things", "value": (10+(90*Math.random()))},
        {"key": "look", "value": (10+(90*Math.random()))},
        {"key": "two", "value": (10+(90*Math.random()))},
        {"key": "like", "value": (10+(90*Math.random()))},
        {"key": "hat", "value": (10+(90*Math.random()))},
        {"key": "Oh", "value": (10+(90*Math.random()))},
        {"key": "mother", "value": (10+(90*Math.random()))},
        {"key": "One", "value": (10+(90*Math.random()))},
        {"key": "Now", "value": (10+(90*Math.random()))},
        {"key": "Thing", "value": (10+(90*Math.random()))},
        {"key": "house", "value": (10+(90*Math.random()))},
        {"key": "fun", "value": 9},
        {"key": "know", "value": 9},
        {"key": "good", "value": 9},
        {"key": "saw", "value": 9},
        {"key": "bump", "value": 8},
        {"key": "hold", "value": 7},
        {"key": "fear", "value": 6},
        {"key": "game", "value": 6},
        {"key": "play", "value": 6},
        {"key": "Sally", "value": 6},
        {"key": "wet", "value": 6},
        {"key": "little", "value": 6},
        {"key": "box", "value": 6},
        {"key": "came", "value": 6},
        {"key": "away", "value": 6},
        {"key": "sit", "value": 5},
        {"key": "ran", "value": 5},
        {"key": "big", "value": 5},
        {"key": "something", "value": 5},
        {"key": "put", "value": 5},
        {"key": "fast", "value": 5},
        {"key": "go", "value": 5},
        {"key": "ball", "value": 5},
        {"key": "pot", "value": 5},
        {"key": "show", "value": 4},
        {"key": "cup", "value": 4},
        {"key": "get", "value": 4},
        {"key": "cake", "value": 4},
        {"key": "pick", "value": 4},
        {"key": "went", "value": 4},
        {"key": "toy", "value": 4},
        {"key": "ship", "value": 4},
        {"key": "net", "value": 4},
        {"key": "tell", "value": 4},
        {"key": "fan", "value": 4},
        {"key": "wish", "value": 4},
        {"key": "day", "value": 4},
        {"key": "new", "value": 4},
        {"key": "tricks", "value": 4},
        {"key": "way", "value": 4},
        {"key": "sat", "value": 4},
        {"key": "books", "value": 3},
        {"key": "hook", "value": 3},
        {"key": "mess", "value": 3},
        {"key": "kites", "value": 3},
        {"key": "rake", "value": 3},
        {"key": "red", "value": 3},
        {"key": "shame", "value": 3},
        {"key": "bit", "value": 3},
        {"key": "asked", "value": (10+(90*Math.random()))}, {"key": "shine", "value": (10+(90*Math.random()))}, {"key": "mind", "value": (10+(90*Math.random()))}, {"key": "bite", "value": (10+(90*Math.random()))}, {"key": "step", "value": (10+(90*Math.random()))}, {"key": "mat", "value": (10+(90*Math.random()))}, {"key": "gave", "value": (10+(90*Math.random()))}, {"key": "pat", "value": (10+(90*Math.random()))}, {"key": "bent", "value": (10+(90*Math.random()))}, {"key": "funny", "value": (10+(90*Math.random()))}, {"key": "give", "value": (10+(90*Math.random()))}, {"key": "games", "value": (10+(90*Math.random()))}, {"key": "high", "value": (10+(90*Math.random()))}, {"key": "hit", "value": (10+(90*Math.random()))}, {"key": "run", "value": (10+(90*Math.random()))}, {"key": "stand", "value": (10+(90*Math.random()))}, {"key": "fox", "value": (10+(90*Math.random()))}, {"key": "man", "value": (10+(90*Math.random()))}, {"key": "string", "value": (10+(90*Math.random()))}, {"key": "kit", "value": (10+(90*Math.random()))}, {"key": "Mothers", "value": (10+(90*Math.random()))}, {"key": "tail", "value": (10+(90*Math.random()))}, {"key": "dots", "value": (10+(90*Math.random()))}, {"key": "pink", "value": (10+(90*Math.random()))}, {"key": "white", "value": (10+(90*Math.random()))}, {"key": "kite", "value": (10+(90*Math.random()))}, {"key": "bed", "value": (10+(90*Math.random()))}, {"key": "bumps", "value": (10+(90*Math.random()))}, {"key": "jumps", "value": (10+(90*Math.random()))}, {"key": "kicks", "value": (10+(90*Math.random()))}, {"key": "hops", "value": (10+(90*Math.random()))}, {"key": "thumps", "value": (10+(90*Math.random()))}, {"key": "kinds", "value": (10+(90*Math.random()))}, {"key": "book", "value": (10+(90*Math.random()))}, {"key": "home", "value": (10+(90*Math.random()))}, {"key": "wood", "value": (10+(90*Math.random()))}, {"key": "hand", "value": (10+(90*Math.random()))}, {"key": "near", "value": (10+(90*Math.random()))}, {"key": "Think", "value": (10+(90*Math.random()))}, {"key": "rid", "value": (10+(90*Math.random()))}, {"key": "made", "value": (10+(90*Math.random()))}, {"key": "jump", "value": (10+(90*Math.random()))}, {"key": "yet", "value": (10+(90*Math.random()))}, {"key": "PLOP", "value": (10+(90*Math.random()))}, {"key": "last", "value": (10+(90*Math.random()))}, {"key": "stop", "value": (10+(90*Math.random()))}, {"key": "pack", "value": (10+(90*Math.random()))}, {"key": "nothing", "value": (10+(90*Math.random()))}, {"key": "got", "value": (10+(90*Math.random()))}, {"key": "sad", "value": (10+(90*Math.random()))}, {"key": "kind", "value": (10+(90*Math.random()))}, {"key": "fishHe", "value": (10+(90*Math.random()))}, {"key": "sunny", "value": (10+(90*Math.random()))}, {"key": "Yes", "value": (10+(90*Math.random()))}, {"key": "bow", "value": (10+(90*Math.random()))}, {"key": "tall", "value": (10+(90*Math.random()))}, {"key": "always", "value": (10+(90*Math.random()))}, {"key": "playthings", "value": (10+(90*Math.random()))}, {"key": "picked", "value": (10+(90*Math.random()))}, {"key": "strings", "value": (10+(90*Math.random()))}, {"key": "Well", "value": (10+(90*Math.random()))}, {"key": "lit", "value": (10+(90*Math.random()))}];
    this.testdata = [
        {name:"This is the first data stream",color:randomColor({hue: 'red',seed: 'green'}),data:[
            {name:that.time+10000,value:80*Math.random()},
            {name:that.time+20000,value:90*Math.random()},
            {name:that.time+30000,value:85*Math.random()},
            {name:that.time+40000,value:70*Math.random()},
            {name:that.time+50000,value:120*Math.random()},
            {name:that.time+60000,value:70*Math.random()},
            {name:that.time+70000,value:120*Math.random()},
            {name:that.time+80000,value:90*Math.random()},
            {name:that.time+90000,value:85*Math.random()},
            {name:that.time+100000,value:70*Math.random()},
            {name:that.time+110000,value:120*Math.random()},
            {name:that.time+120000,value:90*Math.random()},
            {name:that.time+130000,value:85*Math.random()},
        ]},
        {name:"This is the second data stream",color:randomColor({hue: 'green',seed: 'green'}),data:[
            {name:that.time+10000,value:80*Math.random()},
            {name:that.time+20000,value:70*Math.random()},
            {name:that.time+30000,value:120*Math.random()},
            {name:that.time+40000,value:90*Math.random()},
            {name:that.time+50000,value:85*Math.random()},
            {name:that.time+60000,value:70*Math.random()},
            {name:that.time+70000,value:120*Math.random()},
            {name:that.time+80000,value:90*Math.random()},
            {name:that.time+90000,value:85*Math.random()},
            {name:that.time+100000,value:70*Math.random()},
            {name:that.time+110000,value:120*Math.random()},
            {name:that.time+120000,value:90*Math.random()},
            {name:that.time+130000,value:85*Math.random()},
        ]},
        {name:"This is the third data stream",color:randomColor({hue: 'blue',seed: 'green'}),data:[
            {name:that.time+10000,value:80*Math.random()},
            {name:that.time+20000,value:70*Math.random()},
            {name:that.time+30000,value:120*Math.random()},
            {name:that.time+40000,value:90*Math.random()},
            {name:that.time+50000,value:85*Math.random()},
            {name:that.time+60000,value:70*Math.random()},
            {name:that.time+70000,value:120*Math.random()},
            {name:that.time+80000,value:90*Math.random()},
            {name:that.time+90000,value:85*Math.random()},
            {name:that.time+100000,value:70*Math.random()},
            {name:that.time+110000,value:120*Math.random()},
            {name:that.time+120000,value:90*Math.random()},
            {name:that.time+130000,value:85*Math.random()},
        ]},
        {name:"This is the fourth data stream",color:randomColor({hue: 'orange',seed: 'green'}),data:[
            {name:that.time+10000,value:80*Math.random()},
            {name:that.time+20000,value:70*Math.random()},
            {name:that.time+30000,value:120*Math.random()},
            {name:that.time+40000,value:90*Math.random()},
            {name:that.time+50000,value:85*Math.random()},
            {name:that.time+60000,value:70*Math.random()},
            {name:that.time+70000,value:120*Math.random()},
            {name:that.time+80000,value:90*Math.random()},
            {name:that.time+90000,value:85*Math.random()},
            {name:that.time+100000,value:70*Math.random()},
            {name:that.time+110000,value:120*Math.random()},
            {name:that.time+120000,value:90*Math.random()},
            {name:that.time+130000,value:85*Math.random()},
        ]}
    ];

    
    this.testdata2 = [
        {name:"one",value:80*Math.random(),color:randomColor({hue: 'red',seed: 'green'})},
        {name:"two",value:70*Math.random(),color:randomColor({hue: 'blue',seed: 'green'})},
        {name:"three",value:85*Math.random(),color:randomColor({hue: 'green',seed: 'green'})},
        {name:"four",value:50*Math.random(),color:randomColor({hue: 'orange',seed: 'green'})},
        {name:"five",value:220*Math.random(),color:randomColor({hue: 'yellow',seed: 'green'})}
    ];
    
    this.testdata6 = this.getTestDataRadar();
    this.testdata7 = {name:"This is the data stream3",color:randomColor({hue: 'yellow',seed: 'green'}),data:[
        {name:"one",value:80*Math.random()+20},
        {name:"two",value:90*Math.random()+20},
        {name:"three",value:85*Math.random()+20},
        {name:"four",value:70*Math.random()+20},
        {name:"five",value:120*Math.random()+20},
        {name:"six",value:120*Math.random()+20},
        {name:"seven",value:100*Math.random()+20},
        ]}

    this.testdata3 = {name:that.time+10000,value:100*Math.random(),color:randomColor({hue: 'green',seed: 'green'})};

    this.testdata4 = {name:that.time+10000,value:200*Math.random()-100,color:randomColor({hue: 'red',seed: 'green'})};
    this.testdata5 = {name:that.time+10000,value:100*Math.random(),color:randomColor({hue: 'red',seed: 'green'})};
    this.testdata10 = this.getTestDataRadial(randomColor({hue: 'red',seed: 'green'}));
    
    this.testdata11 = this.getTestDataRadial(randomColor({hue: 'green',seed: 'green'}));
    this.testdata11.unshift(this.testdata10[0]);
    
    this.testdata12 = this.getTestDataRadial(randomColor({hue: 'blue',seed: 'green'}));
    
    this.testdata13 = this.getTestDataRadial(randomColor({hue: 'orange',seed: 'green'}));
    this.testdata13.unshift(this.testdata12[0]);
    
    this.testdata14 = this.getTestDataRadar();
    this.testdata15 = this.getTestDataRadar();
    this.testdata16 = this.getTestDataRadarNegative();
    this.testdata17 = [
        {name:"one:badone",value:-50},
        {name:"two:badone",value:50},
        {name:"three:badone",value:-75},
        {name:"four:badone",value:75}
    ];
    },
    refreshReport:function(){
        
        
    },
    getTestDataRadar:function(){
        var that=this;
        return [
            {name:"This is the data stream",color:randomColor({hue: 'red',seed: 'green'}),data:[
            {name:"one",value:100*Math.random()+20},
            {name:"two",value:90*Math.random()+20},
            {name:"three",value:55*Math.random()},
            {name:"four",value:70*Math.random()+20},
            {name:"five",value:100*Math.random()+20},
            {name:"six",value:-90*Math.random()+20},
            {name:"seven",value:300*Math.random()+20},
            ]},
            {name:"This is the data stream2",color:randomColor({hue: 'green',seed: 'green'}),data:[
            {name:"one",value:80*Math.random()+20},
            {name:"two",value:90*Math.random()+20},
            {name:"three",value:85*Math.random()+20},
            {name:"four",value:70*Math.random()+20},
            {name:"five",value:90*Math.random()+20},
            {name:"six",value:90*Math.random()+20},
            {name:"seven",value:300*Math.random()+20},
            ]}
        ];
    },
    getTestDataRadarNegative:function(){
        var that=this;
        return [
            {name:"This is the data stream",color:randomColor({hue: 'red',seed: 'green'}),data:[
            {name:"one",value:100*Math.random()-80},
            {name:"two",value:90*Math.random()-80},
            {name:"three",value:55*Math.random()+20},
            {name:"four",value:70*Math.random()-80},
            {name:"five",value:100*Math.random()+20},
            {name:"six",value:90*Math.random()-80},
            {name:"seven",value:300*Math.random()+20},
            ]},
            {name:"This is the data stream2",color:randomColor({hue: 'green',seed: 'green'}),data:[
            {name:"one",value:80*Math.random()+20},
            {name:"two",value:90*Math.random()-80},
            {name:"three",value:85*Math.random()+20},
            {name:"four",value:70*Math.random()-80},
            {name:"five",value:90*Math.random()+20},
            {name:"six",value:90*Math.random()-80},
            {name:"seven",value:300*Math.random()+20},
            ]}
        ];
    },
    getTestDataRadial:function(color){
        var that=this;
        return [
            {name:"This is the radial data stream",color:color,data:[
            {name:that.time+10000,value:80*Math.random()+200},
            {name:that.time+20000,value:90*Math.random()+200},
            {name:that.time+30000,value:85*Math.random()+200},
            {name:that.time+40000,value:70*Math.random()+200},
            {name:that.time+50000,value:120*Math.random()+200},
            {name:that.time+60000,value:80*Math.random()+200},
            {name:that.time+70000,value:70*Math.random()+200},
            {name:that.time+80000,value:120*Math.random()+200},
            {name:that.time+90000,value:90*Math.random()+200},
            {name:that.time+100000,value:85*Math.random()+200},
            {name:that.time+110000,value:80*Math.random()+200},
            {name:that.time+120000,value:90*Math.random()+200},
            {name:that.time+130000,value:85*Math.random()+200},
            {name:that.time+140000,value:70*Math.random()+200},
            {name:that.time+150000,value:120*Math.random()+200},
            {name:that.time+160000,value:80*Math.random()+200},
            {name:that.time+170000,value:70*Math.random()+200},
            {name:that.time+180000,value:120*Math.random()+200},
            {name:that.time+190000,value:90*Math.random()+200},
            {name:that.time+200000,value:85*Math.random()+200},
            {name:that.time+210000,value:80*Math.random()+200},
            {name:that.time+220000,value:90*Math.random()+200},
            {name:that.time+230000,value:85*Math.random()+200},
            {name:that.time+240000,value:70*Math.random()+200},
            {name:that.time+250000,value:120*Math.random()+200},
            {name:that.time+260000,value:80*Math.random()+200},
            {name:that.time+270000,value:70*Math.random()+200},
            {name:that.time+280000,value:120*Math.random()+200},
            {name:that.time+290000,value:90*Math.random()+200},
            {name:that.time+300000,value:85*Math.random()+200},
            {name:that.time+310000,value:80*Math.random()+200},
            {name:that.time+320000,value:90*Math.random()+200},
            {name:that.time+330000,value:85*Math.random()+200},
            {name:that.time+340000,value:70*Math.random()+200},
            {name:that.time+350000,value:120*Math.random()+200},
            {name:that.time+360000,value:80*Math.random()+200},
            {name:that.time+370000,value:70*Math.random()+200},
            {name:that.time+380000,value:120*Math.random()+200},
            {name:that.time+390000,value:90*Math.random()+200},
            {name:that.time+400000,value:85*Math.random()+200},
            {name:that.time+410000,value:80*Math.random()+200},
            {name:that.time+420000,value:90*Math.random()+200},
            {name:that.time+430000,value:85*Math.random()+200},
            {name:that.time+440000,value:70*Math.random()+200},
            {name:that.time+450000,value:120*Math.random()+200},
            {name:that.time+460000,value:80*Math.random()+200},
            {name:that.time+470000,value:70*Math.random()+200},
            {name:that.time+480000,value:120*Math.random()+200},
            {name:that.time+490000,value:90*Math.random()+200},
            {name:that.time+500000,value:85*Math.random()+200},
            {name:that.time+510000,value:80*Math.random()+200},
            {name:that.time+520000,value:90*Math.random()+200},
            {name:that.time+530000,value:85*Math.random()+200},
            {name:that.time+540000,value:70*Math.random()+200},
            {name:that.time+550000,value:120*Math.random()+200},
            {name:that.time+560000,value:80*Math.random()+200},
            {name:that.time+570000,value:70*Math.random()+200},
            {name:that.time+580000,value:120*Math.random()+200},
            {name:that.time+590000,value:90*Math.random()+200},
            {name:that.time+600000,value:85*Math.random()+200},
            ]}
        ];
    },
    popoutReportBuilder:function(){
        var that = this;
        clearTimeout(that.closeBuilder);
        if (!($("#reportBuilder").hasClass("active"))) {
            $("#reportBuilderOpen").trigger("click");
            that.closeBuilder = setTimeout(function(){
                $("#reportBuilderClose").trigger("click");
            },3000)
            $("#reportBuilder").one("mouseenter",function(){
                clearTimeout(that.closeBuilder);
            })
            
        }
    }
}