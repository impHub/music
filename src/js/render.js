

//渲染 $Zepto框架 
(function($,root){
    // console.log(root.blurImg());
    // 渲染第一个数据
    // renderInfo(data[0]);
    var $scope = $(document.body);
    //渲染歌名 专辑 作者
    function renderInfo(info){
        var html = 
        '<div class="song-name">'+info.song+'</div>'+
       '<div class="singer-name">'+info.singer+'</div>'+
        '<div class="album-name">'+info.album+'</div>'
        $scope.find('.song-info').html(html);
    }
    //渲染图片
    function renderImg(src){
        //创造一个标签,作为高斯模糊背景
        var img = new Image();
        img.src = src;
        //img图片加载成功才执行的函数
        img.onload = function(){
            // 高斯模糊函数
            root.blurImg(img,$scope)
            $scope.find('.song-img img').attr('src',src);
        }
    }
    function renderIslike(islike){
        console.log(islike)
        if(islike){
            $scope.find('.like-btn').addClass('liking');
            console.log('like')
        }else{
            $scope.find('.like-btn').removeClass('liking')
        }
    }

    //渲染函数在index $.ajax中执行
    root.render =  function render(data){
        renderInfo(data);
        renderImg(data.image);
        // renderIslike(data.isLike);
    }

   


})(window.Zepto,window.player || (window.player = {}));
//通过window.play暴露函数里的函数