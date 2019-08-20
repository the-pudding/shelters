/* global d3 */
import loadData from './load-data'

// reader parameters
const readerState = 'Maine'

// updating text selections
const $section = d3.selectAll('.intro')
const $state = $section.selectAll('.userState')
const $name = $section.selectAll('.exampleDog')
const $pOut = $section.selectAll('.intro-dog_out')
const $pIn = $section.selectAll('.intro-dog_in')
const $img = $section.selectAll('.intro-dog_image')


// constants
let exampleDogs = null
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

  // add dog image
  $img.attr('src', readerDog[0].image)
  console.log(readerDog[0].image)
}




// code for determining user's location and subsequent data
function resize() {}

function init() {
  loadData()
    .then(result => {
      exampleDogs = result[0]
      filterDogs()
    })
    .catch(console.error)
}

export default { init, resize };
