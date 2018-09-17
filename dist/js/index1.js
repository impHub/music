var $ = window.Zepto;

function getData(url){
    $.ajax({
        type :'GET',
        url :url,
        success:function(data){
            console.log(data)
        },
        error:function(){
            console.log('error');
        }
    })
}
console.log(888)
getData();