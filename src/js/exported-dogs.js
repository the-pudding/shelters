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
let dogCount = 0


function setupExpand(){
	$moreButton.on('click', () => {
		const expanded = !$container.classed('is-clipped');
		const text = !expanded ? 'Show Fewer' : 'Show All';
		$moreButton.text(text);
		$container.classed('is-clipped', expanded);

		if (expanded) {
			const y = +$moreButton.attr('data-y');
			window.scrollTo(0, y);
		}

		$moreButton.attr('data-y', window.scrollY);
		$transparency.classed('is-visible', !expanded);
	});
}

function nestDogs(loc){
	readerState = loc

	// filter exported dogs
	const filteredExports = exportedDogs.filter(d => d.final_state === readerState)

	dogCount = filteredExports.length

	if (dogCount >= 60){
		$container.classed('is-clipped', true)
		$transparency.classed('is-visible', true)
		$moreButton.property('disabled', false).classed('is-disabled', false)
	}
	else {
		$container.classed('is-clipped', false)
		$transparency.classed('is-visible', false)
		$moreButton.property('disabled', true).classed('is-disabled', true)
	}

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

	return nestedExports
}

function updateLocation(loc){

	const nestedExports = nestDogs(loc)

	charts.data(nestedExports)

}


function filterDogs(loc){
	const nestedExports = nestDogs(loc)

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
			filterDogs(loc)

			// setup interaction with show more button
			setupExpand()
		})
		.catch(console.error)
}

export default { init, resize, updateLocation };
