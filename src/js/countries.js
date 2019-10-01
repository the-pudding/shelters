import load from './load-data';

const $section = d3.select('.countries');
const $container = $section.select('.figure-container');
const $table = $container.select('table');
const $toggles = $section.selectAll('.toggle');
const $moreButton = $section.select('.show-more');
const $transparency = $section.select('.transparency');
const $checkboxes = $section.selectAll('input');
const $warning = $section.select('.figure-warning');

let rank = null;
const selButton = 'All';
const conditions = { domestic: true, international: true };

const COLUMNS = [
  { title: 'Rank', prop: 'i' },
  { title: 'Location', prop: 'location' },
  { title: '# Exported', prop: 'exported' },
];

function cleanData(arr) {
  return arr.map((d, i) => {
    return {
      ...d,
      imported: +d.imported,
      exported: +d.exported,
      international: d.inUS === 'false',
    };
  });
}

function setupTableHeader() {
  // adding table header
  $table
    .append('thead')
    .selectAll('th')
    .data(COLUMNS)
    .join(enter => enter.append('th').text(d => d.title));

  $table.append('tbody');
}

function setupExpand() {
  $moreButton.on('click', () => {
    const truncated = $container.classed('is-truncated');
    const text = truncated ? 'Show Fewer' : 'Show All';
    $moreButton.text(text);
    $container.classed('is-truncated', !truncated);

    if (!truncated) {
      const y = +$moreButton.attr('data-y');
      window.scrollTo(0, y);
    }

    $moreButton.attr('data-y', window.scrollY);
    $transparency.classed('is-visible', !truncated);
  });
}

function setupToggles() {
  $checkboxes.on('change', function(d) {
    const box = d3.select(this);
    const condition = box.node().checked;
    const { value } = box.node();

    conditions[value] = condition;

    filter(conditions);
  });
}

function setup() {
  //   const header = $container.append('div').attr('class', 'header');
  //   header
  //     .append('p')
  //     .attr('class', 'location-rank')
  //     .text('Rank');
  //   header
  //     .append('p')
  //     .attr('class', 'location-name')
  //     .text('Location');
  //   header
  //     .append('p')
  //     .attr('class', 'location-count')
  //     .text('# Exported');

  setupTableHeader();
  setupToggles();
  setupExpand();
  filter(conditions);
}

function filter(conditions) {
  let filtered = null;
  if (conditions.international || conditions.domestic) {
    $warning.classed('is-hidden', true);
    $container.classed('is-hidden', false);
    $transparency.classed('is-visible', true);
    $moreButton.classed('is-disabled', false);
    if (conditions.international && conditions.domestic) filtered = rank;
    else if (conditions.international)
      filtered = rank.filter(d => d.international === true);
    else if (conditions.domestic)
      filtered = rank.filter(d => d.international === false);
  } else if (!(conditions.international && conditions.domestic)) {
    $warning.classed('is-hidden', false);
    $container.classed('is-hidden', true);
    $transparency.classed('is-visible', false);
    $moreButton.classed('is-disabled', true);
  }

  // adding semantic table
  const getRowData = (d, i) =>
    COLUMNS.map(c => ({ value: d[c.prop], title: c.title, rank: i }));

  const $row = $table
    .select('tbody')
    .selectAll('tr')
    .data(filtered, (d, i) => `${d.location}-${i}`)
    .join(enter => enter.append('tr'));

  $row
    .selectAll('td')
    .data(getRowData, d => `${d.value}${d.rank}`)
    .join(enter => enter.append('td').attr('class', d => `${d.title}`))
    .text(d => {
      if (d.title === 'Rank') return d.rank + 1;

      return d.value;
    });
}

function resize() {}

function init() {
  load
    .loadCSV('importExport.csv')
    .then(result => {
      rank = cleanData(result).filter(d => d.exported > 0);
      setup();
      // setup interaction with show more button
      // setupExpand()
    })
    .catch(console.error);
}

export default { init, resize };
