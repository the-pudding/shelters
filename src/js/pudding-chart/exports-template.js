/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/
import load from "../load-data";

d3.selection.prototype.exportsByState = function init(options) {
  function createChart(el) {
    const $container = d3.select('.exported');
    const $sel = d3.select(el);
    let data = $sel.datum();
    // dimension stuff
    let width = 0;
    const height = 0;
    const marginTop = 0;
    const marginBottom = 0;
    const marginLeft = 0;
    const marginRight = 0;

    // scales
    const scaleX = null;
    const scaleY = null;

    // dom elements
    const $svg = null;
    const $axis = null;
    const $vis = null;
    const $containerMini = null;
    const $tooltip = $container.select('.exported-tooltip');
    let $stateTitle = null;
    let allDogs = null;
    let crosswalk = null;

    function handleMouseover() {
      // select hovered animal, its data, and the parent state/country div
      const hovered = d3.select(this);
      const hoveredData = hovered.data()[0];
      const parent = hovered.node().parentNode;
      const $selParent = d3.select(parent);

      // dim everyone except hovered dog
      const dogs = $selParent.selectAll('.dog').classed('dimmed', true);

      hovered.classed('dimmed', false);

      // update tooltip info based on hovered dog
      $tooltip.select('.tooltip-name').text(hoveredData.name);
      $tooltip
        .select('.tooltip-desc')
        .text(`${hoveredData.age} • ${hoveredData.sex}`);
      $tooltip
        .select('.tooltip-breed')
        .text(
          hoveredData.breed_secondary
            ? `${hoveredData.breed_primary} / ${hoveredData.breed_secondary} mix`
            : `${hoveredData.breed_primary}`
        );

      // update tooltip location based on mouse location
      const mouseX = d3.event.pageX;
      // const mouseY = d3.event.pageY
      // const toolTipHeight = $tooltip.node().offsetHeight;
      const toolTipWidth = $tooltip.node().offsetWidth;

      $tooltip
        .style('left', () => {
          let xMove = mouseX;
          if (mouseX > 0.5 * width) xMove -= toolTipWidth;
          console.log({ xMove, width });
          return `${xMove}px`;
        })
        .style('top', `${d3.event.pageY}px`)
        .classed('is-hidden', false);
    }

    function handleMouseout() {
      const section = d3.select(this);
      d3.selectAll('.dog').classed('dimmed', false);

      $tooltip.classed('is-hidden', true);
    }

    function importCrosswalk() {
      load
        .loadCrosswalk()
        .then(result => {
          crosswalk = d3.map(result[0], d => d.file);
        })
        .catch(console.error);
    }

    const Chart = {
      // called once at start
      init() {
        importCrosswalk();
        Chart.resize();
        Chart.render();
      },
      // on resize, update new dimensions
      resize() {
        // defaults to grabbing dimensions from container element
        width = $sel.node().offsetWidth - marginLeft - marginRight;
        // height = $sel.node().offsetHeight - marginTop - marginBottom;
        // $svg
        // 	.attr('width', width + marginLeft + marginRight)
        // 	.attr('height', height + marginTop + marginBottom);
        return Chart;
      },
      // update scales and render chart
      render() {
        const $state = $sel
          .selectAll('.state')
          .data(data, d => `${d.key}-${d.values.length}`)
          .join(enter => {
            const state = enter.append('div').attr('class', 'state');

            $stateTitle = state.append('p').attr('class', 'state-name');

            const $container = state
              .append('div')
              .attr('class', 'container-mini');

            return state;
            // .enter()
            // .append('div')
            // .attr('class', 'dog')
            //
          });

        $stateTitle.text(d => `${d.key} • ${d.values.length}`);

        $state
          .select('.container-mini')
          .selectAll('.dog')
          .data(d => d.values.sort((a, b) => d3.ascending(a.file, b.file)))
          .join(enter => {
            allDogs = enter
              .append('div')
              .attr('class', 'dog')
              .classed('highlighted', d => d.highlighted)
              .on('mouseover', handleMouseover)
              .on('mouseout', handleMouseout);

            return allDogs;
          })
          .style('background-image', d =>
            d.file === 'mix'
              ? 'url(assets/images/profiles/labrador.png)'
              : `url(assets/images/profiles/${d.file}.png)`
          );

        //
        // const sorted = data.values
        // 	.sort((a, b) => d3.ascending(a.size, b.size))
        // 	.sort((a,b) => {
        // 		return d3.ascending(a.file, b.file)
        // 	})

        // $containerMini.selectAll('.dog')
        // 	.data(sorted)
        // 	.join(
        // 		enter => {
        // 			enter.append('div')
        // 				.attr('class', 'dog')
        // 				.style('background-image', d => `url(assets/images/profiles/${d.file}.png)`)
        // 		},
        // 		exit => {
        // 			exit.remove()
        // 		}
        // 	)

        return Chart;
      },
      // get / set data
      data(val) {
        if (!arguments.length) return data;
        data = val;
        $sel.datum(data);
        Chart.render();
        return Chart;
      },
    };
    Chart.init();

    return Chart;
  }

  // create charts
  const charts = this.nodes().map(createChart);
  return charts.length > 1 ? charts : charts.pop();
};
