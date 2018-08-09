//************************* MAP ***************************//

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
var path = d3.geoPath()
    .projection(projection);

// Data and color scale
var data = d3.map();
var colorScheme = d3.schemeBlues[6];
colorScheme.unshift("rgba(237, 237, 237, 0.25)")
var colorScale = d3.scaleThreshold()
    .domain([1, 6, 11, 26, 101, 1001])
    .range(colorScheme);

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,200)");
g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Our data");
var labels = ['0', '1-5', '6-10', '11-25', '26-100', '101-1000', '> 1000'];
var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);
svg.select(".legendThreshold")
    .call(legend);

// Load external data and boot
d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "data/example-data.csv", function(d) { data.set(d.code, +d.total); })
    .await(ready);

function ready(error, topo) {
    if (error) throw error;

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this country
                d.total = data.get(d.id) || 0;
                // Set the color
                return colorScale(d.total);
            })
            .attr("d", path)
         .on("mouseover", function() {d3.select(this)
                                          .attr("stroke","red")
                                          .attr("stroke-width","0.25");
                                      })
         .on("mouseout", function() {d3.select(this)
                                          .attr("stroke","none")});

}




















// Maybe we should move the other graph scripts to different files?


//************************* TREE ***************************//
d3.json("data/exports2014.json", function(error, data){
  if (error) throw error;

  // console.log(data);

  // data.forEach(function(d){
  //             console.log("2014 Wine Exports",
  //                             d.country,
  //                             d.export_value_USD,
  //                             "USD");
  //             });

  // our TREE-MAP here

});

//************************* SCATTER ***************************//

d3.json("data/winemag-data-130k-v2.json", function(error, data){
  if (error) throw error;

  // console.log(data);

  // data.forEach(function(d){
  //             console.log(d.country,
  //                         d.points,
  //                         d.variety);
  //             });

  // our WEIGHTED SCATTER PLOT HERE

});
