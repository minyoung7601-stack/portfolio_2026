$(function () {
  // Reading Records 무한 슬라이드
  var $view = $(".reading-view");
  var $wrap = $(".slidewrap");
  var moving = false;
  var timer;
  var paused = false;

  function slideWidth() {
    return $view.width();
  }

  function updateDots() {
    var idx = $wrap.find(".reading-slide:first").data("index");
    $(".read-dots button")
      .removeClass("active")
      .eq(idx)
      .addClass("active");
  }

  function nextSlide() {
    if (moving || !$wrap.length) return;
    moving = true;

    // 한 장 너비만큼 왼쪽으로 이동한 뒤, 첫 장을 맨 뒤로 보내 무한 반복
    $wrap.stop(true, true).animate({ marginLeft: -slideWidth() }, 600, function () {
      $wrap
        .css({ marginLeft: 0 })
        .find(".reading-slide:first")
        .appendTo($wrap);
      updateDots();
      moving = false;
    });
  }

  function prevSlide() {
    if (moving || !$wrap.length) return;
    moving = true;

    // 마지막 장을 맨 앞으로 옮긴 뒤 오른쪽에서 들어오게 이동
    $wrap
      .css({ marginLeft: -slideWidth() })
      .find(".reading-slide:last")
      .prependTo($wrap)
      .end()
      .stop(true, true)
      .animate({ marginLeft: 0 }, 600, function () {
        updateDots();
        moving = false;
      });
  }

  function startAuto() {
    clearInterval(timer);
    if (paused) return;
    // 4초마다 다음 슬라이드로 이동
    timer = setInterval(nextSlide, 4000);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  function setPaused(isPaused) {
    paused = isPaused;
    $(".read-pause")
      .toggleClass("is-paused", paused)
      .attr("aria-pressed", paused)
      .attr("aria-label", paused ? "재생" : "일시정지");

    if (paused) {
      stopAuto();
    } else {
      startAuto();
    }
  }

  $(".read-next").on("click", function () {
    nextSlide();
    startAuto();
  });

  $(".read-prev").on("click", function () {
    prevSlide();
    startAuto();
  });

  $(".read-pause").on("click", function () {
    setPaused(!paused);
  });

  $(".read-dots button").on("click", function () {
    var target = $(this).index();
    var safety = 0;

    while (
      $wrap.find(".reading-slide:first").data("index") !== target &&
      safety < 10
    ) {
      $wrap
        .find(".reading-slide:first")
        .appendTo($wrap);
      safety += 1;
    }

    $wrap.css({ marginLeft: 0 });
    updateDots();
    startAuto();
  });

  // 마우스 올리면 자동 재생 멈춤, 떠나면 다시 재생 (일시정지 중이면 유지)
  $(".reading-slider")
    .on("mouseover focusin", function () {
      stopAuto();
    })
    .on("mouseout focusout", function () {
      startAuto();
    });

  $(window).on("resize", function () {
    $wrap.css({ marginLeft: 0 });
  });

  updateDots();
  startAuto();
});

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
