import { Component, OnInit } from '@angular/core';
import {Produit} from "../../../shared/new models/produit";
import {Utils} from "../../../shared/utils";
import {Depense} from "../../../shared/new models/depense";
import {DepenseService} from "../../../shared/services/depense.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Produit_Base} from "../../../shared/new models/produit_base";
import {Produit_Produit_Base} from "../../../shared/new models/produit_produit_base";
declare var jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-depense',
  templateUrl: './list-depense.component.html',
  styleUrls: ['./list-depense.component.css']
})
export class ListDepenseComponent implements OnInit {

  busy: Subscription;
  depenses : Depense[] = [];
  constructor(
    private router: Router,
    private depenseService : DepenseService) { }

  ngOnInit() {
    this.getAllDepenses();
  }

  private getAllDepenses() {
    let baseContext = this;
    this.busy = this.depenseService.getAll().subscribe(response => {
      baseContext.depenses = response as Array<Depense>;
      console.log(baseContext.depenses);
      Utils.initializeDataTables(20, 6, 'dataTable');

      }, error => {
      console.debug(error);
    });
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.depenses.length - 1);
    this.depenses[index].editMode = 1;
  }

  private confirmAllLigne(number: number) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }
  confirmLigne(index: number) {
    let dep = this.depenses[index];
    let baseContext =this;
    if (!dep.titre || !dep.montant ||
      !dep.remise || !dep.tva) {
      return;
    }
    if (dep.editMode == 1) {
      dep.editMode = 0;
      this.busy = this.depenseService.edit(dep.depense_id,dep)
        .subscribe(response => {
          this.depenses[index]=response;
        }, error => {
          console.debug(error);
        });
    } else {
      dep.editMode = 0;
    }
  }
  addLigne(){
    if(this.depenses[this.depenses.length-1].editMode!=2){
  this.depenses.push(new Depense());
  this.depenses[this.depenses.length-1].editMode=2;
    }
  }


  confirmAddLigne(i) {
    let dep = this.depenses[i];
    let baseContext =this;
    if (!dep.titre || !dep.montant ||
      !dep.remise || !dep.tva) {
      return;

    }    this.busy = this.depenseService.add(this.depenses[this.depenses.length-1]).subscribe(
      response=>
      {this.depenses[this.depenses.length-1]=response;}
    ,error =>{
      console.debug(error);
    });
  }
  deleteLigne(i){
    if(this.depenses[i].editMode==2){
      this.depenses.splice(i,1);
      Utils.initializeDataTables(20, 6, 'dataTable');
    return;}

      let baseContext = this;
    swal({
      title: 'Attention !',
      text: 'Êtes-vous sûrs de vouloir supprimer cette dépense définitivement ? ',
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
        this.busy = this.depenseService.delete(baseContext.depenses[i].depense_id).subscribe(response=>
          {
            baseContext.depenses.splice(i,1);
            Utils.initializeDataTables(20, 6, 'dataTable');
          },error=>
          {
            console.debug(error);
          }
        );
      }
    });  }
}
