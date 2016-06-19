var gulp = require('gulp');
var s3 = require( "gulp-s3" );
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

gulp.task('prod-build', shell.task(['npm run build:prod']));

gulp.task('s3', function() {
	var s3Credentials = require('../keys/amazon/finderKeys.json');
	gulp.src('./dist/**').pipe(s3(s3Credentials));
});

gulp.task('deploy', function() {
	runSequence('prod-build', 's3');
})