var $ = window.Zepto;
//接收项目唯一全局函数
var root = window.player;
// console.log(root,9090);
//选中body,用一个变量接收来减少性能消耗
var $scope = $(document.body);
// console.log($scope)
// var app = 90;
var index = 0;
var songList;
var audio = new root.audioControl();

function bindEvent() {
    
    $scope.on('play:change', function (e, index) {
        console.log(index,'6767')
        audio.getAudio(songList[index].audio);
        root.pro.renderAllTime(songList[index].duration)
        //status播放状态
        if (audio.status == 'play' ) {
            audio.play();
            // root.pro.start();
        }
    })
    // $scope.on('click', '.play-btn', function () {
    //     if (audio.status == 'play') {
    //         audio.pause();
    //     } else {
    //         audio.play();
    //     }
    //     $(this).toggleClass('pause');
    // })
    //播放暂停
    // $('.play-btn').on('click',  function () {
        $scope.on('click', '.play-btn', function () {
        if (audio.status == 'play') {
            
            audio.pause();
            root.pro.stop();
            console.log('stop')

            root.pro.start();
            
        } else {
            audio.play();
            root.pro.start();
            console.log('play')
        }
        $(this).toggleClass('pause');
    })



    $scope.on('click', '.prev-btn', function () {
        // if(index === 0){
        //     index = songList.length -1;
        // }else{
        //     index--;
        // }
        //执行index值函数
        index = controlManger.prev();

        root.render(songList[index]);
        // getData('../mock/data.json');
        //切换歌曲
        $scope.trigger('play:change', index)
    })
    $scope.on('click', '.next-btn', function () {
        // if(index === songList.length -1){
        //     index = 0;
        // }else{
        //     index++;
        // }
        index = controlManger.next();
        root.pro.start(0);
        root.render(songList[index]);
        // getData('../mock/data.json');
        //切换歌曲调用
        $scope.trigger('play:change', index)
        
    })

    //点击喜爱和取消
    $scope.on('click', '.like-btn', function () {
        $(this).toggleClass('liking');
    })
}
//实现拖拽

function bindTouch(){
    // console.log($scope.find('.slider-point'),8989)
    var $s = $scope.find('.slider-pinter');

    var offset = $scope.find('.pro-bottom').offset();
    console.log(offset,8988)

    var left = offset.left;

    var width = offset.width;
    // console.log(c,9090);
    //
    //小圆点上绑定拖拽开始
    $s.on('touchstart',function(p){
     
        //进度条停止移动,只受拖拽影响
        root.pro.stop();
    //拖拽中
    }).on('touchmove',function(e){
        // console.log(left);
        var x = e.changedTouches[0].clientX;
        var per = (x -left) / width;
        if(per>0 && per<=1){
            root.pro.update(per);
            // audio.playTo(curTime)
        }
      
     //拖拽结束 继续播放音乐
    }).on('touchend',function(e){

        var x = e.changedTouches[0].clientX;

        var per = (x -left) / width;

        if(per>0 && per<=1){
            // console.log(songList,[root.controlManger.getIndex()],'哈哈')
            var curTime = per * songList[controlManger.index].duration;
            //curTime记录当前秒数
            // console.log(curTime,'999')
            audio.playTo(curTime);
            $scope.find('.play-btn').addClass('pause');
            root.pro.start(per);
            
        }
    })
}


function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {

            console.log(data);
            // 渲染函数执行
            root.render(data[0]);

            songList = data;
            bindTouch();
            bindEvent();
            // console.log(controlManger)
            window.controlManger = new root.controlManger(data.length);
            $scope.trigger('play:change', index)


        },
        error: function () {
            console.log('error');
        }
    })

}

getData('../mock/data.json');




