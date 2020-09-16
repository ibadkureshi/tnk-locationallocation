import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/api/common.service';
interface IJob {
  id: string;
  status: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public listOfData: IJob[] = [];
  public loading = false;
  constructor(private _commonApi: CommonService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks() {
    this.loading = true;
    this._commonApi
      .getTasks()
      .then((tasks) => {
        tasks.forEach((item: any) => {
          const key = Object.keys(item)[0];
          const tmpObj: IJob = {
            id: key,
            status: item[key].status,
            name: 'test',
          };
          this.listOfData.push(tmpObj);
        });
        this.listOfData = [...this.listOfData];
        this.loading = false;
        console.log(this.listOfData);
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
      });
  }
}
