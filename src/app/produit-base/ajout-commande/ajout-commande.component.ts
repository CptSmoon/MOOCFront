import {Component, OnInit} from '@angular/core';
import {Fournisseur} from "../../shared/new models/fournisseur";
import {FournisseurService} from "../../shared/services/Fournisseur.service";
import {CommandeAchat} from "../../shared/new models/commande_achat";
import {Produit_Base} from "../../shared/new models/produit_base";
import {ProduitBaseService} from "../../shared/services/produit-base.service";
import {Ligne_Commande_Achat} from "../../shared/new models/ligne_commande_achat";
import {CommandeAchatService} from "../../shared/services/commande-achat.service";

declare var jQuery: any;

@Component({
  selector: 'app-ajout-commande',
  templateUrl: './ajout-commande.component.html',
  styleUrls: ['./ajout-commande.component.css']
})
export class AjoutCommandeComponent implements OnInit {
  fournisseurs: Array<Fournisseur>;
  commande: CommandeAchat;
  produits:Array<Produit_Base>;

  constructor(private fournisseurService: FournisseurService,
              private produitBaseService:ProduitBaseService,
              private commandeAchatService:CommandeAchatService) {
  }

  ngOnInit() {
    this.commande = new CommandeAchat();
    this.commande.montant=0;
    this.commande.lignes_commande_achat=new Array(new Ligne_Commande_Achat());
    this.fournisseurService.getAll().subscribe(data => {
      this.fournisseurs = data;
      this.commande.fournisseur=this.fournisseurs[0];
      this.initializeSelectFournisseur();
    });
    this.produitBaseService.getAll().subscribe(data=>{
      this.produits=data;
      this.initializeSelectProduit(0);
    });
  }


  private initializeSelectFournisseur() {
    const baseContext = this;
    setTimeout(function () {
      const selectFournisseur = jQuery('#fournisseurSelect');
      selectFournisseur.select2();
      selectFournisseur.on('change', function () {
        baseContext.commande.fournisseur = baseContext.fournisseurs[jQuery(this).val()];
      });
    }, 20);
  }
  private initializeSelectProduit(i:number) {
    const baseContext = this;
    this.commande.lignes_commande_achat[i].produit_base=this.produits[0];
    setTimeout(function () {
      const selectProduit = jQuery('#produitSelect'+i);
      selectProduit.select2();
      selectProduit.on('change', function () {
        baseContext.commande.lignes_commande_achat[i].produit_base = baseContext.produits[jQuery(this).val()];
      });
    }, 20);
  }

  confirmLigne(i:number){
    this.commande.lignes_commande_achat[i].editMode=0;
    if (i==this.commande.lignes_commande_achat.length-1){
      this.commande.lignes_commande_achat.push(new Ligne_Commande_Achat());
      this.initializeSelectProduit(i+1);
    }
    this.commande.montant+=this.commande.lignes_commande_achat[i].cout;
  }

  submitCommande(){
    this.commande.lignes_commande_achat.splice(this.commande.lignes_commande_achat.length-1,1);
    this.commandeAchatService.add(this.commande).subscribe();
  }

  deleteLigne(i:number){
    this.commande.lignes_commande_achat.splice(i,1);
  }

  private confirmAllLigne(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.commande.lignes_commande_achat.length - 1);
    this.commande.lignes_commande_achat[index].editMode = 2;
    this.initializeSelectProduit(index);
  }
}
