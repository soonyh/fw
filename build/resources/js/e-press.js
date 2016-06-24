var Press = function() {
    var getItems = function(url, tmplID, containerID, flag, params, callback) {
        $.ajax({
            type: 'post',
            url: url,
            data: params,
            dataType: 'json',
            // timeout: 300,
            success: function(data) {
                var html = template(tmplID, data);
                $('#' + containerID).html(html);
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
    var loadContent = function() {
        $.showPreloader();
        getItems(App.urls.list6, 'art-press', 'press-list', 'refresh', {
            year: $('#select-year option').not(function() {
                return !this.selected
            }).val()
        }, function() {
            $.hidePreloader();
        });
    }
    return {
        init: function() {
            loadContent();
            $('#select-year').bind('change', function() {
                loadContent();
            })
        }
    }
}()
