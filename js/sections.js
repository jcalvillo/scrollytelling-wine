'use strict';

var scrollVis = function (sections) {

    //#region globals

    // constants to define the size
    // and margins of the vis area.
    var width = 800;
    var height = 520;
    var margin = { top: 0, left: 20, bottom: 40, right: 10 };

    // Keep track of which visualization
    // we are on and which was the last
    // index activated. When user scrolls
    // quickly, we want to call all the
    // activate functions that they pass.
    var lastIndex = -1;
    var activeIndex = 0;

    var svg = null;

    //#endregion globals

    //#region chart
    function chart(selection) {
        console.log('chart', selection);
        selection.each(function (sections) {
            console.log('selection.each', sections);
            // create svg and give it a width and height
            svg = d3.select(this).selectAll('svg').data([sections]);
            var svgE = svg.enter().append('svg');
            // @v4 use merge to combine enter and existing selection
            svg = svg.merge(svgE);

            svg.attr('width', width + margin.left + margin.right);
            svg.attr('height', height + margin.top + margin.bottom);

            svg.append('g').selectAll('g').data(sections).enter().append('g').each(function(section) {
                console.log('section', section, this);
                section.setup(d3.select(this), width, height, margin);
                if (section.deactivate) { section.deactivate(); }
            });
        });
    };

    chart.activate = function (index) {
        activeIndex = index;
        var step = (activeIndex < lastIndex) ? -1 : 1;
        for (let i = lastIndex; i !== activeIndex; i += step) {
            const section = sections[i];
            if (section && section.deactivate) { section.deactivate(); }
        }
        if (sections[index] && sections[index].activate) {
            sections[index].activate();
        }
        lastIndex = activeIndex;
    };

    chart.update = function (index, progress) {
        if (sections[index] && sections[index].update) {
            sections[index].update(progress);
        }
    };
    //#endregion chart

    return chart;
};

function display(sections) {
    // create a new plot and
    // display it
    var plot = scrollVis(sections);
    d3.select('#vis')
        .datum(sections) // XXX
        .call(plot);

    // setup scroll functionality
    var scroll = scroller()
        .container(d3.select('#graphic'));

    // pass in .step selection as the steps
    scroll(d3.selectAll('.step'));

    // setup event handling
    scroll.on('active', function (index) {
        // highlight current step text
        d3.selectAll('.step')
            .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

        // activate current section
        plot.activate(index);
    });

    scroll.on('progress', function (index, progress) {
        plot.update(index, progress);
    });
}

d3.queue()
    .defer(d3.json, "data/wine_tree_data.json")
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "data/wine_exports.csv")
    .await(function(error, treeData, mapGeo, mapExports) {
        display([
            new Title('foo'),
            new FillerTitle('Types of Wine Around the World'),
            new WineMap(mapGeo, mapExports),
            new WineTree(treeData),
            new WineTasteNetwork(),
        ]);
    });

