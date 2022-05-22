// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 20, left: 50};
const width = 6000 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#myStackBar")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height*1.5 + margin.top + margin.bottom )
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
// Add X axis
const x = d3.scaleBand()
  .range([0, width])
  .padding([0.2])
const X_axis = svg.append("g")

// Add Y axis
const y = d3.scaleLinear()
  .range([height, 0]);
const Y_axis = svg.append("g")  

// Add data into a container
const container = svg.append("g")

// Create tooltip
const tooltip = d3.select("body")
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

function RSOutput(score){
  if(score == 100)
    return ("Very High");
  else if(score == 75)
    return ("High");
  else if(score == 50)
    return ("Medium");
  else
    return ("Low");
}

// Merge sort for every university 
function MergeSort(array){
  if (array.length <= 1){
    return array;
  };
  const middle = Math.floor(array.length / 2);
  //console.log("Hi MergeSort");
  return Merge(MergeSort(array.slice(0, middle)), MergeSort(array.slice(middle)));
}
  
function Merge(left, right){
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while(leftIndex < left.length && rightIndex < right.length){
    // console.log("Hi Merge");
    let leftValue = Number(left[leftIndex].ResearchOutput) + left[leftIndex].SFRatio + left[leftIndex].InterStu + left[leftIndex].FC;
    let rightValue = Number(right[rightIndex].ResearchOutput) + right[rightIndex].SFRatio + right[rightIndex].InterStu + right[rightIndex].FC;
    if(leftValue > rightValue){
      result.push(left[leftIndex]);
      leftIndex++;
      //console.log("Hi Left");
      //console.log(leftValue, rightValue);
    } 
    else{
      result.push(right[rightIndex]);
      rightIndex++;
      //console.log("Hi right");
      //console.log(leftValue, rightValue);
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// when the input range changes update the weight 
d3.select("#nWeight_ResearchO").on("input", function() {
  update(+this.value, "Research",clonedThisYear);
});
d3.select("#nWeight_SFRatioO").on("input", function() {
  update(+this.value, "SFRatio",clonedThisYear);
});
d3.select("#nWeight_InterStuO").on("input", function() {
  update(+this.value, "InterStu",clonedThisYear);
});
d3.select("#nWeight_FC").on("input", function() {
  update(+this.value, "FC",clonedThisYear);
});

// Set weight dynamically
function update(nWeight, name, clonedThisYear) {  
  if(name == "Research"){
    d3.select("#nWeight_ResearchO-value").text(nWeight);
    d3.select("#nWeight_ResearchO").property("value", nWeight);
    Research_weight = nWeight;
    //container.selectAll("g").selectAll("myRect").attr("height",nWeight)
  }else if(name == "SFRatio"){
    d3.select("#nWeight_SFRatioO-value").text(nWeight);
    d3.select("#nWeight_SFRatioO").property("value", nWeight);
    SFRatio_weight = nWeight;
  }else if (name == "InterStu"){
    d3.select("#nWeight_InterStuO-value").text(nWeight);
    d3.select("#nWeight_InterStuO").property("value", nWeight);
    InterStu_weight = nWeight;
  }else{
    d3.select("#nWeight_FC-value").text(nWeight);
    d3.select("#nWeight_FC").property("value", nWeight);
    FC_weight = nWeight;
  }
  clonedThisYear = JSON.parse(JSON.stringify(ThisYear));
  
  // multiply weight
  for(var i in clonedThisYear){
      clonedThisYear[i].ResearchOutput *= Research_weight;
      clonedThisYear[i].SFRatio *= SFRatio_weight;
      clonedThisYear[i].InterStu *= InterStu_weight;
      clonedThisYear[i].FC *= FC_weight;
  }
  
  draw(clonedThisYear);  
}

function draw(clonedThisYear){  
  clonedThisYear = MergeSort(clonedThisYear);
  // List of subgroups is the header of ThisYear array  
  const subgroups = Object.keys(clonedThisYear[0]).slice(1);
  //console.log(subgroups)

  // Value of the first column called group
  //const groups = clonedThisYear.slice(0, 50).map(d => d.University)
  const groups = clonedThisYear.map(d => d.University)

  x.domain(groups)
  X_axis.attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".10em")
    .attr("transform", "rotate(-78)");
    
  y.domain([0, 100*(Research_weight + SFRatio_weight + InterStu_weight + FC_weight)]);
  Y_axis.call(d3.axisLeft(y));

  // color palette shows one color per subgroup
  // const color = d3.scaleOrdinal()
  //  .domain(subgroups)
  //  .range(d3.schemeSet2);
  const color = ["#023e8a", "#0096c7", "#48cae4", "#ade8f4"]

  //stack the data? --> stack per subgroup
  const stackedData = d3.stack()
    .keys(subgroups)
    (clonedThisYear);
  //console.log(ThisYear)
  //console.log(stackedData)


  // Show the bars
  // Highlight a specific subgroup when hovered        
  container
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .join("g")
      .attr("fill", (d, i) => color[i])
      .attr("class", d => "myRect " + d.key) // Add a class to each subgroup: their name
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(d => d)
      .join("rect")
        .transition()
        .duration(200)
        .attr("x", function(d){
          return x(d.data.University)
        })
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width",x.bandwidth())
        .attr("stroke", "grey")
  container
    .on("mouseover", function (d){
      //const subGroupName = d3.select(this.parentNode).datum().key
      //d3.selectAll(".myRect").style("opacity", 0.2)
      //d3.selectAll("."+subGroupName).style("opacity",1)
      //console.log(subGroupName);
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 1);
      tooltip
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 150 + "px")
        .html("西元 " + NowYear + " 年<br>" + d.toElement.__data__.data.University + "<br>學術產出：" + RSOutput(ResOpt.get(d.toElement.__data__.data.University)) + "<br>師生比：1:" + SFRatio.get(d.toElement.__data__.data.University) + "<br>國際學生：" + IntStu.get(d.toElement.__data__.data.University) + " 人<br>國際教師：" + FC.get(d.toElement.__data__.data.University) + " 人");
      // console.log(d);
    })
    .on("mouseleave", function (d){ // When user do not hover anymore
      d3.selectAll(".myRect")
      .style("opacity",1)
      tooltip.style("opacity", 0);
    })
    .on("mouseout", function(d) {
      tooltip.style("opacity", 0);
    });
}

// Filter region we want
function FilterRegion(EnterRegion){
  if(EnterRegion == "All"){
    SetRegion = false;
    Year(enter_Year);
  }
  else{
    SetRegion = true;
    Region = EnterRegion;
    Year(enter_Year); 
  }
}

var clonedThisYear;
var ResOpt;
var SFRatio;
var IntStu;
var FC;
var subgroups;
var ThisYear;
var Research_weight;
var SFRatio_weight;
var InterStu_weight;
var FC_weight;
var NowYear;
var SetRegion = false;
var Region;
var enter_Year;

// Parse the Data
function Year(EnterYear){
  Promise.all([
    d3.json("https://raw.githubusercontent.com/ShallyLai/IVFinalProject/main/Continents.json"),
    d3.csv("https://raw.githubusercontent.com/ShallyLai/IVFinalProject/main/QS.csv")
  ]).then(function(initialize){

    let dataGeo = initialize[0]; // Continent map
    let data = initialize[1]; // QS data
    NowYear = EnterYear; // select year
    ThisYear = [];
    ResOpt = new Map();
    SFRatio = new Map();
    IntStu = new Map();
    FC = new Map();
    enter_Year = EnterYear;

    // Seperate data with year
    data.forEach(function(row){
      if(SetRegion == false){
        if(row.year == NowYear){
          topush = {University: row.university, ResearchOutput: row.research_output, SFRatio: row.SFRatio_Nor * 100, InterStu:row.IntStu_Nor * 100, FC:row.FC_Nor * 100};
          ThisYear.push(topush);
          ResOpt.set(row.university, row.research_output);
          SFRatio.set(row.university, row.student_faculty_ratio);
          IntStu.set(row.university, row.international_students);
          FC.set(row.university, row.faculty_count);
        }
      }
      else if(SetRegion == true){
        if(row.year == NowYear && row.region == Region){
          topush = {University: row.university, ResearchOutput: row.research_output, SFRatio: row.SFRatio_Nor * 100, InterStu:row.IntStu_Nor * 100, FC:row.FC_Nor * 100};
          ThisYear.push(topush);
          ResOpt.set(row.university, row.research_output);
          SFRatio.set(row.university, row.student_faculty_ratio);
          IntStu.set(row.university, row.international_students);
          FC.set(row.university, row.faculty_count);
        }
      }
    });
    //console.log(data)
    //console.log(ThisYear);
 
      d3.select("#nWeight_ResearchO-value").text(1);
      d3.select("#nWeight_ResearchO").property("value", 1);
      d3.select("#nWeight_SFRatioO-value").text(1);
      d3.select("#nWeight_SFRatioO").property("value", 1);
      d3.select("#nWeight_InterStuO-value").text(1);
      d3.select("#nWeight_InterStuO").property("value", 1);
      d3.select("#nWeight_FC-value").text(1);
      d3.select("#nWeight_FC").property("value", 1);
   
    clonedThisYear = JSON.parse(JSON.stringify(ThisYear));
    //console.log(clonedThisYear);
    Research_weight = 1 ;
    SFRatio_weight = 1;
    InterStu_weight = 1;  
    FC_weight = 1;         
    
    draw(clonedThisYear); 
  })
}

// Initialize the plot
Year(2022);
