
// The svg
const map_margin = { top: 10, right: 10, bottom: 10, left: 10 };
const map_width = 500 - map_margin.left - map_margin.right;
const map_height = 320 - map_margin.top - map_margin.bottom;

const map_svg = d3.select("#myMap")
    .append("svg")
    .attr("width", map_width)
    .attr("height", map_height)
    .append("g")
    .attr("transform", `translate(${map_margin.left},${map_margin.top})`);

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
    .scale(70)
    .center([0, 20])
    .translate([map_width / 2, map_height / 2 ]);

// Data and color scale
const map_data = new Map();
const ContinentsColor = ["#DF5777", "#F78C6B", "#FFD166", "#06D6A0", "#118AB2", "#8E74BF"];

const map_tooltip = d3.select("#myMap")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white");

// Load external data and boot
Promise.all([
    d3.json("https://raw.githubusercontent.com/ShallyLai/IVFinalProject/main/Continents.json")])
    .then(function (loadData) {

        let topo = loadData[0];

        let mapMouseOver = function (d) {
            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", .3);
            d3.select(this)
                .transition()
                .duration(100)
                .style("opacity", 1);

            map_tooltip
                .transition()
                .duration(200)
                .style("opacity", .8);
            map_tooltip
                .style("left", d.pageX + 'px')
                .style("top", (d.page - 100) + 'px')
                .html(d.target.__data__.properties.region);
                //console.log(d.pageX-850,d.pageY)

        }

        let mapMouseMove = function (d) {
          
            map_tooltip
                .style("left", d.pageX + 'px')
                .style("top", (d.pageY - 100) + 'px')
                .html(d.target.__data__.properties.region);
               // console.log(d.pageX,d.pageY)

        }

        let mapMouseLeave = function (d) {
            d3.selectAll(".Country")
                .transition()
                .duration(100)
                .style("opacity", 1);
            d3.select(this)
                .transition()
                .duration(200);

            map_tooltip
                .transition()
                .duration(200)
                .style("opacity", 0);

        }

        let mapClick = function (d) {
            var thisContinent = d.target.__data__.properties.region;
            // console.log(thisContinent);
            FilterRegion(thisContinent);
        }

        // Draw the map
        map_svg.append("g")
            .selectAll("path")
            .data(topo.features)
            .enter()
            .append("path")
            // draw each country
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            // set the color of each country
            .attr("fill", function (d) {
                // console.log(d.properties.region);
                switch (d.properties.region) {
                    case "Asia":
                        return ContinentsColor[0];
                        break;
                    case "Latin America":
                        return ContinentsColor[1];
                        break;
                    case "Africa":
                        return ContinentsColor[2];
                        break;
                    case "Oceania":
                        return ContinentsColor[3];
                        break;
                    case "North America":
                        return ContinentsColor[4];
                        break;
                    case "Europe":
                        return ContinentsColor[5];
                        break;
                }
            })
            .attr("class", function (d) { return "Country" })
            .style("opacity", 1)
            .on("mouseover", mapMouseOver)
            .on("mousemove", mapMouseMove)
            .on("mouseleave", mapMouseLeave)
            .on("click", mapClick);

    })