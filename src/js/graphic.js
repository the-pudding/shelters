/* global d3 */
import loadData from './load-data'

// reader parameters
const readerState = 'Washington'

// updating text selections
const $section = d3.selectAll('.intro')
const $state = d3.selectAll('.userState')
const $name = d3.selectAll('.exampleDog')


// constants
let exampleDogs = null
let readerDog = null

function filterDogs(){
  readerDog = exampleDogs.filter(d => d.current === readerState)

  // update state
  $state.text(readerState)
  $name.text(readerDog[0].name)
  console.log({readerDog})
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
