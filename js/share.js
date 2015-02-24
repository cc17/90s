
/* ua */
  var UA = function(){
    var userAgent = navigator.userAgent.toLowerCase();
      return {
        ipad: /ipad/.test(userAgent),
        iphone: /iphone/.test(userAgent),
        android: /android/.test(userAgent),
        qqnews: /qqnews/.test(userAgent),
        weixin: /micromessenger/.test(userAgent)
      };
    }
    /**
      * mSahre 绉诲姩绔垎浜姛鑳� 鏂伴椈瀹㈡埛绔�
    */
    var mShare = {
      main: function(o){
        var _this = this;
        var d = {
          title: o.title,
          pic: o.pic,
          desc: o.desc,
          url: o.url
        };
        var ua = UA();
        switch(true){
          case ua.qqnews:
            if(window.TencentNews && window.TencentNews.showShareMenu) {
              window.TencentNews.showShareMenu(d.url,d.title,d.desc,d.pic,"news_news_wc");
            }else{
              window.TencentNews.shareFromWebView(d.title, d.desc, d.pic);
            }
            break;
          case ua.weixin:
            $(".weixin_layout").show();
            $('.weixin_layout').off('click').on('click',function(){
              $('.weixin_layout').hide();
            });
            break;
          default:
            window.location = "http://share.v.t.qq.com/index.php?c=share&a=index&appkey=801378464&url="
            + d.url + "&title="+d.title+"&pic="+d.pic+"&des="
            + d.desc;
            
            break;
        };
      },
      init: function(){
        var s = window.share_data;
        var _this = this;
        $("#share_btn").on("click",function(){
          _this.main({
            title: s.title,
            pic: s.pic,
            desc: s.desc,
            url: s.url
          });
        });

      }
    };
    
    document.addEventListener('WeixinJSBridgeReady',
        function onBridgeReady() {
          
              var s = window.share_data;

              WeixinJSBridge.on('menu:share:appmessage',
              function(argv) {
                  WeixinJSBridge.invoke('sendAppMessage', {
                      "img_url": s.pic,
                      "link": s.url,
                      "desc": s.desc,
                      "title": s.title
                  },
                  function(res) {
                      document.location.href = window.shareData.timeLineLink;
                  })
              });
              WeixinJSBridge.on('menu:share:timeline',
              function(argv) {
                  WeixinJSBridge.invoke('shareTimeline', {
                      "img_url": s.pic,
                      "img_width": "640",
                      "img_height": "640",
                      "link": s.url,
                      "desc": s.desc,
                      "title":s.title
                  },
                  function(res) {
                      document.location.href = window.shareData.timeLineLink;
                  });
              });
        }, 
    false);
/*  |xGv00|3703312cae552bcddfc616582eea0351 */