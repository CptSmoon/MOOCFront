import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLivraisonComponent } from './add-livraison.component';

describe('AddLivraisonComponent', () => {
  let component: AddLivraisonComponent;
  let fixture: ComponentFixture<AddLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
