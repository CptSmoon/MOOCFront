import { Component, OnInit } from '@angular/core';
import {Utils} from "../../../shared/utils";
import {Produit} from "../../../shared/new models/produit";
import {Subscription} from "rxjs/Subscription";
import {LotNEwService} from "../../../shared/services/lotNEw.service";
import {Lot} from "../../../shared/new models/lot";
declare var jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-lot',
  templateUrl: './list-lot.component.html',
  styleUrls: ['./list-lot.component.css']
})
export class ListLotComponent implements OnInit {
  busy: Subscription;
  lots: Array<Lot> = [];
  private selectedLot: Lot;
  private openLotIndex: number;

  constructor(private lotService : LotNEwService) { }

  ngOnInit() {
    this.getAllLots();

  }

  private getAllLots() {
    let baseContext  = this;
    this.busy = this.lotService.getAllLots().subscribe(response => {
      baseContext.lots = response as Array<Lot>;
      console.log(this.lots);
      Utils.initializeDataTables(20, 11, 'datatable1');
    }), error => {
      console.debug(error);
    };
  }

  openComposition(i) {
    if (i >= 0) {
      this.selectedLot = this.lots[i];
      this.openLotIndex = i;
    }
    Utils.initializeDataTables(20, 4, 'datatable2');

  }

  setFinnished(i,index){
    let baseContext = this;
    if(    this.lots[index].inputQtReele != true)
    this.lots[index].inputQtReele = true;
    else{
    if(this.lots[index].quantite_reele>0)
      this.busy = this.lotService.setFinnished(i).subscribe(response =>
      {
        baseContext.lots[index].etat=1;

        baseContext.lots[index].date_fabrication=new Date();
        this.lots[index].inputQtReele = false;

        },error=>{
        console.debug(error);
      })
  }

  }

}
