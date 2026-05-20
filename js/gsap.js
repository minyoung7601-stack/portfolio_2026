$(function () {
  gsap.registerPlugin(ScrollTrigger);

  // 화면 크기에 따라 PC와 모바일의 작동 방식을 독립적으로 분리합니다.
  ScrollTrigger.matchMedia({
    /* 1. PC 버전 (화면 너비 769px 이상에서만 작동) */
    "(min-width: 769px)": function () {
      // 모바일에서 터치하며 놀던 흔적(클래스)이 남아있을 수 있으므로 진입 시 초기화
      $(".cert-section .flip-card").removeClass("flipped");
      // PC에서는 클릭 이벤트를 작동시키지 않도록 확실하게 off 처리
      $(".cert-section .flip-card").off("click");

      gsap.to(".cert-section .flip-card", {
        scrollTrigger: {
          trigger: ".cert-grid",
          start: "top 75%",
          // 스크롤 내리면 순차적으로 뒤집고, 위로 올리면 원상복구
          onEnter: () => {
            $(".cert-section .flip-card").each(function (index) {
              setTimeout(() => {
                $(this).addClass("flipped");
              }, index * 200);
            });
          },
          onLeaveBack: () => {
            $(".cert-section .flip-card").removeClass("flipped");
          },
        },
      });
    },

    /* 2. 모바일 버전 (화면 너비 768px 이하에서만 작동) */
    "(max-width: 768px)": function () {
      // 모바일 환경에 들어오면 혹시 모를 스크롤 트리거 강제 뒤집힘 흔적 제거
      $(".cert-section .flip-card").removeClass("flipped");

      // 모바일에서는 스크롤 시 자동으로 뒤집히는 기능을 완전히 배제하고,
      // 오직 사용자가 카드를 직접 손가락으로 '터치(클릭)'했을 때만 토글되도록 처리합니다.
      $(".cert-section .flip-card")
        .off("click")
        .on("click", function (e) {
          // 내부 체크박스(input) 자체를 직접 누른 경우 중복 토글 버그 방지
          if ($(e.target).is('input[type="checkbox"]')) return;

          $(this).toggleClass("flipped");
        });
    },
  });
});
