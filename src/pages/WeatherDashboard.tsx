import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import React from "react";
import { WeatherSkeleton } from "@/components/WeatherSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  //console.log(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      console.log(coordinates);
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Location Error </AlertTitle>

        <AlertDescription>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            Enable Location Access
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle> Location Error </AlertTitle>

        <AlertDescription>
          <p>{`Please Enable Lication access to see your Local weather`}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            Enable Location Access
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* Favourite Cities */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WeatherDashboard;
