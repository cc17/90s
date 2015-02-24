/**
 * loadImg  图片预加载
 */
 (function($){
      var _loadImages = function(pics, callback){
        var index = 0;
        var len = pics.length;
        var img = new Image();
        var flag = false;
        var progress = function(w){
            //console.log(w);
            $('.progress-inner').css('width',w);
            $(".progress-text ").html(w);
        }
        var load = function(){
            img.src = pics[index];
            img.onload = function() {
                // 控制台显示加载图片信息
                progress(Math.floor(  ( (index + 1) / len) * 100 ) + "%");
                index ++ ;
                if (index < len) {
                    load();
                }else{
                    callback()
                }
            }
            return img;
        }
        if(len > 0){
            load();
        }else{
            progress("100%");
        }
        return {
            pics: pics,
            load: load,
            progress: progress
        };
    }
    var pics = [
        'images/90-logo.png',
        'images/author-color-block1.png',
        'images/author-color-block2.png',
        'images/author-footer.png',
        'images/author-trangle-bottom.png',
        'images/author-trangle-top.png',
        'images/close.png',
        'images/cover-hole.png',
        'images/cover-star.png',
        'images/cover-triangle-1.png',
        'images/cover-triangle-2.png',
        'images/cover-triangle-3.png',
        'images/cover-triangle.png',
        'images/gray-bg.png',
        'images/gray-bg2.png',
        'images/guest-1-left-1.png',
        'images/guest-1-left-2.png',
        'images/guest-1-left-3.png',
        'images/guest-1-left-4.png',
        'images/guest-1-right-1.png',
        'images/guest-1-right-2.png',
        'images/guest-1-right-3.png',
        'images/guest-1-right-4.png',
        'images/guide-1.png',
        'images/guide-2.png',
        'images/guide-3.png',
        'images/guide-4.png',
        'images/guide-5.png',
        'images/guide-6.png',
        'images/guide-star-bottom.png',
        'images/guide-star-right.png',
        'images/guide-star-top.png',
        'images/icon-page-0-arrow.png',
        'images/lianghui.png',
        'images/loading-bg.png',
        'images/logo.png',
        'images/previous-review-bg.png',
        'images/previous-review-circle.png',
        'images/previous-review-trangle.png',
        'images/slogan.png',
        'images/video-box-bg.png',
        'images/video-hole.png',
        'images/video-play-btn.png',
        'images/video-trangle-gray.png',
        'images/video-trangle.png',
        'images/wait-text.png'
    ];

    $.coming90 = function(callback){
        _loadImages(pics,function(){
            //for test
          //return;
          callback();
          $('#loading-wrap').remove();
        });
    };
 })(Zepto);
