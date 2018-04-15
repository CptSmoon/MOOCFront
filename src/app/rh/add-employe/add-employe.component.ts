import { Component, OnInit } from '@angular/core';
import {Employe} from "../../shared/new models/employe";
import {Fonction} from "../../shared/new models/fonction";
import {Contrat} from "../../shared/new models/contrat";
import {Subscription} from "rxjs/Subscription";
import {ContratService} from "../../shared/services/contrat.service";
import {FonctionService} from "../../shared/services/fonction.service";
import {EmployeService} from "../../shared/services/employe.service";
import {ActivatedRoute, Router} from "@angular/router";

declare var jQuery: any;
declare var swal: any;


@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {
  e : Employe = new Employe();
  fonctions : Fonction[] = [];
  contrats : Contrat[] = [];
  busy: Subscription;
  private isEditAction: boolean;
  constructor(
              private employeService : EmployeService,
              private contratService : ContratService,
              private fonctionService : FonctionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.isEditAction = this.router.url.indexOf('edit') !== -1;

  }

  ngOnInit() {
    this.getAllFonctions();
    this.getAllcontrats();
    if(this.isEditAction){
      this.getEmploye();
    }
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

  addEmploye() {
    this.e.contrat_id = jQuery('.contratSelect').select2('val');
    this.e.fonction_id = jQuery('.fonctionSelect').select2('val');
    console.log(this.e.date_naissance);
    console.log(this.e);
    if(this.isEditAction==false){
    this.busy = this.employeService.add(this.e).subscribe(response=>
    {
      swal({
        title: 'Ajouté !',
        text: 'Un nouveau employé est ajouté.',
        confirmButtonColor: '#66BB6A',
        type: 'success'
      }).then((isConfirm) => {
        this.router.navigate(['/rh/list']);
      });
    },error=>{
    console.debug(error);
    });}
    else{
    this.busy = this.employeService.edit(this.e).subscribe(response=>
    {
      swal({
        title: 'Modifié !',
        text: "L'employé est modifié. ",
        confirmButtonColor: '#66BB6A',
        type: 'success'
      }).then((isConfirm) => {
        this.router.navigate(['/rh/list']);
      });
    },error=>{
      console.debug(error);
    });
    }
  }

  private getEmploye() {
    let baseContext = this;

    this.activatedRoute.params.subscribe(
      params => {
      baseContext.e.employe_id = +params["id"];
    this.busy = this.employeService.getById(+params["id"]).subscribe(response=>
    {
      baseContext.e = response;
      const selectProduct = jQuery('.fonctionSelect');
      const selectProduct2 = jQuery('.contratSelect');
//TODO Selects bugs
      // const indexFonction = baseContext.fonctions.map(
      //   function (x) {
      //     return x.fonction_id;
      //   }
      // ).indexOf(baseContext.e.fonction.fonction_id);
      selectProduct.val(baseContext.e.fonction.fonction_id)
        .trigger('change');

      selectProduct2.val(baseContext.e.contrat.contrat_id)
        .trigger('change');


    },error=>{
      console.debug(error);
    });
  })
  }
}
