import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsVenteComponent } from './stats-vente.component';

describe('StatsVenteComponent', () => {
  let component: StatsVenteComponent;
  let fixture: ComponentFixture<StatsVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
