import { Component, OnInit } from '@angular/core';
import {MatierePremiere} from "../../shared/models/matiere-premiere";
import {MPService} from "../../shared/services/mp.service";
import {UniteService} from "../../shared/services/unite.service";
import {Unite} from "../../shared/models/unite";
import {AchatMPService} from "../../shared/services/achatmp.service";
import {AchatMP} from "../../shared/models/achatMP";
import {Fournisseur} from "../../shared/models/fournisseur";
import {FournisseurService} from "../../shared/services/Fournisseur.service";
declare let jQuery: any;
declare let swal:any;
@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.css']
})
export class AddLivraisonComponent implements OnInit {
  constructor() { }
  ngOnInit() {}

}
