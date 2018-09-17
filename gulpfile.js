//下载gulp
var gulp = require('gulp');
//下载代码压缩插件
var htmlclean = require('gulp-htmlclean');
//压缩图片插件
var imgMin = require('gulp-imagemin');
//压缩js插件
var uglify = require('gulp-uglify');
//去掉调试语句的插件
var debug = require('gulp-strip-debug');
//把所有js文件进行拼接减少HTTP请求
var concat = require('gulp-concat');
//把less文件转换成css插件
var less = require('gulp-less')
//添加css前缀 压缩代码
var postcss = require('gulp-postcss');
//添加前缀
var autoprefixer = require('autoprefixer');
//压缩代码
var cssnano = require('cssnano');
//服务器插件
var connect = require('gulp-connect');


//判断是开发环境还是打包生产环境 devMode返回的是true
//devMode返回的是true表示是开发环境,false是生产环境
var devMode = process.env.NODE_ENV == 'development';
//在命令行修改开发环境和生产环境
//查看修改结果
console.log(devMode);


// gulp.src();//读文件
// gulp.dest();//写文件
// gulp.task();//创建任务
// gulp.watch();//监听

var folder = {
    src: 'src/', //开发目录文件夹
    dist: 'dist/' //压缩打包后目录文件夹
}
gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
    .pipe(connect.reload())
                
    //如果是开发环境就不进行压缩代码
    if (!devMode) {
        //代码压缩
        page.pipe(htmlclean())
    }

    //把src文件传入dist
    page.pipe(gulp.dest(folder.dist + 'html/'))
})

gulp.task('images', function () {
    gulp.src(folder.src + 'images/*')
        //执行插件压缩图片
        .pipe(imgMin())
        //取到文件传入dist
        .pipe(gulp.dest(folder.dist + 'images/'))
})

//创建JS任务
gulp.task('js', function () {
    //取到当前JS文件的路径
    var page = gulp.src(folder.src + 'js/*')
                        //自动刷新
                .pipe(connect.reload())
    //如果是开发环境就不进行压缩个删减调试语句
    if (!devMode) {
        //去调试语句插件执行           
        page.pipe(debug())
            //压缩
            .pipe(uglify())
    }
    //拼接所有js文件
    // .pipe(concat('main.js'))
    page.pipe(gulp.dest(folder.dist + 'js/'))
})

//创建css任务
gulp.task('css', function () {
    //把压缩代码和添加前缀都放在数组里方便调用
    var options = [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + 'css/*')
        //把less文件转换成css
        .pipe(less())
            //自动刷新
            .pipe(connect.reload())
    //如果是开发环境就不执行添加前缀
    if (!devMode) {
        //添加前缀
        page.pipe(postcss(options))
    }

    page.pipe(gulp.dest(folder.dist + 'css/'))
})
//监听所有文件,当代码内容改变时dist内容随动
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'images/*', ['images']);
})

//创建服务器任务
gulp.task('server',function(){
    connect.server({
        //把默认8080端口号修改
        port:'8090',
        //浏览器自动刷新
        livereload:true,
    })
})


//执行队列
//执行任务函数 html images
gulp.task('default', ['html', 'images', 'js', 'css', 'watch','server'])

