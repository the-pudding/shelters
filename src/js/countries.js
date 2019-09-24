import load from './load-data'

const $section = d3.select('.countries')
const $container = $section.select('.figure-container')
const $toggles = $section.selectAll('.toggle')
const $moreButton = $section.select('.show-more')
const $transparency = $section.select('.transparency')
const $checkboxes = $section.selectAll('input')
const $warning = $section.select('.figure-warning')


let rank = null
let selButton = 'All'
let conditions = {domestic: true, international: true}

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      imported: +d.imported,
      exported: +d.exported,
      international: d.inUS === 'false'
		}
	})
}

function setupExpand(){
  $moreButton.on('click', () => {
		const truncated = $container.classed('is-truncated');
		const text = truncated ? 'Show Fewer' : 'Show All';
		$moreButton.text(text);
		$container.classed('is-truncated', !truncated);

		if (!truncated) {
			const y = +$moreButton.attr('data-y');
			window.scrollTo(0, y);
		}

		$moreButton.attr('data-y', window.scrollY);
		$transparency.classed('is-visible', !truncated);
	});
}

function setupToggles(){
	$checkboxes.on('change', function(d){
		const box = d3.select(this)
		const condition = box.node().checked
		const value = box.node().value

		conditions[value] = condition

		console.log({conditions})

		filter(conditions)
	})
  // $toggles.on('click', function(d){
  //   const clicked = d3.select(this)
  //   selButton = clicked.attr('data-condition')
  //   $toggles.classed('is-active', false)
  //   clicked.classed('is-active', true)
	//
  //   filter(selButton)
  // })
}

function setup(){
  const header = $container.append('div').attr('class', 'header')
  header.append('p').attr('class', 'location-rank').text('Rank')
  header.append('p').attr('class', 'location-name').text('Location')
  header.append('p').attr('class', 'location-count').text('# Exported')
  console.log({$toggles})

  setupToggles()
  setupExpand()
  filter(conditions)
}

function filter(conditions){
	let filtered = null
	if (conditions.international || conditions.domestic){
		$warning.classed('is-hidden', true)
		$container.classed('is-hidden', false)
		$transparency.classed('is-visible', true)
		$moreButton.classed('is-disabled', false)
		if (conditions.international && conditions.domestic) filtered = rank
		else if (conditions.international) filtered = rank.filter(d => d.international === true)
		else if (conditions.domestic) filtered = rank.filter(d => d.international === false)
	}

	else if (!(conditions.international && conditions.domestic)) {
		$warning.classed('is-hidden', false)
		$container.classed('is-hidden', true)
		$transparency.classed('is-visible', false)
		$moreButton.classed('is-disabled', true)
	}


	const locations = $container.selectAll('.location')
		.data(filtered, (d, i) => `${d.location}-${i}`)
		.join(enter => {
			const loc = enter.append('div')
				.attr('class', 'location')
        .classed('international', d => d.international)

			loc.append('p').attr('class', 'location-rank').text((d, i) => i + 1)
			loc.append('p').attr('class', 'location-name').text(d => d.location)
			loc.append('p').attr('class', 'location-count').text(d => d.exported)
		})

}

function resize(){

}

function init(){
	load.loadCSV('importExport.csv')
		.then(result => {
			rank = cleanData(result).filter(d => d.exported > 0)
			setup()
			// setup interaction with show more button
			// setupExpand()
		})
		.catch(console.error)

}

export default {init, resize}
