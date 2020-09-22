import { Component, OnInit, Input } from '@angular/core';

export interface IGraphMetaData {
  pValue: string;
  avgDistance: string;
  avgTime: string;
  maxDistance: string;
}
export interface series {
  name: number;
  value: number;
}
export interface IGraphData {
  name: string;
  series: series[];
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
  selectedGraphMeta: IGraphMetaData = null;
  graphData: IGraphData = {
    name: '',
    series: [],
  };
  ngOnInit(): void {
    console.log('simulation', this.simulationMarkers);
    this.pvalues = this.simulationMarkers;
    this.pvalues = this.pvalues.map((it, index) => {
      return {
        name: 'P Value : ' + (index + 1),
        ...it,
      };
    });
    this.simulationMarkers.forEach((datum) => {
      const tmpObj = {
        name: datum.avg_distance,
        value: datum.p,
      };
      this.graphData.series.push(tmpObj);
    });

    this.graphData.name = 'P values';
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
    this.selectedGraphMeta = {
      avgDistance: markers.avg_distance,
      pValue: markers.p,
      avgTime: markers.avg_time,
      maxDistance: markers.max_distance,
    };
    console.log('selectedGraphMeta', this.selectedGraphMeta);
    this.extractedMarkers = markersMap;
    console.log('selected p value', markersMap);
  }
}
