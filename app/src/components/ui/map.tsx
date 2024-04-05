"use client"
import {Loader} from '@googlemaps/js-api-loader';
import React, {useEffect} from "react";
export function Map (){

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
            lat: 43.642693,
            lng: -79.3871189
        }

        //map options
        const mapOptions: google.maps.MapOptions = {
            center: position,
            zoom: 8,
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
           content: "<div>Car Information: <br> Model: Toyota <br> Year: 2022</div>"
        });
 
        // Adding click event listener to the marker
        marker.addListener('click', () => {
        infoWindow.open(map, marker); // Opening info window when marker is clicked
       });

        }
        initMap();
    }, []);

    return (
        <div style={{height: '600px'}} ref={mapRef}/>
    )
}