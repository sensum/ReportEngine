
//cross browser file saving (minified):
var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/constructor/i.test(e.HTMLElement),f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},d="application/octet-stream",s=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,s)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(i){u(i)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,s){if(!s){t=p(t)}var v=this,w=t.type,m=w===d,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&a)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;i(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define([],function(){return saveAs})};

(function ( $ ) {
    $.reportCanvas = document.createElement('canvas');
    $.reportImage = new Image();
    $.reportFileReader = new window.FileReader();
    $.reportDefaultStyles = {
        transactionLines: {
            margin: [0, 30, 0, 15]
        },
        transactionHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
        },
        maxWidth:{
            width: '*'
        },
        minWidth:{
            width: 'auto'
        },
        totalSpacer:{
            margin: [ 0, 30, 0, 30 ] 
        },
        totalAmountSpacer:{
            width:400,
            margin: [ 0, 2, 0, 2 ] 
        },
        totalAmount:{
            fontSize:12
        },
        documentTitle:{
            fontSize: 20,
            margin: [ 0, 0, 0, 30 ],
        },
        pageNumber:{
            margin: [ 0, 20, 30, 0 ],
            fontSize: 8,
            italics: true
        },
        alignRight:{
            alignment: 'right',
        }
    };
    
    $.reportTemplate = function(styles){
        return {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [ 40, 40, 40, 60 ],
            footer: function(currentPage, pageCount) {
                return {
                    text: 'Page '+currentPage.toString() + ' of ' + pageCount,
                    style:['pageNumber','alignRight']
                };
            },
            header: function(currentPage, pageCount) {
                return;
            },
            content: [
                    
            ],
            styles: {
                transactionLines: {
                    margin: [0, 30, 0, 15]
                },
                transactionHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                maxWidth:{
                    width: '*'
                },
                minWidth:{
                    width: 'auto'
                },
                totalSpacer:{
                    margin: [ 0, 30, 0, 30 ] 
                },
                totalAmountSpacer:{
                    width:400,
                    margin: [ 0, 2, 0, 2 ] 
                },
                totalAmount:{
                    fontSize:12
                },
                documentTitle:{
                    fontSize: 20,
                    margin: [ 0, 0, 0, 30 ],
                },
                pageNumber:{
                    margin: [ 0, 20, 30, 0 ],
                    fontSize: 8,
                    italics: true
                },
                alignRight:{
                    alignment: 'right',
                }
            },
            styles:styles,
            defaultStyle: {
                fontSize: 10
            }
        }
    }
    
    $.fn.reportGraphResized = function () {
        var element = this;
        var lastWidth = element.width();
        var lastHeight = element.height();
        if(element.data("graph").settings.autoResize){
            element.data("sizeChangedInterval",setInterval(function () {
                if (lastWidth === element.width()&&lastHeight === element.height())
                    return;
                element.reportGraphRender();
                lastWidth = element.width();
                lastHeight = element.height();
            }, 30));
        }
        return this;
    };
    $.fn.reportGraphDestroy=function(){
        return this.each(function() {
            clearInterval($(this).data("sizeChangedInterval"));
            $(this).data("graph",false);
            $(this).html("");
        });
    }
    var customTimeFormat = d3.time.format.multi([
      ["%Lms", function(d) { return d.getMilliseconds(); }],
      ["%Ss", function(d) { return d.getSeconds(); }],
      ["%H:%M", function(d) { return d.getMinutes(); }],
      ["%I %p", function(d) { return d.getHours(); }],
      ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
      ["%b %d", function(d) { return d.getDate() != 1; }],
      ["%B", function(d) { return d.getMonth(); }],
      ["%Y", function() { return true; }]
    ]);
    var domain = function(type,data,topLevel,graph){
        var val = (type=="min")?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;
        var field = graph.settings.yField;
        
        var valFunc = graph.settings.stack?function(d) { return ((type=="min")?d.y0:d.y+d.y0); }:function(d) { return d[field]; };
        if(topLevel){
            val = (type=="min")?d3.min(s.data, valFunc):d3.max(s.data, valFunc);
        }else{
            data.forEach(function(s){
                var newVal = (type=="min")?d3.min(s.data, valFunc):d3.max(s.data, valFunc);
                if ((type=="min" && newVal<val) || (type=="max" && newVal>val)) {
                    val = newVal;
                }
            });
        }
        if (val==Number.POSITIVE_INFINITY||val==Number.NEGATIVE_INFINITY) {
            val=0;
        }
        return val;
    };
    var prepareRadialData = function(graph,data){
        if(graph.settings.line=="radial") {
            data.forEach(function(d,i){
                var nextTime = d.data[d.data.length-1].name+((d.data[d.data.length-1].name-d.data[0].name)/d.data.length);
                d.data.push({name:nextTime,value:d.data[0].value}); 
            });
        }
    };
    $.fn.reportGraphClone = function(ele,opts){
        return this.each(function(){
            $(this).data("series",ele.data("series"));
            $(this).find("svg").remove();
            var settings = $.extend(deepCopy(ele.data("graph").settings),opts);
            switch (ele.data("graph").settings.type) {
                case "line":
                    $(this).reportLineChart(ele.data("graph").settings.line,settings);
                    break;
                case "bar":
                    $(this).reportBarChart(ele.data("graph").settings.bar,settings);
                    break;
                case "pie":
                    $(this).reportPieChart(ele.data("graph").settings.pie,settings);
                    break;
            }
        });
    }
    $.fn.reportEditor = function(){
        var that = this;
        $("body,html").css("overflow","hidden");
        var modal = $("#modalGrid");
        $("#modalContainer").removeClass("hide");
        modal.removeClass("hide").css("display","none").fadeIn(500);
        var cloneGraph = modal.find('.report-editor-graph');
        cloneGraph.reportGraphClone(that,{speed:0});
        modal.find('.report-add-graph').click(function(){
            cloneGraph.reportRenderFiles(function(files){
                $.mainReport.content.push({alignment: 'left',image:files.jpg,files:files,width:files.dimensions.width*.6666666666666666666666,height:files.dimensions.height*.6666666666666666666666});
                $.refreshReport();
                $.closeReportEditor();
                that.trigger("report-button");
            });
        });
        $(".modalContent").css("height",$(window).height());
        $(".max-height").css("height",$(window).height());
        $("#lean-overlay").removeClass("hide").css("display","none").fadeTo(250,0.5);
        modal.find(".col.s0").click(function(){
              $.closeReportEditor();
        });
    }
    $.hexToRgb = function(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
    
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    $.closeReportEditor = function(){
        $("#modalGrid").hide(350,function(){
            $(this).addClass("hide");
             $("#modalContainer").addClass("hide");
        });
        $("#lean-overlay").fadeOut(250,function(){
            $("body,html").css("overflow","auto");
            $(this).addClass("hide");
        });
    }
    
    $.mainReport = new $.reportTemplate({});
    $.reportBuilderContainer = false;
    $.fn.reportBuilder = function(styles){
        $.reportBuilderContainer = this;
        $.mainReport = new $.reportTemplate(styles||$.reportDefaultStyles);
        if ($(".modalContent").length) {
            $(".modalContent").html('<br><br>\
                                    <div class="report-editor-graph"></div><br><br>\
                                    <div class="report-add-graph right btn waves-effect waves-light">Add to report</div>\
                                ');
            $(".left-col").addClass("s0 m1 l2");
            $(".middle-col").addClass("s12 m10 l8").addClass("white");
            $(".right-col").addClass("s0 m1 l2");
        }else{
        $("body").append('\
            <div id="modalContainer" class="hide">\
                <div id="lean-overlay" class="hide" style="display: block; opacity: 0;"></div>\
                <div id="modalGrid" class="hide overflow-y">\
                    <div class="reportrow nomargin">\
                          <div class="left-col col s0 m1 l2 nopadding">\
                          <div class="max-height"></div>\
                          </div>\
                          <div class="middle-col col s12 m10 l8 nopadding" style="background-color:white;">\
                                <div class="modalContent"><br><br>\
                                    <div class="report-editor-graph"></div><br><br>\
                                    <div class="report-add-graph right btn waves-effect waves-light">Add to report</div>\
                                </div>\
                          </div>\
                          <div class="right-col col s0 m1 l2 nopadding">\
                          <div class="max-height"></div>\
                          </div>\
                    </div>\
                </div>\
            </div>'
        );
        }
        $("#modalGrid").find('.report-editor-graph').resizable({ containment: "parent",minHeight: 200,minWidth: 200 }).draggable({ containment: "parent" });
    }
    $.addReportContent = function(text){
        $.mainReport.content.push({text:text});
        $.refreshReport();                  
    }
    $.reportIdPrefix = function(){
        return String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
    }
    var getContentType = function(content){
        if(typeof content=="string"||content.hasOwnProperty("text")) return "text";
        if(content.hasOwnProperty("image")) return "image";
    }
    $.refreshReport = function(){
        if ($.reportBuilderContainer) {
            var that = $.reportBuilderContainer;
            that.html("");
            $.mainReport.content.forEach(function(r,i){
                switch (getContentType(r)) {
                    case "image":
                        var ele = $('<div class="report-image z-depth-1" style="background: white url('+r.files.svg+'); background-position:left center; background-size: cover;"><div class="report-figure-number"></div></div>');
                        that.append(ele);
                        ele.click(function(){
                            window.open(r.files.svg, '_blank');    
                        });
                        break;
                    case "text":
                        var ele = $('<div class="report-content z-depth-1" style="background: white;">'+r.text+'</div>');
                        that.append(ele);
                        break;
                
                }
            });
            var figCount = 1;
            that.children().each(function(i){
                if ($(this).hasClass("report-image")) {
                    $(this).find(".report-figure-number").html('Fig. '+figCount);
                    figCount++;
                }
            });
            that.sortable({
                update:function(evt,ui){
                    var figCount = 1;
                    that.children().each(function(i){
                        if ($(this).hasClass("report-image")) {
                            $(this).find(".report-figure-number").html('Fig. '+figCount);
                            figCount++;
                        }
                    });
                    $.mainReport.countent.splice(ui.item.index(), 0, $.mainReport.content.splice(ui.item.data("oldIndex"), 1)[0]);
                },
                start:function(evt,ui){
                    ui.item.data("oldIndex",ui.item.index())
                    ui.item.removeClass("z-depth-1").addClass("z-depth-2");
                },
                stop:function( event, ui ){
                    ui.item.removeClass("z-depth-2").addClass("z-depth-1");
                }
            });
        }
    }
    $.fn.reportGraphEvents = function(){
        return this.each(function(){
            $(this).mouseenter(function(){
                if ($.reportBuilderContainer) {
                    var that = $(this);
                    $(".report-button").remove();
                    var reportButton = $(this).data("graph").svg.append("g")
                        .attr({"class":"report-button pointer"})
                        .attr("transform", "translate(" +  (isCenterPieOrRadial($(this).data("graph"))?($(this).data("graph").width-20):$(this).data("graph").width+40) + "," +  $(this).data("graph").settings.margin.top + ")")
                    reportButton.append("rect").attr({width:20,height:20,x:0,y:0}).style("cursor","pointer").attr("fill","rgba(0,0,0,0)");      
                    reportButton.append("path").attr("d","M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z").attr("fill","#6f6f6f");  
                    reportButton.on("click", function() {
                        that.reportEditor();
                    }); 
                }
            });
            $(this).mouseleave(function(){
                $(".report-button").remove();
            });
        });
    }
    $.reportBlobAsBase64 = function(blob,callback){
        $.reportFileReader.readAsDataURL(blob); 
        $.reportFileReader.onloadend = function() {
            callback($.reportFileReader.result);
        }
    }
    $.fn.reportDataToCSVString = function(type){
        var data = this.data("series");
        var graph = this.data("graph");
        var string = ""
        if (graph) {
            switch (graph.settings.type) {
                case "line":
                    if (data&&data.length) {
                        data[0].data.forEach(function(line,lineI){
                            string+=line[graph.settings.xField]+","+line[graph.settings.yField]+",";
                            for(var i=1;i<data.length;i++){
                                string+=data[i].data[lineI][graph.settings.xField]+","+data[i].data[lineI][graph.settings.yField]+",";
                            }
                            string = string.substr(0, string.length-1);
                            string+="\r\n";
                        });
                    }
                    break;
                case "pie":
                    var pieData = function(line){
                        string+=line[graph.settings.angleField]+","+line[graph.settings.radiusField]+",";
                        
                    }
                    if ($.isArray(data)) {
                        data.forEach(function(line){
                            pieData(line);
                            string = string.substr(0, string.length-1);
                            string+="\r\n";
                        });
                    }else{
                       pieData(data); 
                        string = string.substr(0, string.length-1);
                        string+="\r\n";
                    }
                    break;
                case "bar":
                    data.forEach(function(line){
                        string+=line[graph.settings.xField]+","+line[graph.settings.yField]+",";
                        string+="\r\n";
                    });
                    break;
            }
        }
        return string;
    };
    $.reportPowerPoint = function(callback){
        var pptx = new PptxGenJS(callback);
        $.mainReport.content.forEach(function(cont){
            switch (getContentType(cont)) {
                case "image":
                    var slide = pptx.addNewSlide();
                    slide.addImage("dummy.png",0.5,0.5,8,8*(cont.files.dimensions.height/cont.files.dimensions.width),cont.files.png.substring(cont.files.png.indexOf(',')+1))
                    break;
            }
        });
        pptx.save();
    };
    $.reportZipAndDownload = function(name){
        // use a BlobWriter to store the zip into a Blob object
        var zip = new JSZip();
        //pdfMake.createPdf(deepCopy($.mainReport)).getDataUrl(function(pdf){
        //    var date = new Date();
        //    zip.file("report_"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1)+"_"+(date.getHours()+1)+"-"+(date.getMinutes()+1)+"-"+(date.getSeconds()+1)+".pdf", pdf.substring(pdf.indexOf(',')+1), {base64: true});
        //    $.reportPowerPoint(function(PPTXblob){
        //        $.reportBlobAsBase64(PPTXblob,function(PPTXurl){
        //            zip.file("report_"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1)+"_"+(date.getHours()+1)+"-"+(date.getMinutes()+1)+"-"+(date.getSeconds()+1)+".pptx", PPTXurl.substring(PPTXurl.indexOf(',')+1), {base64: true});
                    var figNumber=1;
                    //var SVGfolder = zip.folder("SVG");
                    //var JPGfolder = zip.folder("JPG");
                    //var CSVfolder = zip.folder("CSV");
                    //var PNGfolder = zip.folder("PNG");
                    $.mainReport.content.forEach(function(cont){
                        switch (getContentType(cont)) {
                            case "image":
                                if (cont.files) {
                                    zip.file(name+".svg", cont.files.svg.substring(cont.files.svg.indexOf(',')+1), {base64: true});
                                    zip.file(name+".jpg", cont.files.jpg.substring(cont.files.jpg.indexOf(',')+1), {base64: true});
                                    //zip.file(name+".csv", cont.files.csv.substring(cont.files.csv.indexOf(',')+1), {base64: true});
                                    zip.file(name+".png", cont.files.png.substring(cont.files.png.indexOf(',')+1), {base64: true});
                                    figNumber++;
                                }
                                break;
                        }
                    });
                    zip.generateAsync({type:"blob"}).then(function(content) {
                        saveAs(content, name+".zip");
                        //callback(URL.createObjectURL(content)); 
                    });
        //        });
        //    });
        //});
    };
    $.fn.reportRenderFiles = function(callback){       
        var SVGdoctype = '<?xml version="1.0" standalone="no"?>'+'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
        var SVGsource = (new XMLSerializer()).serializeToString(d3.select(this.get(0)).select('svg').node());
        var SVGblob = new Blob([SVGdoctype + SVGsource], { type: 'image/svg+xml;charset=utf-8' });
        var CSVblob = new Blob([this.reportDataToCSVString()], { type: 'text/csv;charset=utf-8' });
        $.reportImage.onload = function(){
            var ctx = $.reportCanvas.getContext('2d');
            $.reportCanvas.width = $.reportImage.width;
            $.reportCanvas.height = $.reportImage.height;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0,0,$.reportCanvas.width,$.reportCanvas.height);
            ctx.drawImage($.reportImage, 0, 0);
            var JPGurl = $.reportCanvas.toDataURL("image/jpeg",1);
            var PNGurl = $.reportCanvas.toDataURL("image/png");
            $.reportBlobAsBase64(SVGblob,function(SVGurl){
                $.reportBlobAsBase64(CSVblob,function(CSVurl){
                    callback({png:PNGurl,jpg:JPGurl,svg:SVGurl,csv:CSVurl,dimensions:{width:$.reportCanvas.width,height:$.reportCanvas.height}});
                });
            });
        };
        $.reportImage.src = URL.createObjectURL(SVGblob);
    };
    $.fn.getSelector = function(){
        var id,className;
        if ($(this).attr("id")) {
            id = "#"+$(this).attr("id");
        }
        if ($(this).attr("class")) {
            className = "."+$(this).attr("class").split(" ").join(".");
        }
       return id||className||$(this).prop("tagName");
    };
    var isCenterPieOrRadial = function(graph){
        return graph.settings.type=="pie"||graph.settings.line&&graph.settings.line=="radial";
    };
    var addSVG = function(graph,ele){
        
        var width=isCenterPieOrRadial(graph)?Math.min(ele.width(),ele.height()):ele.width();
        var height=isCenterPieOrRadial(graph)?Math.min(ele.width(),ele.height()):ele.height();
        
        graph.svg = d3.select(ele.get(0))
            .append("svg")
            .attr({"width" : width ,"height" : height})
            .style(graph.settings.styles.svg);
        
    };
    var addSVGGroup = function(graph,ele){
        var width=isCenterPieOrRadial(graph)?Math.min(ele.width(),ele.height()):ele.width();
        var height=isCenterPieOrRadial(graph)?Math.min(ele.width(),ele.height()):ele.height();
        
        var translateX=(isCenterPieOrRadial(graph)||graph.settings.type=="word")?((width-graph.settings.margin.left-graph.settings.margin.right) / 2)+graph.settings.margin.left:(graph.settings.margin.left),
        translateY=(isCenterPieOrRadial(graph)||graph.settings.type=="word")?((height-graph.settings.margin.top-graph.settings.margin.bottom) / 2)+graph.settings.margin.top:(graph.settings.margin.top);
         if (graph.settings.barBacks) {
                           
           graph.rectBackGroup = graph.svg.append("g").attr("class", "bar-back-group");
           graph.rectBackGroup.attr("transform", function(d,i) { return "translate(" + graph.settings.margin.left + "," + graph.settings.margin.top + ")"; });
        }
        
        graph.svgGroup = graph.svg
            .append("g")
            .attr({"class" : graph.settings.type+" group main-group"})
            .attr("transform", "translate(" + translateX + "," + translateY + ")");
            
            
       
            
        graph.defs = graph.svg.append("defs");
    };
    var addAxes = function(graph){
        graph.xAxis = d3.svg.axis()
            .scale(graph.xScale)
            .orient(graph.settings.xAxis.orient)
            .tickFormat(graph.settings.xtickformat)
            .innerTickSize((graph.settings.type=="line"&&graph.settings.line!="radial"&&graph.settings.showGrid)?-graph.height:0);
        graph.yAxis = d3.svg.axis()
            .scale(graph.yScale)
            .ticks(graph.settings.yAxis.ticks)
            .orient(graph.settings.yAxis.orient)
            .tickFormat(graph.settings.ytickformat)
            .innerTickSize((graph.settings.type=="line"&&graph.settings.line!="radial"&&graph.settings.showGrid)?-graph.width:0);
    };
    
    var showAxes = function(graph,ele,orientation){
        var marginLeft;
        if (graph.settings.xAxis&&graph.settings.xAxis.on) {
           // var margin = ((||orientation=="horizontal-axis-under"))?graph.settings.margin.top:(ele.height()-graph.settings.margin.bottom);
            var margin = (ele.height()-graph.settings.margin.bottom);
            marginLeft = graph.settings.margin.left;
                    
            if (orientation=="horizontal"&&graph.settings.line!="radial") {
                margin = graph.settings.margin.top;
            }else if (orientation=="horizontal-axis-under"&&graph.settings.line!="radial") {
                margin = graph.settings.margin.top + (graph.xScale.rangeBand()/2) + 8;
                marginLeft = graph.settings.margin.left+5;
            }
            var xAxisGroup = graph.svg.append("g")
                .attr({"class":graph.settings.type+" xaxis","transform":"translate(" + marginLeft + "," + margin + ")"})
                .style(graph.settings.styles.axis)
                .call(graph.xAxis);
            xAxisGroup.selectAll("text")
                .attr("class",graph.settings.type+" xaxistext")
                .style(graph.settings.styles.axisText);
                
            xAxisGroup.selectAll("line")
                .attr("class",graph.settings.type+" xaxistick")
                .style(graph.settings.styles.innerAxis);
        }
        if (graph.settings.yAxis&&graph.settings.yAxis.on){
            var marginTop = ((orientation=="horizontal"||orientation=="horizontal-axis-under")&&graph.settings.line!="radial")?(ele.height()-graph.settings.margin.bottom):graph.settings.margin.top;
            
            marginLeft = graph.settings.margin.left;
            if (graph.settings.line=="radial") {
                marginLeft = ((graph.width / 2 ) + graph.settings.margin.left);
               
                
            }
            var yAxisGroup = graph.svg.append("g")
                .attr({"class" : graph.settings.type+" yaxis","transform" : "translate(" + marginLeft + "," + marginTop + ")"})
                .style(graph.settings.styles.axis)
                .call(graph.yAxis)
            yAxisGroup.selectAll("text")
                .attr("class",graph.settings.type+" yaxistext")
                .style(graph.settings.styles.axisText);
                
                
            yAxisGroup.selectAll("line")
                .attr("class",graph.settings.type+" yaxistick")
                .style(graph.settings.styles.innerAxis);
        }
    }
    var setGraphWidths = function(graph,ele){
        
        graph.width =
            ele.width() -
            graph.settings.margin.right - graph.settings.margin.left;
        
        graph.height =
            ele.height() -
            graph.settings.margin.top - graph.settings.margin.bottom;
        
        if (isCenterPieOrRadial(graph)) {
            graph.width = /*Math.min(graph.width,graph.height);*/
                Math.min(ele.width(), ele.height())
                        -graph.settings.margin.right
                        -graph.settings.margin.left;
            graph.height = /*Math.min(graph.width,graph.height);*/
                Math.min(ele.width(), ele.height())
                        -graph.settings.margin.top
                        -graph.settings.margin.bottom;
        }
    }
    var addGrid = function(graph){
        if (graph.settings.showGrid&&graph.settings.line=="radial") {
            graph.grid = graph.svg
                .append("g")
                .attr({"class" : graph.settings.type+" grid-group"});
            graph.grid.attr({"transform" : "translate(" + ((graph.width / 2) + graph.settings.margin.left) + "," + ((graph.height / 2) + graph.settings.margin.top) + ")"});
        }
    }
    var showGrid = function(graph,ele,data){
        if (graph.settings.showGrid&&graph.settings.line=="radial") {
            var tickData = [];
            graph.yScale.ticks(graph.settings.yAxis.ticks).forEach(function(yTick){
                var tickRow = [];
                if(graph.settings.gridVerticalLines){
                    var splitTicks = [];
                    var xMin = graph.settings.xAxisMin?graph.settings.xAxisMin:data[0].data[0][graph.settings.xField];
                    var xMax = graph.settings.xAxisMax?graph.settings.xAxisMax:data[0].data[data[0].data.length-1][graph.settings.xField];
                    
                    for(var i=0;i<graph.settings.gridVerticalLines+1;i++){
                        splitTicks.push((((xMax-xMin)/graph.settings.gridVerticalLines)*i)+xMin);
                    }
                    splitTicks.forEach(function(xTick){
                        tickRow.push({"name":xTick,"value":yTick});
                    }); 
                }else{
                    data[0].data.forEach(function(xTick){
                        tickRow.push({"name":xTick.name,"value":yTick});
                    }); 
                }
                tickData.push(tickRow);
            });
            if (graph.settings.gridCircleLines) {
                var tickLine = graph.grid.selectAll(".grid-line")
                    .data(tickData);
                    
                tickLine.enter()
                    .append("circle").attr("class","grid-line")
                    .style(graph.settings.styles.innerAxis)
                    .attr("cx",0)
                    .attr("cy",0)
                    .attr("transform", null);
                tickLine.transition().duration(graph.settings.speed).ease("linear")
                    .attr("r",function(d, i) { return graph.yScale(0)-graph.yScale(d[0].value); });
                    
                    
                tickLine.exit().remove();
            }else{
                var tickLine = d3.svg.line.radial()
                    .interpolate("linear")
                    .angle(function(d, i) { return i/(tickData[0].length-1)*(Math.PI*2);/*graph.xScale(d.name);*//*i/tickData[0].length*Math.PI*2*/ })
                    .radius(function(d, i) { return graph.yScale(0)-graph.yScale(d.value); }); 
                    
                    
                var tickPath = graph.grid.selectAll(".grid-line")
                    .data(tickData);
                    
                tickPath.enter()
                    .append("path")
                    .attr("class","grid-line")
                    .style(graph.settings.styles.innerAxis)
                    .attr("transform", null);
                    
                tickPath.transition()
                    .duration(graph.settings.speed)
                    .ease("linear")
                    .attr("d",function(d, i) {return tickLine(d); } );
                    
                tickPath.exit().remove();
            }
            if (graph.settings.showGridLabels) {
                var tickLabel = graph.grid.selectAll(".grid-label")
                    .data(tickData[0]);
                var angle = function(d,i){return (i/(tickData[0].length-1)*(Math.PI*2))+(Math.PI/2);}
                    
                tickLabel.enter()
                    .append("text")
                    .attr("class","grid-label")
                    .attr("text-anchor",function(d,i){
                        var anchor = "start";
                        var theAngle = angle(d,i)*(180/Math.PI)-90;
                        if(theAngle>180){
                            anchor = "end";
                        }else if(theAngle==180||theAngle==0){
                            anchor = "middle";
                        }
                        return anchor;
                    })
                    .text(function(d,i){return i==tickData[0].length-1?"":data[0].data[i].name})
                    .attr("transform", null);
                tickLabel.transition()
                    .duration(graph.settings.speed)
                    .ease("linear")
                    .attr("x",function(d, i) {
                           
                            
                        return ((graph.settings.gridLabelOffset+(Math.min(graph.width,graph.height)/2))*(1-Math.cos(angle(d,i)))-(graph.settings.gridLabelOffset+(Math.min(graph.width,graph.height)/2))); } )
                    .attr("y",function(d, i) {
                            
                            return 6+((graph.settings.gridLabelOffset+(Math.min(graph.width,graph.height)/2))*(1-Math.sin(angle(d,i)))-(graph.settings.gridLabelOffset+(Math.min(graph.width,graph.height)/2))); } );
                    
                tickLabel.exit().remove();
            }
            
            if (graph.settings.showGridBalls) {
                var tickBall = graph.grid.selectAll(".grid-ball")
                    .data(tickData[0]);
                    
                tickBall.enter()
                    .append("circle")
                    .attr("class","grid-ball")
                    .style("fill",function(d,i){return i==0||i==tickData[0].length-1?"none":graph.settings.gridBallColor;})
                    .attr("r",graph.settings.gridBallWidth)
                    .attr("transform", null);
                var angle = function(d,i){return (i/(tickData[0].length-1)*(Math.PI*2))+(Math.PI/2);/*graph.xScale(d.name)+(Math.PI/2);*/}
                tickBall.transition()
                    .duration(graph.settings.speed)
                    .ease("linear")
                    .attr("cx",function(d, i) {return (((Math.min(graph.width,graph.height)/2)+(graph.settings.gridBallWidth))*(1-Math.cos(angle(d,i)))-((Math.min(graph.width,graph.height)/2)+(graph.settings.gridBallWidth))); } )
                    .attr("cy",function(d, i) {return (((Math.min(graph.width,graph.height)/2)+(graph.settings.gridBallWidth))*(1-Math.sin(angle(d,i)))-((Math.min(graph.width,graph.height)/2)+(graph.settings.gridBallWidth))); } );
                    
                tickBall.exit().remove();
            }
            var tickPathVerticle = graph.grid.selectAll(".grid-line-vertical")
                .data(tickData[0]);
                
            tickPathVerticle.enter()
                .append("line")
                .attr("class","grid-line-vertical")
                .style(graph.settings.styles.innerAxis)
                .attr("transform", null);
            var angle = function(d,i){return (i/(tickData[0].length-1)*(Math.PI*2))+(Math.PI/2);/*graph.xScale(d.name)+(Math.PI/2);*/}
            tickPathVerticle.transition()
                .duration(graph.settings.speed)
                .ease("linear")
                .attr("x1",function(d, i) {return 0; } )
                .attr("y1",function(d, i) {return 0; } )
                .attr("x2",function(d, i) {return ((Math.min(graph.width,graph.height)/2)*(1-Math.cos(angle(d,i)))-(Math.min(graph.width,graph.height)/2)); } )
                .attr("y2",function(d, i) {return ((Math.min(graph.width,graph.height)/2)*(1-Math.sin(angle(d,i)))-(Math.min(graph.width,graph.height)/2)); } );
                
            tickPathVerticle.exit().remove();
        }
    }
    var addTooltip = function(graph,ele,data){
        if (graph.settings.addTooltip) {
            var container = $('<div style="position:relative">');
            graph.tooltip = $('<div style="position:absolute;opacity:0;">');
            ele.prepend(container.append(graph.tooltip.html(graph.settings.tooltip)));
        }
    }
    var showLegend = function(graph,data,ele){
        if (graph.settings.showLegend) {
            var leftOffset = 1;
            var topOffset = graph.settings.type=="pie"?20:0
            graph.legendElements.forEach(function(legend){
                legend.box
                    .attr({"width":12,"height":12,"y":topOffset-15,"x":leftOffset})
                legend.text
                    .attr({"y":topOffset-4,"x":leftOffset+18});
                leftOffset+=legend.text.node().getBBox().width+40;
                var textMax = isCenterPieOrRadial(graph)?Math.min(ele.width(),ele.height()):ele.width();
                if (leftOffset>textMax-graph.settings.margin.left-graph.settings.margin.right) {
                    leftOffset = 1;
                    topOffset+=20;
                    legend.box.attr({"width":12,"height":12,"y":topOffset-15,"x":leftOffset})
                    legend.text.attr({"y":topOffset-4,"x":leftOffset+18})
                    leftOffset = legend.text.node().getBBox().width+40;
                }
            });
            graph.settings.margin.bottom=graph.settings.margin.bottomOriginal+topOffset;
            
            setGraphWidths(graph,ele);
            graph.legend
                .attr("transform", "translate(" + (graph.settings.margin.left) + "," +((isCenterPieOrRadial(graph)?Math.min(ele.width(),ele.height()):ele.height())-topOffset)+ ")");
        }else{
            graph.settings.margin.bottomOriginal=parseInt(graph.settings.margin.bottom);
            setGraphWidths(graph,ele);
        }
    }
    $.fn.toggleDataSeries = function(i,opacity,callback,isRect){
        if(isRect){
            var path = this.find("g.bar-group:nth-child("+(i+1)+")");
           // var bar_label = this.find("text.barLabel:nth-child("+(i+1)+")");
           console.log("isRect")
        }else{
            var path = this.find("path.line:nth-child("+(i+1)+")");
            var start_circle = this.find("circle.static.start-circle:nth-child("+(i+1)+")");
            var end_circle = this.find("circle.static.end-circle:nth-child("+(i+1)+")");
            var all_circle = this.find("circle.static.circle-"+i);
        }
        if(typeof path.data("off")=="undefined")path.data("off",false);
        if(!(path.data("off"))){
            if (!(path.data("disabled"))||(!(typeof callback === 'function')&&callback===false)){
                //if(typeof callback === 'function')callback(path);
                path.data("disabled",true);
                path.stop(false,false).animate({"opacity":opacity},250,function(){
                    if(opacity===0)path.css("display","none");
                    if(typeof callback === 'function')callback(path);
                });
                if(isRect){
                  //  bar_label.stop(false,false).animate({"opacity":opacity},250);
                }else{
                    start_circle.stop(false,false).animate({"opacity":opacity},250,function(){
                        if(opacity===0)start_circle.css("display","none");
                    });
                    end_circle.stop(false,false).animate({"opacity":opacity},250,function(){
                        if(opacity===0)end_circle.css("display","none");
                    });
                    all_circle.stop(false,false).animate({"opacity":opacity},250,function(){
                        if(opacity===0)all_circle.css("display","none");
                    }); 
                }
            }else{   
                //if(typeof callback === 'function')callback(path);
                path.data("disabled",false);
                path.css("display","block");
                path.stop(false,false).animate({"opacity":1},250,function(){
                    if(typeof callback === 'function')callback(path);
                });
                if(isRect){
                   // bar_label.stop(false,false).animate({"opacity":1},250);
                }else{
                    start_circle.css("display","block");
                    end_circle.css("display","block");
                    all_circle.css("display","block");
                    start_circle.stop(false,false).animate({"opacity":1},250);
                    end_circle.stop(false,false).animate({"opacity":1},250);
                    all_circle.stop(false,false).animate({"opacity":1},250);
                }
            }
        }
    };
    var addLegend = function(graph,ele,data){
        // need to sort random bottom margin bug in the legend. When resizing when all legend items are wrapped the last one causes extra margin sometimes it seems.
        if (graph.settings.showLegend) {
            graph.legend = graph.svg
                .append("g")
                .attr({"class" : graph.settings.type+" legend-group"});
            graph.legendElements = [];
            data.forEach(function(d,i){
                var box = graph.legend
                    .append("rect")
                    .style("fill",d.color)
                    .style("stroke",d.color)
                    .style("stroke-width","2px")
                    .style("cursor", "pointer");
                var text = graph.legend
                    .append("text")
                    .style("font-size", "12px")
                    .style("cursor", "pointer")
                    .text(d.name);
                var isEnabled;
                var ledendClickHandler = function(){
                    console.log("click");
                    if(isEnabled&&isEnabled.data("off"))isEnabled.data("off",false)
                    ele.toggleDataSeries(i,0,function(path){
                        isEnabled = path;
                        if (!(isEnabled.data("disabled"))) {
                            box.style("fill",d.color);
                            text.style("fill","inherit");
                        }else{
                            isEnabled.data("off",true);
                            box.style("fill","#cfcfcf");
                            text.style("fill","#cfcfcf"); 
                        }
                    },graph.settings.type=="bar");
                }
                $(text.node()).click(ledendClickHandler);
                $(box.node()).click(ledendClickHandler);
                graph.legendElements.push({box:box,text:text});
            });
            graph.settings.margin.bottomOriginal=parseInt(graph.settings.margin.bottom);
            showLegend(graph,data,ele);
        }else{
            graph.settings.margin.bottomOriginal=parseInt(graph.settings.margin.bottom);
            setGraphWidths(graph,ele);
        }
    }
    var deepCopy = function(array){
        return JSON.parse(JSON.stringify(array));
    }
    $.deepCopy = function(array){
        return deepCopy(array);
    }
    var pieText = function(saveData,data,graph){
        var text = [Math.round(data[0].value)];
        if (graph.settings.pie=="double") {
            if(!(saveData.value<0)){
                text = [Math.round(data[0].value)];
                if (graph.settings.showText) {
                    text.push(graph.settings.rightText);
                }
            }else{
                text = [Math.round(data[2].value)];
                if (graph.settings.showText) {
                    text.push(graph.settings.leftText);
                }
            }
        }
        return text;
    }
    var pieDataPrep = function(graph,data){
        if (graph.settings.pie=="single") {
            data = [data,{name:"",value:100-data.value,color:graph.settings.backgroundColor}];
        }
        if (graph.settings.pie=="double") {
            if (data.value<0) {
                data.value*=-1;
                data.color=graph.settings.leftColor;
                data.name="left"
                data = [{name:"right",value:0,color:graph.settings.rightColor},{name:"background",value:100-data.value,color:graph.settings.backgroundColor},data];
            }else{
                data.color=graph.settings.rightColor;
                data.name="right"
                data = [data,{name:"",value:100-data.value,color:graph.settings.backgroundColor},{name:"left",value:0,color:graph.settings.leftColor}];
            }
        }
        return data;
    }
    $.fn.reportHeatMap = function(action,options){
         var settings = $.extend({
            type:"heat",
            xField:"x",
            yField:"y",
            zField:"z",
            step:0.8,
            degree:1,
            margin:{top: 0, right: 0, bottom: 0, left: 0}
            },options);
            return this.each(function(i) {
                if (!($(this).data("series"))) {
                    console.log("Element '"+$(this).getSelector()+"' number "+(i+1)+" ignored because it has no 'data-series' attribute set.");
                    return;
                }
                var data=deepCopy($(this).data("series")||[]);
                var graph = {};
                graph.settings=settings;
                setGraphWidths(graph,$(this));
                var canvasContainer = $('<div class="d3-report-heatmap" style="position:relative;z-index:10;"></div>');
                var canvasInner = $('<div style="position:absolute;"></div>');
                var canvas = document.createElement('canvas');
                $(canvas).css("width",graph.width);
                $(canvas).css("height",graph.height);
                canvas.width=320;
                canvas.height=240;
                canvasInner.append(canvas);
                canvasContainer.append(canvasInner);
                $(this).before(canvasContainer);
                graph.heatmap = new HeatCanvas(canvas);
                graph.heatmap.bgcolor=[255, 255, 255, 0];
                graph.colorscheme = function(value){
                    var h = (1 - value);
                    var l = value * 0.6;
                    var s = 0.8;
                    var a = value * 0.98;
                    return [h, s, l, a];
                }
                $(this).data("graph",graph);
                $(this).reportGraphRender();
                $(this).reportGraphResized();
                $(this).reportGraphEvents();
            });
    }
    $.fn.reportWordCloud = function(action,options){
        var settings = $.extend({
            speed:500,
            type:"word",
            styles:{
                svg:{
                    "line-height": "1.5",
                    "font-family": "Roboto,sans-serif",
                    "color": "rgba(0,0,0,.87)",
                    "font-weight": 400
                }
            },
            stopWords:/^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/,
            xField:"key",
            yField:"value",
            margin:{top: 0, right: 0, bottom: 0, left: 0}
            },options);
            return this.each(function(i) {
                if (!($(this).data("series"))) {
                    console.log("Element '"+$(this).getSelector()+"' number "+(i+1)+" ignored because it has no 'data-series' attribute set.");
                    return;
                }
                var data=deepCopy($(this).data("series")||[]);
                var graph = {};
                graph.settings=settings;
                
                addSVG(graph,$(this));
                addLegend(graph,$(this),data);
                graph.fontSize = d3.scale['sqrt']().range([10, 100]);
                graph.layout = d3.layout.cloud()
                    .size([graph.width, graph.height])
                    .rotate(0)
                    .padding(2)
                    .font("Impact")
                    .fontSize(function(d) {
                        return +d[graph.settings.yField];
                    })
                    .text(function(d) {
                        return d[graph.settings.xField];
                    });
                graph.layout.font('impact').spiral('rectangular');
                if (data.length){
                    graph.fontSize.domain([+data[data.length - 1][graph.settings.yField] || 1, +data[0][graph.settings.yField]]);
                }
                addSVGGroup(graph,$(this));
                $(this).data("graph",graph);
                $(this).reportGraphRender();
                $(this).reportGraphResized();
                $(this).reportGraphEvents();
            });
    };
    
    $.fn.reportRangeChart = function(action,options){
        var settings = $.extend({
            speed:500,
            type:"range",
            range:action||"normal",
            styles:{
                svg:{
                    "line-height": "1.5",
                    "font-family": "Roboto,sans-serif",
                    "color": "rgba(0,0,0,.87)",
                    "font-weight": 400
                },
                axis:{
                    "stroke" : "#eeeeee",
                    "fill" : "none",
                    "stroke-width" : "3px"
                },
                xAxisText:{
                    "text-anchor" : "middle"
                },
                axisText:{
                    "stroke" : "#3e3e3e",
                    "fill" : "#3e3e3e",
                    "stroke-width" : "0px",
                    "font-size" : "12px"
                }
            },
                xtickformat:function(d){return d;},
                ytickformat:function(d){return d;},
                interpolation:"basis",
                xAxis:{on:true,orient:"bottom"},
                yAxis:{on:false,ticks:5,orient:"left"},
                barPadding:.5,
                barMargin:.1,
                barSideLabels:false,
                barLabels:false,
                xField:"name",
                yField:"value",
                xPreFix:"",
                xPostFix:"",
                yPreFix:"",
                yPostFix:"",
                leftColor:"#b21400",
                rightColor:"#00b224",
                idPrefix:$.reportIdPrefix(),
                xAxisFactor:0,
                yAxisFactor:0,
                yAxisMax:false,
                yAxisMin:false,
                showLegend:false,
                stack:false,
                stackOffset:"zero",
                margin:{top: 10, right: 10, bottom: 10, left: 40}
            },options);
            return this.each(function(i) {
                if (!($(this).data("series"))) {
                    console.log("Element '"+$(this).getSelector()+"' number "+(i+1)+" ignored because it has no 'data-series' attribute set.");
                    return;
                }
                var data=deepCopy($(this).data("series")||[]);
                var graph = {};
                graph.settings=settings;
                
                addSVG(graph,$(this));
                addLegend(graph,$(this),data);
                
                addSVGGroup(graph,$(this));
                var offsets = {
                    width: graph.settings.margin.left+graph.settings.margin.right,
                    height: graph.settings.margin.bottom+graph.settings.margin.top
                }
                
                graph.xScale = d3.scale.ordinal()
                    .domain(data.map(function(d) { return d[graph.settings.xField]; }))
                    .rangeRoundBands([0, $(this).height()-offsets.height],settings.barPadding,settings.barMargin);
                
                var xMin = (graph.settings.xAxisMin||graph.settings.xAxisMin===0)?graph.settings.xAxisMin:domain("min",[{data:data}],false,graph);
                var xMax = graph.settings.xAxisMax?graph.settings.xAxisMax:domain("max",[{data:data}],false,graph);
                graph.yScale = d3.scale.linear()
                    .domain([(xMin-((xMax-xMin)*graph.settings.xAxisFactor)),(xMax+((xMax-xMin)*graph.settings.xAxisFactor))])
                    .range([0,$(this).width()-offsets.width]);
                
                addAxes(graph,action);
                showAxes(graph,$(this),action);
                $(this).data("graph",graph);
                $(this).reportGraphRender();
                $(this).reportGraphResized();
                $(this).reportGraphEvents();
            });
    };
    $.fn.reportLineChart = function(action,options){
        var settings = $.extend({
            speed:1500,
            type:"line",
            styles:{
                svg:{
                    "line-height": "1.5",
                    "font-family": "Roboto,sans-serif",
                    "color": "rgba(0,0,0,.87)",
                    "font-weight": 400
                },
                axis:{
                    "stroke" : "#eeeeee",
                    "fill" : "none",
                    "stroke-width" : "3px"
                },
                innerAxis:{
                    "stroke" : "#cfcfcf",
                    "fill" : "none",
                    "stroke-width" : "1px"
                },
                xAxisText:{
                    "text-anchor" : "middle"
                },
                axisText:{
                    "stroke" : "#3e3e3e",
                    "fill" : "#3e3e3e",
                    "stroke-width" : "0px",
                    "font-size" : "12px"
                },
                line:{
                    "stroke-width" : "3px"
                }
            },
            xtickformat:customTimeFormat,
            ytickformat:function(d){return d;},
            autoResize:true,
            showEndDot:false,
            endDotSize:8,
            showStartDot:false,
            startDotSize:8,
            showAllDots:false,
            allDotSize:4,
            radialFill:false,
            radialFillOpacity:0.2,
            highlightSeries:true,
            showLegend:false,
            addTooltip:false,
            tooltipXClass:"tooltip-x",
            tooltipYClass:"tooltip-y",
            tooltip:'<div style="border-radius: 5px; border: 1px solid #cfcfcf;background: rgba(255,255,255,0.9);padding: 2px;"><span class="tooltip-y"></span></div>',
            xPreFix:"",
            xPostFix:"",
            yPreFix:"",
            yPostFix:"",
            xAxisFactor:0,
            yAxisFactor:0,
            xField:"name",
            yField:"value",
            xAxisMax:false,
            xAxisMin:false,
            yAxisMax:false,
            yAxisMin:false,
            showGrid:false,
            showGridBalls:false,
            showGridLabels:false,
            gridLabelOffset:12,
            gridBallColor:"#cfcfcf",
            gridBallWidth:3,
            gridVerticalLines:false,
            gridCircleLines:false,
            fillColor:"none",
            strokeColor:"none",
            background:false,
            idPrefix:$.reportIdPrefix(),
            line:action||"normal",
            blurFilter:false,
            blurStandardDeviation:1,
            interpolation:"basis",
            xAxis:{on:true,orient:"bottom"},
            yAxis:{on:true,ticks:5,orient:"left"},
            xToolTip:function(value,ele,d){return value;},
            yToolTip:function(value,ele,d){return Math.round(value*100)/100;},
            margin:{top: 20, right: 20, bottom: 40, left: 50}
        }, options);
        
        return this.each(function(i) {
            if (!($(this).data("series"))) {
                console.log("Element '"+$(this).getSelector()+"' number "+(i+1)+" ignored because it has no 'data-series' attribute set.");
                return;
            }
            var data=deepCopy($(this).data("series")||[]);
            var graph = {};
            graph.settings=settings;
            
            addSVG(graph,$(this));
            addLegend(graph,$(this),data);
            prepareRadialData(graph,data);
            var xMin = graph.settings.xAxisMin?graph.settings.xAxisMin:data[0].data[0][graph.settings.xField];
            var xMax = graph.settings.xAxisMax?graph.settings.xAxisMax:data[0].data[data[0].data.length-1][graph.settings.xField];
            if(graph.settings.line=="radial") {
               graph.xScale = d3.scale.linear()
                    .domain([(xMin-((xMax-xMin)*graph.settings.xAxisFactor)),(xMax+((xMax-xMin)*graph.settings.xAxisFactor))])
                    .range([0, (graph.settings.line=="radial")?2 * Math.PI:$(this).width()-settings.margin.left-settings.margin.right]);
            }else{
                graph.xScale = d3.time.scale()
                    .domain([(xMin-((xMax-xMin)*graph.settings.xAxisFactor)),(xMax+((xMax-xMin)*graph.settings.xAxisFactor))])
                    .range([0, $(this).width()-settings.margin.left-settings.margin.right]);
            }
            var yMin = (graph.settings.yAxisMin||graph.settings.yAxisMin===0)?graph.settings.yAxisMin:domain("min",data,false,graph);
            var yMax = graph.settings.yAxisMax?graph.settings.yAxisMax:domain("max",data,false,graph);
            var yOffset = 0;
            if(graph.settings.line=="radial"&&yMin<0){
                yOffset = yMin*-1;
                console.log(yMin);
            }
            graph.yScale = d3.scale.linear()
                .domain([(yMin-((yMax-yMin)*graph.settings.yAxisFactor))+yOffset,(yMax+((yMax-yMin)*graph.settings.yAxisFactor))+yOffset])
                .range((graph.settings.line=="radial")?[(Math.min(graph.width, graph.height)/2),0 ]:[graph.height, 0]);
            
            addGrid(graph);
            showGrid(graph,$(this),data);
            addAxes(graph);
            showAxes(graph,$(this),"vertical");
            addTooltip(graph,$(this),"vertical");
            addSVGGroup(graph,$(this));
            if (graph.settings.blurFilter) {
                
                graph.filter = graph.defs
                    .append("filter")
                      .attr("id", graph.settings.idPrefix+"blur")
                    .append("feGaussianBlur")
                      .attr("stdDeviation", graph.settings.blurStandardDeviation);
            }
            if (graph.settings.background) {
                
                graph.filter = graph.defs
                    .append("pattern")
                      .attr("id", graph.settings.idPrefix+"image")
                      .attr('patternUnits', 'userSpaceOnUse')
                      .attr("x", 0)
                      .attr("y", 0)
                      .attr("width", 5)
                      .attr("height", 400)
                    .append("image")
                      .attr("xlink:href", graph.settings.background)
                      .attr("x", 0)
                      .attr("y", 0)
                      .attr("width", 5)
                      .attr("height", 400);         
            }
            $(this).data("graph",graph);
            $(this).reportGraphRender();
            $(this).reportGraphResized();
            $(this).reportGraphEvents();
        });
    }
    $.fn.reportBarChart = function(action,options){
        var settings = $.extend({
            speed:1500,
            autoResize:true,
            type:"bar",
            bar:action||"normal",
            styles:{
                svg:{
                    "line-height": "1.5",
                    "font-family": "Roboto,sans-serif",
                    "color": "rgba(0,0,0,.87)",
                    "font-weight": 400
                },
                axis:{
                    "stroke" : "#eeeeee",
                    "fill" : "none",
                    "stroke-width" : "3px"
                },
                xAxisText:{
                    "text-anchor" : "middle"
                },
                axisText:{
                    "stroke" : "#3e3e3e",
                    "fill" : "#3e3e3e",
                    "stroke-width" : "0px",
                    "font-size" : "12px"
                }
            },
            xtickformat:function(d){return d;},
            ytickformat:function(d){return d;},
            interpolation:"basis",
            xAxis:{on:true,orient:"bottom"},
            yAxis:{on:false,ticks:5,orient:"left"},
            barPadding:.2,
            barMargin:.1,
            barLabels:false,
            labelPercentage:false,
            xField:"name",
            yField:"value",
            xPreFix:"",
            xPostFix:"",
            yPreFix:"",
            yPostFix:"",
            idPrefix:$.reportIdPrefix(),
            xAxisFactor:0,
            yAxisFactor:0,
            yAxisMax:false,
            yAxisMin:false,
            showLegend:false,
            stack:false,
            stackOffset:"zero",
            xToolTip:function(value,ele){return value;},
            yToolTip:function(value,ele){return Math.round(value*100)/100;},
            margin:{top: 10, right: 10, bottom: 40, left: 10}
        }, options);
        return this.each(function(i) {
            if (!($(this).data("series"))) {
                console.log("Element '"+$(this).getSelector()+"' number "+(i+1)+" ignored because it has no 'data-series' attribute set.");
                return;
            }
            var data =deepCopy($(this).data("series")||[]);
            var graph = {};
            graph.settings=settings;
            
            addSVG(graph,$(this));
            addLegend(graph,$(this),data);
            addSVGGroup(graph,$(this));
            var offsets = {
                width: graph.settings.margin.left+graph.settings.margin.right,
                height: graph.settings.margin.bottom+graph.settings.margin.top
            }
            
            graph.xScale = d3.scale.ordinal()
                .domain(data[0].data.map(function(d) { return d[graph.settings.xField]; }))
                .rangeRoundBands([0, (action=="horizontal"||action=="horizontal-axis-under")?$(this).height()-offsets.height:$(this).width()-offsets.width],settings.barPadding,settings.barMargin);
            
            graph.xScale1 = d3.scale.ordinal().domain(data.map(function(d,i) { return i; })).rangeRoundBands([0, graph.xScale.rangeBand()]);  
            
            var yMin = (graph.settings.yAxisMin||graph.settings.yAxisMin===0)?graph.settings.yAxisMin:domain("min",data,false,graph);
            var yMax = graph.settings.yAxisMax?graph.settings.yAxisMax:domain("max",data,false,graph);
            graph.yScale = d3.scale.linear()
                .domain([(yMin-((yMax-yMin)*graph.settings.yAxisFactor)),(yMax+((yMax-yMin)*graph.settings.yAxisFactor))])
                .range((action=="horizontal"||action=="horizontal-axis-under")?[0,$(this).width()-offsets.width]:[$(this).height()-offsets.height, 0]);
                
            addAxes(graph,action);
            showAxes(graph,$(this),action);
            $(this).data("graph",graph);
            $(this).reportGraphRender();
            $(this).reportGraphResized();
            $(this).reportGraphEvents();
        });
    }
    $.fn.reportPieChart = function(action,options){
        var settings = $.extend({
            speed:1500,
            type:"pie",
            pie:action||"normal",
            autoResize:true,
            interpolation:"basis",
            outterRadius:1,
            innerRadius:.95,
            idPrefix:$.reportIdPrefix(),
            startAngle:0,
            centerPreFix:"",
            centerPostFix:"%",
            centerColor:"#7a7a7a",
            leftColor:"#7a7a7a",
            rightColor:"#7a7a7a",
            showText:true,
            leftText:"Negative",
            rightText:"Positive",
            backgroundColor:"#efeeef",
            fontSize:20,
            radiusField:"name",
            angleField:"value",
            xAxisFactor:0,
            yAxisFactor:0,
            xAxisMax:false,
            xAxisMin:false,
            yAxisMax:false,
            yAxisMin:false,
            fontColor:"#7a7a7a",
            margin:{top: 0, right: 0, bottom: 0, left: 0},
            styles:{
                svg:{
                    "line-height": "1.5",
                    "font-family": "Roboto,sans-serif",
                    "color": "rgba(0,0,0,.87)",
                    "font-weight": 400
                },
                axis:{
                    "stroke" : "#eeeeee",
                    "fill" : "none",
                    "stroke-width" : "3px"
                },
                xAxisText:{
                    "text-anchor" : "middle"
                },
                axisText:{
                    "stroke" : "#3e3e3e",
                    "fill" : "#3e3e3e",
                    "stroke-width" : "0px",
                    "font-size" : "12px"
                }
            },
        }, options);
        return this.each(function(i) {
            if (!($(this).data("series"))) {
                console.log("Element '"+$(this).getSelector()+"' number "+(i+1)+" ignored because it has no 'data-series' attribute set.");
                return;
            }
            var graph = {};
            graph.settings=settings;
            var data =deepCopy($(this).data("series")||[]);
            var saveData = deepCopy(data);
            if (settings.showLegend) {
                graph.settings.margin.bottom+=0;
            }
            data = pieDataPrep(graph,data);
            
            addSVG(graph,$(this));
            addLegend(graph,$(this),data);
            addSVGGroup(graph,$(this));
			graph.radius = (Math.min(graph.width,graph.height)/2);
            graph.arc = d3.svg.arc()
                .outerRadius(graph.radius*graph.settings.outterRadius)
                .innerRadius(graph.radius*graph.settings.innerRadius)
                .startAngle(function(d) { return d.startAngle + (settings.startAngle * (Math.PI/180)); })
                .endAngle(function(d) { return d.endAngle + (settings.startAngle * (Math.PI/180)); });
            graph.pie = d3.layout.pie()
                .sort(null)
                .value(function(d) {
                    return d[graph.settings.angleField];
                });
            $(this).data("graph",graph);
            $(this).reportGraphRender();
            $(this).reportGraphResized();
            $(this).reportGraphEvents();
            if (graph.settings.pie=="single"||graph.settings.pie=="double") {
                var dy=5
                if (graph.settings.pie=="double"&&graph.settings.showText) {
                    dy=-5;
                }
                var texts = pieText(saveData,data,graph);
                graph.svgCenterText = graph.svgGroup.append("text")
                    .style("text-anchor","middle")
                    .style("alignment-baseline","middle")
                    .style("font-size",graph.settings.fontSize)
                    .style("fill",graph.settings.fontColor);
                    
                graph.svgCenterTextNumber = graph.svgCenterText.append('tspan')
                    .attr("class","center number")
                    .attr('x', 0)
                    .attr('dy', dy)
                    .text(graph.settings.centerPreFix+texts[0]+graph.settings.centerPostFix);
                    
                graph.svgCenterTextWord = graph.svgCenterText.append('tspan')
                    .attr("class","center word")
                    .attr('x', 0)
                    .attr('dy', dy+graph.settings.fontSize+5)
                    .text(texts[1]);
            }
            
        });
    }
    $.fn.reportGraphRender=function(){
        return this.each(function(i) {
            var ele = $(this);
            if (!($(this).data("series"))) {
                console.log("Element '"+$(this).getSelector()+"' number "+(i+1)+" ignored because it has no 'data-series' attribute set.");
                return;
            }
            if (ele.data("graph")) {
                var data =deepCopy(ele.data("series")||[]);
                var saveData = deepCopy(data);
                var graph =ele.data("graph");
                    showLegend(graph,data,ele);
            var fontSize;
            if(graph.settings.type=="heat"){
                var canvas = ele.prev().find('canvas').get(0);
                //canvas.getContext("2d").clearRect(0, 0, graph.width, graph.height);
                $(canvas).css("width",graph.width);
                $(canvas).css("height",graph.height);
                graph.heatmap.clear();
                data.forEach(function(d){
                    graph.heatmap.push(d[graph.settings.xField], d[graph.settings.yField], d[graph.settings.zField]);
                });
                graph.heatmap.render(graph.settings.step, graph.settings.degree, graph.colorscheme);
            
            }else if(graph.settings.type=="word"){
                graph.layout.on("end", function(data, bounds){
                    var fill = d3.scale.category20b();
                    var scale = bounds ? Math.min(
                        graph.width / Math.abs(bounds[1].x - graph.width / 2),
                        graph.width / Math.abs(bounds[0].x - graph.width / 2),
                        graph.height / Math.abs(bounds[1].y - graph.height / 2),
                        graph.height / Math.abs(bounds[0].y - graph.height / 2)) / 2 : 1;
                     graph.words = graph.svgGroup.selectAll("text")
                        .data(data, function(d) {
                            return d.text.toLowerCase();
                        });
                        
                        
                    graph.words.enter().append("text")
                        .attr("text-anchor", "middle")
                        .style("opacity", 1e-6);
                        
                    graph.words.transition()
                        .duration(graph.settings.speed)
                        .style("opacity", 1)
                        .duration(graph.settings.speed)
                        .attr("transform", function(d) {
                            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                        })
                        .style("font-size", function(d) {
                            return d.size + "px";
                        });
                    graph.words.style("font-family", function(d) {
                        return d.font;
                    }).style("fill", function(d) {
                        return fill(d.text.toLowerCase());
                    }).text(function(d) {
                        return d.text;
                    });
                    graph.svgGroup.transition().attr("transform", "translate(" + [graph.width >> 1, graph.height >> 1] + ")scale(" + scale + ")");
                });
                graph.layout.stop().words(data).start();
                
            }else if(graph.settings.type=="line"||graph.settings.type=="pie"||graph.settings.type=="bar"||graph.settings.type=="range"){
                    //showLegend(graph,data,ele);
                    data = pieDataPrep(graph,data);
                    
                    switch (graph.settings.type) {
                        case "line":
                            prepareRadialData(graph,data);
                            var xMin = graph.settings.xAxisMin?graph.settings.xAxisMin:data[0].data[0][graph.settings.xField];
                            var xMax = graph.settings.xAxisMax?graph.settings.xAxisMax:data[0].data[data[0].data.length-1][graph.settings.xField];
                            var yMin = (graph.settings.yAxisMin||graph.settings.yAxisMin===0)?graph.settings.yAxisMin:domain("min",data,false,graph);
                            var yMax = graph.settings.yAxisMax?graph.settings.yAxisMax:domain("max",data,false,graph);
                            var yOffset=0;
                            if(graph.settings.line=="radial"&&yMin<0){
                                yOffset = yMin*-1;
                                console.log(yMin);
                            }
                            graph.xScale
                                .domain([(xMin-((xMax-xMin)*graph.settings.xAxisFactor)),(xMax+((xMax-xMin)*graph.settings.xAxisFactor))])
                                .range([0, (graph.settings.line=="radial")?2 * Math.PI:graph.width]);
                                
                            graph.yScale
                                .domain([(yMin-((yMax-yMin)*graph.settings.yAxisFactor))+yOffset,(yMax+((yMax-yMin)*graph.settings.yAxisFactor))+yOffset])
                                .range((graph.settings.line=="radial")?[(Math.min(graph.width, graph.height)/2),0]:[graph.height, 0]);
                            
                            if (graph.settings.line=="area") {
                                graph.svgLine = d3.svg.area()
                                    .interpolate(graph.settings.interpolation)
                                    .x(function(d, i) { return graph.xScale(d[graph.settings.xField]); })
                                    .y0(graph.height-((graph.height*graph.settings.yAxisFactor)))
                                    .y1(function(d, i) { return graph.yScale(d[graph.settings.yField]); }); 
                            }else if(graph.settings.line=="radial") {
                                graph.svgLine = d3.svg.line.radial()
                                    .interpolate(graph.settings.interpolation)
                                    .angle(function(d, i) { return i/(data[0].data.length-1)*(Math.PI*2)/*graph.xScale(d[graph.settings.xField])*/;/*(i+1)/data[0].data.length*Math.PI*2;*/ })
                                    .radius(function(d, i) { return graph.yScale(0)-graph.yScale(d[graph.settings.yField]+yOffset); }); 
                                
                            }else{
                                graph.svgLine = d3.svg.line()
                                    .interpolate(graph.settings.interpolation)
                                    .x(function(d, i) { return graph.xScale(d[graph.settings.xField]); })
                                    .y(function(d, i) { return graph.yScale(d[graph.settings.yField]); });  
                            }
                            showGrid(graph,ele,data);
                                
                            var mouseOver = function(d,i) {
                                if (graph.settings.highlightSeries) {
                                    data.forEach(function(dd,di){
                                        if (!(i===di)) {
                                            ele.toggleDataSeries(di,.2,false,false);
                                        }
                                    });
                                    ele.toggleDataSeries(i,1,true,false);
                                }
                            }
                            var mouseOut = function(d,i) {
                                if (graph.settings.highlightSeries) {
                                    data.forEach(function(dd,di){
                                        ele.toggleDataSeries(di,1,true,false);
                                    });
                                }
                                if (graph.settings.addTooltip) {
                                    graph.tooltip.stop(false,false)
                                                .fadeOut(100);
                                }
                            };
                            var radialAngle = function(length,i){return (i/(length-1)*(Math.PI*2))-(Math.PI/2);}
                            var bisector = d3.bisector(function(d) { return d[graph.settings.xField]; }).left;
                            var showToolTip = function(d,i,dd){
                                if (graph.settings.addTooltip) {
                                    graph.tooltip.find("."+graph.settings.tooltipXClass)   
                                            .html(graph.settings.xToolTip(d[graph.settings.xField],graph.tooltip,dd));
                                            
                                    graph.tooltip.find("."+graph.settings.tooltipYClass)   
                                            .html(graph.settings.yToolTip(d[graph.settings.yField]+yOffset,graph.tooltip,dd));
                                
                                    var offset = function(top){return (top<graph.tooltip.height()?(graph.settings.showAllDots?(graph.settings.allDotSize/2)+6:6)*-1:(graph.tooltip.height()+(graph.settings.showAllDots?(graph.settings.allDotSize/2)+6:6)));}
                                    if (graph.settings.line=="radial") {
                                        var top = (graph.height/2)+((graph.yScale(0)-graph.yScale(d[graph.settings.yField]+yOffset))*Math.sin(radialAngle(data[0].data.length,i)))+graph.settings.margin.top;
                                        var offset = 
                                        graph.tooltip
                                            .css("left",(ele.width()/2)+((graph.yScale(0)-graph.yScale(d[graph.settings.yField]+yOffset))*Math.cos(radialAngle(data[0].data.length,i)))-(graph.tooltip.width()/2))
                                            .css("top",top-offset(top))
                                            .stop(false,false)
                                            .fadeTo(250,.9);
                                    }else{
                                        var top = graph.yScale(d[graph.settings.yField]+yOffset)+graph.settings.margin.top;
                                        graph.tooltip
                                            .css("left",graph.xScale(d[graph.settings.xField])+graph.settings.margin.left-(graph.tooltip.width()/2))
                                            .css("top",top-offset(top))
                                            .stop(false,false)
                                            .fadeTo(250,.9);
                                    }
                                }
                            }
                            graph.path = graph.svgGroup.selectAll(".line")
                                .data(data);     
                            graph.path.enter()
                                .append("path")
                                //"this line is vitally important because of some shit" - said SH.
                                .attr("class","line")
                                .style({"fill":graph.settings.radialFill?function(d, i) { var rgb = $.hexToRgb(data[i].color);return "rgba("+rgb.r+","+rgb.g+","+rgb.b+","+graph.settings.radialFillOpacity+")" }:((graph.settings.line=="area")?function(d, i) { return (graph.settings.background)?"url(#"+graph.settings.idPrefix+"image)":function(d, i) { var rgb = $.hexToRgb(data[i].color);return "rgba("+rgb.r+","+rgb.g+","+rgb.b+",0.4)" }; }:graph.settings.fillColor),
                                       "stroke":(graph.settings.background)?function(d, i) { return data[i].color; }:(graph.settings.line=="area")?graph.settings.strokeColor:function(d, i) { return data[i].color; }})
                                .style(graph.settings.styles.line)
                                .attr("transform", null)
                                .on("mouseover",mouseOver)
                                .on("mouseout",  mouseOut)
                                .on("mousemove",function(d){
                                     if (!(graph.settings.line=="radial")) {
                                        var mouse = d3.mouse(this);
                                        var x0 = graph.xScale.invert(mouse[0]);
                                        i = bisector(d.data, x0, 1),
                                        d0 = d.data[i - 1],
                                        d1 = d.data[i],
                                        dd = x0 - d0[graph.settings.xField] > d1[graph.settings.xField] - x0 ? d1 : d0;
                                        di = x0 - d0[graph.settings.xField] > d1[graph.settings.xField] - x0 ? i : i-1;
                                        showToolTip(dd,di,d);
                                    }    
                                });
                            graph.path.transition().duration(graph.settings.speed).ease("linear")
                                .attr("d",function(d, i) {return graph.svgLine(d.data); } );
                                if (graph.settings.blurFilter) {
                                    graph.path.attr("filter", "url(#"+graph.settings.idPrefix+"blur)")
                                }
                            graph.path.exit().remove();
                            if (graph.settings.showAllDots) {
                                if (!(graph.settings.interpolation=="basis")) {
                                    data.forEach(function(dat,i){
                                        graph.path = graph.svgGroup.selectAll(".static.circle-"+i)
                                            .data(dat.data);
                                        graph.path.enter()
                                            .append("circle").attr("class","static circle-"+i)
                                            .attr("fill",dat.color)
                                            .attr("r",graph.settings.allDotSize)
                                            .attr("transform", null)
                                            .on("mouseover", function(dd,ii){showToolTip(dd,ii,dat);mouseOver(dat,i)})
                                            .on("mouseout", function(){mouseOut(dat,i)});
                                        if (graph.settings.line=="radial") {
                                            
                                            graph.path.transition().duration(graph.settings.speed).ease("linear")
                                                .attr("cx",function(d, i) {return (graph.yScale(0)-graph.yScale(d[graph.settings.yField]+yOffset))*Math.cos(radialAngle(dat.data.length,i)); } )
                                                .attr("cy",function(d, i) {return (graph.yScale(0)-graph.yScale(d[graph.settings.yField]+yOffset))*Math.sin(radialAngle(dat.data.length,i)); } );
                                            
                                            graph.path.exit().remove();
                                        }else{
                                            graph.path.transition().duration(graph.settings.speed).ease("linear")
                                                .attr("cx",function(d, i) {return graph.xScale(d[graph.settings.xField]); } )
                                                .attr("cy",function(d, i) {return graph.yScale(d[graph.settings.yField]+yOffset); } );
                                            graph.path.exit().remove();
                                        }
                                    });
                                }else{
                                    console.log("Cannot showAllDots with basis interpolation ( default option )");
                                }
                            }else{
                                if (graph.settings.showEndDot) {
                                    graph.circle = graph.svgGroup.selectAll(".static.end-circle")
                                        .data(data);
                                        
                                    graph.circle.enter()
                                        .append("circle").attr("class","static end-circle")
                                        .attr("fill",function(d, i) {return d.color; } )
                                        .attr("r",graph.settings.endDotSize)
                                        .attr("transform", null)
                                        .on("mouseover", mouseOver)
                                        .on("mouseout",  mouseOut);
                                    graph.circle.transition().duration(graph.settings.speed).ease("linear")
                                        .attr("cx",function(d, i) {return graph.xScale(d.data[d.data.length-1][graph.settings.xField]); } )
                                        .attr("cy",function(d, i) {return graph.yScale(d.data[d.data.length-1][graph.settings.yField]+yOffset); } );
                                    if (graph.settings.blurFilter) {
                                        graph.circle.attr("filter", "url(#"+graph.settings.idPrefix+"blur)")
                                    } 
                                        
                                    graph.circle.exit().remove();
                                }
                                if (graph.settings.showStartDot) {
                                    graph.path = graph.svgGroup.selectAll(".static.start-circle")
                                        .data(data);
                                        
                                    graph.path.enter()
                                        .append("circle").attr("class","static start-circle")
                                        .attr("fill",function(d, i) {return d.color; } )
                                        .attr("r",graph.settings.startDotSize)
                                        .attr("transform", null)
                                        .on("mouseover", mouseOver)
                                        .on("mouseout",  mouseOut);
                                    graph.path.transition().duration(graph.settings.speed).ease("linear")
                                        .attr("cx",function(d, i) {return graph.xScale(d.data[0][graph.settings.xField]); } )
                                        .attr("cy",function(d, i) {return graph.yScale(d.data[0][graph.settings.yField]+yOffset); } );
                                    
                                    graph.path.exit().remove();
                                }
                            }
                            break;
                        case "range":
                            var xMin = (graph.settings.xAxisMin||graph.settings.xAxisMin===0)?graph.settings.xAxisMin:domain("min",[{data:data}],false,graph);
                            var xMax = graph.settings.xAxisMax?graph.settings.xAxisMax:domain("max",[{data:data}],false,graph);
                            graph.yScale
                                .domain([(xMin-((xMax-xMin)*graph.settings.xAxisFactor)),(xMax+((xMax-xMin)*graph.settings.xAxisFactor))])
                                .range([0, graph.width]);
                                
                            graph.xScale
                                .domain(data.map(function(d) { return d[graph.settings.xField]; }))
                                .rangeRoundBands([0, graph.height],graph.settings.barPadding,graph.settings.barMargin);
                                
                            if (graph.settings.barBacks) {
                                graph.rectBacks = graph.svgGroup.selectAll(".barBack").data(data);
                                var attribs = {"class" : "barBack"}
                                attribs["width"] = graph.width;
                                attribs["height"] = graph.xScale.rangeBand();
                                attribs["x"] = 0;
                                attribs["y"] = function(d) { return graph.xScale(d[graph.settings.xField]); };
                                graph.rectBacks.enter()
                                    .append("rect")
                                    .attr(attribs)
                                    .style("fill", "#efeeef");
                                var transAttribs = {};
                                transAttribs["width"] = graph.width;
                                transAttribs["height"] = graph.xScale.rangeBand();
                                transAttribs["y"] = function(d) { return graph.xScale(d[graph.settings.xField]); };
                                graph.rectBacks.transition()
                                    .ease("linear")
                                    .duration(graph.settings.speed)
                                    .attr(transAttribs);
                                    
                            }
                            var hfuncLabel = function(yVal,ele,fieldVal) {
                                var lessThanZero = fieldVal<0;
                                var text_node = ele.node().getBBox();
                                var text_width = text_node.width;
                                var output = yVal;
                                var text_anchor = "end";
                                var text_fill = "#ffffff";
                                if(lessThanZero){
                                    if(graph.yScale(0)-yVal<text_width){
                                        output = yVal-4;
                                        text_anchor = "end";
                                        text_fill = "#000000";
                                    }else{
                                        output = yVal+4; 
                                        text_anchor = "start";
                                        text_fill = "#ffffff";
                                    }
                                }else{
                                    if(yVal-graph.yScale(0)<text_width){
                                        output = yVal+4;
                                        text_anchor = "start";
                                        text_fill = "#000000";
                                    }else{
                                        output = yVal-4; 
                                        text_anchor = "end";
                                        text_fill = "#ffffff";
                                    }
                                }
                                ele.style("text-anchor",text_anchor)
                                    .style("fill", text_fill);
                                return output;
                            };
                            graph.rect = graph.svgGroup.selectAll(".range")
                                .data(data);
                            
                            //data.forEach(function(dd){dd._total=d.total;});
                                
                            if (graph.settings.barLabels) {
                                graph.rectLabel = graph.svgGroup.selectAll(".barLabel")
                                    .data(data);
                            }
                            var attribs = {"class":"range"};
                            attribs["width"] = 0;
                            attribs["height"] = graph.xScale.rangeBand()
                            attribs["x"] = graph.yScale(0);
                            attribs["fill"] = function(d){ return (d[graph.settings.yField]<0?graph.settings.leftColor:graph.settings.rightColor)};
                            attribs["y"] = function(d) { return graph.xScale(d[graph.settings.xField]); };
                            graph.rect.enter()
                                .append("rect")
                                .attr(attribs);
                            var transAttribs = {};
                            transAttribs["width"] = function(d) { return (d[graph.settings.yField]<0?graph.yScale(0)-graph.yScale(d[graph.settings.yField]):graph.yScale(d[graph.settings.yField])-graph.yScale(0))};
                            transAttribs["height"] = graph.xScale.rangeBand()
                            transAttribs["x"] = function(d) { return (d[graph.settings.yField]<0?graph.yScale(d[graph.settings.yField]):graph.yScale(0))};
                            transAttribs["y"] = function(d) { return graph.xScale(d[graph.settings.xField]); };
                            
                            graph.rect.transition()
                                .ease("linear")
                                .duration(graph.settings.speed)
                                .attr(transAttribs);
                            graph.rect.exit().remove();
                            if (graph.settings.barSideLabels) {
                                graph.rectLabel = graph.svgGroup.selectAll(".barLabel-left")
                                   .data(data);
                                var labelAttribs = {}
                                labelAttribs.x = 4;
                                labelAttribs.y = function(d) { return graph.xScale(d[graph.settings.xField])+(graph.xScale.rangeBand()*1.5)+5; };
                                graph.rectLabel.enter()
                                    .append("text")
                                    .attr("class", "barLabel-left")
                                    .style(graph.settings.styles.axisText)
                                    .style(graph.settings.styles.xAxisText)
                                    .style("text-anchor","start")
                                    .text(function(d) { return d[graph.settings.xField].split(":")[0] })
                                    .attr(labelAttribs);
                                var labelTransAttribs = {};
                                labelTransAttribs.x = 4;
                                labelTransAttribs.y = function(d) { return graph.xScale(d[graph.settings.xField])+(graph.xScale.rangeBand()*1.5)+5; };
                                graph.rectLabel.transition()
                                    .ease("linear")
                                    .duration(graph.settings.speed)
                                    .text(function(d) { return d[graph.settings.xField].split(":")[0]; })
                                    .attr(labelTransAttribs);
                                graph.rectLabel.exit().remove();
                                
                                graph.rectLabelRight = graph.svgGroup.selectAll(".barLabel-right")
                                   .data(data);
                                var labelAttribs = {}
                                labelAttribs.x = graph.width-4
                                labelAttribs.y = function(d) { return graph.xScale(d[graph.settings.xField])+(graph.xScale.rangeBand()*1.5)+5;};
                                graph.rectLabelRight.enter()
                                    .append("text")
                                    .attr("class", "barLabel-right")
                                    .style(graph.settings.styles.axisText)
                                    .style(graph.settings.styles.xAxisText)
                                    .style("text-anchor","end")
                                    .text(function(d) { return d[graph.settings.xField].split(":")[1]; })
                                    .attr(labelAttribs);
                                var labelTransAttribs = {};
                                labelTransAttribs.x = graph.width-4;
                                labelTransAttribs.y = function(d) { return graph.xScale(d[graph.settings.xField])+(graph.xScale.rangeBand()*1.5)+5; };
                                graph.rectLabelRight.transition()
                                    .ease("linear")
                                    .duration(graph.settings.speed)
                                    .text(function(d) { return d[graph.settings.xField].split(":")[1]; })
                                    .attr(labelTransAttribs);
                                graph.rectLabelRight.exit().remove();
                            }
                            if (graph.settings.barLabels) {
                                var labelAttribs = {}
                                labelAttribs.x = function(d){return hfuncLabel(graph.yScale(0),d3.select(this),0);};
                                labelAttribs.y = function(d) { return graph.xScale(d[graph.settings.xField])+(graph.xScale.rangeBand()/2)+(isHorizontal?5:0)};
                                graph.rectLabel.enter()
                                    .append("text")
                                    .attr("class", "barLabel")
                                    .style("fill", "#ffffff")
                                    .text(function(d,i) { return graph.settings.labelPercentage?(Math.round((d[graph.settings.yField]/(d._total))*100))+"%":Math.round(d[graph.settings.yField]*100)/100;  })
                                    .attr(labelAttribs);
                                var labelTransAttribs = {};
                                labelTransAttribs.x = function(d){
                                    var value = graph.yScale(d[graph.settings.yField])
                                    return hfuncLabel(value,d3.select(this),d[graph.settings.yField]);};
                                labelTransAttribs.y = function(d) { return graph.xScale(d[graph.settings.xField])+(graph.xScale.rangeBand()/2)+5; };
                                graph.rectLabel.transition()
                                    .ease("linear")
                                    .duration(graph.settings.speed)
                                    .text(function(d,i) { return graph.settings.labelPercentage?(Math.round((d[graph.settings.yField]/(100))*100))+"%":Math.round(d[graph.settings.yField]*100)/100; })
                                    .attr(labelTransAttribs);
                                graph.rectLabel.exit().remove();
                            } 
                            break;
                        case "bar":
                            var isHorizontal = (graph.settings.bar=="horizontal"||graph.settings.bar=="horizontal-axis-under");
                            graph.xScale
                                .domain(data[0].data.map(function(d) { return d[graph.settings.xField]; }))
                                .rangeRoundBands([0, isHorizontal?graph.height:graph.width],graph.settings.barPadding,graph.settings.barMargin);
                            graph.xScale1.domain(data.map(function(d,i) { return i; })).rangeRoundBands([0, graph.xScale.rangeBand()])    
                            data.map(function(d,i) {
                                data[i].data = d.data.map(function(p, i) {
                                    var obj = {x:i, y:(p[graph.settings.yField]<0?0:p[graph.settings.yField]), y0:(p[graph.settings.yField]<0?p[graph.settings.yField]:0)}
                                    obj[graph.settings.xField] = p[graph.settings.xField];
                                    obj[graph.settings.yField] = p[graph.settings.yField];
                                    return obj;
                                });
                            });
                            if(graph.settings.stack){
                                 var stack = d3.layout.stack()
                                .offset(graph.settings.stackOffset)
                                .values(function (d) { return d.data; });
                                
                                data = stack(data);
                            }
                            var yMin = (graph.settings.yAxisMin||graph.settings.yAxisMin===0)?graph.settings.yAxisMin:domain("min",data,false,graph);
                            var yMax = graph.settings.yAxisMax?graph.settings.yAxisMax:domain("max",data,false,graph);
                            // here is where in need to fix the percentage check. 
                            var getTotal = function(d,i){
                                var total = 0;
                                data.forEach(function(dd){
                                    total+=dd.data[i][graph.settings.yField];
                                });
                                return total;
                            }
                            data.forEach(function(d){
                                d.total = 0;
                                d.data.forEach(function(dd){
                                    d.total+=dd[graph.settings.yField];
                                });
                            });
                            graph.yScale
                                .domain([(yMin-((yMax-yMin)*graph.settings.yAxisFactor)),(yMax+((yMax-yMin)*graph.settings.yAxisFactor))])
                                .range(isHorizontal?[0, graph.width]:[graph.height,0]);
                            
                            if (graph.settings.barBacks) {
                                graph.rectBacks = graph.rectBackGroup.selectAll(".barBack").data(data[0].data);
                            }
                            
                            var yfunc = function(d) {
                                return isHorizontal?graph.yScale(d.y0):graph.height-(graph.height-graph.yScale(d.y));
                            };
                            var hfunc = function(d) {
                                return isHorizontal?(graph.settings.stack?graph.yScale(d.y):graph.yScale(d.y)-graph.yScale(d.y0)):graph.height-graph.yScale(d.y);
                            };
                            var hfuncLabel = function(d,ele) {
                                var text_node = ele.node().getBBox();
                                var text_width = text_node.width;
                                var text_height = text_node.height;
                                var yVal = d;
                                if(isHorizontal){
                                    var output = yVal+(d<0?4:-4);
                                    if (graph.settings.bar=="horizontal-axis-under"&&(yVal<(d<0?(text_width+8)*-1:text_width+8))) {
                                        output+=8;
                                        ele
                                        .style("text-anchor",d<0?"end":"start")
                                        .style("fill", "#000000")
                                    }else{
                                        ele
                                        .style("text-anchor",d<0?"start":"end")
                                        .style("fill", "#ffffff")
                                    }
                                }else{
                                    var output = yVal+text_height+3;
                                    if(graph.height-yVal<text_height+6){
                                        output-=text_height+6;
                                        ele
                                        .style("fill", "#000000")
                                    }else{
                                       ele
                                        .style("fill", "#ffffff")  
                                    }
                                }
                                return output;
                            };
                            var widthHeight = (isHorizontal?"width":"height");
                            var heightWidth = (isHorizontal?"height":"width");
                            var xY = (isHorizontal?"x":"y");
                            var yX = (isHorizontal?"y":"x");
                            if (graph.settings.barBacks) {
                                var attribs = {"class" : "barBack"}
                                attribs[widthHeight] = (isHorizontal?graph.width:graph.height);
                                attribs[heightWidth] = graph.xScale.rangeBand();
                                attribs[xY] = 0;
                                attribs[yX] = function(d) { return graph.xScale(d[graph.settings.xField]); };
                                graph.rectBacks.enter()
                                    .append("rect")
                                    .attr(attribs)
                                    .style("fill", "#efeeef");
                                var transAttribs = {};
                                transAttribs[widthHeight] = (isHorizontal?graph.width:graph.height);
                                transAttribs[heightWidth] = graph.xScale.rangeBand();
                                transAttribs[yX] = function(d) { return graph.xScale(d[graph.settings.xField]); };
                                graph.rectBacks.transition()
                                    .ease("linear")
                                    .duration(graph.settings.speed)
                                    .attr(transAttribs);
                            }
                            graph.rectGroup = graph.svgGroup.selectAll(".bar-group").data(data);
                                graph.rectGroup.enter().append("g")
                                .attr("class", "bar-group")
                                .style("fill", function(d,i) { return data[i].color; });
                            graph.rectGroup.attr("transform", function(d,i) { return "translate(" + (isHorizontal?0:(graph.settings.stack?0:graph.xScale1(i))) + "," + (isHorizontal?(graph.settings.stack?0:graph.xScale1(i)):0) + ")"; });
                                
                            graph.rect = graph.rectGroup.selectAll(".bar")
                                .data(function(d) { return d.data; });
                            
                            if (graph.settings.barLabels) {
                                graph.rectLabel = graph.rectGroup.selectAll(".barLabel")
                                    .data(function(d) { d.data.forEach(function(dd){dd._total=d.total;});return d.data; });
                            }
                            var attribs = {"class":"bar"};
                            attribs[widthHeight] = 0;
                            attribs[heightWidth] = graph.settings.stack?graph.xScale.rangeBand():graph.xScale1.rangeBand();
                            attribs[xY] = graph.yScale(0);
                            attribs[yX] = function(d) { return graph.xScale(d[graph.settings.xField]); };
                            graph.rect.enter()
                                .append("rect")
                                .attr(attribs);
                            var transAttribs = {};
                            transAttribs[widthHeight] = hfunc;
                            transAttribs[heightWidth] = graph.settings.stack?graph.xScale.rangeBand():graph.xScale1.rangeBand();
                            transAttribs[xY] = yfunc;
                            transAttribs[yX] = function(d) { return graph.xScale(d[graph.settings.xField]); };
                            
                            graph.rect.transition()
                                .ease("linear")
                                .duration(graph.settings.speed)
                                .attr(transAttribs);
                            if (graph.settings.barLabels) {
                                    var labelAttribs = {}
                                    labelAttribs[xY] = function(d){return hfuncLabel(graph.yScale(0),d3.select(this));};
                                    labelAttribs[yX] = function(d) { return graph.xScale(d[graph.settings.xField])+((graph.settings.stack?graph.xScale.rangeBand():graph.xScale1.rangeBand())/2)+(isHorizontal?5:0)};
                                    graph.rectLabel.enter()
                                        .append("text")
                                        .attr("class", "barLabel")
                                        .style("text-anchor",(isHorizontal?"end":"middle"))
                                        .style("fill", "#ffffff")
                                        .text(function(d,i) { return graph.settings.labelPercentage?(Math.round((d[graph.settings.yField]/(graph.settings.stack?getTotal(d,i):d._total))*100))+"%":Math.round(d[graph.settings.yField]*100)/100;  })
                                        .attr(labelAttribs);
                                    var labelTransAttribs = {};
                                    labelTransAttribs[xY] = function(d){
                                        var value = isHorizontal?graph.yScale(d.y0)+graph.yScale(d.y):graph.height-(graph.height-graph.yScale(d.y));
                                        return hfuncLabel(value,d3.select(this));};
                                    labelTransAttribs[yX] = function(d) { return graph.xScale(d[graph.settings.xField])+((graph.settings.stack?graph.xScale.rangeBand():graph.xScale1.rangeBand())/2)+(isHorizontal?5:0); };
                                    graph.rectLabel.transition()
                                        .ease("linear")
                                        .duration(graph.settings.speed)
                                        .text(function(d,i) { return graph.settings.labelPercentage?(Math.round((d[graph.settings.yField]/(graph.settings.stack?getTotal(d,i):d._total))*100))+"%":Math.round(d[graph.settings.yField]*100)/100; })
                                        .attr(labelTransAttribs);
                                    graph.rectLabel.exit().remove();
                            } 
                            graph.rect.exit().remove();      
                            
                            break;
                        case "pie":
                            graph.radius = (Math.min(graph.width,graph.height)/2);
                            
                          //  console.log("radius",graph.radius,$(this).attr("class"))
                            graph.arc = d3.svg.arc()
                                .outerRadius(graph.radius*graph.settings.outterRadius)
                                .innerRadius(graph.radius*graph.settings.innerRadius)
                                .startAngle(function(d) { return d.startAngle + (graph.settings.startAngle * (Math.PI/180)); })
                                .endAngle(function(d) { return d.endAngle + (graph.settings.startAngle * (Math.PI/180)); });
                            
                            graph.path = //d3.select(ele.get(0)).selectAll("svg").selectAll("g.main-group").selectAll("path")
                                graph.svgGroup.selectAll("path.line")
                                .data(graph.pie(data));
                            graph.path.enter()
                                .append("path")
                                .attr("class","line")
                                .attr("fill", function(d,i) {return d.data.color;})
                                .each(function(d) {this._current = d;})
                                //.attr("d", graph.arc);
                            graph.path
                                .transition()
                                .ease("linear")
                                .duration(graph.settings.speed)
                                //tween pie sectors around the centre point for good movement:
                                .attrTween("d", function(a) {
                                    var i = d3.interpolate(this._current, a);
                                    this._current = i(0);
                                    return function(t) {
                                      return graph.arc(i(t));
                                    };
                                });
                                if (graph.settings.pie=="single"||graph.settings.pie=="double") {
                                    var texts = pieText(saveData,data,graph);
                                    
                                    graph.svgGroup.select("tspan.center.number")
                                       .text(graph.settings.centerPreFix+texts[0]+graph.settings.centerPostFix);
                                    
                                    graph.svgGroup.select('tspan.center.word')
                                        .text(texts[1]);
                                
                                }
                            break;
                    }
                    
                    if (graph.settings.xAxis&&graph.settings.xAxis.on){
                        var marginTop = (graph.height+graph.settings.margin.top);
                        var marginLeft = graph.settings.margin.left;
                        var styles= graph.settings.styles.xAxisText;
                        if (graph.settings.bar&&graph.settings.bar=="horizontal") {
                            styles = {};
                            marginTop = graph.settings.margin.top;
                        }else if (graph.settings.bar&&graph.settings.bar=="horizontal-axis-under"||graph.settings.range) {
                            marginTop = graph.settings.margin.top + (graph.xScale.rangeBand()/2)+12;
                            marginLeft = graph.settings.margin.left+5;
                        }
                        var xAxisGroup = graph.svg.select("."+graph.settings.type+".xaxis")
                            .transition().ease("linear").duration(graph.settings.speed)
                            .attr("transform", "translate(" + marginLeft + "," +  marginTop + ")")
                            .style(graph.settings.styles.axis)
                            .call(graph.xAxis.innerTickSize((graph.settings.type=="line"&&!(graph.settings.line=="radial")&&graph.settings.showGrid)?-graph.height:0))
                            
                        xAxisGroup.selectAll("text").attr("class",graph.settings.type+" xaxistext")
                            .style(graph.settings.styles.axisText)
                            .style(styles);
                            
                        xAxisGroup.selectAll("line")
                            .attr("class",graph.settings.type+" xaxistick")
                            .style(graph.settings.styles.innerAxis);
                    }
                    if (graph.settings.yAxis&&graph.settings.yAxis.on){
                       var marginLeft = graph.settings.margin.left;
                       var marginTop = graph.settings.margin.top;
                        if (graph.settings.line=="radial") {
                            marginLeft = ((graph.width / 2 ) + graph.settings.margin.left);
                        }
                        var yAxisGroup = graph.svg.select("."+graph.settings.type+".yaxis")
                            .transition().ease("linear").duration(graph.settings.speed)
                            .attr("transform", "translate(" + marginLeft + "," + marginTop + ")")
                            .style(graph.settings.styles.axis)
                            .call(graph.yAxis.innerTickSize((graph.settings.type=="line"&&!(graph.settings.line=="radial")&&graph.settings.showGrid)?-graph.width:0))
                            
                            
                        yAxisGroup.selectAll("text").attr("class",graph.settings.type+" yaxistext")
                            .style(graph.settings.styles.axisText);
                                
                        yAxisGroup.selectAll("line")
                            .attr("class",graph.settings.type+" yaxistick")
                            .style(graph.settings.styles.innerAxis);
                    }
                    graph.svg
                        .transition()
                        .ease("linear")
                        .duration(graph.settings.speed)
                        .attr({"width" : graph.width+graph.settings.margin.left + graph.settings.margin.right,"height" : graph.height+ graph.settings.margin.top + graph.settings.margin.bottom});
                    if (isCenterPieOrRadial(graph)) {
                        graph.svg.select("g.main-group")
                            .transition()
                            .ease("linear")
                            .duration(graph.settings.speed)
                            .attr("transform", "translate(" + ((graph.width / 2 ) + graph.settings.margin.left) + "," + ((graph.height / 2) + graph.settings.margin.top) + ")")
                        
                    }
                    if (graph.settings.showGrid&&graph.settings.line=="radial") {
                        graph.svg.select("g.grid-group").transition()
                            .ease("linear")
                            .duration(graph.settings.speed)
                            .attr("transform", "translate(" + ((graph.width / 2 ) + graph.settings.margin.left) + "," + ((graph.height / 2) + graph.settings.margin.top) + ")")
                    }
                }
                //update graph in case any changes have been made in the processing:
                ele.data("graph",graph);
            }
        });
    }
}( jQuery ));