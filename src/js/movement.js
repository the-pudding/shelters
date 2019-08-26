import load from './load-data'

// data
let centers = null
let movement = null

// selections
const $section = d3.selectAll('.movement')
const $figure = $section.selectAll('.movement-figure')



function resize(){

}

function init(){
  load.loadMap()
    .then(result => {
      centers = result[0]
      movement = result[1]
      console.log({centers, movement})
  })
  .catch(console.error)

}

export default { init, resize }
