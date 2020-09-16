import { Component, OnInit } from '@angular/core';
import simulations from '../../services/results-dummy';
import { ISimulationData } from 'src/app/shared/simulation-result/simulation-result.component';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  simulations = [];
  public boxes = [true, false, true];
  selectedSimulation = null;
  simulationMarkers: any;
  simulationMeta: any;
  constructor() {}

  ngOnInit(): void {
    this.simulations = simulations;
  }
  public selectSimulation(simulationId: number): void {
    const selected = this.simulations.find((s) => s.id === simulationId);
    this.simulationMarkers = selected.data;
    this.simulationMeta = selected;
  }
}
