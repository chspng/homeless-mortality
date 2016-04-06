// MSC2003Y: Assignment 3
// This file contains D3 code for generating an interactive data visualization exploring causes of mortality among homeless populations in Canada
// Christine P'ng

// set up variables
var width = 300,
    height = 300;

// create frame for scatterplot
var chartspace = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


// read in data
d3.tsv("datasubset.tsv", type, function(error, data){

	chartspace.selectAll("circle")
		.data(data)
	  .enter()
		.append("circle")
		  .attr("cx", function(d) {return d.Ratio; })
		  .attr("cy", function(d) {return d.Difference; })
		  .attr("r", 2)
		  .style("fill", "steelblue");
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



// var width = 420,
//     barHeight = 20;

// var x = d3.scale.linear()
//     .range([0, width]);

// var chart = d3.select(".chart")
//     .attr("width", width);

// //this works in firefox, not chrome
// d3.tsv("tempdata.tsv", type, function(error, data) {
//   x.domain([0, d3.max(data, function(d) { return d.value; })]);

//   chart.attr("height", barHeight * data.length);

//   var bar = chart.selectAll("g")
//       .data(data)
//     .enter().append("g")
//       .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

//   bar.append("rect")
//       .attr("width", function(d) { return x(d.value); })
//       .attr("height", barHeight - 1);

//   bar.append("text")
//       .attr("x", function(d) { return x(d.value) - 3; })
//       .attr("y", barHeight / 2)
//       .attr("dy", ".35em")
//       .text(function(d) { return d.value; });
// });

// function type(d) {
//   d.value = +d.value; // coerce to number
//   return d;
// }

// d3.select(".chart")
//     .selectAll("div")
//       .data(data)
//     .enter().append("div")
//       .style("width", function(d) { return x(d) + "px";})
//       .text(function(d) { return d; });

