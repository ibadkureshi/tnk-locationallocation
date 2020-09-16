import { Component, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from 'src/app/services/api/common.service';

@Component({
  selector: 'app-tkn-upload',
  templateUrl: './tkn-upload.component.html',
  styleUrls: ['./tkn-upload.component.scss'],
})
export class TknUploadComponent {
  fileToUpload: any;
  filename: string;
  fileSize: string;
  public loading = false;
  @Output() markers: EventEmitter<any> = new EventEmitter();
  @Output() csvBlob: EventEmitter<any> = new EventEmitter();
  constructor(
    private msg: NzMessageService,
    private commonApi: CommonService
  ) {}

  async postMethod(files: FileList) {
    this.fileToUpload = files.item(0);
    this.filename = this.fileToUpload.name;
    this.fileSize = this.bytesToMegaBytes(this.fileToUpload.size);
    this.loading = true;
    try {
      const points = await this.commonApi.extractCsv(this.fileToUpload);
      this.msg.info('Successful csv upload');
      this.markers.emit(points);
      this.csvBlob.emit(this.fileToUpload);
    } catch (error) {
      this.msg.error('Error on upload');
      console.log(error);
    }
    this.loading = false;
    return false;
  }
  bytesToMegaBytes(n: number): string {
    const p = n * 0.00000095367431640625;
    return p.toFixed(2);
  }
  removeFile() {
    this.filename = null;
  }
}
