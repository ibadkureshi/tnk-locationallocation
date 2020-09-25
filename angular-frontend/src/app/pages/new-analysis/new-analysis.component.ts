import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService } from 'src/app/services/api/common.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-new-analysis',
  templateUrl: './new-analysis.component.html',
  styleUrls: ['./new-analysis.component.scss'],
})
export class NewAnalysisComponent implements OnInit {
  public loading = false;
  public boxes = [true, true, true];
  public showMapSelection = false;
  public csv: any;
  public formIsValid = false;
  validateForm!: FormGroup;

  markers: any = [];
  csvMarkers: any;
  public boundingBox: any = null;
  taskMeta = {
    name: 'this is a test',
    time: { submit: '12:38:00' },
    job_type: 'pmedian',
    properties: {
      type: 'geographic',
      cost_type: 'time',
      demand_pts: { if_out_of_bounds: 'exclude' },
      box: {
        sw: '52.25,-0.1',
        ne: '52.5,0.4',
        grid_height: 'None',
        grid_length: 10,
      },
      p_val: { min: 3, max: 5 },
    },
  };
  constructor(
    private commonApi: CommonService,
    private msg: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      gridLength: [null, [Validators.required]],
      minVal: [null, [Validators.required]],
      maxVal: [null, [Validators.required]],
      dataPoints: ['exclude', [Validators.required]],
    });
    this.validateForm.statusChanges.subscribe((result) => {
      console.log(result);
      const pValValidation = this.validateMaxValue();
      if (result === 'VALID') {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    });
  }
  validateMaxValue() {
    const { minVal, maxVal } = this.validateForm.value;
    if (!(maxVal || !minVal)) return false;
    if (maxVal >= minVal) {
      return true;
    }

    this.validateForm.patchValue({
      minVal: 1,
      maxVal: null,
    });
    this.msg.warning(`Max p value must be equal or greater than min p value`);
    return false;
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  public getMarkers($event): void {
    this.csvMarkers = $event;
    this.showMapSelection = true;
    this.boundingBox = null;
    this.markers = $event;
    this.loading = true;
    setTimeout(() => {
      this.boxes[0] = false;
      this.loading = false;
    }, 500);
  }
  public getCsvBlob($event): void {
    this.csv = $event;
    console.log('csv blob');
    console.log($event);
  }
  public getBoundingBox($event): void {
    this.boundingBox = $event;
  }
  public startNewTask() {
    const {
      gridLength,
      maxVal,
      minVal,
      name,
      dataPoints,
    } = this.validateForm.value;
    const parseBox = {
      sw: null,
      ne: null,
      grid_height: null,
      grid_length: null,
    };
    const { _northEast, _southWest } = this.boundingBox;
    parseBox.sw = `${_southWest.lat},${_southWest.lng}`;
    parseBox.ne = `${_northEast.lat},${_northEast.lng}`;
    parseBox.grid_height = 'None';
    parseBox.grid_length = gridLength;
    this.taskMeta.properties.box = parseBox;
    this.taskMeta.name = name;
    this.taskMeta.properties.demand_pts.if_out_of_bounds = dataPoints;
    this.taskMeta.properties.p_val.max = maxVal;
    this.taskMeta.properties.p_val.min = minVal;
    console.log(this.taskMeta);
    this.commonApi
      .newTask(this.csv, this.taskMeta)
      .then((result) => {
        this.msg.info(`Task ${name} has started`);
      })
      .catch((error) => {
        this.msg.error('Error starting new task');
      });
  }
}
