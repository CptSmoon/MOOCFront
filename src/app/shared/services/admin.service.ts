import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Admin} from "../new models/admin";
import {Config} from "../config";
import {Credentials} from "../models/credentials";
import {Privilege} from "../new models/privilege";


@Injectable()
export class AdminService extends GenericService {

  currentAdmin: Admin;
  adminToken: string;

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
    this.retrieveAdminFromCache();
    this.retrieveAdminTokenFromCache();
  }

  retrieveAdminFromCache() {
    this.currentAdmin = this.storageService.read("erp-admin");
  }

  retrieveAdminTokenFromCache() {
    return this.adminToken = this.storageService.read("erp-admin-token");
  }

  isAdminLoggedIn() {
    return this.retrieveAdminTokenFromCache() !== null;
  }

  me() {
    const headers = this.headers.set('Authorization', this.adminToken);
    return this.http.get(Config.adminUrl + "/me", {headers});
  }

  loginAdmin(credentials: Credentials) {
    return this.http.post(Config.adminUrl + "/login", credentials);
  }

  saveAdmin(data: any) {
    this.adminToken = data.token;
    this.currentAdmin = data.admin;
    this.storageService.write("erp-admin-token", 'Bearer ' + data.token);
    this.storageService.write("erp-admin", data.admin);
  }

  clearAdminFromCache() {
    this.storageService.remove("erp-admin-token");
    this.storageService.remove("erp-admin");
  }

  hasPrivilege(roleId: number) {
    let hasRole = false;
    if (!this.currentAdmin) {
      return false;
    }
    if (!this.currentAdmin.privileges) {
      return false;
    }
    this.currentAdmin.privileges.forEach(function (privilege) {
      if (privilege.privilege_id === 1) {
        hasRole = true;
      }
      if (privilege.privilege_id === roleId) {
        hasRole = true;
      }
    });
    return hasRole;
  }
}
