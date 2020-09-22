import { Component, OnInit, Input } from '@angular/core';

export interface ISimulationData {
  p: number;
  coords: [
    {
      lat: number;
      lng: number;
    }
  ];
}
@Component({
  selector: 'app-simulation-result',
  templateUrl: './simulation-result.component.html',
  styleUrls: ['./simulation-result.component.scss'],
})
export class SimulationResultComponent implements OnInit {
  @Input() simulationMarkers: any[];
  extractedMarkers: any;
  selectedValue = null;
  pvalues: any;

  ngOnInit(): void {
    console.log('simulation', this.simulationMarkers);
    this.pvalues = this.simulationMarkers;
    this.pvalues = this.pvalues.map((it, index) => {
      return {
        name: 'P Value : ' + (index + 1),
        ...it,
      };
    });
  }
  selectValue(pVal: number): void {
    this.extractedMarkers = null;
    const markers = this.simulationMarkers.find((s) => s.p === pVal);
    const markersMap = markers.coords.map((m) => {
      const { coordinates } = m.location;
      const coo = coordinates.split(',');
      return {
        latitude: coo[0],
        longitude: coo[1],
        markerRadius: 10,
      };
    });
    this.extractedMarkers = markersMap;
    console.log('selected p value', markersMap);
  }
}
