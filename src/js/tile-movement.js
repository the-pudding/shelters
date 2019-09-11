import load from './load-data'
import './pudding-chart/tile-template'
import lookup from './utils/lookup-state-abbr'

// data
let importExport = null
let tileLoc = null

// selections
const $section = d3.select('.movement')
const $container = $section.select('.figure-container')
const $tooltip = $section.select('.movement-tooltip')

function handleMouseover(){
	const sel = d3.select(this)
	const state = sel.attr('data-state')
	$tooltip
		.style('left', `${d3.event.pageX}px`)
		.style('top', `${d3.event.pageY}px`)
		.classed('is-hidden', false)

	if (state !== 'blank'){
		const imported = sel.attr('data-imported')
		const exported = sel.attr('data-exported')
		$tooltip.select('.tooltip-state').text(sel.attr('data-state'))
		$tooltip.select('.tooltip-count-import').text(imported)
		$tooltip.select('.tooltip-count-export').text(exported)

		$tooltip.classed('is-hidden', false)
	}
	else $tooltip.classed('is-hidden', true)
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
  const locationMap = d3.map(importExport, d => d.location)

  // add data to tile location
  const tileData = tileLoc.map((d, i) => {
    return {
      location: d,
      gridNumber: i + 1,
      count: locationMap.get(d),
      abbreviation: d === 'blank' ? null : lookup(d)
    }
  })

console.log({importExport})

  const charts = $container
		.selectAll('.grid-block')
		.data(tileData)
    .join(enter => enter
			.append('div')
			.attr('class', d => `grid-block block-${d.location}`)
			.attr('data-state', d => d.location)
			.attr('data-imported', d => (d.count) ? d.count.imported : null)
			.attr('data-exported', d => (d.count) ? d.count.exported : null)
			.on('mouseover', handleMouseover)
		)
		.tileMap()

}

function loadLocations(){
  load.loadJSON('tile-locations.json')
    .then(result => {
      tileLoc = result
      setup()
    })
    .catch(console.error)
}

function resize(){

}

function init(){
  load.loadCSV('importExport.csv')
    .then(result => {
      importExport = cleanData(result)
      loadLocations()
    })
    .catch(console.error)
}

export default {init, resize}
