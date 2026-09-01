$(function () {
  function bindHeaderMenu() {
    $(".menu-toggle")
      .off("click.header")
      .on("click.header", function () {
        $(this).toggleClass("active");
        $(".nav-container").toggleClass("active");
      });

    $(".nav_list a")
      .off("click.header")
      .on("click.header", function () {
        $(".menu-toggle").removeClass("active");
        $(".nav-container").removeClass("active");
      });
  }

  // index에 header가 이미 있으면 불러오지 않음 (겹침 방지)
  if ($("header .header-inner").length) {
    bindHeaderMenu();
    return;
  }

  $("#header").load("header.html", bindHeaderMenu);
});
