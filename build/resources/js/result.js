var Result = function() {
    // 加载flag
    var loading = false;
    var getIndex = function() {
        return $('.tab.active').find('ul').prop('id');
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
                    $('#' + containerID).prepend(html);
                } else if (flag == 'infinite') {
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
            //初始化时加载内容
            $.showPreloader();
            getItems(App.urls.list3, 'art-item', 'tab1-ul', 'infinite', '',function(){
                $.hidePreloader();
            });
            // 注册'infinite'事件处理函数
            $(document).on('infinite', '.infinite-scroll', function() {
                $('.infinite-scroll-preloader').removeClass('hidden');
                if (loading) return
                loading = true;
                //表示最新消息
                getItems(App.urls.list3, 'art-item', 'tab1-ul', 'infinite', '',function() {
                    loading = false;
                });
            });
            $.init();
        }
    }
}()
