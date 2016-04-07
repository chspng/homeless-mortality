// MSC2003Y: Assignment 3
// This file contains D3 code for generating an interactive data visualization exploring causes of mortality among homeless populations in Canada
// Christine P'ng

// initialize variables
var margin = {top: 30, right: 30, bottom: 30, left: 100},
    width = 850 - margin.left - margin.right,
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

// create plotting space
var chartspace = d3.select("body")
    .append("svg")
      .attr("width", width)
      .attr("height", height);
 
// read in data
d3.tsv("datafile-male", type, function(error, data){
	if (error) throw error;

	// setting up the scaling of data points to fit within the frame
	xscale.domain([d3.min(data, function(d) {return Math.floor(d.Ratio);}), d3.max(data, function(d) {return Math.ceil(d.Ratio);})]); 
	yscale.domain([d3.min(data, function(d) {return Math.floor(d.Difference - 100);}), d3.max(data, function(d) {return Math.ceil(d.Difference + 100);})]);
	xaxis.scale(xscale)
		.tickSize(-550 );
	yaxis.scale(yscale)
		.tickSize(-480);

	// adding interactivity
	// var zoom = d3.behavior.zoom()
	// 	.x(xaxis)
	// 	.y(yaxis)
	// 	.scaleExtent([1, 32])
	// 	.on("zoom", zoomed);

	// chartspace.append("g")
	// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
 //    	.call(zoom);

    chartspace.append("rect")
		.attr("width", width)
		.attr("height", height);

	// adding the data points
	chartspace.selectAll("circle")
		.data(data)
	  .enter()
		.append("circle")
		  .attr("cx", function(d) {return xscale(d.Ratio); }) 
		  .attr("cy", function(d) {return yscale(d.Difference); })
		  .attr("r", 5)
		  .style("stroke", "steelblue")
		  .style("stroke-width", 1.5)
		  .style("fill", "none")
		  
		  .on("mouseover", function(d){
		  	// highlight points upon mouseover event
		  	d3.select(this)
		  	  .transition()
		  	  .duration(100)
		  	  .style("fill", "red")
		  	  .attr("r", 10)

		  	// set tooltip  
		  	var xposition = parseFloat(d3.select(this).attr("x")) ; // FIX LOCATIONS
		  	var yposition = parseFloat(d3.select(this).attr("y")) ;

		  	d3.select("#tooltip")
		  		.style("left", xposition + "px")
		  		.style("top", yposition + "px")
		  		.select("#cause")
		  			.text(d.Cause + " " + d.Subcause);

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
		  	  .duration(100)
		  	  .style("fill", "none")
		  	  .attr("r", 5)
		  });

		  // .on("mouseover", function(d){
		  // 	var xposition = parseFloat(d3.select(this).attr("x")) ; // FIX LOCATIONS
		  // 	var yposition = parseFloat(d3.select(this).attr("y")) ;

		  // 	d3.select("#tooltip")
		  // 		.style("left", xposition + "px")
		  // 		.style("top", yposition + "px")
		  // 		.select("#ratio")
		  // 			.text(d.Ratio);

		  // 	d3.select("tooltip")
		  // 		.select("#cause")
		  // 			.text(d.cause);


		  // 	d3.select("#tooltip")
		  // 		.classed("hidden", false);

		  // })
		  // .on("mouseout", function(){
		  // 	//hide tooltip
		  // 	d3.select("#tooltip").classed("hidden", true);
		  // })
		  
		  // Added point info upon mouseover
		  // .append("title")
		  // .text(function(d){
		  // 	return (d.Cause + " " + d.Subcause);
		  // });

	// chartspace.selectAll("text")
	// 	.data(data)
	//   .enter()
	//   	.append("text")
	//   	  .text(function(d) {return d.Cause; })
	//   	    .attr("x", function(d) { return xscale(d.Ratio) + 5; })
	//   	    .attr("y", function(d) { return yscale(d.Difference) + 3; })
	//   	    .attr("font-family", "sans-serif")
	//   	    .attr("font-size", "10px");

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
	    .style("text-anchor", "end")
	    .text("Mortality Rate Difference");

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


// function zoomed(){
// 	svg.select(".xaxis.axis").call(xaxis);
// 	svg.select(".yaxis.axis").call(yaxis);
// }
