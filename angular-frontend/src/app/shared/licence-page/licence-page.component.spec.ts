import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencePageComponent } from './licence-page.component';

describe('LicencePageComponent', () => {
  let component: LicencePageComponent;
  let fixture: ComponentFixture<LicencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
