'use strict';

class WineMap {
    constructor(topo, exports) {
        this.topo = topo;
        this.exports = exports;
    }

    setup(svg, width, height, margin) {
        this.g = svg;
        this.width = width;
        this.height = height;
        const topo = this.topo;
        const exports = this.exports;

        // Map and projection
        var path = d3.geoPath();
        var projection = d3.geoNaturalEarth()
            .scale(width / 2 / Math.PI)
            .translate([width / 2, height / 2])
        var path = d3.geoPath()
            .projection(projection);

        // Data and color scale
        var data = d3.map();
        exports.forEach(d => data.set(d.code, +d.total));

        var colorScheme = d3.schemePuRd[6];
        colorScheme.unshift("#eee")
        var colorScale = d3.scaleThreshold()
            .domain([1, 6, 11, 26, 101, 1001])
            .range(colorScheme);

        // Legend
        var g = svg.append("g")
            .attr("class", "legendThreshold")
            .attr("transform", "translate(20,20)");
        g.append("text")
            .attr("class", "caption")
            .attr("x", 0)
            .attr("y", -6)
            .text("Wine Exports (million USD/year)");
        var labels = ['0', '$1-$5', '$6-$10', '$11-$25', '$26-$100', '$101-$1,000', '> $1,000'];
        var legend = d3.legendColor()
            .labels(function (d) {
                return labels[d.i];
            })
            .shapePadding(4)
            .scale(colorScale);
        svg.select(".legendThreshold")
            .call(legend);

        // Draw the map
        svg.append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(topo.features)
            .enter().append("path")
            .attr("fill", function (d) {
                // Pull data for this country
                d.total = data.get(d.id) || 0;
                // Set the color
                return colorScale(d.total);
            })
            .attr("d", path);
    }

    activate() {
        this.g
            .transition()
            .duration(600)
            .attr('opacity', 1);
    }

    deactivate() {
        this.g
            .transition()
            .duration(150)
            .attr('opacity', 0);

    }

}
