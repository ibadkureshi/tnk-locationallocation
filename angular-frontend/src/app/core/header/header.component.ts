import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
const ASSETS_URL = environment.assetsUrl;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public logoUrl = `${ASSETS_URL}/assets/logos/trackknowlogo2.png`;
  constructor() {}

  ngOnInit(): void {}
}
