import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../shared/services/produit.service';
import {Router} from '@angular/router';
import {Produit} from '../../../shared/models/produit';
import {Subscription} from 'rxjs/Subscription';
import {Emballage} from '../../../shared/models/emballage';
import {Utils} from '../../../shared/utils';
import {EmballageService} from '../../../shared/services/emballage.service';
import {RecipientService} from '../../../shared/services/recipient.service';
import {Recipient} from '../../../shared/models/recipient';
import {Formule, Formule_Matiere_Premiere} from '../../../shared/models/formule';
import {MatierePremiere} from '../../../shared/models/matiere-premiere';
import {MPService} from '../../../shared/services/mp.service';
import {UniteService} from '../../../shared/services/unite.service';
import {Unite} from '../../../shared/models/unite';
import {FormuleService} from '../../../shared/services/formule.service';
import {Ligne_Sortie} from "../../../shared/models/sortie";
declare let jQuery: any;

@Component({
  selector: 'app-lister-produits',
  templateUrl: './lister-produits.component.html',
  styleUrls: ['./lister-produits.component.css']
})

export class ListerProduitsComponent implements OnInit {
  busy: Subscription;
  produits: Produit[] = [];
  formule: Formule = new Formule();
  private selectedProduit: Produit = new Produit();
  private openProduitIndex: number;
  mps: MatierePremiere[] = [];
  f_mps: Formule_Matiere_Premiere[] = [];
  unites: Unite[];
  selectedformule: Formule = new Formule();
  selectedFormuleIndex: number = -1;
  modif: boolean = false;
  emballages : Emballage[];
  recipients : Recipient[];
  private selectedRecipient: Recipient;
  private selectedEmballage: Emballage;
  constructor(private uniteService: UniteService,
              private mpService: MPService,
              private formuleService: FormuleService,
              private emballageService: EmballageService,
              private recipientService: RecipientService,
              private router: Router, private produitService: ProduitService) {
  }

  ngOnInit() {
    this.getAllEmballages();
    this.getAllRecipients();
    this.getAllProduits();
    this.getAllMatieresPremieres();
    this.getAllUnits();
    this.formule.formules_matieres_premieres = [];
  }
  private getAllEmballages() {
    let baseContext = this;
    this.busy = this.emballageService.getEmballages().subscribe(response => {
      baseContext.emballages = response;
    }), error => {
      console.debug(error);
    };
  }

  private getAllRecipients() {
    let baseContext = this;

    this.busy = this.recipientService.getRecipients().subscribe(response => {
      baseContext.recipients = response;
    }), error => {
      console.debug(error);

    };
  }
  private getAllProduits() {
    this.busy = this.produitService.getProduits().subscribe(response => {
      this.produits = response as Array<Produit>;
      Utils.initializeDataTables(20, 10, 'dataTable');
    }), error => {
      console.debug(error);
    };
  }


  openAddFormule(i) {
    if (i >= 0) {
      this.selectedProduit = this.produits[i];
      this.openProduitIndex = i;
    }
    this.formule = new Formule();
    this.formule.formules_matieres_premieres = [];
    this.formule.produit_id = this.selectedProduit.produit_id;
    console.log(this.mps);
  }

  private getAllMatieresPremieres() {
    console.log(new Date());
    this.mpService.getMP().subscribe(data => {
      this.mps = new Array<MatierePremiere>(0);
      this.mps = data;
    });
  }

  public getAllUnits() {
    this.uniteService.getAllUnits().subscribe(data => this.unites = data);
  }

  addProd() {

    let canAdd: boolean;
    canAdd = true;
    let fmp: Formule_Matiere_Premiere;
    const base = this;
    setTimeout(function () {
      for (let j = 0; j < base.formule.formules_matieres_premieres.length; j++) {
        fmp = base.formule.formules_matieres_premieres[j];
        if (!fmp.quantite) {
          canAdd = false;
          break;
        }
        if (!fmp.unite_id) {
          canAdd = false;
          break;
        }
        if (!fmp.matiere_premiere_id) {
          canAdd = false;
          break;
        }
      }
      console.log(canAdd);
      console.log(base.formule.formules_matieres_premieres);
      if (canAdd) base.formule.formules_matieres_premieres.push(new Formule_Matiere_Premiere());
    });
  }

  addProEdit() {

    let canAdd: boolean;
    canAdd = true;
    let fmp: Formule_Matiere_Premiere;
    const base = this;

    setTimeout(function () {
        for (let j = 0; j < base.selectedProduit.formules[base.selectedFormuleIndex].formules_matieres_premieres.length; j++) {
          fmp = base.selectedProduit.formules[base.selectedFormuleIndex].formules_matieres_premieres[j];
          if (!fmp.quantite) {
            canAdd = false;
            break;
          }
          if (!fmp.unite_id) {
            canAdd = false;
            break;
          }
          if (!fmp.matiere_premiere_id) {
            canAdd = false;
            break;
          }
        }
        console.log(canAdd);
        console.log(base.selectedProduit.formules[base.selectedFormuleIndex].formules_matieres_premieres);
        if (canAdd) base.selectedProduit.formules[base.selectedFormuleIndex].formules_matieres_premieres.push(new Formule_Matiere_Premiere());
      }
    );
  }

  addFormule() {
    console.log('ddd');
    console.log(this.formule);
    console.log('ddd23');
    this.formuleService.addFormule(this.formule).subscribe(data => {
    });
  }

  openListeFormules(i) {
    if (i >= 0) {
      this.selectedProduit = this.produits[i];
      this.openProduitIndex = i;
    }
    console.log(this.selectedProduit);
  }


  modifFormule() {
    this.formuleService.editFormule(this.selectedProduit.formules[this.selectedFormuleIndex]).subscribe(data => {
    });
    console.log(this.selectedProduit.formules[this.selectedFormuleIndex]);
  }






  // getAllProduits() {
  //   this.produitService.getProduits()
  //     .subscribe(
  //       (data) => {
  //         if (data.length !== 0) {
  //           this.initializeContentTable(data[0], 0);
  //         }
  //         this.produits = data;
  //         this.initializeSelectProduct(0);
  //       },
  //       (error) => {
  //
  //       }
  //     );
  // }
  //
    confirmLigne(index: number) {
      let pro = this.produits[index];

      if (!pro.label || !pro.reference||
        !pro.codeABarre || !pro.prix||
        !pro.recipient_id || !pro.emballage_id) {
        return;
      }
      if (pro.editMode == 1) {
        pro.emballage = this.selectedEmballage;
        pro.emballage_id =pro.emballage.emballage_id;
        pro.recipient = this.selectedRecipient;
        pro.recipient_id = pro.recipient.recipient_id;
        console.log(pro);

        pro.editMode = 0;
        this.busy = this.produitService.editProduit(pro)
          .subscribe(response => {}), error => {
          console.debug(error);
        };
      } else {
        pro.editMode = 0;
      }
    }

    editLigne(index: number) {
      this.confirmAllLigne(this.produits.length - 1);
      this.selectedRecipient=this.produits[index].recipient;
      this.selectedEmballage= this.produits[index].emballage ;
      this.produits[index].editMode = 1;
      this.initializeSelectProduct(index);
    }
  //
  // deleteLigne(index: number) {
  //   this.produits.pop();
  //   this.produits.splice(index, 1);
  //   this.initializeContentTable(this.produits[0], this.produits.length);
  //   this.initializeSelectProduct(this.produits.length - 1);
  // }


  private confirmAllLigne(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }


    private initializeSelectProduct(index) {
      const baseContext = this;
      setTimeout(function () {
        const selectProduct = jQuery('.select-product-' + index);
        selectProduct.select2();
        selectProduct.on('change', function () {
          baseContext.changeProductValue(index, +jQuery(this).val());
        });
        selectProduct.val(baseContext.produits[index].position).trigger('change');
      }, 20);
    }

    private changeProductValue(indexLignesortie: number, indexProduct) {
      this.produits[indexLignesortie] = this.produits[indexProduct];
      this.produits[indexLignesortie].produit_id = this.produits[indexProduct].produit_id;
      this.produits[indexLignesortie].position = indexProduct;
    }

  onChangeEmb(event) {
    this.selectedEmballage = this.emballages[event.target.value];

  }

  onChangeRec(event) {
    this.selectedRecipient = this.recipients[event.target.value];

  }
}
