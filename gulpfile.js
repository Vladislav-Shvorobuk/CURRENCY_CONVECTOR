'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require("browser-sync"),
    concat = require('gulp-concat'),
    reload = browserSync.reload;

var config = {
    server: {
        baseDir: "./dest"
    },
    port: 7777
};

gulp.task('webserver', () => browserSync(config));

gulp.task('html:build', () => {
    return gulp.src('src/*.html') 
        .pipe(gulp.dest('dest/')) 
        .pipe(reload({ stream: true }));
});

gulp.task('js:build', () => {
    return gulp.src(
        [
            'src/**/main.js',
            'src/**/constants.js',
            'src/**/filters.js',
            'src/**/service.js',
            'src/**/controller.js'
        ]) 
        .pipe(sourcemaps.init()) 
        .pipe(concat('index.js'))
        // .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest('dest/js')) 
        .pipe(reload({ stream: true }));
});

gulp.task('style:build', () => {
    return gulp.src(['src/styles/**/main.scss']) 
        .pipe(sourcemaps.init()) 
        .pipe(sass()) 
        .pipe(prefixer()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dest/css/')) 
        .pipe(reload({ stream: true }));
});

gulp.task('build', ['html:build', 'js:build', 'style:build']);

gulp.task('watch', () => {
    watch(['src/**/*.html'], () => gulp.start('html:build'));
    watch(['src/styles/**/*.scss'], () => gulp.start('style:build'));
    watch(['src/js/*.js'], () => gulp.start('js:build'));
});


gulp.task('default', ['build', 'webserver', 'watch']);


























// var gulp = require('gulp'),
//     watch = require('gulp-watch'),
//     prefixer = require('gulp-autoprefixer'),
//     uglify = require('gulp-uglify'),
//     sass = require('gulp-sass'),
//     sourcemaps = require('gulp-sourcemaps'),
//     rigger = require('gulp-rigger'),
//     cssmin = require('gulp-minify-css'),
//     imagemin = require('gulp-imagemin'),
//     pngquant = require('imagemin-pngquant'),
//     rimraf = require('rimraf'),
//     browserSync = require("browser-sync"),
//     concat = require('concat'),
//     reload = browserSync.reload;

// var path = {
//     dest: { //Тут мы укажем куда складывать готовые после сборки файлы
//         html: 'dest/',
//         js: 'dest/js/',
//         css: 'dest/css/',
//         img: 'dest/img/',
//         fonts: 'dest/fonts/'
//     },
//     src: { //Пути откуда брать исходники
//         html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
//         js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
//         style: 'src/styles/*.scss',
//         img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
//         fonts: 'src/fonts/**/*.*'
//     },
//     watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
//         html: 'src/**/*.html',
//         js: 'src/js/**/*.js',
//         style: 'src/styles/**/*.scss',
//         img: 'src/img/**/*.*',
//         fonts: 'src/fonts/**/*.*'
//     },
//     clean: './dest'
// };

// var config = {
//     server: {
//         baseDir: "./dest"
//     },
//     tunnel: true,
//     host: 'localhost',
//     port: 9000,
//     logPrefix: "Bodya copypast this"
// };

// gulp.task('webserver', function () {
//     browserSync(config);
// });

// gulp.task('clean', function (cb) {
//     rimraf(path.clean, cb);
// });

// gulp.task('html:build', function () {
//     gulp.src(path.src.html) //Выберем файлы по нужному пути
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(gulp.dest(path.dest.html)) //Выплюнем их в папку dest
//         .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
// });

// gulp.task('js:build', function () {
//     gulp.src(path.src.js) //Найдем наш main файл
//         .pipe(concat( 'iiiii.js' ) )
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(sourcemaps.init()) //Инициализируем sourcemap
//         .pipe(uglify()) //Сожмем наш js
//         .pipe(sourcemaps.write()) //Пропишем карты
//         .pipe(gulp.dest(path.dest.js)) //Выплюнем готовый файл в dest
//         .pipe(reload({stream: true})); //И перезагрузим сервер
// });

// gulp.task('style:build', function () {
//     gulp.src(path.src.style) //Выберем наш main.scss
//         .pipe(sourcemaps.init()) //То же самое что и с js
//         .pipe(sass()) //Скомпилируем
//         .pipe(prefixer()) //Добавим вендорные префиксы
//         .pipe(cssmin()) //Сожмем
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(path.dest.css)) //И в dest
//         .pipe(reload({stream: true}));
// });

// gulp.task('image:build', function () {
//     gulp.src(path.src.img) //Выберем наши картинки
//         .pipe(imagemin({ //Сожмем их
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()],
//             interlaced: true
//         }))
//         .pipe(gulp.dest(path.dest.img)) //И бросим в dest
//         .pipe(reload({stream: true}));
// });

// gulp.task('fonts:build', function() {
//     gulp.src(path.src.fonts)
//         .pipe(gulp.dest(path.dest.fonts))
// });

// gulp.task('build', [
//     'html:build',
//     'js:build',
//     'style:build',
//     'fonts:build',
//     'image:build'
// ]);


// gulp.task('watch', function(){
//     watch([path.watch.html], function(event, cb) {
//         gulp.start('html:build');
//     });
//     watch([path.watch.style], function(event, cb) {
//         gulp.start('style:build');
//     });
//     watch([path.watch.js], function(event, cb) {
//         gulp.start('js:build');
//     });
//     watch([path.watch.img], function(event, cb) {
//         gulp.start('image:build');
//     });
//     watch([path.watch.fonts], function(event, cb) {
//         gulp.start('fonts:build');
//     });
// });


// gulp.task('default', ['build', 'webserver', 'watch']);