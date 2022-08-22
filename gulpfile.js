const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const gulpif = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rm = require("gulp-rm");
const svgSprite = require("gulp-svg-sprite");
const svgo = require("gulp-svgo");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const dist = "./dist";
const paths = {
  scripts: {
    dest: `${dist}/js`,
    path: "./src/scripts/**/*.js",
    output: "bundle.min.js",
    libs: [
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/slick-carousel/slick/slick.js",
    ],
  },
  styles: {
    dest: `${dist}/css`,
    css: "./src/styles/css/**/*.css",
    scss: "./src/styles/scss/main.scss",
    path: "./src/styles/**/*.+(css|scss)",
    output: "main.min.css",
    libs: ["./node_modules/slick-carousel/slick/slick.css"],
  },
  icons: {
    path: "./src/img/icons/sprite/**/*.svg",
    output: "sprite.svg",
    dest: `${dist}/img/icons`,
  },
  images: {
    path: "./src/img/**/*.+(png|jpg|svg)",
    dest: `${dist}/img`,
  },
  html: {
    path: "./src/*.html",
    dest: dist,
  },
};

gulp.task("clean", () => {
  return gulp.src(`${dist}/**/*`, { read: false }).pipe(rm());
});

gulp.task("styles", () => {
  return gulp
    .src([...paths.styles.libs, paths.styles.css, paths.styles.scss])
    .pipe(concat(paths.styles.output))
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ env: process.env.NODE_ENV }))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulpif(isDev, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task("scripts", () => {
  return gulp
    .src([...paths.scripts.libs, paths.scripts.path])
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(concat(paths.scripts.output))
    .pipe(gulpif(isDev, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task("icons", () => {
  return gulp
    .src(paths.icons.path)
    .pipe(
      svgo({
        plugins: [{ removeAttrs: { attrs: "(stroke|fill)" } }],
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../" + paths.icons.output,
          },
        },
      })
    )
    .pipe(gulp.dest(paths.icons.dest));
});

gulp.task("copy:images", () => {
  return gulp
    .src([paths.images.path, `!${paths.icons.path}`], { nodir: true })
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task("copy:html", () => {
  return gulp.src(paths.html.path).pipe(gulp.dest(paths.html.dest));
});

gulp.task("reload", (done) => {
  reload();
  done();
});

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: dist,
    },
  });

  gulp.watch(paths.styles.path, gulp.series(["styles", "reload"]));
  gulp.watch(paths.scripts.path, gulp.series(["scripts", "reload"]));
  gulp.watch(paths.icons.path, gulp.series(["icons", "reload"]));
  gulp.watch(paths.images.path, gulp.series(["copy:images", "reload"]));
  gulp.watch(paths.html.path, gulp.series(["copy:html", "reload"]));
});

gulp.task(
  "build",
  gulp.series([
    "clean",
    gulp.parallel(["styles", "scripts", "icons", "copy:images", "copy:html"]),
  ])
);

gulp.task("default", gulp.series(["build", "serve"]));
