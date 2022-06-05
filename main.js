// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 20, left: 50 };
const width = 20020 - margin.left - margin.right;
const height = 415 - margin.top - margin.bottom;

const color = ["#FF7E67", "#F9D923", "#00c5c8", "#5c7aff"];

// append the svg object to the body of the page
const svg = d3.select("#myStackBar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height * 1.42 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const states_svg = d3.select("#NowStates")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 50)
    .attr("transform", "translate(40, 40)");

// Add X axis
const X_axis = svg.append("g");

// Add Y axis
const y = d3.scaleLinear()
  .range([height, 0]);
const Y_axis = svg.append("g");

// Add data into a container
const container = svg.append("g");

// Create tooltip
const tooltip = d3.select("#myStackBar")
  .append("div")
  .attr("class", "tooltip")
  .attr("transform", "translate(0,0")
  .style("opacity", 0)
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("position", "absolute")
  .style("color", "#FBFCFC")
  .style("background-color", "#212F3C")
  .style("font-family", "Microsoft JhengHei");

// when the input range changes update the weight 
d3.select("#nWeight_ResearchO").on("input", function () {
  update(+this.value, "Research", clonedThisYear);
});
d3.select("#nWeight_SFRatioO").on("input", function () {
  update(+this.value, "SFRatio", clonedThisYear);
});
d3.select("#nWeight_InterStuO").on("input", function () {
  update(+this.value, "InterStu", clonedThisYear);
});
d3.select("#nWeight_FC").on("input", function () {
  update(+this.value, "FC", clonedThisYear);
});

// Set weight dynamically
function update(nWeight, name, clonedThisYear) {
  if (name == "Research") {
    d3.select("#nWeight_ResearchO-value").text(nWeight);
    d3.select("#nWeight_ResearchO").property("value", nWeight);
    Research_weight = nWeight;
  } else if (name == "SFRatio") {
    d3.select("#nWeight_SFRatioO-value").text(nWeight);
    d3.select("#nWeight_SFRatioO").property("value", nWeight);
    SFRatio_weight = nWeight;
  } else if (name == "InterStu") {
    d3.select("#nWeight_InterStuO-value").text(nWeight);
    d3.select("#nWeight_InterStuO").property("value", nWeight);
    InterStu_weight = nWeight;
  } else {
    d3.select("#nWeight_FC-value").text(nWeight);
    d3.select("#nWeight_FC").property("value", nWeight);
    FC_weight = nWeight;
  }
  clonedThisYear = JSON.parse(JSON.stringify(ThisYear));

  draw(clonedThisYear);
}

function draw(clonedThisYear) {
  
  // multiply weight
  for (var i in clonedThisYear) {
    clonedThisYear[i].ResearchOutput *= Research_weight;
    clonedThisYear[i].SFRatio *= SFRatio_weight;
    clonedThisYear[i].InterStu *= InterStu_weight;
    clonedThisYear[i].FCount *= FC_weight;
  }

  clonedThisYear = MergeSort(clonedThisYear);
  // List of subgroups is the header of ThisYear array  
  const subgroups = Object.keys(clonedThisYear[0]).slice(1);
  //console.log(subgroups);

  // Value of the first column called group
  //const groups = clonedThisYear.map(d => d.University);
  const groups = clonedThisYear.map(d => {
    if(d.University === 'Universitat de Barcelona' || d.University === "Universitat Autònoma de Barcelona" || d.University === "Universidade de São Paulo" || d.University === "Universidade Federal de São Paulo"){
      return d.University;
    }
    else if(d.University.length > 20){
      splited = d.University.split(/[\s-]+/);
      len = splited.length;
      return (splited[0] + '...' + splited[len - 2] + ' ' + splited[len - 1]);
    }
    else 
      return d.University;
  });
  
  let x = d3.scaleBand()
    .range([0, clonedThisYear.length * 40])
    .padding([0.2]);
  x.domain(groups);
  X_axis.attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll("text")
    .style("text-anchor", "end")
    .style("font-family", "Georgia")
    .attr("dx", "-.8em")
    .attr("dy", ".10em")
    .attr("transform", "rotate(-70)");

  y.domain([0, 100 * (Research_weight + SFRatio_weight + InterStu_weight + FC_weight)]);
  Y_axis.call(d3.axisLeft(y));
 
  //stack the data? --> stack per subgroup
  const stackedData = d3.stack()
    .keys(subgroups)
    (clonedThisYear);
  // console.log(ThisYear);
  // console.log(stackedData);

  // Show the bars, highlight a specific subgroup when hovered        
  var colorPen = color[0]; 
  var colorRecord = []; 
  var val = 0;    
  
  container
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .join("g")
    .attr("fill", function (d, i) {
      val = (d[i][1] - d[i][0]).toFixed(2); //round up @5 round down @4
      // console.log((d[i][1]-d[i][0]).toFixed(2));
      console.log(d[i])
    
      if(val == (d[i].data.ResearchOutput).toFixed(2) && colorRecord.indexOf(color[0]) == -1){
        colorPen = color[0];
      }else if(val == (d[i].data.SFRatio).toFixed(2) && colorRecord.indexOf(color[1]) == -1){
        colorPen = color[1];
      }else if(val == (d[i].data.InterStu).toFixed(2) && colorRecord.indexOf(color[2]) == -1){
        colorPen = color[2];
      }else if(val == (d[i].data.FCount).toFixed(2) && colorRecord.indexOf(color[3]) == -1){
        colorPen = color[3];
      }else{
        for(var i= 0; i<=3; i++){
          if(colorRecord.indexOf(color[i])==-1){
            colorPen =color[i];
            break;
          }
        }
      }
      colorRecord[colorRecord.length] = colorPen;
      if(colorRecord.length == 4){
        colorRecord = [];
      }
      return colorPen;
    })
    .attr("class", d => "myRect " + d.key) // Add a class to each subgroup
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(d => d)
    .join("rect")
    .transition()
    .duration(200)
    .attr("x", function (d) {
      if(d.data.University === 'Universitat de Barcelona' || d.data.University === "Universitat Autònoma de Barcelona" || d.data.University === "Universidade de São Paulo" || d.data.University === "Universidade Federal de São Paulo"){
        return x(d.data.University);
      }
      else if(d.data.University.length > 20){
        splited = d.data.University.split(/[\s-]+/);
        len = splited.length;
        return x(splited[0] + '...' + splited[len - 2] + ' ' + splited[len - 1]);
      }
      else 
        return x(d.data.University);
    })
    .attr("y", d => y(d[1]) - 0.8)
    .attr("class", d => d.data.University.replace(/[^a-zA-Z]/g, '-'))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    .attr("stroke", "white");
  
  container
    .on("mouseover", function (d) {
      d3.selectAll("rect")
        .style("opacity", 0.2);
      d3.selectAll("."+d.toElement.__data__.data.University.replace(/[^a-zA-Z]/g, '-'))
        .style("opacity", 1)
        .transition()
        .duration(200);
      // console.log(d3.selectAll("."+d.toElement.__data__.data.University.replace(/[^a-zA-Z]/g, '-')).style("opacity"))

      tooltip
        .transition()
        .duration(200)
        .style("opacity", 1);
      tooltip
        .style("left", event.pageX - 550 + "px")
        .style("top", event.pageY - 280 + "px")
        .html("西元 " + NowYear + " 年<br>" + d.toElement.__data__.data.University + "<br>國家：" + tooltipMap.get(d.toElement.__data__.data.University).Country + "<br>學術產出：" + RSOutput(tooltipMap.get(d.toElement.__data__.data.University).ResOpt) + "<br>師生比例：1:" + tooltipMap.get(d.toElement.__data__.data.University).SFRatio + "<br>國際學生：" + tooltipMap.get(d.toElement.__data__.data.University).IntStu + " 人<br>國際教師：" + tooltipMap.get(d.toElement.__data__.data.University).FCount + " 人");
      // console.log(d);
    })
    .on("mouseleave", function (d) { 
      d3.selectAll("rect")
        .style("opacity", 1);
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
    })
    .on("mouseout", function (d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
    });

  // Remove text before
  svg.selectAll("text.rect").remove();

  // Show rank on top of stacked bar chart
  const groups_org = clonedThisYear.map(d => d.University);
  const x_org = x.domain(groups_org);
  const text = svg.selectAll("text.rect").data(clonedThisYear);
  
  text  
    .enter()
    .insert("text")
    .attr("class", "rect")
    .attr("text-anchor", "middle")
    .attr("x", function (d) { 
      return x_org(d.University) + x_org.bandwidth() / 2; 
    })
    .attr("y", function (d) {  
      return y(50);
    })
    .style("fill", "rgb(0, 0, 0)")
    .style("font-family", "Georgia")
    .style("font-size","10px")
    .text(function (d, i) { 
      // console.log(i);
      if(i == "0")
        return "1st";
      else if(i == "1")
        return "2nd";
      else if(i == "2")
        return "3rd";
      else
        return (i + 1) + "th";
    });

  text
    .enter()
    .append("text")
    .attr("class", "rect")
    .attr("text-anchor", "middle")
    .attr("x", function (d) { 
      return x_org(d.University) + x_org.bandwidth() / 2; 
    })
    .attr("y", function (d) { 
      return y(d.SFRatio + d.ResearchOutput + d.InterStu + d.FCount) - 5;
    })
    .style("fill", "rgb(0, 0, 0)")
    .style("font-family", "Georgia")
    .style("font-size","9px")
    .text(function (d) { 
      // console.log(d);
      return Math.round((d.SFRatio + d.ResearchOutput + d.InterStu + d.FCount) * 1) / 1; 
    });

  // Show states now on top on stacked bar chart 
  states_svg.selectAll("text").remove();
  states_svg.append("text")
    .attr("x", 5)
    .attr("y", 10)
    .attr("dy", 10)
    .style("font-size", "20px")
    .style("font-family", "Microsoft YaHei")
    .text(function () {
      if(SetRegion == false){
        return NowYear + "年 " + "全部國家";
      }
      else {
        return NowYear + "年 " + Region;
      }
    });  
}

// order 'topush' obj
function orderObj(row){
  let ResearchOutput_obj = {ResearchOutput: row.research_output};
  let SFRatio_obj = {SFRatio: row.SFRatio_Nor * 100};
  let InterStu_obj = {InterStu: row.IntStu_Nor * 100};
  let FC_obj =  {FCount: row.FC_Nor * 100}; 
  topush = {University: row.university};
  
  for(var i = 0; i < order.length; i++){
    
    if(order[i] == '學術產出'){
      Object.assign(topush, ResearchOutput_obj);
    }else if(order[i] == '師生比例'){
      Object.assign(topush, SFRatio_obj);
    }else if(order[i] == '國際學生'){
      Object.assign(topush, InterStu_obj);
    }else if(order[i] == '國際教師'){
      Object.assign(topush, FC_obj);
    }
  } 
  //console.log(topush)
}

// reorder whole data
function orderData(){
  // reset 'ThisYear'
  ThisYear = [];

  // Seperate data with year
  data.forEach(function (row) { 
    orderObj(row);
    if (SetRegion == false) {
      if (row.year == NowYear) {
        ThisYear.push(topush);
        tooltipMap.set(row.university, {ResOpt: row.research_output, SFRatio: row.student_faculty_ratio, IntStu: row.international_students, FCount: row.faculty_count, Country: row.country});
      }
    }else if (SetRegion == true) {
      if (row.year == NowYear && row.region == Region) {
        //topush = { University: row.university, ResearchOutput: row.research_output, SFRatio: row.SFRatio_Nor * 100, InterStu: row.IntStu_Nor * 100, FC: row.FC_Nor * 100 };
        ThisYear.push(topush);
        tooltipMap.set(row.university, {ResOpt: row.research_output, SFRatio: row.student_faculty_ratio, IntStu: row.international_students, FCount: row.faculty_count, Country: row.country});
      }
    }
  });
  //console.log(ThisYear);
}

var data;
var NowYear;
var ThisYear;
var clonedThisYear;
var Research_weight;
var SFRatio_weight;
var InterStu_weight;
var FC_weight;
var SetRegion = false;
var Region;
var order = ["學術產出", "師生比例", "國際學生", "國際教師"];
var topush = {};
var tooltipMap;

// Parse the Data
function Year(EnterYear) {
  Promise.all([
    d3.json("https://raw.githubusercontent.com/ShallyLai/IVFinalProject/main/Continents.json"),
    d3.csv("https://raw.githubusercontent.com/ShallyLai/IVFinalProject/main/QS.csv")
  ]).then(function (initialize) {

    let dataGeo = initialize[0]; // Continent map
    data = initialize[1]; // QS data
    NowYear = EnterYear; // select year
    ThisYear = [];
    tooltipMap = new Map();
    
    orderData();
    //console.log(data)
    //console.log(ThisYear);
    resetWeight();
  })
}

// Initialize the plot
Year(2022);

function changeOrder(number) {

  switch (number) {
    case 0:
      order[0] = "學術產出";
      order[1] = "師生比例";
      order[2] = "國際學生";
      order[3] = "國際教師";
      break;
    
    case 1:
      var tmp = order[0];
      order[0] = order[1];
      order[1] = tmp;
      break;

    case 12:
      var tmp = order[1];
      order[1] = order[2];
      order[2] = tmp;
      break;

    case 23:
      var tmp = order[2];
      order[2] = order[3];
      order[3] = tmp;
      break;
  }

  d3.select("#order0").text("　" + order[0] + "　");
  d3.select("#order1").text("　" + order[1] + "　");
  d3.select("#order2").text("　" + order[2] + "　");
  d3.select("#order3").text("　" + order[3] + "　");
  //console.log(order);
  
  orderData();
  clonedThisYear = JSON.parse(JSON.stringify(ThisYear));
  draw(clonedThisYear);

}

// Set research output level in tooltip 
function RSOutput(score) {
  if (score == 100)
    return ("Very High");
  else if (score == 75)
    return ("High");
  else if (score == 50)
    return ("Medium");
  else
    return ("Low");
}

// Filter region we want
function FilterRegion(EnterRegion) {
  // console.log(EnterRegion);
  // console.log(typeof(EnterRegion));
  if(EnterRegion == "All") {  
    SetRegion = false;
    Year(NowYear);
  }
  else {
    SetRegion = true;
    Region = EnterRegion;
    Year(NowYear);
  }
}

function resetWeight() {
  
  d3.select("#nWeight_ResearchO-value").text(5);
  d3.select("#nWeight_ResearchO").property("value", 5);
  d3.select("#nWeight_SFRatioO-value").text(5);
  d3.select("#nWeight_SFRatioO").property("value", 5);
  d3.select("#nWeight_InterStuO-value").text(5);
  d3.select("#nWeight_InterStuO").property("value", 5);
  d3.select("#nWeight_FC-value").text(5);
  d3.select("#nWeight_FC").property("value", 5);

  clonedThisYear = JSON.parse(JSON.stringify(ThisYear));
  //console.log(clonedThisYear);
  Research_weight = 5;
  SFRatio_weight = 5;
  InterStu_weight = 5;
  FC_weight = 5;

  draw(clonedThisYear);

}