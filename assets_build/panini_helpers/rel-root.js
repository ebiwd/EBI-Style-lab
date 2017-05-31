// A way to programatically creat {{root}} where it fails.
// Believe this is due to 1f72867febf9a7f40b4494b90836887afbaebb60
  // "Not sure if a panini bug, but buildingBlocksCategoryPages in indices.js
  // doesn’t pass along {{root}} properly, or this may be as it’s using
  // _build as the root"
module.exports = function() {
  try {
    // if (this.root.length < 2)
    //   console.log(this.datafile);
    if (this.datafile == 'categories.json') {
      // we're on a blocks index page where {{root}} fails, so manually speicyf
      return "../../";
    }
    return this.root;
  }
  catch(ex) {
    return this.root;
  }
}
