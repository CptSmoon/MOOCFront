import { Component, OnInit } from '@angular/core';
import {MatierePremiere} from "../../shared/models/matiere-premiere";
import {MPService} from "../../shared/services/mp.service";
import {UniteService} from "../../shared/services/unite.service";
import {Unite} from "../../shared/models/unite";
declare let jQuery: any;
@Component({
  selector: 'app-stock-mp',
  templateUrl: './stock-mp.component.html',
  styleUrls: ['./stock-mp.component.css']
})
export class StockMpComponent implements OnInit {
  mp: Array<MatierePremiere>;
  mpName: string;
  units: Array<Unite>;
  selectedUnit : Unite;
  constructor(private mpService: MPService, private uniteService: UniteService) { }
  public getAllMP(){
    this.mpService.getMP().subscribe(data => this.mp= data);
    setTimeout(function () {
        jQuery('#stockMP').DataTable();
      },500
    );
  }

  public getAllUnits(){
    this.uniteService.getAllUnits().subscribe(data => this.units = data);
  }

  ngOnInit() {
    const base=this;
    this.getAllMP();
    this.getAllUnits();
    this.mpName="";
    setTimeout(function () {
      base.cleanAddMPModal();
    },500);
  }

  cleanAddMPModal(){
    this.selectedUnit = this.units[0];
    this.mpName="";
  }

  addMP(){
    this.mpService.addMP(this.mpName,this.selectedUnit.unite_id).subscribe(data=>console.log(data))
  }

}
