(function($){
  var viewWidth = $(window).width();

  


  
  var player ;
    
  function createVideo(){
    var _w = $(window).width();
    var videoH = parseInt(_w*9/16);
    //$(".videoWrap").css({"height":videoH+"px","marginTop":-parseInt(videoH/2-20)+"px"});
    
    $('.videoLayer').show();
    var _time, interval = 1000, demandKey, playState = 'close';
    var useHtml5 = false;
    var video = new tvp.VideoInfo();
    var modId = 'mod_player1';
    var vid = 'i0015x7equ5';
    var pic = '';
    video.setVid(vid);
    var video_playType = "auto";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("android") >= 0) {
      var a = parseFloat(ua.slice(ua.indexOf("android") + 8));
      if (a > 3) {
        video_playType = "html5";
      }
      useHtml5=true;
    }
    player = new tvp.Player();
    console.log(player);
    player.create({
      width: "100%",
      height: '100%',
      pic: pic,
      isHtml5UseUI:useHtml5,            
      video: video,
      modId: modId,
      playerType: video_playType,
      autoplay: true,
      isiPhoneShowPlaysinline : tvp.$.browser.WeChat,
      html5ForbiddenUIFeature: (tvp.$.os.iphone && !tvp.$.browser.WeChat) ? ["controlbar","title","definition"] : ["title","definition"],
      isHtml5UseFakeFullScreen: true,
      appid: 10001,
      onplaying:function(){
        playState = 'play';
      },
      onended:function(){
        playState = 'end';
      },
      onpause:function(){
        if(playState != 'end'){
            playState = 'pause';
        }
      },
      //contentId: newsId,
    });
  };
    

  
  //根据页面比例进行缩放 
  var viewWidth = $(window).width();
  var viewRate = viewWidth/320;
  var viewHeight = $(window).height();
  var $contentLis = $('.content-li');
  var $wrap = $('.scroll');
  var pageIndex = -1;
  
  $wrap.css('width',viewWidth*6 + 'px');
  $contentLis.css('width',viewWidth + 'px').css('height',viewHeight + 'px');
  $('.page-content').css('transform','scale('+ viewRate +')');
  
  

  
  var step = -1;
  function startAnimation(){
    var defer = $.mDeferred();

    $.coming90(function(){
      defer.resolve();
    });

    
    return defer;
  };

  function showPage(directive){
    if(directive == 'next'){ //往后翻
      if(pageIndex == 5){
        return;
      }
      pageIndex++;
      

      
    }else if(directive == 'first'){
      pageIndex = 0;

    }else{//往前翻
      if(pageIndex == 0){
        return;
      }
      pageIndex--;
      
      
    }

    $wrap.css('-webkit-transform','translateX('+ (-pageIndex*viewWidth) +'px)');
    $contentLis.eq(pageIndex).addClass('animation-on').siblings().removeClass('animation-on');

  };


  startAnimation().then(function(){
    var defer = $.mDeferred();

    //1.cover进入舞台
    // $('.cover').addClass('fadeInLeft animation-on');
    // var animationBlocks = $contentLis.eq(step).find('.animation');
    
    showPage('next');
    
    //移除loading
    $('#loading-wrap').addClass('fadeOutLeft').on('webkitAnimationEnd',function(){
      $('#loading-wrap').remove();
    });
  })


  
  /*这里可以取消页面回弹，否则swipeLeft有时候不好用*/
  document.addEventListener('touchmove', function(event) {
      if(event.target.type == 'range') return;
      event.preventDefault();
  });

  //分享
  window.share_data = {
    "title":"xx title",
    "pic":"http://mat1.gtimg.com/news/2014/zt/abju/h5/share.jpg",
    "desc":"5个故事，10种结局，你将如何导演他们的人生？",
    "url":document.location.href
  };
  mShare.init();
  $('#start_again').click(function(){
    showPage('first');
  });

  
//cover右侧滑动，进入guest页面
$(document).off('swipeLeft').on('swipeLeft','.content-li',function(e){
  e.preventDefault();
  showPage('next');
});

$(document).off('swipeRight').on('swipeRight','.content-li',function(e){
  e.preventDefault();
  showPage('prev')
});

//点击播放视频
$('.video-play-btn').click(function(){
  createVideo();
  $(this).hide();
});
//关闭视频
$(".closeVideo").off().on("tap",function(){
  player.pause();
  $(".videoLayer").hide();
  $('.video-play-btn').show().css('opacity',1);
});







  
})(Zepto);