
const legend_svg = d3.select("#myLegend")
    .append("svg")
    .attr("width", 500)
    .attr("height", 50)
    .attr("transform", "translate(300,40)");

legend_svg
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 10)
    .attr('r', 8)
    .style("fill",color[3]);

legend_svg
    .append('circle')
    .attr('cx', 130)
    .attr('cy', 10)
    .attr('r', 8)
    .style("fill",color[2]);

legend_svg
    .append('circle')
    .attr('cx', 250)
    .attr('cy', 10)
    .attr('r', 8)
    .style("fill",color[1]);

legend_svg
    .append('circle')
    .attr('cx', 370)
    .attr('cy', 10)
    .attr('r', 8)
    .style("fill",color[0]);

//文字	
legend_svg.append('text')
    .attr('x', 30)
    .attr('y', 10)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('國際教師');	

legend_svg.append('text')
    .attr('x', 150)
    .attr('y', 10)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('國際學生');	

legend_svg.append('text')
    .attr('x', 270)
    .attr('y', 10)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('師生比例');	

legend_svg.append('text')
    .attr('x', 390)
    .attr('y', 10)
    .attr('dy', 6)
    .style('font-size', '17px')
    .text('學術產出');	
