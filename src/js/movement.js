import load from './load-data'
import * as topojson from 'topojson';

// data
let centers = null
let movement = null
let us = null

// selections
const $section = d3.selectAll('.movement')
const $figure = $section.selectAll('.movement-figure')
const $svg = $figure.selectAll('.figure-container_svg')

// dimensions
let width = 900;
let height = 600;
const marginTop = 20;
const marginBottom = 20;
const marginLeft = 20;
const marginRight = 20;
const hypotenuse = Math.sqrt(width * width + height * height);

// map constants
let projection = d3.geoAlbers()
let radius = d3.scaleSqrt()
let path = d3.geoPath()

function setupDOM(){
  $svg.append("path")
      .datum(topojson.feature(us, us.objects.land))
      .attr("class", "land")
      .attr("d", path);

  $svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "state-borders")
      .attr("d", path);

  $svg.append("path")
      .datum({type: "MultiPoint", coordinates: centers})
      .attr("class", "state-dots")
      .attr("d", path);

  let state = $svg.selectAll(".state-center")
   .data(centers)
   .enter()
   .append("g")
   .attr("class", "state-center");

   state.append("path")
       .attr("class", "movement-arc")
       .attr("d", function(d) { return path(d.arcs); });
}

function setup(){
  findCoordinates()
  setupDOM()
  resize()
}


function resize(){
  width = $figure.node().offsetWidth - marginLeft - marginRight;
  height = $figure.node().offsetHeight - marginTop - marginBottom;

  $svg
    .attr('width', width + marginLeft + marginRight)
    .attr('height', height + marginTop + marginBottom);

  projection
    .translate([width / 2, height / 2])
    .scale(1280);

  radius
      .domain([0, 100])
      .range([0, 14]);

  path
      .projection(projection)
      .pointRadius(2.5);

}

function setupLocations(d) {
  d[0] = +d.longitude;
  d[1] = +d.latitude;
  d.arcs = {type: "MultiLineString", coordinates: []};
  return d;
}

function findCoordinates(){

  let locationByName = d3.map( centers, d => d.location );

  const test = locationByName.get('Alabama')

  movement.forEach((dog) => {
    let source = locationByName.get(dog.from)
    let target = locationByName.get(dog.to)
    source.arcs.coordinates.push([source, target]);
    target.arcs.coordinates.push([target, source]);
  });

  centers = centers
       .filter(function(d) { return d.arcs.coordinates.length; });
}

function init(){
  load.loadMap()
    .then(result => {
      centers = result[0].map(d => setupLocations(d))
      movement = result[1]
      us = result[2]
      setup()
  })
  .catch(console.error)

}

export default { init, resize }
