(function () {
  "use strict";

  var Theme = {};

  Theme.backToTop = {
    register: function () {
      var $backToTop = $('#back-to-top');
      $(window).scroll(function () {
        if($(window).scrollTop() > 100) {
          $backToTop.fadeIn(1000);
        } else {
          $backToTop.fadeOut(1000);
        }
      });

      $backToTop.click(function () {
        $('body,html').animate({ scrollTop: 0 });
      });
    }
  };

  Theme.fancybox = {
    register: function () {
      if ($.fancybox){
        $('.post').each(function () {
          $(this).find('img').each(function () {
            $(this).wrap('<a class="fancybox" href="' + this.src + '" title="' + this.alt + '"></a>')
          });
        });

        $('.fancybox').fancybox({
          openEffect	: 'elastic',
          closeEffect	: 'elastic'
        });
      }
    }
  };

  this.Theme = Theme;
}.call(this));

  $(function () {
      $(".typed-quotes").typed({
        strings: ["傲慢、妒忌、暴怒、懒惰、贪婪、贪食、色欲", "只有在这个肮脏的世界，你们才能义正言辞地说", "世界如此美好，值得我为之奋斗", "但我只坚信后半句<span style='color:#d14836'>❤</span>"],
        typeSpeed: 200,
        contentType: 'html',
        loop: true,
        backDelay: 1000
      });

    });
    function alignContent() {
      for (var e = $(window).height(), n = document.querySelectorAll("section.fullscreen"), i = 0; i < n.length; i++) n[i].style.height = e + "px";
      $(".content-resizer").each(function() {
        var n = $(this).height();
        $(this).css("top", e / 2 - n / 2)
      })
    }
    alignContent(), $(window).bind("resize", function() {
      alignContent()}), function e() {
        // var e = $(".slider").unslider({
        //   speed: window.innerWidth / 2,
        //   delay: 1e3 + 4 * window.innerWidth
        // }, !0).data("unslider");

        // $(".slider").parent().find(".dot>a").click(function() {
        //   e.move($(this.parentElement).index()), $("#function-slider .desc-wrapper.active").removeClass("active"), e.stop()
        // }), e.stop(), e.start(), $("#function-slider").on("mouseenter click", ".desc-wrapper", function() {
        //   this.classList.add("active"), e.stop()
        // }), userSliderController = $(".like-card-slide").unslider({
        //   speed: window.innerWidth / 2.5,
        //   delay: 1e3
        // }, !0).data("unslider"), $("#likes").addClass("done"), $(".next-user-card").click(function() {
        //   userSliderController.next()
        // }), userSliderController.stop()
        }();
