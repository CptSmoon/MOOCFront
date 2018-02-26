import { Component, OnInit } from '@angular/core';
import {MatierePremiere} from "../../shared/models/matiere-premiere";
import {MPService} from "../../shared/services/mp.service";

@Component({
  selector: 'app-stock-mp',
  templateUrl: './stock-mp.component.html',
  styleUrls: ['./stock-mp.component.css']
})
export class StockMpComponent implements OnInit {
  mp:Array<MatierePremiere>;
  constructor(private mpService:MPService) { }

  public getAllMP(){
    this.mpService.getMP().subscribe(data => this.mp= data);
  }

  ngOnInit() {
    this.getAllMP();
  }

}
