import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsommationMpComponent } from './consommation-mp.component';

describe('ConsommationMpComponent', () => {
  let component: ConsommationMpComponent;
  let fixture: ComponentFixture<ConsommationMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsommationMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsommationMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
