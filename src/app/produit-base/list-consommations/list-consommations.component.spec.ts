import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsommationsComponent } from './list-consommations.component';

describe('ListConsommationsComponent', () => {
  let component: ListConsommationsComponent;
  let fixture: ComponentFixture<ListConsommationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsommationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsommationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
