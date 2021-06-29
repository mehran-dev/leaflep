import React, { useEffect, useState } from 'react'
import L from 'leaflet';

export default function Maper() {
    console.log(L);
    const [lat, setLat] = useState(51.441311)
    const [long, setLong] = useState(35.606111)


    useEffect(() => {
        if (navigator.geolocation) {

            navigator.geolocation.watchPosition(
                function (position) {
                    console.log(position);
                },
                function (error) {
                    console.error("Error Code = " + error.code + " - " + error.message);
                })

            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
            });

        }
    }, [])
    useEffect(() => {
        try {
            var container = L.DomUtil.get('mapid');
            if (container != null) {
                container._leaflet_id = null;
            }
            let map = L.map('mapid').setView([long, lat], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([long, lat]).addTo(map)
                .bindPopup(`lat :${lat}   -- long : ${long}`)
                .openPopup();
        } catch (error) {

            //  console.log(error);
        }
    }, [lat, long])


    return (
        <div id="mapid"></div>
    )
}
