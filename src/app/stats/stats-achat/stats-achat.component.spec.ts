import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAchatComponent } from './stats-achat.component';

describe('StatsAchatComponent', () => {
  let component: StatsAchatComponent;
  let fixture: ComponentFixture<StatsAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
