import { Component, Input, OnInit } from '@angular/core';
import { ISimulationMeta } from 'src/app/services/models/simulation-meta.model';

@Component({
  selector: 'app-simulation-meta',
  templateUrl: './simulation-meta.component.html',
  styleUrls: ['./simulation-meta.component.scss'],
})
export class SimulationMetaComponent implements OnInit {
  @Input() meta: ISimulationMeta;
  constructor() {}

  ngOnInit(): void {}
}
