(function() {
    'use strict';

    var data =
        [
            ['Pinot Noir',
                ['fruit', 'acidity', 'tannins', 'finish', 'black', 'palate', 'raspberry', 'ripe', 'oak', 'light', 'aromas', 'cola']],
            ['Chardonnay',
                ['fruit', 'apple', 'oak', 'ripe', 'finish', 'palate', 'aromas', 'lemon', 'pear', 'crisp', 'rich', 'vanilla', 'citrus', 'toast']],
            ['Cabernet Sauvignon',
                ['tannins', 'fruit', 'cherry', 'finish', 'oak', 'aromas', 'blackberry', 'palate', 'cassis', 'drink', 'chocolate', 'ripe', 'plum', 'currant', 'dry']],
            ['Red Blend',
                ['cherry', 'palate', 'wine', 'tannins', 'fruit', 'finish', 'spice', 'berry', 'plum', 'drink', 'ripe', 'blackberry', 'offers', 'pepper']],
            ['Bordeaux-style Red Blend',
                ['black', 'flavors', 'drink', 'ripe', 'acidity', 'fruits', 'wood', 'rich', 'firm', 'currant', 'juicy', 'structure', 'dark', 'dry']],
            ['Riesling',
                ['wine', 'finish', 'acidity', 'lemon', 'fruit', 'apple', 'lime', 'peach', 'sweet', 'fresh', 'citrus', 'ripe', 'drink']],
            ['Sauvignon Blanc',
                ['acidity', 'finish', 'green', 'citrus', 'aromas', 'palate', 'crisp', 'drink', 'lime', 'grapefruit', 'fresh', 'ripe', 'lemon', 'white', 'apple']],
            ['Syrah',
                ['black', 'aromas', 'finish', 'pepper', 'palate', 'tannins', 'blackberry', 'cherry', 'dark', 'drink', 'spice', 'oak', 'rich']],
            ['Rosé',
                ['fruit', 'drink', 'crisp', 'light', 'ripe', 'strawberry', 'fresh', 'fruity', 'fruits', 'dry', 'finish', 'palate', 'aromas', 'full', 'cherry']],
            ['Merlot',
                ['cherry', 'tannins', 'black', 'finish', 'aromas', 'plum', 'palate', 'oak', 'soft', 'spice', 'berry', 'ripe', 'dry', 'blackberry']],
            ['Nebbiolo',
                ['cherry', 'berry', 'spice', 'drink', 'black', 'wine', 'offers', 'licorice', 'firm', 'fruit', 'leather', 'ripe', 'acidity']],
            ['Zinfandel',
                ['black', 'blackberry', 'cherry', 'tannins', 'finish', 'ripe', 'pepper', 'dry', 'sweet', 'full', 'soft', 'bodied', 'rich', 'alcohol']],
            ['Sangiovese',
                ['tannins', 'black', 'wine', 'fruit', 'berry', 'offers', 'spice', 'drink', 'ripe', 'flavors', 'leather', 'plum', 'finish', 'dried']],
            ['Malbec',
                ['wine', 'berry', 'fruit', 'black', 'palate', 'plum', 'blackberry', 'tannins', 'drink', 'oak', 'dark', 'acidity', 'ripe', 'herbal']],
            ['Portuguese Red',
                ['fruits', 'acidity', 'ripe', 'black', 'fruit', 'rich', 'flavors', 'wood', 'aging', 'juicy', 'structure', 'firm', 'dark', 'berry']]
        ]

    ;

    class WineTasteNetwork {
        constructor() {

        }

        setup(svg, width, height, margin) {
            this.g = svg;

            var outer = d3.map();
            var inner = [];
            var links = [];

            var outerId = [0];

            data.forEach(function (d) {

                if (d == null)
                    return;

                i = {id: 'i' + inner.length, name: d[0], related_links: []};
                i.related_nodes = [i.id];
                inner.push(i);

                if (!Array.isArray(d[1]))
                    d[1] = [d[1]];

                d[1].forEach(function (d1) {

                    var o = outer.get(d1);

                    if (o == null) {
                        o = {name: d1, id: 'o' + outerId[0], related_links: []};
                        o.related_nodes = [o.id];
                        outerId[0] = outerId[0] + 1;

                        outer.set(d1, o);
                    }

                    // create the links
                    let l = {id: 'l-' + i.id + '-' + o.id, inner: i, outer: o};
                    links.push(l);

                    // and the relationships
                    i.related_nodes.push(o.id);
                    i.related_links.push(l.id);
                    o.related_nodes.push(i.id);
                    o.related_links.push(l.id);
                });
            });

            data = {
                inner: inner,
                outer: outer.values(),
                links: links
            }

            // sort the data
            outer = data.outer;
            data.outer = Array(outer.length);

            var i1 = 0;
            var i2 = outer.length - 1;

            for (var i = 0; i < data.outer.length; ++i) {
                if (i % 2 == 1)
                    data.outer[i2--] = outer[i];
                else
                    data.outer[i1++] = outer[i];
            }

            console.log(data.outer.reduce(function (a, b) {
                return a + b.related_links.length;
            }, 0) / data.outer.length);

            var colors = ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"]
            var color = d3.scaleLinear()
                .domain(['Pinot Noir', 'Cabernet'])
                .range([colors.length - 1, 0])
                .clamp(true);

            var diameter = Math.min(width, height);
            var rect_width = 40;
            var rect_height = 14;

            var link_width = "1px";

            var il = data.inner.length;
            var ol = data.outer.length;

            var inner_y = d3.scaleLinear()
                .domain([0, il])
                .range([-(il * rect_height) / 2, (il * rect_height) / 2]);

            let mid = (data.outer.length / 2.0);
            var outer_x = d3.scaleLinear()
                .domain([0, mid, mid, data.outer.length])
                .range([15, 170, 190 , 355]); // XXX

            var outer_y = d3.scaleLinear()
                .domain([0, data.outer.length])
                .range([0, diameter / 2 - 120]);


            // setup positioning
            data.outer = data.outer.map(function (d, i) {
                d.x = outer_x(i);
                d.y = diameter / 3;
                return d;
            });

            data.inner = data.inner.map(function (d, i) {
                d.x = -(rect_width / 2);
                d.y = inner_y(i);
                return d;
            });


            function get_color(name) {
                var c = Math.round(color(name));
                if (isNaN(c))
                    return '#F8E0EC';	// fallback color

                return colors[c];
            }

            // Can't just use d3.svg.diagonal because one edge is in normal space, the
            // other edge is in radial space. Since we can't just ask d3 to do projection
            // of a single point, do it ourselves the same way d3 would do it.


            function projectX(x) {
                return ((x - 90) / 180 * Math.PI) - (Math.PI / 2);
            }

            function link(d) {
                return "M" + d.source.y + "," + d.source.x
                    + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
                    + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
                    + " " + d.target.y + "," + d.target.x;
            }


            function diagonal(d) {
                return link({
                    source: {
                        "x": d.outer.y * Math.cos(projectX(d.outer.x)),
                        "y": -d.outer.y * Math.sin(projectX(d.outer.x))
                    },
                    target: {
                        "x": d.inner.y + rect_height / 2,
                        "y": d.outer.x > 180 ? d.inner.x : d.inner.x + rect_width
                    }
                });
            }

            //var svg = d3.select("body").append("svg")
                svg = svg.attr("width", diameter)
                .attr("height", diameter)
                .attr("margin-top", "250px")
                .append("g")
                .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");


            // links
            var link = svg.append('g').attr('class', 'links').selectAll(".link")
                .data(data.links)
                .enter().append('path')
                .attr('class', 'link')
                .attr('id', function (d) {
                    return d.id
                })
                .attr("d", diagonal)
                .attr('stroke', function (d) {
                    return get_color(d.inner.name);
                })
                .attr('stroke-width', link_width);

            // outer nodes

            var onode = svg.append('g').selectAll(".outer_node")
                .data(data.outer)
                .enter().append("g")
                .attr("class", "outer_node")
                .attr("transform", function (d) {
                    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
                })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);

            onode.append("circle")
                .attr('id', function (d) {
                    return d.id
                })
                .attr("r", 4.5);

            onode.append("circle")
                .attr('r', 20)
                .attr('visibility', 'hidden');

            onode.append("text")
                .attr('id', function (d) {
                    return d.id + '-txt';
                })
                .attr("dy", ".31em")
                .attr("text-anchor", function (d) {
                    return d.x < 180 ? "start" : "end";
                })
                .attr("transform", function (d) {
                    return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
                })
                .text(function (d) {
                    return d.name;
                });

            // inner nodes

            var inode = svg.append('g').selectAll(".inner_node")
                .data(data.inner)
                .enter().append("g")
                .attr("class", "inner_node")
                .attr("transform", function (d, i) {
                    return "translate(" + d.x + "," + d.y + ")"
                })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);

            inode.append('rect')
                .attr('width', rect_width)
                .attr('height', rect_height)
                .attr('id', function (d) {
                    return d.id;
                })
                .attr('fill', "white")
            ;

            inode.append("text")
                .attr('id', function (d) {
                    return d.id + '-txt';
                })
                .attr('text-anchor', 'middle')
                .attr("transform", "translate(" + rect_width / 2 + ", " + rect_height * .75 + ")")
                .text(function (d) {
                    return d.name;
                });

            // need to specify x/y/etc

            d3.select(self.frameElement).style("height", diameter - 150 + "px");

            function mouseover(d) {
                // bring to front
                d3.selectAll('.links .link').sort(function (a, b) {
                    return d.related_links.indexOf(a.id);
                });

                for (var i = 0; i < d.related_nodes.length; i++) {
                    d3.select('#' + d.related_nodes[i]).classed('highlight', true);
                    d3.select('#' + d.related_nodes[i] + '-txt').attr("font-weight", 'bold');
                }

                console.log(d.related_links);
                for (var i = 0; i < d.related_links.length; i++)
                    d3.select('#' + d.related_links[i]).attr('stroke-width', '5px').attr('stroke', '#f8d1f1');
            }

            function mouseout(d) {
                for (var i = 0; i < d.related_nodes.length; i++) {
                    d3.select('#' + d.related_nodes[i]).classed('highlight', false);
                    d3.select('#' + d.related_nodes[i] + '-txt').attr("font-weight", 'normal');
                }

                for (var i = 0; i < d.related_links.length; i++)
                    d3.select('#' + d.related_links[i]).attr('stroke-width', link_width).attr('stroke', '#F8E0EC');
            }
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

    window.WineTasteNetwork = WineTasteNetwork;
}());
