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
  downloadFile() {
    var a = <any>document.getElementById('download'); //or grab it by tagname etc
    a.href = this.meta.fileName;
    document.getElementById('download').click();
  }
}
