import { Component, OnInit } from '@angular/core';
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
declare let jQuery: any;
declare let swal:any;
@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.css']
})
export class AddLivraisonComponent implements OnInit {
  clients:Array<Client>;
  livraison:Livraison;
  produits:Array<Produit>;
  constructor(private clientSevice:ClientService, private produitService: ProduitService, private livraisonService:LivraisonService) { }
  ngOnInit() {
    this.livraison=new Livraison();
    this.livraison.produits=new Array<LivraisonProduit>(new LivraisonProduit());
    this.produitService.getProduits().subscribe(data=>{
      this.produits=data;
      this.livraison.produits[0].produit=this.produits[0];
    });
    this.clientSevice.getClients().subscribe(data=>{
      this.clients=data;
      this.livraison.client=this.clients[0];
    });
  }

  public addProduct(){
    let l:LivraisonProduit;
    l=new LivraisonProduit();
    this.livraison.produits.push(l);
    this.livraison.produits[this.livraison.produits.length-1].produit=this.produits[0];
  }

  validData():boolean{
    let b:boolean;
    b=this.livraison.client!=undefined&&this.livraison.date!=undefined&&this.livraison.montant>0&&this.livraison.montant!=undefined;
    for (let p of this.livraison.produits){
      b=b&&p.produit!=undefined&&p.quantite!=undefined&&p.quantite>0;
    }
    return b;
  }

  validProdData():boolean{
    let b:boolean;
    b=true;
    for (let p of this.livraison.produits){
      b=b&&p.produit!=undefined&&p.quantite!=undefined&&p.quantite>0;
    }
    return b;
  }

  add(){
    this.livraisonService.add(this.livraison).subscribe(data=>{
      swal({
        title: "Succès",
        text: "La livraison a été enregistrée",
        confirmButtonColor: "#66BB6A",
        type:"success"
      }).then(result=>window.location.href = '#/livraison');
    });
  }

  removeCol(i:number){
    this.livraison.produits.splice(i,1);
  }


}
