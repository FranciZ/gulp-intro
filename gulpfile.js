var gulp    = require('gulp');
var domSrc  = require('gulp-dom-src');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var cheerio = require('gulp-cheerio');
var htmlMin = require('gulp-htmlmin');

gulp.task('serve', function(){



});

gulp.task('js', function(){

    domSrc({ file:'index.html', selector:'script', attribute:'src' })
        .pipe(concat('app.full.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));

});

gulp.task('html', function(){

    gulp.src('index.html')
        .pipe(cheerio(function($){

            $('script').remove();
            $('#some-el').text('TEXT ADDED DURING BUILD');
            $('body').append('<script src="app.full.min.js"></script>');

        }))
        .pipe(htmlMin({ collapseWhitespace:true }))
        .pipe(gulp.dest('dist/'));

});


gulp.task('build', ['js', 'html']);










