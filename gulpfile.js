var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass  = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache  = require('gulp-cache'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin');

// Add autoprefixes, compile .scss to .css and minify
gulp.task('scss', function(){ 
  return gulp.src('app/scss/popup-style.scss')
              .pipe(autoprefixer(['last 5 versions', 'ie 8', 'ie 7'], { cascade: true }))
              .pipe(sass({outputStyle: 'compressed'})) 
              .pipe(gulp.dest('app/css')) 
});

// Minify .js
gulp.task('uglify', function(){
  return gulp.src('app/js/*.js')
              .pipe(uglify())
              .pipe(gulp.dest('app/js'))
});

// Minify html
gulp.task('minify-html', function() {
  return gulp.src('app/popup.html')
              .pipe(htmlmin({collapseWhitespace: true}))
              .pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('img', function() {
  return gulp.src('app/img/*') 
              .pipe(cache(imagemin({  
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
         })))
              .pipe(gulp.dest('dist/img')); 
});

// Build Production Site
gulp.task('build-dist', function(done) {
  var buildCss = gulp.src('app/css/*.css')
                      .pipe(gulp.dest('dist/css'));
 
  var buildJs = gulp.src('app/js/*.js')
                    .pipe(gulp.dest('dist/js'));
  done();
});

// Build Production Site with all updates
gulp.task('build', gulp.series('scss', 'uglify', 'minify-html', 'img' ,'build-dist'));