'use strict';

class WineTree {
    constructor(data) {
        this.data = data;
    }

    setup(svg, width, height, margin) {
        this.svg = svg;
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.treemap = d3.tree().size([height, width]);


        // Assigns parent, children, height, depth
        this.root = d3.hierarchy(this.data, function(d) { return d.children; });
        this.root.x0 = height / 2;
        this.root.y0 = 0;

        // Collapse after the second level
        this.root.children.forEach(collapse);

        this._update(this.root);

        // Collapse the node and all it's children
        function collapse(d) {
            if(d.children) {
                d._children = d.children
                d._children.forEach(collapse)
                d.children = null
            }
        }

    }

    activate() {
        this.svg
            .transition()
            .duration(600)
            .attr('opacity', 1);
    }

    deactivate() {
        this.svg
            .transition()
            .duration(150)
            .attr('opacity', 0);

    }

    _update(source) {
        const treemap = this.treemap;
        const root = this.root;
        const svg = this.svg;

        // Assigns the x and y position for the nodes
        var treeData = treemap(root);

        // Compute the new tree layout.
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(function(d){ d.y = d.depth * 180});

        // ****************** Nodes section ***************************

        // Update the nodes...
        var node = svg.selectAll('g.node')
            .data(nodes, function(d) {return d.id || (d.id = ++WineTree.nextId); });

        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', d => this._click(d));

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) { return d.data.name; });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(WineTree.duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(WineTree.duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = svg.selectAll('path.link')
            .data(links, function(d) { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d){
                var o = {x: source.x0, y: source.y0}
                return diagonal(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(WineTree.duration)
            .attr('d', function(d){ return diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(WineTree.duration)
            .attr('d', function(d) {
                var o = {x: source.x, y: source.y}
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function(d){
            d.x0 = d.x;
            d.y0 = d.y;
        });

        console.log('svg', this.svg);
        // hack
        this.svg.attr("transform", "translate(200,10)");


        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

            var path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

            return path
        }
    }
    // Toggle children on click.
    _click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this._update(d);
    }

}

WineTree.nextId = 0;
WineTree.duration = 750;

