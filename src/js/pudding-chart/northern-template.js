/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.northernLine = function init(options) {
	function createChart(el) {
		const $sel = d3.select(el);
		let data = $sel.datum();

		// dimension stuff
		let width = 0;
		let height = 0;
		const marginTop = 20;
		const marginBottom = 20;
		const marginLeft = 50;
		const marginRight = 50;

		let leftLine = 0;
		let rightLine = 0;
		let startPoint = 0;

		// scales
		// const scaleX = d3.scaleLinear();
		const scaleY = d3.scaleLinear();
		const scaleStroke = d3.scaleLinear();

		// dom elements
		let $svg = null;
		let $axis = null;
		let $vis = null;

		// helper functions

		const Chart = {
			// called once at start
			init() {
				$svg = $sel.append('svg').attr('class', 'northern-chart');
				const $g = $svg.append('g');

				// offset chart for margins
				$g.attr('transform', `translate(${marginLeft}, ${marginTop})`);

				// create axis
				$axis = $svg.append('g').attr('class', 'g-axis');

				// setup viz group
				$vis = $g.append('g').attr('class', 'g-vis');

				Chart.resize();
				Chart.render();
			},
			// on resize, update new dimensions
			resize() {
				// defaults to grabbing dimensions from container element
				width = $sel.node().offsetWidth - marginLeft - marginRight;
				height = $sel.node().offsetHeight - marginTop - marginBottom;
				$svg
					.attr('width', width + marginLeft + marginRight)
					.attr('height', height + marginTop + marginBottom);

				scaleY
				  .range([height, 0])
				  .domain(d3.extent(data, d => d.latDiff))

				scaleStroke
					.range([1, 10])
					.domain(d3.extent(data, d => d.n))

				leftLine = width * 0.25
				rightLine = width * 0.75
				startPoint = scaleY(0)

				return Chart;
			},
			// update scales and render chart
			render() {
				// add circles to each end point
				$vis.selectAll('.end-point')
					.data(data)
					.join(
						enter => {
							// enter.append('circle')
							// 	.attr('class', 'end-point')
							// 	.attr('r', 5)
							// 	.attr('cx', rightLine)
							// 	.attr('cy', d => scaleY(d.latDiff))

							// enter.append('line')
							// 	.attr('class', 'move-line')
							// 	.attr('x1', leftLine)
							// 	.attr('x2', rightLine)
							// 	.attr('y1', startPoint)
							// 	.attr('y2', d => scaleY(d.latDiff))
							// 	.style('stroke-width', d => `${Math.round(scaleStroke(d.n))}px`)
							// 	.style('stroke', d => d.latDiff >= 0 ? '#E69E9E' : '#DF753C')

							enter.append('path')
								.attr('class', 'move-path')
								.attr('d', d => {
									const padding = width * 0.15
									const paddingY = height * 0.1
									const starting = [leftLine, startPoint]
									const ending = [rightLine, scaleY(d.latDiff)]
									const startControl = [leftLine + padding, startPoint]
									const endControl = [rightLine - padding, scaleY(d.latDiff)]

									const path = [
										// move to starting point
										'M', starting,
										// add cubic bezier curve
										'C', startControl, endControl,
										ending
									]

									const joined = path.join(' ')
									return joined
								})
                	.style('stroke-width', d => `${Math.round(scaleStroke(d.n))}px`)
                	.style('stroke', d => d.latDiff >= 0 ? '#E69E9E' : '#DF753C')
						},
						update => {
							update
								.attr('cx', rightLine)
								.attr('cy', d => scaleY(d.latDiff))
						}
					)

				// add point to starting point
				$vis.append('circle')
					.attr('class', 'starting-point')
					.attr('r', 5)
					.attr('cx', leftLine)
					.attr('cy', startPoint)
					.raise()


				return Chart;
			},
			// get / set data
			data(val) {
				if (!arguments.length) return data;
				data = val;
				$sel.datum(data);
				Chart.render();
				return Chart;
			}
		};
		Chart.init();

		return Chart;
	}

	// create charts
	const charts = this.nodes().map(createChart);
	return charts.length > 1 ? charts : charts.pop();
};
