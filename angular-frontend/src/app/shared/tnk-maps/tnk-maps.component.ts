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

  map;
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
    const popupInfo = `<b style="color: red; background-color: white">${this.popupText}</b>`;
    var markerArray = [];

    // L.marker([this.homeCoords.lat, this.homeCoords.lon], this.markerIcon)
    //   .addTo(this.map)
    //   .bindPopup(popupInfo);
    if (!this.markers || this.markers.length === 0) return;
    this.markers.forEach((point, index) => {
      // const latlng = L.latLng(point.lat, point.lon);
      // var layer = L.marker(latlng, this.markerIcon).addTo(this.map);
      // layer.addTo(this.map);
      markerArray.push(
        L.circleMarker([point.latitude, point.longitude], {
          radius: 2,
          fillOpacity: 0.5,
          opacity: 0.5,
          color: '#3176b7',
          fillColor: '#3176b7',
          weight: 1,
        })
      );
    });

    var group = L.featureGroup(markerArray).addTo(this.map);
    this.map.fitBounds(group.getBounds());
  }
  ngOnInit(): void {}
  onMapReady(map: L.Map) {
    this.map = map;
    // Do stuff with map
    console.log(this.markers);
    this.initMarkers();
    this.mapIsLoaded = true;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.mapIsLoaded) return;
    this.initMarkers();
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
