/* global d3 */
import load from './load-data'

// reader parameters
let readerState = null

// updating text selections
const $section = d3.selectAll('.intro')
const $state = d3.selectAll('.userState')
const $name = $section.selectAll('.exampleDog')
const $pOut = $section.selectAll('.intro-dog_out')
const $pIn = $section.selectAll('.intro-dog_in')
const $pInEx = $section.selectAll('.intro-dog_inEx')
const $img = $section.selectAll('.intro-dog_image')
const $inCount = $section.selectAll('.inTotal')
const $outCount = $section.selectAll('.outTotal')
const $total = $section.selectAll('.stateTotal')
const $pupHerHis = $section.selectAll('.herhis')
const $pupSheHe = $section.selectAll('.shehe')
const $reason = $section.selectAll('.moveCondition')
const $dogOrigin = $section.selectAll('.dogOrigin')
const $stackBarContainer = $section.select('.intro-dog__bar')
const $exportedSection = d3.selectAll('.exported')
const $introAll = $section.selectAll('.prose-intro')
const $introDogCont = $section.select('.intro-dog')
const $postIntroIn = $exportedSection.select('.prose-block-in')
const $postIntroOut = $exportedSection.select('.prose-block-out')


// constants
let exampleDogs = null
const exportedDogs = null
let readerDog = null
let importExport = null
let readerStateData = null

const formatCount = d3.format(',.0f')
const formatPercent = d3.format('.0%')

function updateLocation(loc){
	readerState = loc

	filterDogs()
}

function cleanData(arr){
	return arr.map((d, i) => {
		return {
			...d,
      imported: d.imported === 'TRUE',
		}
	})
}

function updateBars(state){
	const selState = state
	const perOut = +selState.imported / +selState.total
	const perIn = (+selState.total - +selState.imported) /  +selState.total
	$stackBarContainer.select('.bar__inState').style('flex', `${perIn} 1 0`)
	$stackBarContainer.select('.bar__outState').style('flex', `${perOut} 1 0`)

	$stackBarContainer.select('.bar__inState-label').text(perOut < 0.01 ? '> 99%' : formatPercent(perIn))
	$stackBarContainer.select('.bar__outState-label').text(perOut < .01 ? '< 1%' : formatPercent(perOut))

	$section.select('.inPer').text(perOut < .01 ? '< 1%' : formatPercent(perOut))
	console.log({perOut})

	const oneHundred = perOut === 0 || perIn === 0
	$stackBarContainer.classed('is-hidden', oneHundred)
}


function filterDogs(){
	readerDog = exampleDogs.filter(d => d.current === readerState)
	readerStateData = importExport.filter(d => d.location === readerState)[0]

	// update state
	$state.text(readerState)
	$name.text(readerDog[0].name)

	// show appropriate text
	const exampleImport = +readerDog[0].imported
	const exportFew = +readerStateData.exported <= 1

	if (exampleImport){
		$pOut.classed('is-visible', true)
		$pIn.classed('is-visible', false)
		$pInEx.classed('is-visible', false)
		$exportedSection.classed('is-hidden', false)
		$postIntroIn.classed('is-hidden', false)
		$postIntroOut.classed('is-hidden', true)
	} else if (!exampleImport) {
		$pOut.classed('is-visible', false)
		$postIntroIn.classed('is-hidden', true)
		if (readerStateData.exported <= 1){
			$pInEx.classed('is-visible', false)
			$pIn.classed('is-visible', true)
			$exportedSection.classed('is-hidden', true)
		} else {
			$pInEx.classed('is-visible', true)
			$pIn.classed('is-visible', false)
			$exportedSection.classed('is-hidden', false)
			$postIntroOut.classed('is-hidden', false)
		}
	}

	// update counts
	if (readerStateData){
		$inCount.text(formatCount(+readerStateData.imported))
		$outCount.text(formatCount(+readerStateData.exported))
		$total.text(formatCount(+readerStateData.total))
	}


	// update pronouns
	const pupPronoun = readerDog[0].sex
	$pupHerHis.text(pupPronoun === 'm' ? 'his' : 'her')
	$pupSheHe.text(pupPronoun === 'm' ? 'he' : 'she')

	// update conditions
	$reason.text(readerDog[0].conditions)
	$dogOrigin.text(readerDog[0].original)

	// add dog image
	const fileName = readerDog[0].name.replace(' ', '')
	const fileState = readerDog[0].current.replace(' ', '_')
	$img.attr('src', `assets/images/faces/${fileState}.png`)

	updateBars(readerStateData)
}


// code for determining user's location and subsequent data
function resize() {

}


function init(loc) {
	return new Promise((resolve,reject) => {
		const files = [
			'exampleDogs.json',
			'importExport.csv'
		]
		const loads = files.map(load.loadAny);
		Promise.all(loads)
			.then(([exampleDogsData, importExportData]) => {
				exampleDogs = cleanData(exampleDogsData)
				importExport = importExportData
				readerState = loc
				resolve()
			})
			.then(filterDogs)
			.catch(console.error)
	})
}

export default { init, resize, updateLocation };
