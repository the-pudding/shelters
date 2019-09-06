import load from './load-data'
import './pudding-chart/tile-template'
import lookup from './utils/lookup-state-abbr'

// data
let importExport = null
let tileLoc = null

// selections
const $section = d3.select('.movement')
const $container = $section.select('.figure-container')

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

console.log({tileData})

  const charts = $container
		.selectAll('.grid-block')
		.data(tileData)
    .join(enter => enter.append('div').attr('class', d => `grid-block block-${d.location}`))
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
