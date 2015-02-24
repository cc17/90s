(function($){
  var viewWidth = $(window).width();

  var guestAnimationData = {
    1:"bounceInRight 0.8s ease-in-out forwards",
    2:"bounceInRight 0.8s ease-in-out 100ms forwards",
    3:"bounceInRight 0.8s ease-in-out 200ms forwards",
    4:"bounceInRight 0.8s ease-in-out 300ms forwards"
  };
  var guideAnimationData = {
    0:"zoomInRight 0.6s ease-in",
    1:"zoomInLeft 0.6s ease-in 0.6s",
    2:"zoomInRight 0.6s ease-in 1.2s",
    3:"zoomInLeft 0.6s ease-in 1.8s",
    4:"bounceInDown 0.8s ease-in 2.4s",
    5:"tada 0.6s ease-in 3.4s",
    6:"triangleMove 4s ease-in infinite",
    7:"triangleMove 4s ease-in infinite",
    8:"triangleMove 4s ease-in infinite",
  };
  var coverAnimationData = {
    0:"coming 500ms",
    1:"fadeIn 0.7s ease-in 0.5s forwards",
    2:"triangleMove 4s ease-in infinite forwards",
    3:"triangleMove 4s ease-in infinite forwards",
    4:"slogan 0.3s ease-in 0.5s forwards"
  };
  var videoAnimationData = {
    0:'videoAnimate 0.6s ease-in forwards',
    1:'fadeIn 0.6s ease-in 0.8s forwards',
    2:'fadeIn 0.6s ease-in 0.8s forwards',
    3:'fadeIn 0.6s ease-in 0.8s forwards',
    4:'triangleMove 4s ease-in 0.6s forwards infinite',
    5:'triangleMove 4s ease-in 0.6s forwards infinite'
  };


  
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
  
  $contentLis.css('width',viewWidth + 'px').css('height',viewHeight + 'px');
  $('.page-content').css('transform','scale('+ viewRate +')');

  

  
  var step = 0;
  function startAnimation(){
    var defer = $.mDeferred();

    $.coming90(function(){
      defer.resolve();
    });

    
    return defer;
  };

  startAnimation().then(function(){
    var defer = $.mDeferred();
    //1.cover进入舞台
    $('.cover').css('-webkit-animation','fadeIn 0.4s ease-in forwards');
    var animationBlocks = $contentLis.eq(step).find('.animation');
    step++;

    $('#loading-wrap').addClass('fadeOutLeft').on('webkitAnimationEnd',function(){
      $('#loading-wrap').remove();
    });
    
    
    animationBlocks.each(function(index){
      $(this)
        .css('-webkit-animation', coverAnimationData[index] )
        .css('-webkit-animation-fill-mode','forwards'); 
    });
    setTimeout(function(){
      defer.resolve();
    },4000);
    return defer;
  }).then(function(){
    $('.cover').css('-webkit-animation','fadeOutLeft 0.3s forwards');
    $('.cover').on('webkitAnimationEnd',function(){
      $('.cover').remove();
    });
    /***2. 嘉宾页进入舞台**/
    var $guest = $('.guest');
    $guest.addClass('fadeInRight')
    var defer = $.mDeferred();
    $guest.find('.left-block').each(function(index){
        $(this).css('-webkit-animation',guestAnimationData[parseInt(index,10) + 1]);
    });
    $guest.find('.right-block').each(function(index){
      $(this).css('-webkit-animation',guestAnimationData[parseInt(index,10) + 1]);
    });

    setTimeout(function(){
      defer.resolve();
    }, 300);
    return defer;
  }).then(function(){
    //3.引导页进入舞台
    $('.guest').addClass('fadeOutLeft').on('webkitAnimationEnd',function(){
      $('.guest').remove();
    });
    $('.guide').addClass('fadeInRight')
    var guideBlocks = $('.guide').find('.animation');
    guideBlocks.each(function(index){
      $(this)
        .css('-webkit-animation', guideAnimationData[index] )
        .css('-webkit-animation-fill-mode','forwards');  
    });
    var defer = $.mDeferred();
    $('.guide-6').on('webkitAnimationEnd',function(){
      setTimeout(function(){
        defer.resolve();
      }, 200);
    });
    return defer;
  }).then(function(){
    //4.video出场
    $('.guide').addClass('fadeOutLeft').on('webkitAnimationEnd',function(){
      $('.guide').remove();
    });
    $('.video').addClass('bounce-in-right');
    var animateBlocks = $('.video').find('.animation');
    animateBlocks.each(function(index){
      $(this).css('-webkit-animation', videoAnimationData[index] );  
    });
    $('.video').addClass('animation-on');
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
    var defer = $.mDeferred();
    
    //滑动屏幕进入下一页
    $(document).off('swipeLeft').on('swipeLeft','.video',function(e){
      e.preventDefault();
      defer.resolve();
      return false;
    });
    return defer;
  }).then(function(){
    //5.往前回顾
    $('.video').addClass('fadeOutLeft').on('webkitAnimationEnd',function(){
      $('.video').remove();
    });
    $('.previous-review').addClass('bounce-in-right').addClass('animation-on');
    var defer = $.mDeferred();
    
    //滑动屏幕进入下一页
    $(document).off('swipeLeft').on('swipeLeft','.previous-review',function(e){
      e.preventDefault();
      defer.resolve();
      return false;
    });
    return defer;
  }).then(function(){
    $('.previous-review').addClass('fadeOutLeft').on('webkitAnimationEnd',function(){
      $('.previous-review').remove();
    });
    $('.author').addClass('bounce-in-right').addClass('animation-on');
  });


  
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
    location.reload();
  });

  





  
})(Zepto);