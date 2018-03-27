import {Component, OnInit} from '@angular/core';
import {MatierePremiere} from "../../shared/models/matiere-premiere";
import {MPService} from "../../shared/services/mp.service";
import {UniteService} from "../../shared/services/unite.service";
import {Unite} from "../../shared/models/unite";
import {LivraisonService} from "../../shared/services/livraison.service";
import {Livraison} from "../../shared/models/livraison";
import {PdfService} from "../../shared/services/pdf.service";
import {FactureService} from "../../shared/services/facture.service";
import {Facture} from "../../shared/models/facture";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-livraison',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {
  factures:Array<Facture>;
  selectedFacture:Facture;
  constructor(private factureService:FactureService, private pdfService:PdfService) {}
  ngOnInit() {
    this.getFactures();
  }

  public getFactures(){
    this.factureService.getAll().subscribe(data=>this.factures=data);
  }


  selectFacture(i:number) {
    this.selectedFacture=this.factures[i];
  }

  bon(i:number){
    this.pdfService.facture(this.factures[i].facture_id);
  }
}
