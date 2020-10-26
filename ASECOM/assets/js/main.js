(function ($) {
    "use strict";

    /*----------------------------
     hero animation
    ------------------------------ */
    setTimeout (function() {
        $('.animated_header').addClass('overlay_animated');
    }, 1500);

    /*----------------------------
     fixedHeader
    ------------------------------ */
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 200) {
            $('nav').addClass('nav_fixed');
            $('.go_top').addClass('GT_arrow');
        } else {
            $('nav').removeClass('nav_fixed');
            $('.go_top').removeClass('GT_arrow');
        }
    });

    /*----------------------------
        smooth-scroll active
    ------------------------------ */
    $('.go_top').on('click', function () {
        var target = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(target).offset().top
        }, 500);
        return !1
    });

    /*----------------------------
     responsiveMenu
    ------------------------------ */
    $('.menu_btn').on('click', function () {
        $('body').toggleClass('h-overflow');
        $('.col-lg-10>ul').toggleClass('show_menu');
        $('.menu_btn>span').toggleClass('bg-dark');
        $('.menu_btn>span:nth-child(1)').toggleClass('menu_btn_close_1');
        $('.menu_btn>span:nth-child(2)').toggleClass('menu_btn_close_2');
        $('.menu_btn>span:nth-child(3)').toggleClass('menu_btn_close_3');
    });
    
    /*----------------------------
     subMenu
    ------------------------------ */
    $('.submenu_toggle').on('click', function () {
        $(this).find('a').toggleClass('show_submenu');
    });

    /*----------------------------
        accordion active
    ------------------------------ */
    function toggleIcon(e) {
        $(e.target).prev('.card-header').find('span').toggleClass('icon-arrow-right icon-arrow-down');
    }
    $('.accordion').on('hidden.bs.collapse', toggleIcon);
    $('.accordion').on('shown.bs.collapse', toggleIcon);


    /*----------------------------
        isotope active
    ------------------------------ */
    // init Isotope -- work filter
    var $grid = $('.works').imagesLoaded(function () {
        // init Isotope after all images have loaded
        $grid.isotope({
            itemSelector: '.single_work',
            percentPosition: true,
            masonry: {
                columnWidth: '.single_work'
            }
        });
    });
    // filter items on button click
    $('.filter_buttons').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
        $('button.btn').addClass('active');
    });
    // filter items on button click
    $('button.btn').on('click', function () {
        $('button.btn').removeClass('btn_active');
        $(this).addClass('btn_active');
    });

    /*----------------------------
        magnificPopup active
    ------------------------------ */
    $(".zoom-gallery").magnificPopup({
        delegate: "a.zoom_image",
        type: "image",
        closeOnContentClick: !1,
        closeBtnInside: !1,
        mainClass: "mfp-with-zoom mfp-img-mobile",
        image: {
            verticalFit: !0
        },
        gallery: {
            enabled: !0
        },
        zoom: {
            enabled: !0,
            duration: 300,
            opener: function (a) {
                return a.find("img");
            }
        }
    });
    if ($('.popup-youtube').length > 0) {
        $('.popup-youtube').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    };
    
    /*----------------------------
        background-image active
    ------------------------------ */
    $('.background-image').each(function () {
        var src = $(this).attr('data-src');
        $(this).css({
            'background-image': 'url(' + src + ')'
        });
    });
    
    /*----------------------------
        parallax(Jarallax) active
    ------------------------------ */
    $('.parallax').jarallax();


})(jQuery);
