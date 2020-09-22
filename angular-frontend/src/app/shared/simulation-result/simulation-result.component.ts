import { Component, OnInit, Input } from '@angular/core';

export interface ISimulationData {
  p: number;
  markers: [
    {
      OrgnstN: string;
      coordinates: [number];
    }
  ];
}
@Component({
  selector: 'app-simulation-result',
  templateUrl: './simulation-result.component.html',
  styleUrls: ['./simulation-result.component.scss'],
})
export class SimulationResultComponent implements OnInit {
  @Input() simulationMarkers: ISimulationData[];
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
    const markers = this.simulationMarkers.find((s) => s.p === pVal);
    // this.extractedMarkers = markers.map((m) => {
    //   return {
    //     latitude: m.coordinates[1],
    //     longitude: m.coordinates[0],
    //   };
    // });
    console.log('selected p value', markers);
  }
}
