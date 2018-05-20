import { Component, OnInit } from '@angular/core';
import {Cours} from "../../shared/models/Cours";
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from 'rxjs/Subscription';
import {CoursService} from "../../shared/services/cours.service";
import {Router} from "@angular/router";


declare let swal: any;
declare let jQuery: any;
import * as $ from 'jquery';
import {Utils} from "../../shared/utils";
import {Config} from "../../shared/config";

// declare let jQuery : any;

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  c : Cours = new Cours();
  busy : Subscription ;
  private isEditAction: boolean = false;
  constructor (private router: Router,
               private coursService : CoursService){
  }
  ngOnInit() {
    this.initCoursMedia();

  }
  private addCours() {



    this.busy = this.coursService.add(this.c).subscribe(response => {
      swal({
        title: 'Ajouté !',
        text: 'Un nouveau produit est ajouté.',
        confirmButtonColor: '#66BB6A',
        type: 'success'
      }).then((isConfirm) => {
        this.router.navigate(['/cours/list']);
      });
    }, error => {
      swal({
        title: 'Erreur !',
        text: JSON.stringify(error.error.errors),
        confirmButtonColor: 'red',
        type: 'error'
      });
      console.debug(error);
    });
  }
  initCoursMedia() {
    /*
        initialize product profile image input
    */
    const baseContext = this;


    jQuery('.file-input-cours-img').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      console.log("heeedeee");
      baseContext.c.image_name = data.response.picture;
      console.log(baseContext.c.image_name);

      /*swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo à ce produit',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });*/
    }).on('filedeleted', function (event, key, jqXHR, data) {

      console.log(jqXHR.responseJSON.media);
      const index = baseContext.c.image_name.indexOf(jqXHR.responseJSON.picture, 0);
      if (index > -1) {
        baseContext.c.image_name = null;
      }
      console.log(JSON.stringify(baseContext.c.image_name));
    });

    if (!this.isEditAction) {
      Utils.initializeUploadFile(Config.imagesUrl + "/upload",
        ".file-input-cours-img" ,5000);
    }

    Utils.initializeUploadFile(Config.imagesUrl + "/upload",
      "file-input-cours-pdf" ,5000);
    jQuery('.file-input-cours-pdf').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      console.log("heeedeee");
      baseContext.c.pdf_name = data.response.texte;

      /*swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo à ce produit',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });*/
    }).on('filedeleted', function (event, key, jqXHR, data) {

      console.log(jqXHR.responseJSON.media);
      const index = baseContext.c.image_name.indexOf(jqXHR.responseJSON.picture, 0);
      if (index > -1) {
        baseContext.c.image_name = null;
      }
      console.log(JSON.stringify(baseContext.c.image_name));
    });

  }

}
