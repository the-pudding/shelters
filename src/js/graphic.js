/* global d3 */
import load from './load-data'

// reader parameters
const readerState = 'New York'

// updating text selections
const $section = d3.selectAll('.intro')
const $state = d3.selectAll('.userState')
const $name = $section.selectAll('.exampleDog')
const $pOut = $section.selectAll('.intro-dog_out')
const $pIn = $section.selectAll('.intro-dog_in')
const $img = $section.selectAll('.intro-dog_image')
const $inCount = $section.selectAll('.inTotal')
const $outCount = $section.selectAll('.outTotal')
const $total = $section.selectAll('.stateTotal')
const $pupHerHis = $section.selectAll('.herhis')
const $pupSheHe = $section.selectAll('.shehe')



// constants
let exampleDogs = null
let exportedDogs = null
let readerDog = null

function filterDogs(){
  readerDog = exampleDogs.filter(d => d.current === readerState)

  // update state
  $state.text(readerState)
  $name.text(readerDog[0].name)

  // show appropriate text
  if (readerDog[0].imported === "TRUE"){
    $pOut.classed('is-visible', true)
    $pIn.classed('is-visible', false)
  } else {
    $pOut.classed('is-visible', false)
    $pIn.classed('is-visible', true)
  }

  // update counts
  $inCount.text(readerDog[0].count_imported)
  $outCount.text(readerDog[0].count_exported)
  $total.text(readerDog[0].total)

  // update pronouns
  const pupPronoun = readerDog[0].sex
  $pupHerHis.text(pupPronoun === 'm' ? 'his' : 'her')
  $pupSheHe.text(pupPronoun === 'm' ? 'he' : 'she')

  // add dog image
  $img.attr('src', readerDog[0].image)
}


// code for determining user's location and subsequent data
function resize() {}

function init() {
  load.loadJSON('exampleDogs.json')
    .then(result => {
      exampleDogs = result
      filterDogs()
    })
    .catch(console.error)
}

export default { init, resize };
