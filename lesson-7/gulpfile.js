var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var jsonminify = require('gulp-jsonminify');

var clean = require('gulp-clean');

var src = {
	html: "app/*.html",
	css: "app/css/*.css",
	js: "app/js/*.js",
	json: "app/json/*.json"
}

var fileName = {
	css: "style.min.css",
	js: "scripts.min.js"
}

var path = "prod/";

gulp.task("html", function(){
	return gulp.src(src.html)
		.pipe(htmlreplace({
			"css": fileName.css,
			"js": fileName.js
		}))
		.pipe(gulp.dest(path));
})

gulp.task("css", function(){
	return gulp.src(src.css)
		.pipe(concat(fileName.css))
		.pipe(gulp.dest(path));
})

gulp.task("js", function(){
	return gulp.src(src.js)
		.pipe(concat(fileName.js))
		.pipe(uglify())
		.pipe(gulp.dest(path));
})

gulp.task('json', function () {
    return gulp.src(src.json)
        .pipe(jsonminify())
        .pipe(gulp.dest(path + '/json/'));
});

gulp.task('build', ["html", "css", "js", "json"]);

gulp.task('clean', function(){
	return gulp.src(path, {read: false})
		.pipe(clean());
});

