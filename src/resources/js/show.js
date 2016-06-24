var Show = function() {
    // 加载flag
    var loading = false;
    var getIndex = function() {
        return $('.tab.active').find('.grid').prop('id');
    };
    /**
     * artTemplate的template()进一步封装
     * @param  {[type]}   url         [必填，请求地址]
     * @param  {[type]}   tmplID      [必填，模板的ID]
     * @param  {[type]}   containerID [必填，容器ID]
     * @param  {[string]}   flag      [必填，refresh|infinite, 获取到的内容前置还是后续]
     * @param  {[string]}   param     [必填，发送给后台的参数]
     */
    var getItems = function(url, tmplID, containerID, flag, param, callback) {
        $.ajax({
            type: 'post',
            url: url,
            data: {
                id: param
            },
            dataType: 'json',
            // timeout: 300,
            success: function(data) {
                var html = template(tmplID, data);
                if (flag == 'refresh') {
                    console.log('refresh' + Math.random())
                    $('#' + containerID).prepend(html);
                } else if (flag == 'infinite') {
                    console.log('infinite' + Math.random())
                    $('#' + containerID).append(html);
                }
            },
            error: function(xhr, type) {
                $.toast("Ajax error!");
            },
            complete: function() {
                if (callback) {
                    callback();
                }
            }
        })
    };
    return {
        init: function() {
            // 注册'infinite'事件处理函数
            $(document).on("pageInit", function(e, id, page) {
                //初始化时加载内容
                $.showPreloader();
                getItems(App.urls.list4, 'art-item', 'tab1-content', 'refresh', '', function() {
                    $.hidePreloader();
                });
                getItems(App.urls.list5, 'art-item', 'tab2-content', 'refresh', '');
                // 添加'refresh'监听器
                $(document).on('refresh', '.pull-to-refresh-content', function(e) {
                    var id = getIndex(),
                        param = '',
                        url = '';
                    //表示最新消息
                    if (id == 'tab1-content') {
                        url = App.urls.list4;
                    } else { //表示产业新闻
                        url = App.urls.list5;
                    }
                    getItems(url, 'art-item', id, 'refresh', param, function() {
                        // 加载完毕需要重置
                        $.pullToRefreshDone('.pull-to-refresh-content');
                    });
                });
                $(page).on('infinite', function() {
                    $('.tab.active .infinite-scroll .infinite-scroll-preloader').removeClass('hidden');
                    if (loading) return
                    loading = true;
                    //表示最新消息
                    var id = getIndex(),
                        param = '',
                        url = '';
                    if (id == 'tab1-content') {
                        url = App.urls.list4;
                    } else { //表示产业新闻
                        url = App.urls.list5;
                    }
                    getItems(url, 'art-item', id, 'infinite', param, function() {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        // 删除加载提示符
                        // $.detachInfiniteScroll($('.tab.active .infinite-scroll-bottom'));
                        loading = false;
                         $('.tab.active .infinite-scroll .infinite-scroll-preloader').addClass('hidden');
                    });
                });
            });
            // handleInfiniteScroll();
            $.init();
            // $.config = {
            //     router: false
            // };
        }
    }
}()
