import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/api/common.service';
interface ITask {
  id: string;
  status: string;
  name: string;
  result: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public listOfData: ITask[] = [];
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
        this.listOfData = [];
        tasks.forEach((item: any) => {
          const tmp = [];
          const { id, status, name, result } = item;
          const tmpObj: ITask = {
            id,
            status,
            name: name || '',
            result,
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
