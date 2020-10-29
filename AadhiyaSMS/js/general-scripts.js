/* CUSTOM JQUERY
/*--------------------------------------------------------------------------------------------------------------------------------------*/
(function ($, window, document, undefined) {
  "use strict";

  var $winW = function () {
    return $(window).width();
  };
  var $winH = function () {
    return $(window).height();
  };
  var $screensize = function (element) {
    $(element).width($winW()).height($winH());
  };

  var screencheck = function (mediasize) {
    if (typeof window.matchMedia !== "undefined") {
      var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
      if (screensize.matches) {
        return true;
      } else {
        return false;
      }
    } else {
      if ($winW() <= mediasize) {
        return true;
      } else {
        return false;
      }
    }
  };

  $(document).ready(function () {
    /*========================================================== 
	 PRELOADER & ANIMATIONS JS
	========================================================== */
    $(window).on("load", function () {
      $(".preloader").fadeOut();
      $(".animated-row").each(function () {
        var $this = $(this);
        $this.find(".animate").each(function (i) {
          var $item = $(this);
          var animation = $item.data("animate");
          $item.on("inview", function (event, isInView) {
            if (isInView) {
              setTimeout(function () {
                $item.addClass("animated " + animation).removeClass("animate");
              }, i * 50);
            } else if (!screencheck(767)) {
              $item.removeClass("animated " + animation).addClass("animate");
            }
          });
        });
      });
    });

    /*========================================================== 
	 SCROLL FUNCTION
	 ========================================================== */
    if ($(".main-container").length) {
      $(".main-container").onepage_scroll({
        sectionContainer: ".section",
        easing: "ease",
        animationTime: 1000,
        updateURL: false,
        loop: false,
        keyboard: true,
        responsiveFallback: 768,
        direction: "vertical",
      });
      $(".navbar-nav li").each(function (index) {
        $(this).click(function (e) {
          e.preventDefault();
          $(".main-container").moveTo(index + 1);
        });
      });
    }

    /*========================================================== 
	 SERVICES SLIDER
	========================================================== */
    if ($(".services-list").length) {
      $(".services-list").owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        items: 3,
        margin: 30,
        autoplay: true,
        smartSpeed: 700,
        autoplayTimeout: 6000,
        responsive: {
          0: {
            items: 1,
            margin: 0,
          },
          576: {
            items: 2,
            margin: 20,
          },
          992: {
            items: 3,
            margin: 30,
          },
        },
      });
    }

    /*========================================================== 
	 GALLERY SLIDER
	========================================================== */
    if ($(".gallery-list").length) {
      $(".gallery-list").owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        items: 3,
        margin: 30,
        autoplay: true,
        smartSpeed: 700,
        autoplayTimeout: 4000,
        responsive: {
          0: {
            items: 1,
            margin: 0,
          },
          576: {
            items: 2,
            margin: 20,
          },
          992: {
            items: 3,
            margin: 30,
          },
        },
      });
    }

    /*========================================================== 
	 GALLERY SLIDER
	========================================================== */
    if ($(".testimonials-slider").length) {
      $(".testimonials-slider").owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        items: 2,
        margin: 30,
        autoplay: true,
        smartSpeed: 700,
        autoplayTimeout: 6000,
        responsive: {
          0: {
            items: 1,
            margin: 0,
          },
          768: {
            items: 2,
          },
        },
      });
    }

    /*========================================================== 
	SLIDESHOW
	========================================================== */
    if ($(".background-slider").length) {
      $(".background-slider").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        items: 1,
        margin: 0,
        autoplay: true,
        animateOut: "fadeOut",
        smartSpeed: 1500,
        autoplayTimeout: 6000,
      });
    }

    $(document)
      .on("click", ".btn-subscribe", function () {
        $("#footer").addClass("open");
        return false;
      })
      .on("click", ".close-subscribe", function () {
        $("#footer").removeClass("open");
        return false;
      })
      .on("click", ".navbar-toggle", function () {
        $(".navbar-collapse").slideToggle(300);
        return false;
      })
      .on("click", ".navigation-menu > li > a", function () {
        $(".navbar-collapse").slideUp(300);
      });

    $(".facts-row").on("inview", function (event, isInView) {
      $(".count-number").each(function () {
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text(),
            },
            {
              duration: 1000,
              easing: "swing",
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
        setTimeout(function () {
          $(".count-number").removeClass("count-number").addClass("counted");
        }, 1000);
      });
    });
    $(".skills-row").on("inview", function (event, isInView) {
      $(this).addClass("view");
    });

    /*========================================================== 
	 SIDEMENU
	 ========================================================== */
    $(document)
      .on("click", ".menu-trigger", function () {
        $("body").toggleClass("sidemenu-open");
      })
      .on("click", ".side-menu .navbar-nav li a", function () {
        $("body").removeClass("sidemenu-open");
      });

    /*========================================================== 
	 	SCROLL SPY MENU
	  ========================================================== */

    $(window)
      .on("resize", function () {
        if (screencheck(767)) {
          $("#nav").addClass("scrollnav");
        } else {
          $("#nav").removeClass("scrollnav");
        }
      })
      .resize();

    var lastId,
      topMenu = $(".scrollnav"),
      topMenuHeight = 20,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation

    menuItems.on("click", function (e) {
      var href = $(this).attr("href");
      var offsetTop =
        href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
      $("html, body").stop().animate(
        {
          scrollTop: offsetTop,
        },
        500
      );

      e.preventDefault();
    });

    // Bind to scroll
    $(window).on("scroll", function () {
      // Get container scroll position
      var fromTop = $(this).scrollTop() + topMenuHeight;
      // Get id of current scroll item
      var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) return this;
      });
      // Get the id of the current element
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";
      if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent()
          .removeClass("active")
          .end()
          .filter("[href='#" + id + "']")
          .parent()
          .addClass("active");
      }
    });
  });
})(jQuery, window, document);
