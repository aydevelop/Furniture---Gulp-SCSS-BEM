$(function () {
  $('.header__btn').on('click', function () {
    $('.rightside-menu').removeClass('rightside-menu--close');
  });

  $('.rightside-menu--close').on('click', function () {
    $('.rightside-menu').addClass('rightside-menu--close');
  });

  $('.top__slider').slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
  });

  $('.contact-slider').slick({
    dots: true,
    arrows: false,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 8,
  });

  $('.article-slider__box').slick({
    fade: true,
  });

  var mixer = mixitup('.gallery__inner', {
    load: {
      filter: '.living',
    },
  });
});
