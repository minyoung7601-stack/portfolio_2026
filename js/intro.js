$(function () {
  var $slot = $("#intro-root");

  // index에 intro가 이미 있으면 중복 삽입하지 않음
  if ($("#landing.intro").length) {
    return;
  }

  if ($slot.length) {
    $slot.load("intro.html");
  }
});
