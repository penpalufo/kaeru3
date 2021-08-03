const urlHash = location.hash.replace('#', '');
console.log(urlHash);
document.write('<script src="./assets/js/' + urlHash + '.js"></script>');