import {Component, OnInit} from '@angular/core';
import {Fournisseur} from '../../shared/new models/fournisseur';
import {FournisseurService} from '../../shared/services/Fournisseur.service';
import {CommandeAchat} from '../../shared/new models/commande_achat';
import {Produit_Base} from '../../shared/new models/produit_base';
import {ProduitBaseService} from '../../shared/services/produit-base.service';
import {Ligne_Commande_Achat} from '../../shared/new models/ligne_commande_achat';
import {CommandeAchatService} from '../../shared/services/commande-achat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Achat} from '../../shared/new models/achat';
import {Ligne_Achat} from '../../shared/new models/ligne_achat';
import {AchatService} from '../../shared/services/achat.service';
import {Subscription} from 'rxjs/Subscription';

declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-ajout-commande',
  templateUrl: './ajout-commande.component.html',
  styleUrls: ['./ajout-commande.component.css']
})
export class AjoutCommandeComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  commande: CommandeAchat = new CommandeAchat();
  achat: Achat = new Achat();
  fournisseur: Fournisseur = new Fournisseur();
  produits: Produit_Base[] = [];
  mode: string;
  montant: number;
  cmdId: string;
  achatId: string;
  busy: Subscription;
  remise:number=0;

  constructor(private fournisseurService: FournisseurService,
              private produitBaseService: ProduitBaseService,
              private commandeAchatService: CommandeAchatService,
              private route: ActivatedRoute,
              private router: Router,
              private achatService: AchatService) {
  }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');
    this.cmdId = this.route.snapshot.paramMap.get('id');
    this.achatId = this.route.snapshot.paramMap.get('achatId');
    if (this.mode != 'commande' && this.mode != 'achat') this.router.navigateByUrl('/').then();
    this.montant = 0;
    this.fournisseurService.getAll().subscribe(data => {
      this.fournisseurs = data;
      this.fournisseur = this.fournisseurs[0];
      if (this.cmdId == null)
        this.initializeSelectFournisseur();
    });
    this.busy = this.produitBaseService.getAll().subscribe(data => {
      this.produits = data;
      if (this.cmdId != null) {
        this.getCommandeAchatById(this.cmdId);
      } else if (this.achatId != null) {
        this.getAchatById(this.achatId);
      } else {
        this.initializeContentTable(data[0], 0);
        this.initializeSelectProduit(0, true);
      }
    });
  }

  ceil(float) {
    return float.toFixed(4);
  }

  initializeContentTable(produit: Produit_Base, index: number) {
    this.commande.lignes_commande_achat.push(new Ligne_Commande_Achat());
    this.commande.lignes_commande_achat[index].produit_base = produit;
    this.commande.lignes_commande_achat[index].produit_base_id = produit.produit_base_id;
    // this.commande.lignes_commande_achat[index].
  }

  private initializeAllSelectAchat() {
    for (let i = 0; i < this.commande.lignes_commande_achat.length; i++) {
      this.initializeSelectProduit(i, false);
    }
  }

  private initializeSelectFournisseur() {
    const baseContext = this;
    setTimeout(function () {
      const selectFournisseur = jQuery('#fournisseurSelect');
      selectFournisseur.select2();
      selectFournisseur.on('change', function () {
        baseContext.fournisseur = baseContext.fournisseurs[jQuery(this).val()];
      });
      if (baseContext.cmdId) {
        const indexFournisseur = baseContext.fournisseurs.map(
          function (x) {
            return x.fournisseur_id;
          }
        ).indexOf(baseContext.commande.fournisseur_id);
        selectFournisseur.val(indexFournisseur).trigger('change');
      }
      if (baseContext.achatId) {
        const indexFournisseur = baseContext.fournisseurs.map(
          function (x) {
            return x.fournisseur_id;
          }
        ).indexOf(baseContext.fournisseur.fournisseur_id);
        selectFournisseur.val(indexFournisseur).trigger('change');
      }
    }, 20);
  }

  private initializeSelectProduit(i: number, localMod?: boolean) {
    const baseContext = this;
    setTimeout(function () {
      const selectProduit = jQuery('#produitSelect' + i);
      selectProduit.select2();
      selectProduit.on('change', function () {
        baseContext.changeProductValue(i, +jQuery(this).val());
        baseContext.changeCoutLigne(i);
      });
      if (baseContext.cmdId != null && !localMod) {
        const indexProduct = baseContext.produits.map(
          function (x) {
            return x.produit_base_id;
          }
        ).indexOf(baseContext.commande.lignes_commande_achat[i].produit_base.produit_base_id);
        selectProduit.val(indexProduct).trigger('change');
      } else {
        if (baseContext.commande.lignes_commande_achat[i].produit_base)
          selectProduit.val(baseContext.commande.lignes_commande_achat[i].produit_base.position).trigger('change');
      }
    }, 20);
  }

  changeProductValue(index: number, position) {
    this.commande.lignes_commande_achat[index].produit_base = this.produits[position];
    this.commande.lignes_commande_achat[index].produit_base_id = this.produits[position].produit_base_id;
    this.commande.lignes_commande_achat[index].produit_base.position = position;
    this.onChangePrice();
  }

  confirmLigne(i: number) {
    this.commande.lignes_commande_achat[i].editMode = 0;
    if (i === this.commande.lignes_commande_achat.length - 1) {
      this.commande.lignes_commande_achat.push(new Ligne_Commande_Achat());
      this.commande.lignes_commande_achat[this.commande.lignes_commande_achat.length - 1].editMode = 1;
      this.initializeSelectProduit(i + 1, true);
    }
    this.onChangePrice();
  }

  onChangePrice() {
    this.montant = 0;
    let temp: number;
    for (let i = 0; i < this.commande.lignes_commande_achat.length - 1; i++) {
      temp = this.commande.lignes_commande_achat[i].cout;
      this.montant += temp;
    }
    if(this.remise) this.montant-=this.montant*this.remise/100;
  }

  isEmptyLignes() {
    let i;
    for (i = 0; i < this.commande.lignes_commande_achat.length - 1; i++) {
      if (this.commande.lignes_commande_achat[i].editMode !== 0) {
        return true;
      }
    }
    return i === 0;
  }

    submit() {


    if (this.isEmptyLignes()) {
      swal('Attention', 'Valider vos lignes', 'warning');
      return;
    }
    this.commande.lignes_commande_achat.pop();

    if (this.mode !== 'achat') {
      this.commande.fournisseur = this.fournisseur;
      this.commande.montant = this.montant;
      if (this.cmdId == null) {
        this.busy = this.commandeAchatService.add(this.commande)
          .subscribe(
            (data) => {
              swal('succés', 'La commande a été ajoutée', 'success');
              this.router.navigateByUrl('produit-base/commande/list');
            },
            (error) => {

            }
          );
      } else {
        this.busy = this.commandeAchatService.edit(parseInt(this.cmdId), this.commande)
          .subscribe(
            (data) => {
              swal('succés', 'La commande a été modifée avec succées', 'success');
              this.router.navigateByUrl('produit-base/commande/list');
            },
            (error) => {

            }
          );
      }
    } else {
      //this.achat.fournisseur = this.fournisseur;
      this.achat.montant = this.montant;
      this.remise? this.achat.remise=this.remise : this.achat.remise=0;
      if (this.cmdId)
        this.achat.commande_achat_id = parseInt(this.cmdId);
      this.convertToAchat();
      if (this.achatId) {
        this.busy = this.achatService.edit(this.achatId, this.achat)
          .subscribe(
            (data) => {
              swal('Succés', 'L\'achat à été modifiée avec succées', 'success');
              this.router.navigateByUrl('produit-base/achat/list');
            },
            (error) => {

            }
          );
      } else {
        this.achat.fournisseur = this.fournisseur;
        this.achat.n_lot = this.commande.n_lot;
        this.busy = this.achatService.add(this.achat)
          .subscribe(
            (data) => {
              if (this.cmdId) {
                swal('Succés', 'La commande à été convertie avec succèes', 'success');
              } else {
                swal('Succés', 'L\'achat à été effectuer avec succées', 'success');
              }
              this.router.navigateByUrl('produit-base/achat/list');
            },
            (error) => {

            }
          );
      }
    }
  }

  convertToAchat() {
    for (let i = 0; i < this.commande.lignes_commande_achat.length; i++) {
      let ligneAchat = new Ligne_Achat();
      ligneAchat.produit_base_id = this.commande.lignes_commande_achat[i].produit_base_id;
      ligneAchat.cout_unite = this.commande.lignes_commande_achat[i].cout_unite;
      ligneAchat.produit_base = this.commande.lignes_commande_achat[i].produit_base;
      ligneAchat.quantite = this.commande.lignes_commande_achat[i].quantite;
      ligneAchat.date_expiration = this.commande.lignes_commande_achat[i].date_expiration;
      ligneAchat.cout = this.commande.lignes_commande_achat[i].cout;
      this.achat.lignes_achat.push(ligneAchat);
    }
  }

  convertToCommande() {
    this.montant = this.achat.montant;
    this.fournisseur = this.achat.fournisseur;
    for (let i = 0; i < this.achat.lignes_achat.length; i++) {
      let ligneCommandeAchat = new Ligne_Commande_Achat();
      ligneCommandeAchat.produit_base_id = this.achat.lignes_achat[i].produit_base_id;
      ligneCommandeAchat.produit_base = this.achat.lignes_achat[i].produit_base;
      ligneCommandeAchat.quantite = this.achat.lignes_achat[i].quantite;
      ligneCommandeAchat.cout = this.achat.lignes_achat[i].cout;
      this.commande.lignes_commande_achat.push(ligneCommandeAchat);
    }
    this.achat = new Achat();
    this.achat.fournisseur = this.fournisseur;
  }

  deleteLigne(index: number) {
    this.commande.lignes_commande_achat.pop();
    this.commande.lignes_commande_achat.splice(index, 1);
    this.initializeContentTable(this.produits[0], this.commande.lignes_commande_achat.length);
    this.initializeSelectProduit(this.commande.lignes_commande_achat.length - 1);
    this.onChangePrice();
  }

  private confirmAllLigne(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.commande.lignes_commande_achat.length - 1);
    this.commande.lignes_commande_achat[index].editMode = 2;
    this.initializeSelectProduit(index, true);
  }

  private initCommandeUI() {
    this.montant = this.commande.montant;
    this.fournisseur = this.commande.fournisseur;
    this.initializeSelectFournisseur();
    this.initializeAllSelectAchat();
    this.initializeContentTable(this.produits[0], this.commande.lignes_commande_achat.length);
    this.initializeSelectProduit(this.commande.lignes_commande_achat.length - 1, true);
    this.confirmAllLigne(this.commande.lignes_commande_achat.length - 1);
  }

  private getCommandeAchatById(cmdId: string) {
    // if(this.mode=='achat')
    this.busy = this.commandeAchatService.get(cmdId).subscribe(data => {
      this.commande = data;
      this.initCommandeUI();
    });
  }

  private getAchatById(achatId: string) {
    this.busy = this.achatService.getById(achatId)
      .subscribe(
        (data: Achat) => {
          this.achat = data;
          this.convertToCommande();
          this.initCommandeUI();
          this.remise=data.remise;

        }
      );
  }

  changeCoutLigne(i:number){
    let total = 0;
    if (!this.commande.lignes_commande_achat[i].quantite || !this.commande.lignes_commande_achat[i].cout_unite){
      this.commande.lignes_commande_achat[i].cout=0;
    }else{
      total = this.commande.lignes_commande_achat[i].quantite * this.commande.lignes_commande_achat[i].cout_unite;
      for (let j = 0; j < this.commande.lignes_commande_achat[i].produit_base.taxes.length; j++) {
        total = total + ((total * this.commande.lignes_commande_achat[i].produit_base.taxes[j].pourcentage) / 100);
      }
      this.commande.lignes_commande_achat[i].cout = parseFloat(total.toFixed(2));
    }

  }
}
