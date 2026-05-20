// Team Project 목업
$(window).on("scroll", function () {
  let scrollTop = $(window).scrollTop();

  // 팀 프로젝트 섹션(#pro5)의 위치를 잡습니다.
  if ($("#pro5").length > 0) {
    let pro5Top = $("#pro5").offset().top;

    // 사용자의 화면 절반쯤에 팀 프로젝트 영역이 보이기 시작할 때 작동하도록 계산
    let triggerPoint = pro5Top - $(window).height() + 100;

    if (scrollTop >= triggerPoint) {
      $(".box .folio").addClass("active");
    } else {
      $(".box .folio").removeClass("active");
    }
  }
});
