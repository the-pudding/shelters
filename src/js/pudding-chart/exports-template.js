/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.exportsByState = function init(options) {
	function createChart(el) {
		const $container = d3.select('.exported-figure')
		const $sel = d3.select(el);
		let data = $sel.datum();
		// dimension stuff
		const width = 0;
		const height = 0;
		const marginTop = 0;
		const marginBottom = 0;
		const marginLeft = 0;
		const marginRight = 0;

		// scales
		const scaleX = null;
		const scaleY = null;

		// dom elements
		const $svg = null;
		const $axis = null;
		const $vis = null;
		const $containerMini = null
		const $tooltip = $container.select('.exported-tooltip')
		let allDogs = null

		// helper functions
		function handleMouseover(){
			const hovered = d3.select(this)
			const parent = hovered.node().parentNode
			const $selParent = d3.select(parent)

			const hoveredBreed = hovered.attr('data-file')

			const dogs = $selParent.selectAll('.dog')
				.classed('dimmed', true)

			const thisBreed = dogs.filter((d, i, n) => d3.select(n[i]).attr('data-file') === hoveredBreed)
				.classed('dimmed', false)

			$tooltip
				.style('left', `${d3.event.pageX}px`)
				.style('top', `${d3.event.pageY}px`)
				.classed('is-hidden', false)

			const breedCount = thisBreed.size()

			$tooltip
				.select('p').text(breedCount > 1 ? `${breedCount} ${hoveredBreed}s` : `${breedCount} ${hoveredBreed}`)
		}

		function handleMouseout(){
			const section = d3.select(this)
			console.log({section})
			d3.selectAll('.dog')
				.classed('dimmed', false)

			$tooltip.classed('is-hidden', true)
		}

		const Chart = {
			// called once at start
			init() {


				Chart.resize();
				Chart.render();
			},
			// on resize, update new dimensions
			resize() {
				// defaults to grabbing dimensions from container element
				// width = $sel.node().offsetWidth - marginLeft - marginRight;
				// height = $sel.node().offsetHeight - marginTop - marginBottom;
				// $svg
				// 	.attr('width', width + marginLeft + marginRight)
				// 	.attr('height', height + marginTop + marginBottom);
				return Chart;
			},
			// update scales and render chart
			render() {
				const $state = $sel.selectAll('.state')
					.data(data, d => d.key)
					.join(
						enter => {
							const state = enter
								.append('div')
								.attr('class', 'state')

							const $title = state.append('p')
								.attr('class', 'state-name')
								.text(d => d.key)

							const $container = state.append('div')
								.attr('class', 'container-mini')

							return state
							// .enter()
							// .append('div')
							// .attr('class', 'dog')
							//
						}
					);

				$state.select('.container-mini').selectAll('.dog')
					.data(d => d.value.breedMap)
					.join(enter => {
						allDogs = enter.append('div')
							.attr('class', 'dog')
							.attr('data-file', d => d.key )
							.on('mouseover', handleMouseover)
							.on('mouseout', handleMouseout)

						return allDogs
					})
					.style('background-image', d => d.key === 'mix' ? 'url(assets/images/profiles/labrador.png)' : `url(assets/images/profiles/${d.key}.png)`)


				//
				// const sorted = data.values
				// 	.sort((a, b) => d3.ascending(a.size, b.size))
				// 	.sort((a,b) => {
				// 		return d3.ascending(a.file, b.file)
				// 	})

				// $containerMini.selectAll('.dog')
				// 	.data(sorted)
				// 	.join(
				// 		enter => {
				// 			enter.append('div')
				// 				.attr('class', 'dog')
				// 				.style('background-image', d => `url(assets/images/profiles/${d.file}.png)`)
				// 		},
				// 		exit => {
				// 			exit.remove()
				// 		}
				// 	)



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
