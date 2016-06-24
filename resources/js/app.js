  $(document).on('ajaxSuccess',function(event, jqXHR, ajaxOptions) {
    // 只能打印出get类型的传参
    console.log(jqXHR.response);
  });
var App = function() {
    var handleNavIndex = function() {
        var map = [
            ['hot.html', 'hot-news-1.html', 'hot-news-2.html'],
            ['show.html', 'show-news.html'],
            ['e-press.html', 'e-press-detail.html', 'e-press-view.html'],
            ['search.html', 'result.html', 'company.html']
        ];
        /**
         * 获取送检的url在map数组中所属的下标
         * @param  {[type]} menuUrl [送检的url]
         * @return {[type]}         [返回下标]
         */
        function check(menuUrl) {
            var flagment = menuUrl.split('/').pop().split('.html')[0]; //截取最后一段
            console.log(flagment)
            for (var i = 0; i < map.length; i++) {
                if (map[i].join(',').indexOf(flagment) != -1) {
                    return i;
                }
            }
        }
        // handle 底部导航
        var links1 = $('#footer-nav > a');
        if (links1) {
            for (var i = 0; i < links1.length; i++) { //遍历 menu 的中连接地址
                if (check(links1.eq(i).attr('href')) == check(String(window.location))) {
                    links1.eq(i).addClass('active').siblings().removeClass('active');
                    break;
                }
            }
        }
        // handle 侧边栏
        var links2 = $('#panel-left>ul>li>a');
        if (links2) {
            for (var i = 0; i < links2.length; i++) { //遍历 menu 的中连接地址
                if (check(links2.eq(i).attr('href')) == check(String(window.location))) {                    
                    links2.removeClass('active');
                    links2.eq(i).addClass('active');
                    break;
                }
            }
        }
    }
    return {
        init: function() {
            $.init();
            handleNavIndex();
        },
        urls: {
            list1: 'list1.json', //hot.html : 最新消息 
            list2: 'list2.json', //hot.html : 產業新聞
            list3: 'list3.json', //search.html 
            list4: 'list4.json', //show.html : 展前報道 
            list5: 'list5.json', //show.html : 展后新聞
            list6: 'list6.json' //e-press.html 
        }
    }
}()
