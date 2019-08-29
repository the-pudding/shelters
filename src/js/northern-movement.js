import './pudding-chart/northern-template'
import load from './load-data'

// selections
const $section = d3.select('.northern')
const $container = $section.select('.figure-container')

// data
let movementData = null

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      latDiff: +d.latDiff,
      n: +d.n
		}
	})
}

function setup(){
  const filtered = movementData.filter(d => d.inUS === 'TRUE')

	const chart = $container
    .datum(movementData.slice(0, 100))
    .northernLine()
}

function resize(){}

function init() {
	load.loadCSV('northernMovement.csv')
		.then(result => {
			movementData = cleanData(result)
			setup()
		})
		.catch(console.error)
}

export default {resize, init}
