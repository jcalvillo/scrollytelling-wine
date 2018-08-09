class FillerTitle {
    constructor(text) {
        this.text = text;
    }

    setup(g, width, height, margin) {
        this.g = g;
        this.width = width;
        this.height = height;
        this.margin = margin;
        // count filler word count title
        g.append('text')
            .attr('class', 'title count-title highlight')
            .attr('x', width / 2)
            .attr('y', height / 3)
            .text('Over 10,000');

        g.append('text')
            .attr('class', 'sub-title count-title')
            .attr('x', width / 2)
            .attr('y', (height / 3) + (height / 5))
            .text(this.text);

        g.selectAll('.count-title')
            .attr('opacity', 0);
    }

    activate() {
        const g = this.g;
        g.selectAll('.square')
            .transition()
            .duration(0)
            .attr('opacity', 0);

        g.selectAll('.count-title')
            .transition()
            .duration(600)
            .attr('opacity', 1.0);
    }

    deactivate() {
        const g = this.g;
        g.selectAll('.count-title')
            .transition()
            .duration(0)
            .attr('opacity', 0);
    }
}
