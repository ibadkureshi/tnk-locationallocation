import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const API_URL = environment.apiUrl;

import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private httpClient: HttpClient) {}

  extractCsv(csv: any): Promise<any> {
    const formData = new FormData();
    formData.append('myfile', csv);
    return this.httpClient.post(`${API_URL}/extract-csv`, formData).toPromise();
  }
  newTask(csv, data): Promise<any> {
    const formData = new FormData();
    formData.append('myfile', csv);
    formData.append('data', data);
    return this.httpClient.post(`${API_URL}/create-task`, formData).toPromise();
  }

  getTasks(): Promise<any> {
    return this.httpClient.get(`${API_URL}/get-all-tasks`).toPromise();
  }
}
