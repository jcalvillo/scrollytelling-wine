class Title {
    constructor(text) {
        this.text = text;
    }
    setup(g, width, height, margin) {
        this.g = g;
        this.width = width;
        this.height = height;
        this.margin = margin;
        g.append('text')
            .attr('class', 'title openvis-title')
            .attr('x', width / 2)
            .attr('y', height / 3)
            .text('A Beginners Guide to Wine');

        g.append('text')
            .attr('class', 'sub-title openvis-title')
            .attr('x', width / 2)
            .attr('y', (height / 3) + (height / 5))
            .text('A Journey Through The Basics');

        g.selectAll('.openvis-title')
            .attr('opacity', 0);
    }

    activate() {
        const g = this.g;
        g.selectAll('.count-title')
            .transition()
            .duration(0)
            .attr('opacity', 0);

        g.selectAll('.openvis-title')
            .transition()
            .duration(600)
            .attr('opacity', 1.0);
    }

    deactivate() {
        const g = this.g;
        g.selectAll('.openvis-title')
            .transition()
            .duration(0)
            .attr('opacity', 0);
    }
}
