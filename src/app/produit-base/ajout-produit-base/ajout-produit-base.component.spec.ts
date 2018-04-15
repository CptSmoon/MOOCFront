import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProduitBaseComponent } from './ajout-produit-base.component';

describe('AjoutProduitBaseComponent', () => {
  let component: AjoutProduitBaseComponent;
  let fixture: ComponentFixture<AjoutProduitBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutProduitBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutProduitBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
