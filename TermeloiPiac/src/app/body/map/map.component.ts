import { Component } from '@angular/core';

import { GoogleMapsModule } from '@angular/google-maps'

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  mapOptions: google.maps.MapOptions = {
    center: { lat: 47.50016265006108, lng: 19.080664063213064 },
    zoom: 14,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    mapTypeControl: false,
    disableDoubleClickZoom: true
  };
}
