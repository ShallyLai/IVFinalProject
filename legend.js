
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
    .text('學術產出');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 35)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('師生比');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 60)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('國際學生人數');	

legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 85)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('國際教師人數');	