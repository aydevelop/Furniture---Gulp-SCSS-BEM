const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(
  ['node_modules/jquery/dist/jquery.js', 
  'node_modules/slick-carousel/slick/slick.js',
  'node_modules/mixitup/dist/mixitup.js', 
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',  
  'app/js/main.js'])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function images() {
  return src('app/images/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest('dist/images'));
}

function build() {
  del.sync('dist');
  return src(
    [
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html',
    ],
    { base: 'app' }
  ).pipe(dest('dist'));
}

function watching() {
  browserSync.init({ server: { baseDir: 'app/' } });
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch('app/*.html').on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.default = watching;
//exports.build = series(build, images);
exports.build = parallel(build, images);
