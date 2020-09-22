import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import '../../../../node_modules/leaflet-draw/dist/leaflet.draw-src.js';
import { Map } from 'leaflet';
@Component({
  selector: 'app-tnk-maps',
  templateUrl: './tnk-maps.component.html',
  styleUrls: ['./tnk-maps.component.scss'],
})
export class TnkMapsComponent implements OnInit, OnChanges {
  @Input() showToolBar = true;
  @Input() markers: any;
  @Output() boundingBox: EventEmitter<any> = new EventEmitter();
  private mapIsLoaded: boolean = false;
  layers: L.Layer[];
  constructor() {}
  public drawItems: L.FeatureGroup = L.featureGroup();
  public drawLocal: any = {
    draw: {
      toolbar: {
        buttons: {
          edit: {
            featureGroup: this.drawItems,
            remove: false,
          },
        },
      },
    },
  };
  public drawOptions = {
    position: 'topright',
    draw: {
      circlemarker: false,
      polyline: false,
      polygon: false,
      circle: false,
      marker: false,
      rectangle: {
        shapeOptions: {
          color: '#85bb65',
        },
      },
    },
    edit: {
      featureGroup: this.drawItems,
    },
  };
  map: Map;
  homeCoords = {
    lat: 23.810331,
    lon: 90.412521,
  };

  popupText = 'Some popup text';

  markerIcon = {
    icon: L.icon({
      iconSize: [5, 5],
      iconAnchor: [10, 10],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: './assets/circle.png',
    }),
  };

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      }),
    ],
    preferCanvas: true,
    zoom: 5,
    center: L.latLng(this.homeCoords.lat, this.homeCoords.lon),
  };

  initMarkers() {
    var markerArray = [];

    if (!this.markers || this.markers.length === 0) return;
    this.markers.forEach((point, index) => {
      markerArray.push(
        L.circleMarker([point.latitude, point.longitude], {
          radius: point.markerRadius | 2,
          fillOpacity: 0.5,
          opacity: 0.5,
          color: '#3176b7',
          fillColor: '#3176b7',
          weight: 1,
        })
      );
    });

    var group = L.featureGroup(markerArray).addTo(this.map);
    this.layers.push(group);
    this.map.fitBounds(group.getBounds());
  }
  ngOnInit(): void {}
  onMapReady(map: L.Map) {
    this.map = map;
    this.layers = [];
    // Do stuff with map
    this.initMarkers();
    this.mapIsLoaded = true;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.mapIsLoaded) return;
    console.log('map readu', this.map);
    this.wipeLayers();
    this.initMarkers();
  }
  wipeLayers() {
    this.layers.forEach((s) => {
      s.remove();
    });
  }
  public onDrawCreated(e: any) {
    this.drawItems.addLayer((e as L.DrawEvents.Created).layer);
    const {
      layer: { _bounds },
    } = e;
    this.boundingBox.emit(_bounds);
    this.zoomSelection(_bounds);
  }

  zoomSelection(_bounds: any): void {
    console.log(_bounds);
    const bounds = new L.LatLngBounds(_bounds._southWest, _bounds._northEast);
    this.map.fitBounds(bounds);
  }
}
