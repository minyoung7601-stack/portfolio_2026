$(function () {
    //header
    $('.menu-toggle').click(function () {
        $(this).toggleClass('active');
        $('.nav-container').toggleClass('active');
    });
    $('.nav_list a').click(function () {
        $('.menu-toggle').removeClass('active');
        $('.nav-container').removeClass('active');
    });
});