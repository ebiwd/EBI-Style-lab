'use strict';
// get all pages and construct a json file for the search index
import gulp         from 'gulp';
import plugins      from 'gulp-load-plugins';
import _            from 'lodash';
import fs           from 'fs';
import yaml         from 'js-yaml';
import async        from 'async';
import through      from 'through2';
import gutil        from 'gulp-util';
// import frontMatter  from 'gulp-front-matter'
// import marked       from 'gulp-marked'
// import pageJson     from 'gulp-page-json'
import striptags    from 'striptags';
import stripJs      from 'strip-js';

// Load all Gulp plugins into one variable
const $ = plugins();

const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}
//
// function string_src(filename, source) {
//   var src = require('stream').Readable({ objectMode: true })
//   var string = '';
//   //
//
//   // var fileContent = fs.readFileSync("path/to/file.something", "utf8");
//
//   string = gulp.src('./dist/**/*.html')
//     .pipe(myFunction(fileContent))
//     .pipe(gulp.dest('destination/path'));
//
//
//   src._read = function () {
//     this.push(new gutil.File({
//       cwd: "",
//       base: "",
//       path: filename,
//       contents: new Buffer(string)
//     }))
//     this.push(null)
//   }
//   return src
// }

// gulp.task('pageJson', function () {
//   // var pkg = require('package.json')
//   // return gulp.src('./dist/**/*.html')
//   // .pipe(
//     return string_src("search_data.json", "./dist/**/*.html")
//       .pipe(gulp.dest('dist/'));
//   //  )
//   // ;
//   // return string_src("version", "3")
//   //   .pipe(gulp.dest('dist/'))
// })
//


// var pipeFunction = () => {
//   return through.obj((file, enc, cb) => {
//     console.log(file.path);
//     return cb(null, file);
//   });
// }
function pageJson() {
  var fileName = './dist/assets_site/search_data.js';
  var endOfLine = '\r\n';
  gutil.log(gutil.colors.green('Prepping search JSON'));
  var output = 'var tipuesearch = {"pages": [';

//'!./dist/**/*iframe.html'
  return gulp.src(['./dist/**/*.html'])
    .pipe(through.obj(function (file, enc, cb) {
      gutil.log(gutil.colors.green('Processing: ',file.path));

      // .pipe(replace(/.[\s\S]*?<body.*?>(.[\s\S]*?)/i, '$1'))
      // .pipe(replace(/.[\s\S]*?<section id="intro".*?>(.[\s\S]*?)/i, '$1'))
      // .pipe(replace('</body>', ''))
      // .pipe(replace('</html>', ''))
      // .pipe(replace(/<footer.[\s\S]*?/g, '</div>'))
        // <\/body>.[\s\S]*?html>
        // .pipe(replace(/.*?<body.*?>(.*?)<\/body>.*?/g, 'testng $1'))

      var text = fs.readFileSync(file.path, 'utf8');

      var title = text.match(/<title>(.*?)<\/title>/gi) + ' ';
        title = title.replace(/<title>(.*?)<\/title>/gi, '$1');
        title = title.replace('EMBL-EBI Style Lab <','');
        title = title.replace('< EMBL-EBI Style Lab','');


      var body = text.match(/<body.[\s\S]*?>(.[\s\S]*?)body>/gi) + ' ';
        body = body.replace(/<body.[\s\S]*?>(.[\s\S]*?)<\/body>/gi, '$1');
        body = stripJs(striptags(body));
        body = body.replace(/\r?\n|\r/g, ''); // remove white space
        body = body.replace(/    /g, ' '); // remove white space
        body = body.replace(/   /g, ' '); // remove white space
        body = body.replace(/  /g, ' '); // remove white space
        body = body.replace(/"/g, '\''); // remove double quotes

      // text = text.replace(/.[\s\S]*?<body.*?>(.[\s\S]*?)/i, '$1');

      // gutil.log(gutil.colors.green(body));

      output += endOfLine + '{"title": "'+title+'", "text": "'+body+'", "tags": "", ';

      // prep file path
      var localFilePath = file.path.split('/dist/')[1];
      localFilePath = localFilePath.replace("-iframe.html",".html"); // index, but don't link into iframes
      output += '"url": "'+localFilePath+'"';

      // close the json entry
      output += '},';
      cb(null, file)
      })
      .on('finish', function (status) {
        gutil.log(gutil.colors.green('Finished prepping JSON'));
        // write the rendered JSON
        require('fs').writeFileSync(fileName, output + endOfLine + ']};');
      })
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.message));
        process.exit(1)
      })
    );

  return output;
}

// gulp.task('pageJson', function () {
//     return gulp.src('./dist/**/*.html')
//         .pipe(frontMatter({propety: 'data', remove: true}))
//         .pipe(pageJson({
//           fileAttrs: "data",            //default: data
//           summaryMarker: "<!--MORE-->", //default: <!--more-->
//           numArticles: 15               //default: 10
//         }, function(jsonFiles) {        // optional: custom callback
//           console.log('jsonFiles', jsonFiles);
//         }))
//         .pipe(gulp.dest('build'));
// });

// gulp.task('zip', gulp.series(zipBlocks, zipKits));
gulp.task('build-search', gulp.series(pageJson));
