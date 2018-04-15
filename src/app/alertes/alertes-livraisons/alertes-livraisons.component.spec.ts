import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesLivraisonsComponent } from './alertes-livraisons.component';

describe('AlertesLivraisonsComponent', () => {
  let component: AlertesLivraisonsComponent;
  let fixture: ComponentFixture<AlertesLivraisonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertesLivraisonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertesLivraisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
