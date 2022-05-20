
const legend_svg = d3.select("#myLegend")
    .append("svg")
    .attr("width", 200)
    .attr("height", 100)
    .attr("transform", "translate(700,40)");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 10)
    .attr('r', 8)
    .style("fill","#afc1d6");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 35)
    .attr('r', 8)
    .style("fill","#afc1d6");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 60)
    .attr('r', 8)
    .style("fill","#afc1d6");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 85)
    .attr('r', 8)
    .style("fill","#afc1d6");

//文字	
legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 10)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('Research_Output');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 35)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('Student_Faculty_Ratio');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 60)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('International_Students');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 85)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('Faculty_Count');	