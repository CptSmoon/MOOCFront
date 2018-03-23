import {Component, OnInit} from '@angular/core';
import {MatierePremiere} from "../../shared/models/matiere-premiere";
import {MPService} from "../../shared/services/mp.service";
import {UniteService} from "../../shared/services/unite.service";
import {Unite} from "../../shared/models/unite";

declare let jQuery: any;
declare let swal: any;

@Component({
  selector: 'app-list-livraison',
  templateUrl: './list-livraison.component.html',
  styleUrls: ['./list-livraison.component.css']
})
export class ListLivraisonComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
