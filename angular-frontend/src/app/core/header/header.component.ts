import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
const ASSETS_URL = environment.assetsUrl;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public logoUrl = `${ASSETS_URL}/assets/logos/trackknowlogo2.png`;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      // see also
      console.log(val instanceof NavigationEnd);
      if (val instanceof NavigationEnd) {
        console.log(val);
      }
    });
  }

  ngOnInit(): void {}
}
