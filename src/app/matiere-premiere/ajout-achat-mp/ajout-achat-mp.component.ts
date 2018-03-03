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
@Component({
  selector: 'app-achat-mp',
  templateUrl: './ajout-achat-mp.component.html',
  styleUrls: ['./ajout-achat-mp.component.css']
})
export class AjoutAchatMpComponent implements OnInit {
  mp: Array<MatierePremiere>;
  units:Array<Unite>;
  fournisseurs: Array<Fournisseur>;
  selectedMP:MatierePremiere;
  selectedUnit:Unite;
  selectedFournisseur:Fournisseur;
  quantite:number;
  prix:number;
  date:Date;
  constructor(private achatMPService: AchatMPService, private mpService: MPService, private uniteService: UniteService, private fournisseurService: FournisseurService) { }
  ngOnInit() {
    this.mpService.getMP().subscribe(data=> {
      this.mp=data;
      if (data.length) this.selectedMP= data[0];
    });
    this.uniteService.getAllUnits().subscribe(data=>{
      this.units=data;
      if (data.length) this.selectedUnit= data[0];
    });
    this.fournisseurService.getAll().subscribe(data=>{
      this.fournisseurs=data;
      if (data.length) this.selectedFournisseur= data[0];
    });
  }

  add(){
    this.achatMPService.add(this.selectedUnit,this.date,this.quantite,this.selectedFournisseur,this.selectedMP,this.prix).subscribe(data=>console.log(data));
  }

}
