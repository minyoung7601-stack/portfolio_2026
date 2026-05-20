$(function () {
  gsap.registerPlugin(ScrollTrigger);

  // ScrollTrigger를 이용해 자격증 그리드가 보이면 클래스를 순차적으로 추가
  gsap.to(".cert-section .flip-card", {
    scrollTrigger: {
      trigger: ".cert-grid",
      start: "top 75%",
      // 스크롤 내리면 클래스 추가, 올리면 삭제
      onEnter: () => {
        $(".cert-section .flip-card").each(function (index) {
          setTimeout(() => {
            $(this).addClass("flipped");
          }, index * 200); // 0.2초 간격으로 슥슥 뒤집힘
        });
      },
      onLeaveBack: () => {
        $(".cert-section .flip-card").removeClass("flipped");
      },
    },
  });
});
