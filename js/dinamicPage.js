$('.pages a').on('click', function (e) {
    let target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top,
    });
    return false;
}, 0);

$('nav.device-mobile h2').on('click', (e) => {
    $('nav.device-mobile ul').slideToggle();
});