import { useEffect, useState } from "react";
import LocationComponent from "./components/LocationComponent";
import MenuComponent from "./components/MenuComponent";
import { data } from "react-router";

type UnsplashImage = {
  url: string;
  alt: string;
  photographer: string;
  photographerLink: string;
};
type LocationData = {
  name: string;
  weather: [
    {
      icon: string;
      description: string;
    }
  ];
  main: {
    temp: number;

  }
  wind?:{
    speed: number;
  };
  sys?: {
    country: string;
    sunrise: number;
    sunset: number;
  };
};

export default function Welcome() {
  const geolocation = "geolocation" in navigator;
  const [locationCoords, setLocationCoords] = useState({
    latitude: 0, 
    longitude: 0
  });
  const [locationError, setLocationError] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const unsplashAccess = 'Ko6Z_4ZzIUiN7JzHnidZf_eYmIeGqYNfscpFAemWYUw';
  const [unsplashImage, setUnsplashImage] = useState<UnsplashImage>({
    url: "",
    alt: "",
    photographer: "",
    photographerLink: "",
  });
  const [inputLocation, setInputLocation] = useState(null)

                                                                                                                                                                                                               
 
  useEffect(() => {
    if(geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocationCoords(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        )
      }, (error) => {setLocationError(true)});
    }

  }, []);

  useEffect(() => {
    if (locationCoords.latitude !== 0 && locationCoords.longitude !== 0) {
      const fetchUrl = `https://weather-backend-6kka.onrender.com/lat=${locationCoords.latitude}&lon=${locationCoords.longitude}`;
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const {name, weather, main, wind, sys} = data;
          setLocationData({
            name: name,
            weather: weather,
            main: main,
            wind: wind,
            sys: sys
          });
          return data
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [locationCoords]);


  useEffect(() => {
    if (inputLocation !== null) {
      const fetchUrl = `https://weather-backend-6kka.onrender.com/q=${inputLocation}`;
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const {name, weather, main, wind, sys} = data;
          setLocationData({
            name: name,
            weather: weather,
            main: main,
            wind: wind,
            sys: sys
          });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [inputLocation]);


useEffect(() => {
  const fetchUrl = `https://api.unsplash.com/search/photos?page=1&query=${locationData?.name}&orientation=landscape&client_id=${unsplashAccess}`;
    if(locationData?.name) {
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const randomNumber = Math.floor(Math.random() * 6);
          setUnsplashImage({
            url: data.results[randomNumber].urls.regular, 
            alt: data.results[randomNumber].alt_description || "No description available", 
            photographer: data.results[randomNumber].user.name, 
            photographerLink: data.results[randomNumber].links.html, 

          });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
}, [locationData]);   
 
console.log(locationData);
  return (
    <main className="h-screen w-screen flex justify-center items-center" style={{
      backgroundImage: `url("${unsplashImage.url}")`,
      backgroundSize: "cover",
      boxShadow:"inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",

    }}>
      {/* <div className="absolute top-0 left-0 w-full h-full"></div> */}
      <LocationComponent  
        city={locationData?.name ? locationData.name : 'Loading...'}
        weather={locationData?.weather && locationData.weather[0]
          ? locationData.weather[0].description
          : "Loading..." }
        logo={locationData?.weather && locationData.weather[0]
        ? locationData.weather[0].icon
        : ""}
        tempurature={locationData?.main && locationData.main.temp
          ? Math.round(locationData.main.temp - 273.15) // Convert from Kelvin to Celsius
          : 0 }
        photographer={unsplashImage.photographer}
        photographerLink={unsplashImage.photographerLink} 
        />
      <MenuComponent
        windSpeed={locationData?.wind && locationData.wind.speed
          ? locationData.wind.speed
          : 0 }
          sunrise={locationData?.sys && locationData.sys.sunrise
            ? new Date(locationData.sys.sunrise* 1000)
            : 0 }
          sunset={locationData?.sys && locationData.sys.sunset
            ? new Date(locationData.sys.sunset* 1000)
            : 0 }
          country={locationData?.sys && locationData.sys.country
            ? locationData.sys.country
            : "Loading..." }
          setInputLocation={setInputLocation}
      />
    </main>
  );
};

// {locationError ? <p>Location not available</p> : null}
// {!locationError ? <p>Latitude: {locationCoords.latitude}, Longitude: {locationCoords.longitude} </p> : null}