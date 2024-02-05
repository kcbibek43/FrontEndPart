import { Component , Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment.development';
import { PropertyService } from '../Services/property.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements  OnInit{
  map: any;
  isLoaded = true;
  coordinates : number[] = [];  
  @Input()
  location : string = "";
  constructor(private propertyService : PropertyService) { }
  private loadMap(): void {
    const lat = this.coordinates[0];
    const lng = this.coordinates[1];
    this.map = L.map("map").setView([51.505, -0.09], 13)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);
   
    this.map.flyTo([lat , lng], 13);

    const icon = L.icon({
      iconUrl: 'assets/icon.png',
      shadowUrl: 'assets/shadow.png',
      popupAnchor: [13, 0],
    });
    const marker = L.marker([lat, lng], { icon }).bindPopup(this.location);
    marker.addTo(this.map);
  } 

  ngOnInit() {
    this.propertyService.getLocationCoordinates(this.location).subscribe((location: any) => { 

      this.coordinates.push(location.features[0].properties.lat);
      this.coordinates.push(location.features[0].properties.lon);  
      this.loadMap();    
    });  
  }
}
