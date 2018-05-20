import { Component, OnInit } from '@angular/core';
import {CoursService} from "../../shared/services/cours.service";
import {Router} from "@angular/router";
import {Cours} from "../../shared/models/Cours";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  cours: Cours[]=[];
  busy : Subscription ;

  constructor (private router: Router,
               private coursService : CoursService){
  }
  ngOnInit() {
    this.getAllCours();
  }

  private getAllCours() {

    this.busy = this.coursService.get().subscribe(response => {
      this.cours = response;
      Utils.initializeDataTables(20, 6, 'dataTable');

      }, error => {
      console.debug(error);
    });
  }
}
