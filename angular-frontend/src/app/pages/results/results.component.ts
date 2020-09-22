import { Component, OnInit } from '@angular/core';
import simulations from '../../services/results-dummy';
import { ISimulationData } from 'src/app/shared/simulation-result/simulation-result.component';
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
    console.log(results);
    const {
      name,
      time: { start, end },
      properties: {
        demand_pts: { final },
      },
    } = results;
    this.simulationMeta = { id, name, start, end, dataPoints: final };
    // this.simulationMarkers = selected.data;
    // this.simulationMeta = selected;
  }
  getAllTasks() {
    this._commonApi
      .getTasks()
      .then((tasks) => {
        tasks.filter((t) => t.status === 'SUCCESS');
        this.simulations = tasks;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
