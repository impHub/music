(function($,root){
    console.log(this,'this')
    function controlManger(len){
        // this.name = 'name'
        // index.js全局声明了index,当在index.js执行这个函数是就可以访问到index
        this.index = index;
        //在index.js里面new了这个函数所有this指向自己
        this.len = len;
        console.log('len',len,index);
    }

    controlManger.prototype ={
        prev:function(){
            // index --;
            return this.getIndex(-1);
        },
        next:function(){
            // index ++;
            return this.getIndex(1);
        },
        getIndex:function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val)% len;
            this.index = curIndex;
            return curIndex;
        },
       
    }

    root.controlManger = controlManger;



})(window.Zepto, window.player || (window.player = {}));
