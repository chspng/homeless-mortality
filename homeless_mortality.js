// MSC2003Y: Assignment 3
// This file contains D3 code for generating an interactive data visualization exploring causes of mortality among homeless populations in Canada
// Christine P'ng

d3.selectAll("p").style("color", "blue");

d3.selectAll("p").style("color", function() {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
});

d3.select("body")
	.append("svg")
	.attr("width", 50)
	.attr("height", 50)
	.append("circle")
	.attr("cx", 25)
	.attr("cy", 25)
	.attr("r", 25)
	.style("fill", "purple");

d3.select("body").style("background-color", "black");
