import {Component, OnInit} from '@angular/core';
import {MatierePremiere} from "../../shared/models/matiere-premiere";
import {MPService} from "../../shared/services/mp.service";
import {UniteService} from "../../shared/services/unite.service";
import {Unite} from "../../shared/models/unite";
import {AchatMPService} from "../../shared/services/achatmp.service";
import {AchatMP} from "../../shared/models/achatMP";
import {Fournisseur} from "../../shared/models/fournisseur";
import {FournisseurService} from "../../shared/services/Fournisseur.service";
import {Client} from "../../shared/models/client";
import {ClientService} from "../../shared/services/client.service";
import {Livraison} from "../../shared/models/livraison";
import {LivraisonProduit} from "../../shared/models/livraison-produit";
import {Produit} from "../../shared/models/produit";
import {ProduitService} from "../../shared/services/produit.service";
import {LivraisonService} from "../../shared/services/livraison.service";
import {Facture} from "../../shared/models/facture";
import {FactureService} from "../../shared/services/facture.service";
import {forEach} from "@angular/router/src/utils/collection";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {
  clients: Array<Client>;
  livraisons: Array<Livraison>;
  facture: Facture;

  constructor(private clientSevice: ClientService, private factureService:FactureService) {
  }

  ngOnInit() {
    this.facture = new Facture();
    this.facture.livraisons = new Array<Livraison>(undefined);
    this.clientSevice.getClients().subscribe(data => {
      this.clients = data;
      this.facture.client = this.clients[0];
      let i;
      for(let client of this.clients){
        i=0;
        for (let l of client.livraisons){
          if (l.facture_id) client.livraisons.splice(i,1);
          else i++;
        }
      }
    });
  }

  validData(): boolean {
    let b: boolean;
    console.log(this.facture.client.livraisons);
    b = this.facture.client != undefined && this.validLivData();
    return b;
  }

  validLivData(): boolean {
    let b: boolean;
    b = true;
    let i, j: number;
    for (let ll of this.facture.livraisons) b = b && (ll != undefined);
    if (this.facture.livraisons.length > 1)
      for (i = 0; i < this.facture.livraisons.length - 1; i++) {
        for (j = i + 1; j < this.facture.livraisons.length; j++)
          b = b && this.facture.livraisons[j]&&(this.facture.livraisons[i] != this.facture.livraisons[j]);
      }
    return b;
  }

  addLiv() {
    this.facture.livraisons.push(undefined);
  }

  removeCol(i:number){
    this.facture.livraisons.splice(i,1);
  }

  add(){
    this.factureService.add(this.facture).subscribe(data=>{
      swal({
        title: "Succès",
        text: "La facture a été enregistrée",
        confirmButtonColor: "#66BB6A",
        type:"success"
      }).then(result=>window.location.href = '#/facture');
    });
  }


}
