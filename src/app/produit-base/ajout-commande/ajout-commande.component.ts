import {Component, OnInit} from '@angular/core';
import {Fournisseur} from "../../shared/new models/fournisseur";
import {FournisseurService} from "../../shared/services/Fournisseur.service";
import {CommandeAchat} from "../../shared/new models/commande_achat";
import {Produit_Base} from "../../shared/new models/produit_base";
import {ProduitBaseService} from "../../shared/services/produit-base.service";
import {Ligne_Commande_Achat} from "../../shared/new models/ligne_commande_achat";
import {CommandeAchatService} from "../../shared/services/commande-achat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Config} from "../../shared/config";
import {Achat} from "../../shared/new models/achat";
import {Ligne_Achat} from "../../shared/new models/ligne_achat";
import {AchatService} from "../../shared/services/achat.service";

declare var jQuery: any;

@Component({
  selector: 'app-ajout-commande',
  templateUrl: './ajout-commande.component.html',
  styleUrls: ['./ajout-commande.component.css']
})
export class AjoutCommandeComponent implements OnInit {
  fournisseurs: Array<Fournisseur>;
  commande: CommandeAchat;
  achat:Achat;
  fournisseur:Fournisseur;
  lignes:Array<Object>;
  produits:Array<Produit_Base>;
  mode:string;
  montant:number;
  cmdId:string;

  constructor(private fournisseurService: FournisseurService,
              private produitBaseService:ProduitBaseService,
              private commandeAchatService:CommandeAchatService,
              private route: ActivatedRoute,
              private router:Router,
              private achatService:AchatService) {
  }

  ngOnInit() {
    this.mode=this.route.snapshot.paramMap.get('mode');
    this.cmdId=this.route.snapshot.paramMap.get('id');
    if (this.mode!='commande'&&this.mode!='achat')this.router.navigateByUrl('/').then();
    this.montant=0;
    if(this.mode=='commande'){
      this.lignes=new Array<Ligne_Commande_Achat>(new Ligne_Commande_Achat());
      this.commande=new CommandeAchat();
    }else if(this.mode=='achat'){
      this.lignes=new Array<Ligne_Achat>(new Ligne_Achat());
      this.achat=new Achat();
      if(this.cmdId!=null){
        this.commandeAchatService.get(this.cmdId).subscribe(data=>{
          this.commande=data;
        });
      }
    }
    this.fournisseurService.getAll().subscribe(data => {
      this.fournisseurs = data;
      this.fournisseur=this.fournisseurs[0];
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

      let k:number;
      if (baseContext.mode=='achat'&&baseContext.cmdId!=null){
        for (k=0;k<baseContext.fournisseurs.length;k++)
          if(baseContext.fournisseurs[k].fournisseur_id==baseContext.commande.fournisseur_id) break;
        selectFournisseur.select2('val',k);
        console.log(jQuery(this).val());
      }else {
        selectFournisseur.select2();
      }
      selectFournisseur.on('change', function () {
        baseContext.fournisseur = baseContext.fournisseurs[jQuery(this).val()];
      });
    }, 20);
  }
  private initializeSelectProduit(i:number) {
    const baseContext = this;
    if(this.mode=='achat') (<Ligne_Achat>this.lignes[i]).produit_base=this.produits[0];
    if(this.mode=='commande') (<Ligne_Commande_Achat>this.lignes[i]).produit_base=this.produits[0];
    setTimeout(function () {
      const selectProduit = jQuery('#produitSelect'+i);
      selectProduit.select2();
      selectProduit.on('change', function () {
        if (baseContext.mode=='achat') (<Ligne_Achat>baseContext.lignes[i]).produit_base = baseContext.produits[jQuery(this).val()];
        if (baseContext.mode=='commande') (<Ligne_Commande_Achat>baseContext.lignes[i]).produit_base = baseContext.produits[jQuery(this).val()];
      });
    }, 20);
  }

  confirmLigne(i:number){
    if(this.mode=='achat')(<Ligne_Achat>this.lignes[i]).editMode=0;
    if(this.mode=='commande')(<Ligne_Commande_Achat>this.lignes[i]).editMode=0;
    if (i==this.lignes.length-1){
      this.lignes.push(this.mode=='achat'? new Ligne_Achat():new Ligne_Commande_Achat());
      this.initializeSelectProduit(i+1);
    }
    this.montant+=this.mode=='achat'?(<Ligne_Achat>this.lignes[i]).cout:(<Ligne_Commande_Achat>this.lignes[i]).cout;
  }

  submit(){
    this.lignes.splice(this.lignes.length-1,1);
    if (this.mode=='commande'){
      this.commande=new CommandeAchat();
      this.commande.fournisseur=this.fournisseur;
      this.commande.montant=this.montant;
      this.commande.etat=false;
      this.commande.lignes_commande_achat=<Array<Ligne_Commande_Achat>>this.lignes;
      this.commandeAchatService.add(this.commande).subscribe();
    }if (this.mode=='achat'){
      this.achat=new Achat();
      this.achat.fournisseur=this.fournisseur;
      this.achat.montant=this.montant;
      this.achat.lignes_achat=<Array<Ligne_Achat>>this.lignes;
      console.log(this.achat);
      this.achatService.add(this.achat).subscribe();
    }
  }

  deleteLigne(i:number){
    this.lignes.splice(i,1);
  }

  private confirmAllLigne(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.lignes.length - 1);
    if(this.mode=='achat')(<Ligne_Achat>this.lignes[index]).editMode = 2;
    if(this.mode=='commande')(<Ligne_Commande_Achat>this.lignes[index]).editMode = 2;
    this.initializeSelectProduit(index);
  }
}
