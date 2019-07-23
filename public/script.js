let long;
let lat;

let docSummary = document.querySelector("#summary");
let tempDeg = document.querySelector("#temp-deg");
let timezone = document.querySelector("#timezone");
let temperatureSection = document.querySelector(".temperature")
let temperatureSpan = document.querySelection(".temperature span")


window.addEventListener("load", () => {
  getLocation();
});

getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // Proxy allows you to use CORS anywhere. Great to use in the front end
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/4441672f53f005be8b295908bbe07d6e/${lat},${long}`;

      pullWeather(api);
    });
  }

  pullWeather = api => {
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { apparentTemperature, summary, icon } = data.currently;
        console.log(icon);
        docSummary.innerText = summary;
        tempDeg.innerText = apparentTemperature;
        timezone.innerText = data.timezone;

        let celsius = (temperature - 32) * (5 / 9);

        setIcons(icon, document.querySelector(".icon"));
      });
  };
};

switchDeg = () =>{
  if(tempDeg)
}

setIcons = (icon, iconId) => {
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconId, Skycons[currentIcon]);
};
