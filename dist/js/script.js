$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow/right.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
              }
            }
          ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });   

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // MODAL
    $('[data-modal="consultation"]').on('click', function(){
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });
    // $('.button_mini').on('click', function(){
    //     $('.overlay, #order').fadeIn();
    // });
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function setingsValidateForm(form){
        $(form).validate({
            rules: {
              name: {
                  required:true
              },
              email: {
                required: true,
                email: true
              },
              phone: {
                  required: true
              }
            },
            messages: {
                name: "Пожалуйста, введите ваше имя",
                email: { 
                    required: "Пожалуйста, введите ваш e-mail",
                    email: "Вы ввели неверный адрес"
                },
                phone: {
                    required: "Пожалуйста, введите ваш номер",
                    phone: "Введиете номер корректно"
                }
            },
          });
    }
    setingsValidateForm('#consultation form');
    setingsValidateForm('#order form');
    setingsValidateForm('#consultation-form');

    $('input[name=phone]').mask("+7(999)-999-99-99");
    

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:  "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false; 
    });

    // Scroll and ancer 

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600 ) {
            $('.up_arrow').fadeIn();
        }
        else {
            $('.up_arrow').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});
