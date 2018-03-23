import { Component, OnInit } from '@angular/core';
import {ConsommationMP} from "../../shared/models/consommationMP";
import {ConsommationMPService} from "../../shared/services/consommationmp.service";
import {Utils} from "../../shared/utils";

@Component({
  selector: 'app-consommation-mp',
  templateUrl: './consommation-mp.component.html',
  styleUrls: ['./consommation-mp.component.css']
})
export class ConsommationMpComponent implements OnInit {
  consommations : Array<ConsommationMP>= [];

  constructor(private consommationMPService : ConsommationMPService) { }
  ngOnInit() {
    this.getAllCons();
  }
  getAllCons() {
    this.consommationMPService.getAll().subscribe(data=>{
      this.consommations=data;
      Utils.initializeDataTables(20,5,'stockMP');
    });
  }

}
