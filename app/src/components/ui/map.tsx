"use client"
import { Loader } from '@googlemaps/js-api-loader';
import React, {useEffect} from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function Map (){
    const router = useRouter();
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {

        const initMap = async () => {
            
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            });

        const { Map } = await loader.importLibrary('maps');

        //init a marker
        const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

        //toronto
        const position = {
            lat: 42.99815068933534, 
            lng: -81.27268313943205
        }
        const montreal = {
            lat: 45.470556,
            lng: -73.740833
        }
        //map options
        const mapOptions: google.maps.MapOptions = {
            center: position,
            zoom: 6,
            mapId: 'MY_NEXTJS_MAPID'
        }
        //setup the map
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        //put up a marker
        const marker = new Marker({
            map: map,
            position: position
        });
        // Creating an info window
        const infoWindow = new google.maps.InfoWindow({
           content: "<div>address: Wonderland Rd N #5, London, ON N6H 4L1</div>"
        });
 
        // Adding click event listener to the marker
        marker.addListener('mouseover', () => {
        infoWindow.open(map, marker); // Opening info window when marker is clicked
       });
       marker.addListener('click', () => {
        router.push('/vehicles?pickUpDate=&returnDate=&location=65fde5fd2caecab370f74961');
       });
/*
const marker2 = new Marker({
    map: map,
    position: position2
});
// Creating an info window
const infoWindow2 = new google.maps.InfoWindow({
   content: "<div>Car Information: <br> Model: Toyota <br> Year: 2022</div>"
});

// Adding click event listener to the marker
marker2.addListener('click', () => {
infoWindow2.open(map, marker2); // Opening info window when marker is clicked
});
*/
const markerMontreal = new Marker({
    map: map,
    position: montreal
});


const infoWindowMontreal = new google.maps.InfoWindow({
    content: "<div>Address:Bd Roméo Vachon Nord (Arrivées), Dorval, QC H4Y 1H1</div>"
});
//
markerMontreal.addListener('click', () => {
    
    router.push('/vehicles?pickUpDate=&returnDate=&location=65fde5fd2caecab370f74961');
});
//
markerMontreal.addListener('mouseover', () => {
    infoWindowMontreal.open(map, markerMontreal);
});


        }
        initMap();
    }, []);

    return (
        <div style={{height: '600px'}} ref={mapRef}/>
    )
}