/* global d3 */
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import graphic from './graphic';
import exported from './exported-dogs';
import footer from './footer';
import states from './utils/us-state-data'

const $body = d3.select('body');
let previousWidth = 0;
const $dropdown = d3.selectAll('.stateSelect')
let readerState = 'Washington'

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  const width = $body.node().offsetWidth;
  if (previousWidth !== width) {
    previousWidth = width;
    graphic.resize();
  }
}

function setupStateDropdown(){
  const justStates = states.map(d => d.state)

  $dropdown.selectAll('option')
    .data(justStates)
    .enter()
    .append('option')
    .attr('value', d => d)
    .text(d => d)
    .property('selected', d => d === readerState)

  $dropdown.on('change', function(d){
    readerState = this.value
    updateLocation()
  })
}

function updateLocation(){
  graphic.updateLocation(readerState)
  exported.updateLocation(readerState)
}

function setupStickyHeader() {
  const $header = $body.select('header');
  if ($header.classed('is-sticky')) {
    const $menu = $body.select('.header__menu');
    const $toggle = $body.select('.header__toggle');
    $toggle.on('click', () => {
      const visible = $menu.classed('is-visible');
      $menu.classed('is-visible', !visible);
      $toggle.classed('is-visible', !visible);
    });
  }
}

function init() {
  // add mobile class to body tag
  $body.classed('is-mobile', isMobile.any());
  // setup resize event
  window.addEventListener('resize', debounce(resize, 150));
  // setup sticky header menu
  setupStickyHeader();
  // kick off graphic code
  setupStateDropdown()
  graphic.init(readerState);
  exported.init(readerState);

  // load footer stories
  footer.init();
}

init();
