import {Component, OnInit} from '@angular/core';
import {MatierePremiere} from "../../shared/models/matiere-premiere";
import {MPService} from "../../shared/services/mp.service";
import {UniteService} from "../../shared/services/unite.service";
import {Unite} from "../../shared/models/unite";
import {LivraisonService} from "../../shared/services/livraison.service";
import {Livraison} from "../../shared/models/livraison";
import {PdfService} from "../../shared/services/pdf.service";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-livraison',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {
  livraisons:Array<Livraison>;
  selectedLivraison:Livraison;
  constructor(private livraisonService:LivraisonService, private pdfService:PdfService) {}
  ngOnInit() {
    this.getLivraisons();
  }

  public getLivraisons(){
    this.livraisonService.getAll().subscribe(data=>this.livraisons=data);
  }


  selectLivrison(i:number) {
    this.selectedLivraison=this.livraisons[i];
    console.log(this.selectedLivraison);
  }

  bon(i:number){
    this.pdfService.livraison(this.livraisons[i].livraison_id);
  }
}
