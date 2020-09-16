import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { multi } from './data';
import * as shape from 'd3-shape';
import { CustomLinerChartService } from './custom-liner-chart.service';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: any;
  multi: any[];
  curve: any = shape.curveCardinal;
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'P';
  yAxisLabel: string = 'Avg distance';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  constructor(private lineHelperService: CustomLinerChartService) {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {}
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngAfterViewInit() {
    this.lineHelperService.showDots(this.chart);
  }
}
