var svgWidth = 960;
var svgHeight = 620;

var margin = { top: 20, right: 40, bottom: 200, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// pull in the data from data.csv by using the d3.csv function
d3.csv("./assets/data/data.csv'")
  .then(function (data) {
    
    var x = d3.scaleLinear()
      .domain([8,24])
      .range([0, width]);
      svg.append("g")
      .call(d3.axisBottom(x));

    var y  = d3.scaleLinear()
      .domain([0, 28])
      .range([height, 0]);
      svg.append("g")
      .call(d3.axisLeft(y));

    var circlesGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.age))
      .attr("cy", d => yLinearScale(d.smokes))
      .attr("r", "15")
      .attr("fill", "blue")
      .attr("opacity", ".8");


    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .append("div");
      
    chartGroup.call(toolTip);

    circlesGroup.on("click", function (data) {
      toolTip.show(data, this);
    })

    .on("mouseout", function (data, index) {
        toolTip.hide(data);
    });


    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 40 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Age (yrs)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Smokes (%)");
  });