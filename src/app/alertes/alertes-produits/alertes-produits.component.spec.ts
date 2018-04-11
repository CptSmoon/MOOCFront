import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesProduitsComponent } from './alertes-produits.component';

describe('AlertesProduitsComponent', () => {
  let component: AlertesProduitsComponent;
  let fixture: ComponentFixture<AlertesProduitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertesProduitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertesProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
