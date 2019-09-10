/* global d3 */
/* usage
	import loadData from './load-data'
	loadData().then(result => {

	}).catch(console.error)
*/

function loadJSON(file) {
	return new Promise((resolve, reject) => {
		d3.json(`assets/data/${file}`)
			.then(result => {
				// clean here
				resolve(result);
			})
			.catch(reject);
	});
}


function loadCSV(file) {
	return new Promise((resolve, reject) => {
		d3.csv(`assets/data/${file}`)
			.then(result => {

				resolve(result);
			})
			.catch(reject);
	});
}

function loadExamples(){
	loadJSON('exampleDogs.json')
}

function loadExported(){
	loadCSV('exportedDogs.csv')
}

function loadMap(){
	const loads = [loadCSV('loc_centers.csv'), loadCSV('movement_paths.csv'), loadJSON('topo.json')];
	return Promise.all(loads);
}

function loadCrosswalk(){
	const loads = [loadJSON('breed-crosswalk.json')]
	return Promise.all(loads)
}

export default {loadCSV, loadJSON, loadMap, loadCrosswalk}

// export default function loadData() {
//   const loads = [loadJSON('exampleDogs.json'), loadCSV('exportedDogs.csv')];
//   return Promise.all(loads);
// }
