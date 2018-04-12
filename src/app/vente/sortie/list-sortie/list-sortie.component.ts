import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Sortie} from "../../../shared/new models/sortie";
import {SortieService} from "../../../shared/services/sortie.service";
import {Utils} from "../../../shared/utils";
import * as FileSaver from 'file-saver';

import {PdfService} from "../../../shared/services/pdf.service";

@Component({
  selector: 'app-list-sortie',
  templateUrl: './list-sortie.component.html',
  styleUrls: ['./list-sortie.component.css']
})
export class ListSortieComponent implements OnInit {
  busy: Subscription;
  sorties: Sortie[] = [];
  selectedSortie: Sortie = new Sortie();
  private openSortiesIndex: number;
  constructor(private sortieService  : SortieService, private pdfService:PdfService) { }

  ngOnInit() {
    this.getAllSorties();
  }

  private getAllSorties() {
    this.busy = this.sortieService.getSorties()
      .subscribe(
        (data) => {
          this.sorties = data;
          Utils.initializeDataTables(50, 4, 'dataTable');
        },
        (error) => {
          console.debug(error);
        }
      );

  }

  openListeProduits(i) {
    if (i >= 0) {
      this.selectedSortie = this.sorties[i];
      this.openSortiesIndex = i;
    }
    Utils.initializeDataTables(50, 2, 'dataTable2');

  }
  print(id:number){
    this.busy = this.sortieService.getBon(id)
      .subscribe(
        (data) => {
          FileSaver.saveAs(data, 'bonDeSortie' + id);
        }
      );
  }
}
