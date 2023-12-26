import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';

import { Favorites } from '../../sha../../shared/map/favorites.control';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit{
  
  isPlatFormBrowser;
  constructor(@Inject(PLATFORM_ID) platformId: Object, private sessionService: SessionService) {
    this.isPlatFormBrowser = isPlatformBrowser(platformId);
  }

  map: Map;
  budapestLonLat = [19.05973306077445, 47.4990641171463];
  budapestCoordinates = fromLonLat(this.budapestLonLat);

  ngOnInit(): void {
    if(!this.isPlatFormBrowser) return;
    this.map = new Map({
      view: new View({
        center: this.budapestCoordinates,
        zoom: 14,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });

    this.map.addControl(new Favorites(this.map, this.sessionService))
  }
}