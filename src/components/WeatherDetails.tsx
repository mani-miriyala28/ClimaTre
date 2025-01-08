import { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Droplets, Gauge, Sunrise, Sunset } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}
const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];

    // if(degree>337.5) return 'N';
    // if(degree>292.5) return 'NW';
    // if(degree>247.5) return 'W';
    // if(degree>202.5) return 'SW';
    // if(degree>157.5) return 'S';
    // if(degree>122.5) return 'SE';
    // if(degree>67.5) return 'E';
    // if(degree>22.5) return 'NE';
    // return 'N';
  };

  const formatTime = (time: number) => {
    // unix time stamp
    return format(new Date(time * 1000), "hh:mm a");
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-yellow-500",
    },
    {
      title: "Humidity",
      value: `${main.humidity}%`,
      icon: Droplets,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} ${wind.deg}°`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <div className="flex items-center">
                <detail.icon
                  className={`h-5 w-5 ${detail.color}`}
                ></detail.icon>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {detail.title}
                  </p>
                  <p className={`text-sm text-muted-foreground `}>
                    {detail.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
