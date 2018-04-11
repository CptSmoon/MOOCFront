import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesProduitsBasesComponent } from './alertes-produits-bases.component';

describe('AlertesProduitsBasesComponent', () => {
  let component: AlertesProduitsBasesComponent;
  let fixture: ComponentFixture<AlertesProduitsBasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertesProduitsBasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertesProduitsBasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
