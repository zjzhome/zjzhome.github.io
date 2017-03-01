
(function() {

    var Page = {

        initEvent: function() {
            var avatar = $('#avatar');
            var pushes = $('.j-push');
            var sidebar = $('#sidebar');
            var clicked = false;

            avatar.click(function() {
                if(clicked) {
                    sidebar.removeClass('pushed');
                    pushes.removeClass('pushed');
                } else {
                    sidebar.addClass('pushed');
                    pushes.addClass('pushed');
                }

                clicked = !clicked;
            });
        },

        init: function() {
            this.initEvent();
        }
    }

    Page.init();

})();