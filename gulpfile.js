var gulp = require('gulp');
var browserify = require('browserify');
var vueify = require('vueify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
    return browserify('./src/main.js')
        .transform(vueify)
        .bundle()
        .on('error', function(error){
            console.log(error);
        })
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build'));
});