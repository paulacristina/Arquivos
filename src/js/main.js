$('.slider-destinations').slick({
    dots: true,
    arrows: false
});

$(window).scroll(function () {
    if ($(document).width() > 992) {
        if ($('html, body').scrollTop() >= 40) {
            if (!$('nav.navbar-fixed-scroll').hasClass('active')) {
                $('nav.navbar-fixed-scroll').addClass('active');
                $('.home-hide').addClass('show');
            }
        } else {
            $('nav.navbar-fixed-scroll').removeClass('active');
            $('.home-hide').removeClass('show');
        }
    }

    if ($(this).scrollTop() >= 300) {
        $('#backToTop').addClass('show');
    } else {
        $('#backToTop').removeClass('show');
    }
});

function backToTop() {
    $('html, body').animate({
        scrollTop: 0
    });
}