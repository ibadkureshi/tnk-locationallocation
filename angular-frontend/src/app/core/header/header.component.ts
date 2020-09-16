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
  public urls = [
    {
      title: 'Home',
      route: '/',
      selected: false,
    },
    {
      title: 'New Task',
      route: 'new',
      selected: false,
    },
    {
      title: 'Results',
      route: 'results',
      selected: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
