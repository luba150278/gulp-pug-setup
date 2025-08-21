// const { src, dest, series, parallel, watch } = require('gulp');
// const browserSync = require('browser-sync').create();
// const { deleteAsync } = require('del');
// const plumber = require('gulp-plumber');
// const gulpIf = require('gulp-if');
// const pug = require('gulp-pug');
// const sass = require('gulp-sass')(require('sass'));
// const sourcemaps = require('gulp-sourcemaps');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');
// const imagemin = require('gulp-imagemin').default;
// const pngquant = require('imagemin-pngquant').default;
// const mozjpeg = require('imagemin-mozjpeg').default;
// const webp = require('gulp-webp').default;
// // const avif = require('gulp-avif').default;
// const newer = require('gulp-newer');
// const svgmin = require('gulp-svgmin');

// const isProd = process.env.NODE_ENV === 'production';

// const terser = require('gulp-terser');

// const paths = {
//   pug: {
//     src: 'src/pug/pages/**/*.pug',
//     watch: 'src/pug/**/*.pug',
//     dest: 'dist',
//   },
//   styles: {
//     src: 'src/sass/main.sass',
//     watch: 'src/sass/**/*.sass',
//     dest: 'dist/css',
//   },
//   scripts: {
//     src: 'src/js/**/*.js',
//     dest: 'dist/js',
//   },
//   images: {
//     src: 'src/images/**/*.{jpg,jpeg,png}',
//     svg: 'src/images/**/*.svg',
//     dest: 'dist/images',
//   },
//   static: {
//     src: 'src/static/**/*',
//     dest: 'dist',
//   },
// };

// function clean() {
//   return deleteAsync(['dist']);
// }

// function views() {
//   return src(paths.pug.src)
//     .pipe(plumber())
//     .pipe(pug({ pretty: !isProd }))
//     .pipe(dest(paths.pug.dest))
//     .pipe(browserSync.stream());
// }
// function styles() {
//   return src(paths.styles.src)
//     .pipe(plumber())
//     .pipe(gulpIf(!isProd, sourcemaps.init()))
//     .pipe(
//       sass
//         .sync({
//           indentedSyntax: true,
//           outputStyle: 'expanded',
//         })
//         .on('error', sass.logError)
//     )
//     .pipe(postcss([autoprefixer(), ...(isProd ? [cssnano()] : [])]))
//     .pipe(gulpIf(!isProd, sourcemaps.write('.')))
//     .pipe(dest(paths.styles.dest))
//     .pipe(browserSync.stream());
// }

// function scripts() {
//   return src(paths.scripts.src)
//     .pipe(plumber())
//     .pipe(gulpIf(isProd, terser())) // мініфікація лише в production
//     .pipe(dest(paths.scripts.dest))
//     .pipe(browserSync.stream());
// }

// function images() {
//   return src(paths.images.src)
//     .pipe(newer(paths.images.dest))
//     .pipe(
//       imagemin([
//         pngquant({ quality: [0.65, 0.85] }),
//         mozjpeg({ quality: 80, progressive: true }),
//       ])
//     )
//     .pipe(dest(paths.images.dest))
//     .pipe(webp()) // тільки webp
//     .pipe(dest(paths.images.dest))
//     .pipe(browserSync.stream());
// }

// function svgs() {
//   return src(paths.images.svg)
//     .pipe(newer(paths.images.dest))
//     .pipe(svgmin())
//     .pipe(dest(paths.images.dest))
//     .pipe(browserSync.stream());
// }

// function serve() {
//   browserSync.init({
//     server: { baseDir: 'dist' },
//     notify: false,
//     open: true,
//     ui: false,
//   });

//   watch(paths.pug.watch, views);
//   watch(paths.styles.watch, styles);
//   watch(paths.scripts.src, scripts);
//   watch(paths.images.src, images);
//   watch(paths.images.svg, svgs);
// }

// const dev = series(
//   clean,
//   parallel(views, styles, scripts, images, svgs),
//   serve
// );
// const build = series(
//   () => {
//     process.env.NODE_ENV = 'production';
//     return Promise.resolve();
//   },
//   clean,
//   parallel(views, styles, scripts, images, svgs)
// );

// exports.clean = clean;
// exports.views = views;
// exports.styles = styles;
// exports.scripts = scripts;
// exports.images = images;
// exports.svgs = svgs;
// exports.dev = dev;
// exports.build = build;
// exports.default = dev;
const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const { deleteAsync } = require('del');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin').default;
const pngquant = require('imagemin-pngquant').default;
const mozjpeg = require('imagemin-mozjpeg').default;
const webp = require('gulp-webp').default;
const newer = require('gulp-newer');
const svgmin = require('gulp-svgmin');
const terser = require('gulp-terser');

const isProd = process.env.NODE_ENV === 'production';

const paths = {
  pug: {
    src: 'src/pug/pages/**/*.pug',
    watch: 'src/pug/**/*.pug',
    dest: 'dist',
  },
  styles: {
    src: 'src/sass/main.scss', // змінено на SCSS
    watch: 'src/sass/**/*.scss',
    dest: 'dist/css',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js',
  },
  images: {
    src: 'src/images/**/*.{jpg,jpeg,png}',
    svg: 'src/images/**/*.svg',
    dest: 'dist/images',
  },
  static: {
    src: 'src/static/**/*',
    dest: 'dist',
  },
};

function clean() {
  return deleteAsync(['dist']);
}

function views() {
  return src(paths.pug.src)
    .pipe(plumber())
    .pipe(pug({ pretty: !isProd }))
    .pipe(dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

function styles() {
  return src(paths.styles.src)
    .pipe(plumber())
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(
      sass({ outputStyle: 'expanded' }).on('error', sass.logError) // SCSS
    )
    .pipe(postcss([autoprefixer(), ...(isProd ? [cssnano()] : [])]))
    .pipe(gulpIf(!isProd, sourcemaps.write('.')))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(plumber())
    .pipe(gulpIf(isProd, terser()))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function images() {
  return src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin([
        pngquant({ quality: [0.65, 0.85] }),
        mozjpeg({ quality: 80, progressive: true }),
      ])
    )
    .pipe(dest(paths.images.dest))
    .pipe(webp())
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

function svgs() {
  return src(paths.images.svg)
    .pipe(newer(paths.images.dest))
    .pipe(svgmin())
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: { baseDir: 'dist' },
    notify: false,
    open: true, // автоматично відкриває браузер
    ui: false,
  });

  watch(paths.pug.watch, views);
  watch(paths.styles.watch, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.images.svg, svgs);
}

const dev = series(
  clean,
  parallel(views, styles, scripts, images, svgs),
  serve
);

const build = series(
  (done) => {
    process.env.NODE_ENV = 'production';
    done();
  },
  clean,
  parallel(views, styles, scripts, images, svgs)
);

exports.clean = clean;
exports.views = views;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.svgs = svgs;
exports.dev = dev;
exports.build = build;
exports.default = dev;
