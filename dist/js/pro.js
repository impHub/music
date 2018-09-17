// 进度条模块
(function($,root){

    var $scope = $('body');
    var curDuration;
    //记录requestAnimationFrame,方便取消这个事件
    var frameId;  //lastPer记录暂时是进度条的百分比
    var startTime,lastPer = 0;
    // 渲染每首歌的总时间
    function renderAllTime(time){
        //每次切歌重置秒数
        lastPer = 0;
        curDuration = time;
        //  将时间格式转换
       time =  formatTime(time);
       //把转换后的数据渲染
       $scope.find('.all-time').html(time);
            
    }
    function formatTime(time){
        console.log(time,88)
        //小数取整
        time = Math.round(time);
        console.log(time,'time99')
        // 算出多少分钟
        var m = Math.floor(time / 60)
        //算出秒钟
        var s = time - m * 60;
        if(m<10){

            m = "0" + m; 
        }
         if(s<10){
        
            s = "0" + s 
        }
        return m + ':' +s; 
    }
    //开始时间 开始播放start
    function start(p){
        lastPer =  p == undefined ?lastPer :p;
        //开始的事件 毫秒
        startTime = new Date().getTime();
        //获取流逝的时间
        function frame(){
            // 不停的获取到当前时间
            var curTime = new Date().getTime();
            
                        //(当前时间 减去 开始的时间) 除以 这首歌的总时间
                // var percent = curTime - startTime
                update(percent)
                        //!!
            var percent = lastPer + (curTime - startTime) / (curDuration  * 1000)

            console.log(startTime,curTime,'pro',curDuration,percent)
            console.log(lastPer,'last2')
            if(percent <=1){
        //                    //时间百分比
            update(percent)
        //     // update(curTime);
        //     //不停的获取到时间 死循环  屏幕刷新频率
        frameId =  requestAnimationFrame(frame);
            }else{
                $('.prev-btn').trigger('click')
                cancelAnimationFrame(frameId);
            }
        }
        frame()
    }
    // 暂停停止计时
    function stop(){
        cancelAnimationFrame(frameId);
    //     //停止的瞬间记录事件
         var  stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration  * 1000)
        // console.log(stopTime,startTime,curDuration,'hah')
        console.log(lastPer,'last1')
    //     //记录
    //     lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
    }
    //更新区域 左侧时间 + 进度条运动
    function update(per){
        // var c = formatTime(per)
        // console.log(per,'per')
        //!!
        var curTime = curDuration * per;
        //处理时间格式
        curTime = formatTime(curTime)
        // console.log(curTime,'curtime')
        $scope.find('.cur-time').html(curTime);
        var perX = (per -1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform:'translateX('+perX+')'
        })
    }
    root.pro = {
        renderAllTime:renderAllTime,
        start:start,
        stop:stop,
        //更新区域 左侧时间 + 进度条运动
        update:update
    }

})(window.Zepto,window.player || (window.player = {}))