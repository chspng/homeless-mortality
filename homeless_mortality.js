// MSC2003Y: Assignment 3
// This file contains D3 code for generating an interactive data visualization exploring causes of mortality among homeless populations in Canada
// Christine P'ng

// initialize variables
var margin = {top: 30, right: 30, bottom: 30, left: 100},
    width = 1100 - margin.left - margin.right,
    height = 850 - margin.top - margin.bottom;

var padding = 120;

var xscale = d3.scale.linear()
	.rangeRound([padding, width - padding])
	.nice();

var yscale = d3.scale.linear()
	.rangeRound([height - padding, padding])
	.nice();

var xaxis = d3.svg.axis()
	.orient("bottom")

var yaxis = d3.svg.axis()
	.orient("left");

// read in data
d3.tsv("datafile-male", type, function(error, data){
	if (error) throw error;

	// setting up the scaling of data points to fit within the frame
	xscale.domain([d3.min(data, function(d) {return Math.floor(d.Ratio);}), d3.max(data, function(d) {return Math.ceil(d.Ratio);})]); 
	
	// this is a y scale excluding the TOTAL
	yscale.domain([d3.min(data, function(d) {return Math.floor(d.Difference - 40);}), 350]);
	
	// this is a Y scale including the TOTAL 
	//yscale.domain([d3.min(data, function(d) {return Math.floor(d.Difference - 100);}), d3.max(data, function(d) {return Math.ceil(d.Difference + 100);})]);
	
	xaxis.scale(xscale)
		.tickSize(-550 ); //THIS IS MANUALLY SET
	yaxis.scale(yscale)
		.tickSize(-730);

	// adding interactivity
	// var zoom = d3.behavior.zoom()
	// 	.x(xscale)
	// 	.y(yscale)
	// 	.scaleExtent([1, 50])
	// 	.on("zoom", zoomed);

	// create plotting space
	var chartspace = d3.select("body")
	    .append("svg")
	      .attr("width", width)
	      .attr("height", height);
		// .append("g")
		//    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  //    	  .call(zoom);

 	// background grey fill
    chartspace.append("rect")
    	.attr("x", padding)
    	.attr("y", padding)
		.attr("width", width-padding * 2)
		.attr("height", height-padding * 2);



	// adding the data points
	chartspace.selectAll("circle")
		.data(data)
	  
	  // formatting and positioning data points
	  .enter()
		.append("circle")
		  .attr("cx", function(d) {return xscale(d.Ratio); }) 
		  .attr("cy", function(d) {return yscale(d.Difference); })
		  .attr("r", 5)
		  .style("stroke", "darkred")
		  .style("stroke-width", 1.5)
		  .style("fill", "none")
		  
		  .on("mouseover", function(d){
		  	
		  	// highlight points upon mouseover event
		  	d3.select(this)
		  	  .transition()
		  	  .duration(150)
		  	  .style("fill", "red")
		  	  .attr("r", 10)

		  	// set tooltip position
		  	var xposition = parseFloat(d3.select(this).attr("x") + xscale(d.Ratio) + 20); 
		  	var yposition = parseFloat(d3.select(this).attr("y") + yscale(d.Difference) + 20);

		  	d3.select("#tooltip")
		  		.style("left", xposition + "px")
		  		.style("top", yposition + "px");

		  	var subcause = "";
		  	if (d.Subcause != ""){
		  		subcause = ("- " + d.Subcause );
		  	}

		  	// Updating the contents of the tooltip
		  	d3.select("#cause")
		  		.text(d.Cause + " " + subcause);

		  	d3.select("#ratio")
		  		.text(d.Ratio);

		  	d3.select("#ratiociupper")
		  		.text(d.Ratio_CI_Upper);

		  	d3.select("#ratiocilower")
		  		.text(d.Ratio_CI_Lower);

		  	d3.select("#difference")
		  		.text(d.Difference);

		  	d3.select("#difciupper")
		  		.text(d.Difference_CI_Upper);

		  	d3.select("#difcilower")
		  		.text(d.Difference_CI_Lower);

		  	d3.select("#tooltip")
		  		.classed("hidden", false);
		  })

		  .on("mouseout", function(){
		  	d3.select(this)
		  	  .transition()
		  	  .duration(150)
		  	  .style("fill", "none")
		  	  .attr("r", 5)
			
			d3.select("#tooltip")
		  	  .classed("hidden", true);
		  });
		  
	// adding the xaxis + x axis label
	chartspace.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (height - padding) + ")")
		.call(xaxis)
	  .append("text")
	    .attr("x", width - padding)
	    .attr("y", margin.bottom + 5)
	    .style("text-anchor", "end")
	    .text("Mortality Rate Ratio");

	// adding the yaxis + y axis label
	chartspace.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (padding) + ", 0)")
		.call(yaxis)
	  .append("text") 
	  	.attr("y", padding - 10)
	    .style("font-family", "sans-serif")
	    .style("font-size", "14px")
	    .style("text-anchor", "beginning")
	    .text("Mortality Rate Difference");

	// highlight special axes lines
	d3.selectAll("g.tick")
		.filter(function(d) {return (d==1 || d==0);})
		.select("line")
		  .style("stroke", "grey");

	// add plot title
	chartspace.append("text")
		.attr("y", margin.top * 2)
		.attr("x", padding)
		.style("font-weight", "bold")
		.style("font-size", "16px")
		.style("font-family", "sans-serif")
		.text("Mortality among the homeless and marginally housed, by major cause of death");

	// function zoomed(){
	// 	chartspace.select(".xscale.axis").call(xaxis);
	// 	chartspace.select(".yscale.axis").call(yaxis);
	// }
	// add citation
	// chartspace.append("text")
	// 	.attr("y", height - margin.bottom)
	// 	.attr("x", padding)
	// 	.style("font-size", "10px")
	// 	.style("font-family", "sans-serif")
	// 	.text("Data source: Hwang Stephen W, Wilkins Russell, Tjepkema Michael, O’Campo Patricia J, Dunn James R. Mortality among residents of shelters, rooming houses, and hotels in Canada: 11 year follow-up study BMJ 2009; 339 :b4036")
	// 	  .call(wrap, width - padding * 2);


});

//this function coerces the appropriate columns to numerals
function type(d){
	d.Ratio = +d.Ratio;
	d.Ratio_CI_Upper = +d.Ratio_CI_Upper;
	d.Ratio_CI_Lower = +d.Ratio_CI_Lower;
	d.Difference = +d.Difference;
	d.Difference_CI_Upper = +d.Difference_CI_Upper;
	d.Difference_CI_Lower = +d.Difference_CI_Lower;
	return d;
}



// function wrap(text, width){
// 	text.each(function() {
//     var text = d3.select(this),
//         words = text.text().split(/\s+/).reverse(),
//         word,
//         line = [],
//         lineNumber = 0,
//         lineHeight = 1.1, // ems
//         yscale = text.attr("y"),
//         dy = parseFloat(text.attr("dy")),
//         tspan = text.text(null).append("tspan").attr("x", 0).attr("y", yscale).attr("dy", dy + "em");
//     while (word = words.pop()) {
//       line.push(word);
//       tspan.text(line.join(" "));
//       if (tspan.node().getComputedTextLength() > width) {
//         line.pop();
//         tspan.text(line.join(" "));
//         line = [word];
//         tspan = text.append("tspan").attr("x", 0).attr("y", yscale).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
//       }
//     }
//   });
// }



