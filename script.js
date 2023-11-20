const getLoc = async () => {
  const url =
    "http://ip-api.com/json/?fields=country,countryCode,city,lat,lon,timezone,query";
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const getWeather = async function (lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5c37d39835ae285871bdd08092521bf6`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

let bacimg = document.querySelector(".main");
let timezone = document.querySelector(".timezone");

function getDayOrNight() {
  let DayOrNight;
  let date = new Date();
  if (date.getHours() > 6 && date.getHours() < 19) {
    DayOrNight = "Day";
    bacimg.style.backgroundImage = `url('./images/day.jpg')`;
    timezone.style.Color = "";
  } else {
    DayOrNight = "Night";
    bacimg.style.backgroundImage = `url('./images/night.jpg')`;
    timezone.style.color = "white";
  }
  return DayOrNight;
}

function getIcon(mainw) {
  let icon;
  switch (mainw) {
    case "Thunderstorm":
      icon = `${mainw}.svg`;
      break;
    case "Clouds":
      icon = `${mainw}.svg`;
      break;
    case "Drizzle":
      icon = `${mainw}.svg`;
      break;
    case "Rain":
      icon = `${mainw}.svg`;
      break;
    case "Snow":
      icon = `${mainw}.svg`;
      break;
    case "Atmosphere":
      icon = `${mainw}.png`;
      break;
    case "Clear":
      const dayornight = getDayOrNight();
      icon = `${mainw}-${dayornight}.svg`;
      break;
    // default:
    //   icon = "./Clear.svg";
  }

  return icon;
}

function getTemp(wetemp) {
  const k = wetemp;
  const f = (k - 273.15) * (9 / 5) + 32;
  const c = k - 273.15;
  return (temo = {
    kel: Math.floor(k),
    far: Math.floor(f),
    can: Math.floor(c),
  });
}

const icon = document.querySelector(".icon");
const daraaje = document.querySelector(".daraje");
const darajenum = document.querySelector(".darajenum");
const darajety = document.querySelector(".darajety");
const typeweater = document.querySelector(".type-weater");

getLoc()
  .then((locData) => {
    const timeZone = locData.timezone;
    timezone.textContent = timeZone;

    return getWeather(locData.lat, locData.lon);
  })
  .then((wedata) => {
    console.log(wedata);
    const weTemp = wedata.main.temp;
    const weMan = wedata.weather[0].main;
    const weDes = wedata.weather[0].description;
    const daraje = getTemp(weTemp);
    const mainIcon = getIcon(weMan);
    icon.innerHTML = `<img src='icons/${mainIcon}'> </img>`;
    darajenum.textContent = Math.floor(weTemp);
    typeweater.textContent = weDes;
    daraaje.addEventListener("click", function (e) {
      if (darajety.textContent == "k") {
        darajety.textContent = "f";
        // console.log(darajety.textContent);
        darajenum.textContent = daraje.far;
      } else if (darajety.textContent == "f") {
        darajety.textContent = "c";
        // console.log(darajety.textContent);
        darajenum.textContent = daraje.can;
      } else {
        darajety.textContent = "k";
        darajenum.textContent = daraje.kel;
      }
    });
  });
