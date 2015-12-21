var gulp = require('gulp')
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

var PATHS = {
    coffeeAll: './src/*.coffee',
    jsDir: './lib',
};

gulp.task('coffee-compile', function() {
    // 编译coffee文件
    gulp.src(PATHS.coffeeAll)
    .pipe(plugins.coffeelint())
    .pipe(plugins.coffeelint.reporter())
    .pipe(plugins.coffee({bare: true}).on('error', plugins.util.log))
    .pipe(gulp.dest(PATHS.jsDir));
});

gulp.task('watch', function () {
   gulp.watch(PATHS.coffeeAll, ['coffee-compile']);
});

gulp.task('default', ['watch']);
