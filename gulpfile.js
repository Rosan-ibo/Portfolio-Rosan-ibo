'use strict';

var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	rename 			= require('gulp-rename'),
	autoprefixer 	= require('gulp-autoprefixer'),
	cleanCSS 		= require('gulp-clean-css'),
	sourcemaps 		= require('gulp-sourcemaps'),
	notify 			= require('gulp-notify'),
	browserSync 	= require('browser-sync'),
	babel 			= require('gulp-babel'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglify');

sass.compiler = require('node-sass');

gulp.task('browser-sync', function() {

	// Synchroniser le navigateur à chaque modificationcd ..
	browserSync.init({
		// LIGNE A UTILISER EN PHP
		// proxy: "localhost/php_formulaire_2019/", au cas où vous êtes sur un serveur local
    	server: {
			// LIGNE A UTILISER EN HTML
    		baseDir: "./" // à utiliser en cas de fichier html
    	}
	})
});

// TACHES POUR LE CSS

gulp.task('styles', function() { //Appelle la tache
	return gulp.src('./assets/scss/**/*.scss') // cherche les fichiers scss dans le dossier scss
	.pipe(sourcemaps.init()) // récupère tous les fichiers scss
	.pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError())) // compile, si erreur il l'affiche
	.pipe(rename({suffix: '.min', prefix: ''})) // style.scss -> style.min.css
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS({level : { 1: { specialComments: 0 }}})) //supprime commentaires et nettoie le css avant compile
	.pipe(sourcemaps.write()) // Ecrit le sourcemap
    .pipe(gulp.dest('./assets/css')) // dossier de destination du fichier compilé
    .pipe(notify({message: 'Bravo : scss compilé !!!', onLast: true}))
    .pipe(browserSync.stream()); // Rafraichi le navigateur
});



// TACHES POUR LE JS

gulp.task('scripts', function() { // Appelle la tache
	return gulp.src([
		'./assets/lib/jquery/jquery.js',
		// './app/libs/plugins/**/*.js',
		'./assets/js/src/**/*.js'
	])
	.pipe(sourcemaps.init()) 
	.pipe(babel({ //Retranscrire ES6, ES7, ES8 dans du JS classique
		presets: ['@babel/env']
	}))
	.pipe(concat('scripts.min.js')) //Concatener directement dans le fichier
	.pipe(uglify()) //Nettoyer le fichier, simplifier les variables, réduit les variables longues pour COMPRESSER le code
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./assets/js/dist'))
	.pipe(notify({message: 'Bravo : js compilé !!!', onLast: true}))
	.pipe(browserSync.stream()); //Rafraichi le navigateur
});

// TACHE POUR LE HTML

gulp.task('code', function() { 
	return gulp.src('**/*.html') // en html pour le moment, à modifier si php
	.pipe(browserSync.stream());
});


// DERNIERE TACHE POUR APPLIQUER

gulp.task('watch', function() { //Appelle le watch avant d'appliquer à la fin
	gulp.watch('./assets/scss/**/*.scss', gulp.parallel('styles'));
	gulp.watch(['./assets/lib/**/*.js','./assets/js/src/**/*.js'], gulp.parallel('scripts'));
	gulp.watch('**/*.html', gulp.parallel('code')); // en html pour le moment, à modifier si php
});

gulp.task('default', gulp.parallel('styles','scripts', 'watch', 'code', 'browser-sync')); //Appliquer toutes les tâches concernées.