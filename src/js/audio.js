(function($,root){
    function audioControl(){
        // console.log(this,1234)
        // this指向自己
        this.audio = new Audio();
        //最开始为暂停
        this.status = 'pause';
    }
    audioControl.prototype = {
        //开始
        play:function(){
            this.audio.play();
            this.status = 'play';
        },
        // 暂停
        pause:function(){
            this.audio.pause();
            this.status = 'pause'; 
        },
        //获取到资源
        getAudio:function(src){
            // console.log(src,'src')
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function(time){
            // console.log(this.audio.currentTime,'qqq')
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.audioControl = audioControl;

})(window.Zepto,window.player)