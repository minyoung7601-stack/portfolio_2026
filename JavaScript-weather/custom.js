// html 요소 가지고 오기
let place = document.querySelector("#location");
let input = document.querySelector("input");
let button = document.querySelector("#searchBtn");
let iconEls = document.querySelectorAll("li img");
let timeEls = document.querySelectorAll("li p");
let tempEls = document.querySelectorAll("li .temp");
const ctx = document.querySelector("#weatherChart");

console.log(tempEls.length);

let APIkey = "7be782d450a3cc1488345fef0cbb797e";

// 현재위치
getLocation();

function getLocation() {
  navigator.geolocation.getCurrentPosition(success);
}

async function success(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  // W3에서 가져옴

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`,
  ); // open wheather에서 가져옴

  let data = await response.json();
  // 우리가 알아볼 수 있는 형태로 바굼

  render(data); // 날씨를 화면에 뿌림
}

// 도시 이름 검색
weather = async (cityname) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}&units=metric&lang=kr`,
  );

  let data = await response.json();
  // 우리가 알아볼 수 있는 형태로 바굼

  render(data); // 날씨를 화면에 뿌림
};

button.addEventListener("click", () => {
  let city = input.value; // 입력값 가져오기
  weather(city); //weather함수에 입력값 출력

  input.value = "";
});

// 엔터치면 검색됨
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let city = input.value;
    weather(city);
    input.value = "";
  }
});

// 화면에 날씨 정보 나타냄
function render(data) {
  console.log("render", data);

  place.textContent = data.city.name;
  // 화면에 (부천시) 나옴

  // 차트만들기
  let temps = []; // 온도
  let labels = []; // 시간

  for (let i = 0; i < tempEls.length; i++) {
    // console.log(data.list[i].main.temp);

    let temp = Math.round(data.list[i].main.temp);
    tempEls[i].textContent = `${temp}℃`;

    // 아이콘
    let icon = data.list[i].weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    iconEls[i].src = iconUrl;

    // 시간
    let label = data.list[i].dt_txt.slice(11, 16);
    // .slice (0, 0) 시간만 나오게 추출
    console.log(label);
    timeEls[i].textContent = label;

    // 배열안에 온도, 시간을 추가
    temps.push(temp);
    labels.push(label);
  }

  console.log(temps);
  console.log(labels);

  drawChart(temps, labels);
}

let chart;

// 검색창에 도시 입력할때마다 차트 바뀜
function drawChart(temps, labels) {
  if (chart) {
    chart.destroy(); // 기존 차트를 삭제
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "날씨",
          data: temps,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          //   beginAtZero: true,
          min: 10, // 세로 최소
          max: 40, // 세로 최대
          ticks: {
            stepSize: 5, // 세로간격
          },
          title: {
            display: true,
            text: "온도",
            color: "blue",
            font: { size: 16 },
          },
        },
      },
    },
  });
}
