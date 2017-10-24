var gulp=require('gulp'),
    concat=require('gulp-concat'),//文件合并
    uglify=require('gulp-uglify'),//js压缩
    minifyCss=require('gulp-minify-css'),//css压缩
    rev=require('gulp-rev'),//对文件名加MD5后缀
    clean=require('gulp-clean'),//清理
    revCollector=require('gulp-rev-collector');//路径替换

//css处理任务
gulp.task('mini-css',function(){
    gulp.src(['./src/**/*.css'])
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('./dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css'));
});//css处理任务
//js处理任务
gulp.task('mini-js',function(){
    gulp.src(['./src/**/*.js'])
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: false
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/js'));
});
//路径替换任务
gulp.task('rev',function(){
    gulp.src(['./rev/*/*json','./src/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('./dist'));
});
//清理文件
gulp.task('clean', function() {
    gulp.src(['dist','rev'], {read: false})
        .pipe(clean());
});
//图片处理，
gulp.task('images', function() {
    return gulp.src('src/**/*.{png,jpg,gif,svg,ico}')
        .pipe(gulp.dest('./dist'));
});
gulp.task('default', ['clean'], function(){
    gulp.start('mini-css','mini-js','rev');
});
