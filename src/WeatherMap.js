import React from 'react'
import { Layout } from 'antd'
import L from 'leaflet';
import "leaflet/dist/leaflet.css";  

export default class WeatherMap extends React.Component {

    state = {
        map: null
    }

    componentDidMount = () => {
        if(this.props.data && this.props.data.coord){
            let map = L.map('map').setView([this.props.data.coord.lat, this.props.data.coord.lon], 13);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWxleG1hcnN1IiwiYSI6ImNqdWllbGZ2bTBkbHM0NG80OG1kM3N0b2gifQ.xqhE_zSmSSd_96nYDrZwtg', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'your.mapbox.access.token'
            }).addTo(map);
            
            let icon = L.icon({
                iconUrl: 'http://openweathermap.org/img/w/' + this.props.data.weather[0].icon  +".png",
                iconSize: [50, 50],
                iconAnchor: [16, 38],
                popupAnchor: [10, -25]
            })
            let marker = L.marker([this.props.data.coord.lat, this.props.data.coord.lon], { icon })
            marker.bindPopup("<h2>" + this.props.data.weather[0].description + "<h2>");
            marker.addTo(map);
            this.setState({ map });
        }
    }

    componentDidUpdate = (oldProps) => {
        if(this.props.data && (this.props.data.coord !== oldProps.data.coord)){
            let map = this.state.map;
            map.setView([this.props.data.coord.lat, this.props.data.coord.lon]);
            let icon = L.icon({
                iconUrl: 'http://openweathermap.org/img/w/' + this.props.data.weather[0].icon  +".png",
                iconSize: [50, 50],
                iconAnchor: [16, 38],
                popupAnchor: [10, -25]
            })
            let marker = L.marker([this.props.data.coord.lat, this.props.data.coord.lon], { icon })
            marker.bindPopup("<h2>" + this.props.data.weather[0].description + "<h2>");
            marker.addTo(map);
            this.setState({ map }); 
        }
    }

    render() {
        return (
            <Layout id="map" style={{ height: "100%" }}>
            </Layout>
        )
    }

}