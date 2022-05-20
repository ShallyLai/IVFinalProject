
const legend_svg = d3.select("#myLegend")
    .append("svg")
    .attr("width", 250)
    .attr("height", 100)
    .attr("transform", "translate(700,40)");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 10)
    .attr('r', 8)
    .style("fill","#ade8f4");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 35)
    .attr('r', 8)
    .style("fill","#48cae4");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 60)
    .attr('r', 8)
    .style("fill","#0096c7");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 85)
    .attr('r', 8)
    .style("fill","#023e8a");

//文字	
legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 10)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('Faculty Count');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 35)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('International Students');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 60)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('Student Faculty Ratio');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 85)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('Research Output');	
