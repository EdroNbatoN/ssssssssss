$(document).ready (function () {
    $('.carousel_inner').slick({
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="./img/slider/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./img/slider/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    function setter(item) {
        $(item).each(function(i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $(this).on('click', function (e) {
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
                })
            })
        })
    }

    setter('.catalog-item__back');
    setter('.catalog-item__link');


    // Modal

    $("[data-modal=consultation]").on('click', function () {
        $('.overlay, #consultation').fadeIn();
    })

    $(".modal__close").on("click", function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut();
    })
    $(".button_mini").on("click", function () {
        $('.overlay, #order').fadeIn();
    })
    $(".button_mini").each(function (i) {
        $(this).on("click", function () {
            $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
        })
    })

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Будь ласка, введіть своє ім'я",
                    minlength: jQuery.validator.format("Введіть {0} символiв!»)")
                  },
                phone: "Будь ласка, введіть Ваш номер телефону",
                email: {
                  required: "Будь ласка, введіть свою електронну пошту",
                  email: "Неправильна адреса електронної пошти"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+ 38 (999) 999 99-99")
    
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/src/mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // scroll

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.page_up').fadeIn();
        } else {
            $('.page_up').fadeOut();
        }
    })

    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

});

