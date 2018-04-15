import { Component, OnInit } from '@angular/core';
import {Contrat} from "../../shared/new models/contrat";
import {FonctionService} from "../../shared/services/fonction.service";
import {ContratService} from "../../shared/services/contrat.service";
import {Subscription} from "rxjs/Subscription";
import {Fonction} from "../../shared/new models/fonction";
import {Employe} from "../../shared/new models/employe";
import {EmployeService} from "../../shared/services/employe.service";
import {Utils} from "../../shared/utils";

declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent implements OnInit {

  employes : Employe[] = [];
  fonctions : Fonction[] = [];
  contrats : Contrat[] = [];
  busy: Subscription;
  constructor(
    private employeService : EmployeService,
    private contratService : ContratService,
    private fonctionService : FonctionService) { }

  ngOnInit() {
    this.getAllEmployes();
    this.getAllFonctions();
    this.getAllcontrats();

  }

  private getAllFonctions() {
    let baseContext = this;

    this.busy = this.fonctionService.getAllFonctions().subscribe(response => {
      baseContext.fonctions = response;
      const selectProduct = jQuery('.fonctionSelect');
      selectProduct.select2();

    }, error => {
      console.debug(error);
    });
  }

  private getAllcontrats() {
    let baseContext = this;

    this.busy = this.contratService.getAllContrats().subscribe(response => {
      baseContext.contrats = response;
      const selectProduct = jQuery('.contratSelect');
      selectProduct.select2();

    }, error => {
      console.debug(error);
    });
  }

  private getAllEmployes() {
  this.busy = this.employeService.getAll().subscribe(response=>{
      console.log(this.employes = response, this.employes);
      Utils.initializeDataTables(20, 10, 'dataTable');
    }
  ,error=>{})
  }

  deleteEmploye(i) {
    let baseContext = this;
    swal({
      title: 'Attention !',
      text: 'Êtes-vous sûrs de vouloir supprimer cette commande définitivement ? ',
      icon: 'warning',
      dangerMode: true,
      buttons: {
        cancel: {
          text: 'Non annuler',
          value: null,
          visible: true
        },
        confirm: {
          text: 'Oui Supprimer',
          vaule: true,
          visible: true
        }
      }}).then((willDelete) => {
      if (willDelete) {
        this.busy = this.employeService.delete(baseContext.employes[i].employe_id).subscribe(response=>
        {
          baseContext.employes.splice(i,1);

          Utils.initializeDataTables(20, 10, 'dataTable');

        },error=>
        {
          console.debug(error);
        }
        );
      }
        });
      }

}
