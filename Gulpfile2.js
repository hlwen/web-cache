var gulp=require('gulp'),
    concat=require('gulp-concat'),//文件合并
    uglify=require('gulp-uglify'),//js压缩
    minifyCss=require('gulp-minify-css'),//css压缩
    rev  = require('gulp-rev-append'); // 给URL自动加上版本号
clean=require('gulp-clean');//清理

//css处理任务
gulp.task('mini-css',function(){
    gulp.src(['./src/css/*.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'));
});
//js处理任务
gulp.task('mini-js',function(){
    gulp.src(['./src/js/*.js'])
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: false
        }))
        .pipe(gulp.dest('./dist/js'));
});
//路径替换任务
gulp.task('rev',function(){
    gulp.src('./src1/*.html')
        .pipe(rev())
        .pipe(gulp.dest('./dist1'));
});
//清理文件
gulp.task('clean', function() {
    gulp.src(['./dist'])
        .pipe(clean());
});
//图片处理，
gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('./dist/img'));
});
gulp.task('default', ['clean'], function(){
    gulp.start('mini-css','mini-js','images','rev');
});