import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesFacturesComponent } from './alertes-factures.component';

describe('AlertesFacturesComponent', () => {
  let component: AlertesFacturesComponent;
  let fixture: ComponentFixture<AlertesFacturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertesFacturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertesFacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
