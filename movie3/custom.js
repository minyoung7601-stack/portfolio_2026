let movieBoard = document.querySelector("#movieBoard");
let apikey = "4c0013affb38f8420c2f19e79515a725";

//전역변수
let currentPage = 1; //페이지번호
let currentList = "now_playing"; //현재리스트

//서버에서 원하는 영화(now_playing,) 가지고 오기

movie = async (lists, page = 1) => {
  console.log("요청 목록:", lists);

  currentPage = page;
  currentList = lists;
  console.log("current", currentPage, currentList);

  // fetch 주소
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${currentList}?api_key=${apikey}&language=ko-KR&page=${currentPage}`,
  );

  let data = await response.json();
  console.log("받아온 데이터:", data.results); // 실제 영화 목록은 data.results에 들어있음

  // 데이터가 정상적으로 들어왔는지 확인
  movieList = data.results;
  console.log(movieList);
  render(movieList);
};

//화면에 나타내는 함수. 변수 movieList
render = (movieList) => {
  //   console.log("화면");
  // 1. 먼저 게시판을 비워줍니다.
  movieBoard.innerHTML = "";

  // 2. 반복문을 돌며 카드를 생성합니다.

  //movie로 받아서 영화제목인 title이 출력
  movieList.forEach((movie) => {
    // console.log(movie.title);

    // 몇개의 영화가 나올지 몰라서 우리가 짜줘야함. '='는 마지막 영화만 나와서'+='를 써야 영화가 모두 나옴.

    card = `
    <div class="card">
    <div class="imgBox">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        
        <p class="overview">${over(movie.overview, 100)}</p>
        <p class="avg"><span>평점</span>${Math.round(movie.vote_average)}</p>
    </div>  
        <h2>${movie.title}</h2>                
      </div>
    `;
    movieBoard.innerHTML += card;
  });
};
function over(text, limit) {
  // console.log(text.length);
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

//화살표함수는 밑에만 넣기
movie("now_playing");

//검색버튼 갖고오기
let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector("#searchBtn");

//searchBtn을 클릭했을때 실행될 함수

//콘솔에서 클릭 확인
searchBtn.addEventListener("click", async () => {
  console.log("클릭");

  //입력값이 잘 들어오는지 확인
  let keyword = searchInput.value; //입력창의 값을 가져와서 변수(keyword)에 저장
  console.log(keyword);

  //키워드가 비워져있다면 '검색어를 입력하세요'라는 메시지 나오게
  if (keyword == "") {
    alert("검색어를 입력하세요");
    return; // 실행 중단
  }

  // fetch 주소. ?앞에까지는 기본주소이며, ?는 한개만 있어야함
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${apikey}&language=ko-KR`,
  );

  let data = await response.json();
  //

  // 데이터가 정상적으로 들어왔는지 확인
  movieList = data.results;
  console.log(movieList);
  render(movieList);
});

//검색 더보기 추가하기
let more = document.querySelector("#more");
more.addEventListener("click", async () => {
  console.log("more");

  currentPage++;
  movie(currentList, currentPage);
});
