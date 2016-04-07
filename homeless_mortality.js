// MSC2003Y: Assignment 3
// This file contains D3 code for generating an interactive data visualization exploring causes of mortality among homeless populations in Canada
// Christine P'ng

// set up variables
var margin = {top: 30, right: 30, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// create frame for scatterplot
var chartspace = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var padding = 70;

var xscale = d3.scale.linear()
	.rangeRound([padding, width - padding])
	.nice();

var yscale = d3.scale.linear()
	.rangeRound([height - padding, padding])
	.nice();

var xaxis = d3.svg.axis()
	.orient("bottom");

var yaxis = d3.svg.axis()
	.orient("left");



// read in data
d3.tsv("datafile-male.tsv", type, function(error, data){
	xscale.domain([d3.min(data, function(d) {return d.Ratio;}), d3.max(data, function(d) {return d.Ratio;})]); 
	yscale.domain([d3.min(data, function(d) {return d.Difference;}), d3.max(data, function(d) {return d.Difference;})]);
	xaxis.scale(xscale);
	yaxis.scale(yscale);

	chartspace.selectAll("circle")
		.data(data)
	  .enter()
		.append("circle")
		  .attr("cx", function(d) {return xscale(d.Ratio); }) // this is a temporary fix for the x axis scaling
		  .attr("cy", function(d) {return yscale(d.Difference); })
		  .attr("r", 4)
		  .style("fill", "steelblue");

	chartspace.selectAll("text")
		.data(data)
	  .enter()
	  	.append("text")
	  	  .text(function(d) {return d.Cause; })
	  	    .attr("x", function(d) { return xscale(d.Ratio) + 5; })
	  	    .attr("y", function(d) { return yscale(d.Difference) + 3; })
	  	    .attr("font-family", "sans-serif")
	  	    .attr("font-size", "10px");

	chartspace.append("g")
		.call(xaxis);
		

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

