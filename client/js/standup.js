var STANDUP = STANDUP || {};
STANDUP.standupModule = (function ($) {
    "use strict";
    
    var init = function(){
            $('.add-task').on('click',addTaskHandler);
    };
    
    var addTaskHandler = function() {
        var dataObj = $('#taskItem').val().trim();
        
        $.ajax({
                url: "/api/saveTask",
                cache: false,
                type: 'POST',
                data: {taskItem:dataObj},
                success: function (response) {
                    var htmlStr="";
                    $.each(response,function(index,item){
                        htmlStr = htmlStr + "<div>" + (index+1) + ": Task - " + item.task + "</div>";
                    });
                    
                   $('.standup-wrapper .result').html(htmlStr);
                },
                error: function (XHR, error, errorThrown) {
                    console.error("STANDUP: ERROR in saving task item !!!!");
                }
        });
    }
    
    return {
        init: init
    };
})(jQuery);

$(function () {
    STANDUP.standupModule.init();
});