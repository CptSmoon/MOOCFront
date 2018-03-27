import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {EmballageService} from "../../../shared/services/emballage.service";
import {Emballage} from "../../../shared/models/emballage";
import {Utils} from "../../../shared/utils";
declare var jQuery;
declare let swal: any;

@Component({
  selector: 'app-lister-emballages',
  templateUrl: './lister-emballages.component.html',
  styleUrls: ['./lister-emballages.component.css']
})
export class ListerEmballagesComponent implements OnInit {

  emballages : Emballage[]= [];
  busy : Subscription;
  constructor(private emballageService : EmballageService,private router: Router) { }

  ngOnInit() {
    this.getAllEmballages();
  }

  private getAllEmballages() {
    this.busy = this.emballageService.getEmballages().subscribe(response => {
      this.emballages = response ;

      Utils.initializeDataTables(20, 4, "dataTable");


    }), error => {
      console.debug(error);
    };



  }

  confirmLigne(index: number) {
    let emb = this.emballages[index];
    if (!emb.label || !emb.reference||
      !emb.cout  ) {
      return;
    }
    if (emb.editMode == 1) {
      this.busy = this.emballageService.editEmballage(emb)
        .subscribe(response => { emb = response;
        }), error => {
        console.debug(error);
      };
      emb.editMode = 0;

    } else {
      emb.editMode = 0;
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.emballages.length - 1);
    this.emballages[index].editMode = 1;
    this.initializeSelectProduct(index);
  }
  //
  // deleteLigne(index: number) {
  //   this.emballages.pop();
  //   this.emballages.splice(index, 1);
  //   this.initializeContentTable(this.emballages[0], this.emballages.length);
  //   this.initializeSelectProduct(this.emballages.length - 1);
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
      selectProduct.val(baseContext.emballages[index].position).trigger('change');
    }, 20);
  }

  private changeProductValue(indexLignesortie: number, indexProduct) {
    this.emballages[indexLignesortie] = this.emballages[indexProduct];
    this.emballages[indexLignesortie].emballage_id = this.emballages[indexProduct].emballage_id;
    this.emballages[indexLignesortie].position = indexProduct;
  }

}
