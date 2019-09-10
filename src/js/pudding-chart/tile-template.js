/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.tileMap = function init(options) {
	function createChart(el) {
		const $sel = d3.select(el);
		let data = $sel.datum();

		// dimension stuff
		let width = 0;
		const textHeight = 18;
		let containerHeight = null
		let isMobile = false
		const $container = d3.select('.movement')
		const $legendScale = $container.select('.legend-scale')

		// factor to determine how many dogs should be
		// equal to one block
		let factor = isMobile === true ? 2 : 4

		// helper functions

		const Chart = {
			// called once at start
			init() {


				Chart.resize();
				Chart.render();
			},
			// on resize, update new dimensions
			resize() {
				// defaults to grabbing dimensions from container element
				if (data.location === 'Maine'){
  				width = $sel.node().offsetWidth
  				$sel.style('height', `${width}px`)
				} else {
					width = d3.select('.block-Maine').node().offsetWidth
					$sel.style('height', `${width}px`)
				}

				const windowWidth = window.innerWidth
				isMobile = windowWidth <= 600
				factor = isMobile === true ? 10 : 2

				$legendScale.text(`${factor * 2}`)

				// container height should be height - text height
				containerHeight = width - textHeight

				// resize entire bounding chart once
				if (data.location === 'Florida') {
					const $figure = d3.select('.movement-figure')
					const $bound = $figure.select('.figure-container')
						.style('height', `${width * 8}px`)
				}
				return Chart;
			},
			// update scales and render chart
			render() {

				if (data.location != 'blank'){
  				// add state name
					$sel.append('p').text(data.abbreviation)

					// add div for chart
					const $container = $sel.append('div')
						.attr('class', 'container')
						.style('height', `${containerHeight}px`)

					// add containers for imports and exports
					const $imports = $container.append('div')
						.attr('class', 'container-imports')

					const $exports = $container.append('div')
						.attr('class', 'container-exports')

					// if the data exists for that state, add dogs
					if (data.count){
    					$imports.selectAll('.import dog')
    						.data(d3.range(data.count.imported / factor))
    						.join(enter => {
    							enter.append('div')
    								.attr('class', 'import')
    						})

						$exports.selectAll('.export dog')
							.data(d3.range(data.count.exported / factor))
							.join(enter => {
								enter.append('div')
									.attr('class', 'export')
							})
					}


				}

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
