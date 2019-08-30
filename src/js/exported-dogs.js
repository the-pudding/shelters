/* global d3 */
import load from './load-data'
import './pudding-chart/exports-template'

// reader parameters
let readerState = null

// updating text selections
const $section = d3.selectAll('.exported')
const $container = $section.selectAll('.figure-container')
const $moreButton = $section.select('.show-more')
const $transparency = $section.select('.transparency')

// constants
let exportedDogs = null
let charts = null


function setupExpand(){
	$moreButton.on('click', () => {
		const truncated = !$container.classed('is-expanded');
		const text = truncated ? 'Show Fewer' : 'Show All';
		$moreButton.text(text);
		$container.classed('is-expanded', truncated);

		if (!truncated) {
			const y = +$moreButton.attr('data-y');
			window.scrollTo(0, y);
		}

		$moreButton.attr('data-y', window.scrollY);
		$transparency.classed('is-visible', !truncated);
	});
}

function updateLocation(loc){
	readerState = loc

	const filteredExports = exportedDogs.filter(d => d.final_state === readerState)

	const nestedExports = d3.nest()
		.key(d => d.original_state)
		.entries(filteredExports)
		.sort((a, b) => d3.descending(a.values.length, b.values.length))

	console.log({nestedExports})

	charts.data(nestedExports)
	// filterDogs()
}

function filterDogs(){
	// filter exported dogs
	const filteredExports = exportedDogs.filter(d => d.final_state === readerState)

	const nestedExports = d3.nest()
		.key(d => d.original_state)
		.rollup(leaves => {
			const stateTotal = leaves.length

			const breeds = d3.nest().key(d => d.file)
				.rollup(buds => {
					const count = Math.floor(buds.length / 1)
					return d3.range(count).map(() => ({
						key: buds[0].file
					}))
				})
				.entries(leaves)
				.sort((a, b) => d3.descending(a.value, b.value))

			const breedMap = [].concat(...breeds.map(d => d.value))

			return {stateTotal, breedMap}
		})
		.entries(filteredExports)
		.sort((a, b) => d3.descending(a.value.stateTotal, b.value.stateTotal))

	console.log({nestedExports})

	charts = $section
		.select('.figure-container')
		.datum(nestedExports)
		.exportsByState()
}


// code for determining user's location and subsequent data
function resize() {}

function init(loc) {
	load.loadCSV('exportedDogs.csv')
		.then(result => {
			readerState = loc
			exportedDogs = result
			filterDogs()

			// setup interaction with show more button
			setupExpand()
		})
		.catch(console.error)
}

export default { init, resize, updateLocation };
