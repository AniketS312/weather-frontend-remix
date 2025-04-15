import React from 'react'
import { useLoaderData, useFetcher, Form } from "react-router";




type MenuComponentProps = {
  // windSpeed: Number;
  sunrise: number | Date;
  sunset: number | Date;
  country: string;
  windSpeed: number;
  setInputLocation: React.Dispatch<React.SetStateAction<string | null>>;
}



export default function MenuComponent({setInputLocation, sunrise, sunset, country, windSpeed}: MenuComponentProps) {
  return (
    <section className='h-full w-20 gap-10 flex flex-col justify-start items-start px-4 pt-10 isolate aspect-video w-96 rounded-l-xl bg-black/40 shadow-lg ring-1 ring-black/5'>
      <SearchForm setInputLocation={setInputLocation} />
      <ListOfCities 
        setInputLocation={setInputLocation}
      />
      <CityInfo 
        sunrise ={sunrise} // Example Unix timestamp
        sunset={sunset}  // Example Unix timestamp
        country={country}
        windSpeed={windSpeed}
        setInputLocation={setInputLocation}/>
    </section>
  )
}


function SearchForm({setInputLocation}: {setInputLocation: React.Dispatch<React.SetStateAction<string | null>>}) {
  let data = useLoaderData();
  let fetcher = useFetcher();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const formData = new FormData(event.currentTarget); 
    setInputLocation(formData.get("city") as string);    
  }
  
  return (
    <fetcher.Form method="get" onSubmit={handleSubmit} className="w-full grow-1 flex justify-center items-center ">
      <input type="text" name="city" placeholder="Search..." className="border-y-2 border-l-2 focus:border-r-0  border-white rounded-l-md p-2 " />
      <button className='bg-amber-500 h-11 w-10  flex justify-center items-center cursor-pointer'><SearchIcon/></button>
    </fetcher.Form>
  )
}

function ListOfCities({setInputLocation}: {setInputLocation: React.Dispatch<React.SetStateAction<string | null>>}) {
  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Amsterdam'];

  const handleCitiesSubmit = (city: string, event: React.FormEvent<HTMLFormElement>) => {
    setInputLocation(city);
  }

  return (
    <section>
      <ul className='grow-3 flex flex-col gap-4 pl-5'>
       {cities.map((city, index) => (
          <li key={index} className='text-2xl list-none cursor-pointer hover:font-medium'>
            <button className='cursor-pointer hover:font-medium' onClick={() => handleCitiesSubmit(cities[index], event)}>
              {city}
            </button>
          </li>
        ))}
        {/* <li className='text-2xl list-none cursor-pointer hover:font-medium'>New York</li>
        <li className='text-2xl list-none cursor-pointer hover:font-medium'>Tokyo</li>
        <li className='text-2xl list-none cursor-pointer hover:font-medium'>Paris</li>
        <li className='text-2xl list-none cursor-pointer hover:font-medium'>Berlin</li> */}
      </ul>
    </section>
  )
}

function CityInfo({ windSpeed, sunrise, sunset, country }: MenuComponentProps) {
  return(
    <section className='w-full pl-5 grow-2 flex flex-col justify-center items-start'>
      <p className='text-xl'>Country Code: {country}</p>
      <p className='text-xl'>Sunrise: {sunrise.toLocaleString().split(',')[1]}</p>
      <p className='text-xl'>Sunset:  {sunset.toLocaleString().split(',')[1]}</p>
      <p className='text-xl'>Wind Speed: {windSpeed} m/h</p>
    </section>
  )
}

function SearchIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
    </svg>
  )
}