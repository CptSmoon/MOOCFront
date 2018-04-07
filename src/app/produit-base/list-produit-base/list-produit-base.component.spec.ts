import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitBaseComponent } from './list-produit-base.component';

describe('ListAchatComponent', () => {
  let component: ListProduitBaseComponent;
  let fixture: ComponentFixture<ListProduitBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProduitBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
