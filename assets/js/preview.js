/*
 * preview.js
 */

//const hash = location.hash.replace('#', '');
const _hash = location.hash.replace('#', '').split('/');

let debug = false;
if (_hash[1]) debug = true;
console.log(_hash);
console.log('debug = ' + debug);

document.write('<script src="./assets/js/' + _hash[0] + '.js"></script>');