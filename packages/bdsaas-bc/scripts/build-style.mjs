import gulp from 'gulp'
import less from 'gulp-less'
import autoPreFixer from 'gulp-autoprefixer'

function buildStyle() {
  return gulp.src('../components/**/style/**.less')
    .pipe(less())
    .pipe(autoPreFixer())
    .pipe(gulp.dest('../dist/es/components'))
    .pipe(gulp.dest('../dist/lib/components'))
}

export {
  buildStyle as default
}
