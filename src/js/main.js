/* global d3 */
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import graphic from './graphic';
import exported from './exported-dogs';
import footer from './footer';
import states from './utils/us-state-data'
// import movement from './movement'
import northern from './northern-movement'
import tile from './tile-movement'
import countries from './countries'
import load from './load-data'
import locate from './utils/locate'

const $body = d3.select('body');
let previousWidth = 0;
const $dropdown = d3.selectAll('.stateSelect')
let readerState = 'New York'
let importExport = null
let filteredDD = null
let allDD = null

function resize() {
	// only do resize on width changes, not height
	// (remove the conditional if you want to trigger on height change)
	const width = $body.node().offsetWidth;
	if (previousWidth !== width) {
		previousWidth = width;
		graphic.resize();
	}
}

function findReaderState(){
	return new Promise((resolve, reject) => {
		const key = 'fd4d87f605681c0959c16d9164ab6a4a'
		const locationData = locate(key, (err, result) => {
			readerState = result.region_name

			if (err) reject(err)
			else resolve(readerState)
		})

	})
}

function setupStateDropdown(){
	const justStates = states.map(d => d.state).sort((a, b) => d3.ascending(a, b))

	const limitedStates = importExport.filter(d => d.imported > 0).map(d => d.location).sort((a, b) => d3.ascending(a, b))

	filteredDD = $dropdown.filter((d, i, n) => d3.select(n[i]).attr('data-condition') === 'limited')
	allDD = $dropdown.filter((d, i, n) => d3.select(n[i]).attr('data-condition') === 'all')

	filteredDD.selectAll('option')
		.data(limitedStates)
		.enter()
		.append('option')
		.attr('value', d => d)
		.text(d => d)
		.property('selected', d => d === readerState)

	allDD.selectAll('option')
		.data(justStates)
		.enter()
		.append('option')
		.attr('value', d => d)
		.text(d => d)
		.property('selected', d => d === readerState)

	$dropdown.on('change', function(d){
		readerState = this.value
		updateLocation()
	})

}

function updateLocation(){
	graphic.updateLocation(readerState)
	exported.updateLocation(readerState)

	filteredDD.selectAll('option').property('selected', d => d === readerState)
	allDD.selectAll('option').property('selected', d => d === readerState)
}

function setupStickyHeader() {
	const $header = $body.select('header');
	if ($header.classed('is-sticky')) {
		const $menu = $body.select('.header__menu');
		const $toggle = $body.select('.header__toggle');
		$toggle.on('click', () => {
			const visible = $menu.classed('is-visible');
			$menu.classed('is-visible', !visible);
			$toggle.classed('is-visible', !visible);
		});
	}
}

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      imported: +d.imported,
      exported: +d.exported,
      number: i
		}
	})
}

function setup(){
	// add mobile class to body tag
	$body.classed('is-mobile', isMobile.any());
	// setup resize event
	window.addEventListener('resize', debounce(resize, 150));
	// setup sticky header menu
	setupStickyHeader();
	findReaderState()
		.then(() => {
			// kick off graphic code
			setupStateDropdown()
			graphic.init(readerState);
			exported.init(readerState);
			// movement.init();
			// northern.init();
			tile.init()
			countries.init()
		})

	// load footer stories
	footer.init();
}

function init() {
	load.loadCSV('importExport.csv')
		.then(result => {
			importExport = cleanData(result)
			setup()
		})
		.catch(console.error)

}

init();
