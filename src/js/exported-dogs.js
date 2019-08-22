/* global d3 */
import load from './load-data'
import './pudding-chart/exports-template'

// reader parameters
const readerState = 'Washington'

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

function filterDogs(){
  // filter exported dogs
  const filteredExports = exportedDogs.filter(d => d.final_state === readerState)

  const nestedExports = d3.nest()
    .key(d => d.original_state)
    .entries(filteredExports)
    .sort((a, b) => d3.descending(a.values.length, b.values.length))

  charts = $container
    .selectAll('.state')
    .data(nestedExports)
    .enter()
    .append('div')
    .attr('class', 'state')
    .exportsByState()
}


// code for determining user's location and subsequent data
function resize() {}

function init() {
  load.loadCSV('exportedDogs.csv')
    .then(result => {
      exportedDogs = result
      filterDogs()

      // setup interaction with show more button
      setupExpand()
    })
    .catch(console.error)
}

export default { init, resize };
