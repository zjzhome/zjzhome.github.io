
(function() {

    var Page = {

        initEvent: function() {
            this.toggleSidebar();
            this.toggleAbout();
        },

        toggleSidebar: function() {
            var avatar = $('#avatar');
            var pushes = $('.j-push');
            var sidebar = $('#sidebar');
            var clicked = false;

            avatar.click(function() {
                if(clicked) {
                    sidebar.removeClass('pushed');
                    pushes.removeClass('pushed');
                    avatar.removeClass('pushed');
                } else {
                    sidebar.addClass('pushed');
                    pushes.addClass('pushed');
                    avatar.addClass('pushed');
                }

                clicked = !clicked;
            });
        },

        toggleAbout: function() {
            var toabout = $('#toabout');
            var blog = $('#blog');
            var about = $('#about');
            var card = about.find('.about-card');
            var close = about.find('.about-card-close');

            toabout.click(function(e) {
                e.preventDefault();
                blog.css('opacity', 0);
                setTimeout(function() {
                    blog.css('display', 'none');
                    about.css('display', 'block');

                    setTimeout(function() {
                        card.css('-webkit-transform', 'translate3d(-50%, -50%, 0)');
                        card.css('transform', 'translate3d(-50%, -50%, 0)');
                    }, 250);
                }, 300);
            });

            close.click(function() {
                card.css('-webkit-transform', 'translate3d(-50%, -1000px, 0)');
                card.css('transform', 'translate3d(-50%, -1000px, 0)');
                setTimeout(function() {
                    blog.css('display', 'block');
                    setTimeout(function() {
                        about.css('display', 'none');
                        blog.css('opacity', 1);
                    }, 300);
                }, 450);
            });
        },

        init: function() {
            this.initEvent();
        }
    }

    Page.init();

})();