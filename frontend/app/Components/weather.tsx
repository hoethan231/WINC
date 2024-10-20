"use client"
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../Components/card"

interface WeatherData {
    name: string;
    main : {
        temp: number;
    };
    weather : {
        icon: string;
    }[];
}
  

export default function Weather() {
    const [weather, setWeather] = useState<WeatherData | null>(null); 
    const [error, setError] = useState<string | null>(null); 
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWeatherData = async (lat:number, lon:number) => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
                console.log("API Key: ", apiKey);
                console.log("Fetching weather data from : ", url);
                const response = await fetch (url);
                if (!response.ok) {
                    throw new Error ("Failed to get weather data.");
                }
                const data = await response.json();
                setWeather(data);
                setIsLoading(false);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                else {
                    setError('An unknown error')
                }
                setIsLoading(false);
            }
        };

        const getLocation = () => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        fetchWeatherData(latitude, longitude);
                    },
                    () => {
                        setError('location access denied');
                        setIsLoading(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser');
                setIsLoading(false);
            }
        };

        getLocation();
    }, []);

    const iconUrl = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`;

    return (
        <div>
            <Card className="w-[350px] h-[180px] mx-4 text-center bg-[#f5f5f5] mt-10">
                <CardHeader className="p-0">
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <CardTitle className="font-light text-[#39516E] text-xl pt-[68px]">Loading weather data...</CardTitle>
                        </div>
                    ) : (
                        weather && (
                            <div className="ml-56 -mt-2">
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt="Weather Icon"
                                    className="w-32 h-auto"
                                />
                            </div>
                        )
                    )}
                </CardHeader>
                <CardContent className="text-[15px] text-left -mt-5">
                    {isLoading ? (
                        <div></div>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        weather && (
                            <>
                                <p className="text-5xl text-left text-[#39516E] font-medium">
                                    {Math.round(weather.main.temp)}°F
                                </p>
                                <h2 className="font-light text-[#39516E]">{weather.name}</h2>
                            </>
                        )
                    )}
                </CardContent>
            </Card>
        </div>
    )
}