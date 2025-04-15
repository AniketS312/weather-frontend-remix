import React from 'react'

type LocationComponentProps = {
  city: string;
  weather: string;
  logo: string;
  photographer: string;
  photographerLink: string;
  tempurature: number;
};




export default function LocationComponent({ city, weather, logo, tempurature, photographer, photographerLink }: LocationComponentProps) {
  function capitalizeFirstLetter(str: string): string {
    if (!str) return ""; // Handle empty or undefined strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <section className='h-full grow-3 flex'>
      <div className='flex flex-col grow pt-5 pl-5'> 
        <h2 className='text-2xl'>Image by <a
            href={photographerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >{photographer}</a></h2>
      </div>
      <div className='flex flex-col justify-end items-end pb-10 pr-20 grow'>
        <div className='flex'>
          <span className='self-start'>
            <img className='w-[80%]' src={`https://openweathermap.org/img/wn/${logo}.png`}/>
          </span>
          <h1 className='text-5xl'>{city}</h1>
        </div>
        <h2 className='text-2xl'>{capitalizeFirstLetter(weather)}: {tempurature}&deg; C</h2>
      </div>    
    </section>
  )
}
