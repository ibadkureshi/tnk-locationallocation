import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/api/common.service';
import { ISimulationMeta } from 'src/app/services/models/simulation-meta.model';
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
  simulationMeta: ISimulationMeta = null;
  constructor(private _commonApi: CommonService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }
  public async selectSimulation(id: string) {
    this.simulationMeta = null;
    const extractedTask = await this._commonApi.getTask(id);
    const results = extractedTask[id].result;
    const {
      name,
      time: { start, end },
      properties: {
        demand_pts: { final },
        p_val: { min, max },
      },
    } = results;
    this.simulationMeta = { id, name, start, end, dataPoints: final };
    const markers = results.features.map((f) => {
      return {
        coords: f.locations,
        ...f.properties,
      };
    });
    console.log('markers', markers);
    this.simulationMarkers = markers;
  }
  getAllTasks() {
    this._commonApi
      .getTasks()
      .then((tasks) => {
        this.simulations = tasks.filter((t) => t.status === 'SUCCESS');
        console.log('filrered tasks', this.simulations);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
