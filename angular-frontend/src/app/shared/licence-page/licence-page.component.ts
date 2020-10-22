import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-licence-page',
  templateUrl: './licence-page.component.html',
  styleUrls: ['./licence-page.component.scss'],
})
export class LicencePageComponent implements OnInit {
  licenceChecked = false;

  constructor(private _router: Router) {}
  ngOnInit(): void {}
  public proceed(): void {
    localStorage.setItem('inlecom-agree', 'true');
    this._router.navigate(['']);
  }
}
