'use strict';

import plugins      from 'gulp-load-plugins';
import yargs        from 'yargs';
import browser      from 'browser-sync';
import gulp         from 'gulp';
import panini       from 'panini';
import rimraf       from 'rimraf';
import sherpa       from 'style-sherpa';
import yaml         from 'js-yaml';
import fs           from 'fs';
import sassLint     from 'gulp-sass-lint';
import gulpRename   from 'gulp-rename';
import _            from 'lodash';
import requireDir   from 'require-dir';
import stripCssComments from 'gulp-strip-css-comments';
import download     from 'gulp-download-stream';

// Load all Gulp plugins into one variable
const $ = plugins();

// load subtasks
requireDir('./assets_build/gulp/tasks');

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Get the latest icon font list
// Todo: make a partial in the font repo to use
gulp.task('updateIconFonts', function () {
  return download({
    file: "fonts.html",
    url: "http://www.ebi.ac.uk/web_guidelines/EBI-Icon-fonts/v1.2/index.html"
  })
  //
  // return download("http://www.ebi.ac.uk/web_guidelines/EBI-Icon-fonts/v1.2/index.html")
  // .pipe(replace(/.[\s\S]*?<body.*?>(.[\s\S]*?)/i, '$1'))
  // .pipe(replace(/.[\s\S]*?<section id="intro".*?>(.[\s\S]*?)/i, '$1'))
  // .pipe(replace('</body>', ''))
  // .pipe(replace('</html>', ''))
  // .pipe(replace(/<footer.[\s\S]*?/g, '</div>'))
    // <\/body>.[\s\S]*?html>
    // .pipe(replace(/.*?<body.*?>(.*?)<\/body>.*?/g, 'testng $1'))
    .pipe(gulp.dest("assets_site/partials/fonts"));
});

// Lint task
gulp.task('lint', function () {
  return gulp.src('assets_site/scss/**/*.s+(a|c)ss')
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
});

// Resets Panini so that we can assemble using different layouts for the iframes and building block pages
function getNewPanini(options) {
  var p = new panini.Panini(options);
  p.loadBuiltinHelpers();
  p.refresh();
  return p.render()
}

gulp.task('copy', gulp.parallel(copyAssets, copyData, copyBBImages, copyBBFiles, copyKitImages));

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
  gulp.series(clean, 'lint', 'building-block-meta',  buildingBlockBaseStyles, buildingBlockSass, buildingBlockJS, 'copy', 'zip', sass, javascript, images,
    gulp.parallel(pages, metaPatternsPages, sass, javascript, images, copyAssets),
  styleGuide));

// Build the site, run the server, and watch for file changes
gulp.task('dynamic-pages', gulp.series(kitIndex, 'kits-pages', metaPatterns, 'building-block-indices', 'building-block-pages'));

// Create Building Blocks
gulp.task('bb',
  gulp.series(clean, 'build', server, watch)
);

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, () => rimraf(PATHS.build, done));
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copyAssets() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copyData() {
  return gulp.src(PATHS.build + '/data/*')
    .pipe(gulp.dest(PATHS.dist + '/data'));
  }

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copyBBImages() {
  return gulp.src('content/websites/patterns/**/*.{png,jpg}')
    .pipe(gulp.dest(PATHS.dist + '/assets/img/websites/patterns/'));
  }

function copyKitImages() {
  return gulp.src('content/kits/**/*.{png,jpg}')
    .pipe(gulp.dest(PATHS.dist + '/assets/img/kits/'));
}

function copyBBFiles() {
  return gulp.src(['content/websites/patterns/**/*.{html,js,scss}', 'dist/building-blocks/**/*.css', '!dist/building-blocks/**/layout.css'])
    .pipe(gulp.dest(PATHS.dist + '/files/building-blocks/'));
}

// Copy page templates into finished HTML files
function kitIndex() {
  return gulp.src(['assets_site/pages/*.html,assets_site/pages/**/*.html'])
    .pipe(getNewPanini({
      root: 'assets_site/pages/',
      layouts: 'assets_site/layouts/',
      partials: ['assets_site/partials/','content/sections'],
      data: ['assets_site/data/', PATHS.build + '/data'],
      helpers: 'assets_build/panini_helpers/'
    }))
    .pipe($.if(PRODUCTION, $.revTimestamp()))
    .pipe(gulp.dest(PATHS.dist));
  }

gulp.task('kit-index', kitIndex)

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('assets_site/pages/**/*.{html,hbs,handlebars}')
    .pipe(getNewPanini({
      root: 'assets_site/pages/',
      layouts: 'assets_site/layouts/',
      partials: ['assets_site/partials/','content/sections'],
      data: 'assets_site/data/',
      helpers: 'assets_build/panini_helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist));
}

// Copy meta-patterns templates into finished HTML files
function metaPatterns() {
  return gulp.src('content/websites/meta-patterns/*.html')
  .pipe(getNewPanini({
    root: 'assets_site/pages/',
    layouts: 'assets_site/layouts/',
    partials: ['assets_site/partials/','content/sections'],
    data: ['assets_site/data/', PATHS.build + '/data'],
    helpers: 'assets_build/panini_helpers/'
  }))
  .pipe($.if(PRODUCTION, $.revTimestamp()))
  .pipe(gulp.dest(PATHS.dist+'/websites/meta-patterns'));
}

gulp.task('meta-patterns', metaPatterns)

// Copy meta-patterns templates into finished HTML files
function metaPatternsPages() {
  return gulp.src('content/websites/meta-patterns/*.{html,hbs,handlebars}')
    .pipe(getNewPanini({
      root: 'assets_site/pages/',
      layouts: 'assets_site/layouts/',
      partials: ['assets_site/partials/','content/sections'],
      data: 'assets_site/data/',
      helpers: 'assets_build/panini_helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist+'/websites/meta-patterns'));
}

function buildingBlockBaseStyles() {
  return gulp.src(['content/websites/patterns/app.scss', 'content/websites/patterns/app-float.scss'])
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
      .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe(gulp.dest(PATHS.dist + "/websites/patterns/"))
    .pipe(browser.reload({ stream: true }));
}
// Compiles the Sass for the building blocks
function buildingBlockSass() {
  var blocks = JSON.parse(fs.readFileSync(PATHS.build + '/data/building-blocks.json', 'utf8'));
  return gulp.src(['content/websites/patterns/**/*.scss'])
    .pipe($.insert.transform(function(contents, file){
      var pieces = file.path.split('/');
      var bbName = pieces[pieces.length - 2];
      if(blocks[bbName]) {
        if(blocks.grid !== 'float') {
          return "@import 'settings';\n$global-flexbox:true;\n@import 'foundation';\n" + contents;
        } else {
          return "@import 'settings';\n@import 'foundation';\n" + contents;
        }
      } else {
        return contents;
      }
    }))
    .pipe($.sass({
      includePaths: PATHS.sass,
      outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe(stripCssComments())
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(gulp.dest(PATHS.dist + "/websites/patterns/"))
}

// Moves JS from the Building Blocks into the dist
function buildingBlockJS() {
  return gulp.src('content/websites/patterns/**/*.js')
    .pipe(gulp.dest(PATHS.dist + "/websites/patterns/"));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
  sherpa('content/styleguide/index.md', {
    output: PATHS.dist + '/styleguide.html',
    template: 'content/styleguide/template.html'
  }, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('assets_site/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel({ignore: ['what-input.js', 'handlebars.min.js', 'lodash.min.js']}))
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets_site/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('content/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload(['**/*', '!**/*-iframe.html']);
  done();
}


// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, gulp.series('copy', reload));
  gulp.watch(['assets_site/pages/*.html', 'assets_site/pages/**/*.html']).on('all', gulp.series('kit-index', pages, kitIndex, reload));
  gulp.watch('content/websites/meta-patterns/*.html').on('all', gulp.series('meta-patterns', metaPatternsPages, metaPatterns, reload));
  gulp.watch(['content/sections/*.html', 'assets_site/{layouts,partials}/**/*.html']).on('all', gulp.series(pages, metaPatternsPages, kitIndex, 'dynamic-pages',  reload));
  gulp.watch('content/websites/patterns/**/*.html').on('all', gulp.series( 'building-block-pages', 'building-block-indices', reload));
  gulp.watch('content/websites/patterns/**/*.scss').on('all', gulp.series(buildingBlockSass,  'building-block-pages',reload));
  gulp.watch('content/websites/patterns/**/*.js').on('all', gulp.series(buildingBlockJS, 'building-block-pages', reload));
  gulp.watch(['content/websites/patterns/**/*.png', 'content/kits/**/*.png']).on('all', gulp.series('copy', reload));
  gulp.watch('content/websites/patterns/**/*.yml').on('all', gulp.series('building-block-meta', 'dynamic-pages', reload));
  gulp.watch('content/kits/**/*.yml').on('all', gulp.series('building-block-meta', 'dynamic-pages', reload));
  gulp.watch('assets_site/scss/**/*.scss').on('all', gulp.series(sass, buildingBlockSass, reload));
  gulp.watch('assets_site/js/**/*.js').on('all', gulp.series(javascript, reload));
  gulp.watch('content/assets/img/**/*').on('all', gulp.series(images, reload));
  gulp.watch('content/styleguide/**').on('all', gulp.series(styleGuide, reload));
}
