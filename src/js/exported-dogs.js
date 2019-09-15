/* global d3 */
import load from './load-data'
import './pudding-chart/exports-template'

// reader parameters
let readerState = null
let lastReaderState = null
let selToggle = 'exports'

// updating text selections
const $section = d3.selectAll('.exported')
const $container = $section.selectAll('.figure-container')
const $moreButton = $section.select('.show-more')
const $transparency = $section.select('.transparency')
const $toggle = $section.select('.toggle')

// constants
let exportedDogs = null
let charts = null
let importCount = 0
let exportCount = 0


function setupExpand(){
	$moreButton.on('click', () => {
		// was the container clipped before clicking?
		const expanded = !$container.classed('is-clipped');
		const text = !expanded ? 'Show Fewer' : 'Show All';
		$moreButton.text(text);
		$container.classed('is-clipped', expanded);

		if (expanded) {
			const y = +$moreButton.attr('data-y');
			window.scrollTo(0, y);
		}


		$moreButton.attr('data-y', window.scrollY);
		$transparency.classed('is-visible', expanded);
	});
}

function setupToggle(){

  $toggle.on('click', function(){
    const el = d3.select(this)
    const aria = el.attr('aria-checked')
    if (aria === 'false') {
			el.attr('aria-checked', 'true')
			selToggle = 'exports'
		}
    else if (aria === 'true') {
			el.attr('aria-checked', 'false')
			selToggle = 'imports'
		}

		updateLocation(readerState)
		//console.log({selToggle})
  })
}

function readerSelNest({dogs, counts}){
	// setting container height
	if (counts[selToggle] >= 60){
		$container.classed('is-clipped', true)
		$transparency.classed('is-visible', true)
		$moreButton.property('disabled', false).classed('is-disabled', false)
	}
	else {
		$container.classed('is-clipped', false)
		$transparency.classed('is-visible', false)
		$moreButton.property('disabled', true).classed('is-disabled', true)
	}

	// default toggle whichever is higher when new state selected
	if (readerState !== lastReaderState){
		if (counts.imports > counts.exports) {
			$toggle.attr('aria-checked', false)
			selToggle = 'imports'
		} else {
			$toggle.attr('aria-checked', true)
			selToggle = 'exports'
		}
	}


	const nested = d3.nest()
		.key(d => selToggle === 'exports' ? d.final_state : d.original_state)
		.key(d => d.file)
		.rollup(leaves => leaves.length)
		.entries(dogs[selToggle])

	const countsMap = d3.map(counts, d => d.key)

	const nestedExports = d3.nest()
		.key(d => selToggle === 'exports' ? d.final_state : d.original_state)
		.entries(dogs[selToggle])
		.sort((a, b) => d3.descending(a.values.length, b.values.length))

	lastReaderState = readerState


	return nestedExports

}

function nestDogs(loc, toggle){
	readerState = loc
	selToggle = toggle

	// filter exported dogs
	const filteredImports = exportedDogs.filter(d => d.final_state === readerState)
	const filteredExports = exportedDogs.filter(d => d.original_state === readerState)
	const allDogs = {imports: filteredImports, exports: filteredExports}
	const dogCounts = {imports: filteredImports.length, exports:filteredExports.length}

	const nestedExports = readerSelNest({dogs: allDogs, counts: dogCounts})

	return nestedExports
}

function updateLocation(loc){

	const nestedExports = nestDogs(loc, selToggle)

	charts.data(nestedExports)

}


function filterDogs(loc){
	const nestedExports = nestDogs(loc, selToggle)

	charts = $section
		.select('.figure-container')
		.datum(nestedExports)
		.exportsByState()
}

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      name: d.name.replace(/ *\([^)]*\) */g, "").replace('Adopted', '').replace('Pending', '')
		}
	})
}


// code for determining user's location and subsequent data
function resize() {}

function init(loc) {
	load.loadCSV('exportedDogs.csv')
		.then(result => {
			readerState = loc
			exportedDogs = cleanData(result)
			filterDogs(loc, selToggle)

			// setup interaction with show more button
			setupExpand()
			setupToggle()
		})
		.catch(console.error)
}

export default { init, resize, updateLocation };
