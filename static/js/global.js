
window.global = {
  pageType: 'doc'
};

layui.define(['code', 'element', 'table', 'util'], function(exports){
  var $ = layui.jquery
  ,element = layui.element
  ,layer = layui.layer
  ,form = layui.form
  ,util = layui.util
  ,device = layui.device();


  //阻止IE7以下访问
  if(device.ie && device.ie < 8){
    layer.alert('最低支持ie8，您当前使用的是古老的 IE'+ device.ie + '，你丫的肯定不是程序猿！');
  }

  //切换版本
  form.on('select(tabVersion)', function(data){
    var value = data.value;
    location.href = value === 'new' ? '/' : ('/doc/' + value +'/');
  });
  

  $("#btn_check").click(function(){
  	  var url = $('#url').val();
  	  if(document.location.protocol == 'https:' && url.indexOf('http:')!=-1){
  	  	alert('由于当前地址是https的，所以检测网址也必须是https开头');
  	  }
  	  else{
  	  	 layer.open({type:2, title:'', content:'check_url.html?url='+$('#url').val(), area: ['75%'+'', '40%'+'']}); 
  	 }
   });
        
  //首页banner
  setTimeout(function(){
    $('.site-zfj').addClass('site-zfj-anim');
    setTimeout(function(){
      $('.site-desc').addClass('site-desc-anim')
    }, 5000)
  }, 100);

  
  //固定Bar
  if(global.pageType !== 'demo'){
    util.fixbar({
      bar1: false
      ,click: function(type){
        if(type === 'bar1'){
          location.href = '//www.baidu.com/';
        }
      }
    });
  }
  
  //窗口scroll
  ;!function(){
    var main = $('.site-tree').parent(), scroll = function(){
      var stop = $(window).scrollTop();

      if($(window).width() <= 750) return;
      var bottom = $('.footer').offset().top - $(window).height();
      if(stop > 61 && stop < bottom){
        if(!main.hasClass('site-fix')){
          main.addClass('site-fix');
        }
        if(main.hasClass('site-fix-footer')){
          main.removeClass('site-fix-footer');
        }
      } else if(stop >= bottom) {
        if(!main.hasClass('site-fix-footer')){
          main.addClass('site-fix site-fix-footer');
        }
      } else {
        if(main.hasClass('site-fix')){
          main.removeClass('site-fix').removeClass('site-fix-footer');
        }
      }
      stop = null;
    };
    scroll();
    $(window).on('scroll', scroll);
  }();

  //代码修饰
  layui.code({
    elem: 'pre',
    encode:true,
    about:false
  });

  //让导航在最佳位置
  var thisItem = $('.site-demo-nav').find('dd.layui-this');
  if(thisItem[0]){
    var itemTop = thisItem.offset().top
    ,winHeight = $(window).height()
    ,elemScroll = $('.layui-side-scroll');
    if(itemTop > winHeight - 120){
      elemScroll.animate({'scrollTop': itemTop/2}, 200)
    }
  }

  //手机设备的简单适配
  var treeMobile = $('.site-tree-mobile')
  ,shadeMobile = $('.site-mobile-shade')

  treeMobile.on('click', function(){
    $('body').addClass('site-mobile');
  });

  shadeMobile.on('click', function(){
    $('body').removeClass('site-mobile');
  });

  exports('global', {});
});