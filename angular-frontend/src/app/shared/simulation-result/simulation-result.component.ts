import { Component, OnInit, Input } from '@angular/core';

export interface ISimulationData {
  markers: [
    {
      OrgnstN: string;
      coordinates: [number];
    }
  ];
}
export interface ISimulation {
  id: number;
  name: string;
  dateStart: string;
  dateEnd: string;
  timeRun: number;
  inputFileName: string;
  dataPoints: number;
  data: ISimulationData[];
}
@Component({
  selector: 'app-simulation-result',
  templateUrl: './simulation-result.component.html',
  styleUrls: ['./simulation-result.component.scss'],
})
export class SimulationResultComponent implements OnInit {
  @Input() simulationMarkers: ISimulationData;
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
  selectValue(index: number): void {
    const markers = this.pvalues[index].markers;
    this.extractedMarkers = markers.map((m) => {
      return {
        lat: m.coordinates[1],
        lon: m.coordinates[0],
      };
    });
    console.log('selected p value', this.extractedMarkers);
  }
}
