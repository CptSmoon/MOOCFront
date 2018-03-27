import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../shared/services/admin.service";
import {Credentials} from "../shared/models/credentials";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private busy: Subscription;

  constructor(private adminService: AdminService, private router: Router) { }

  credentials: Credentials;

  ngOnInit() {
    this.credentials = new Credentials();
  }

  attemptLogin() {
    console.log(JSON.stringify(this.credentials));
    this.busy = this.adminService.loginAdmin(this.credentials).subscribe(data => {
      this.adminService.saveAdmin(data);
      this.router.navigate(['/'], {queryParams: {reload: true}});
    });
  }

}
