import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../shared/utils';
import {AdminService} from "../shared/services/admin.service";
import {Admin} from "../shared/models/admin";

declare var jQuery;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})

export class FullLayoutComponent implements OnInit {
  components: NavigationMain[] = [];
  private currentAdmin: Admin;

  constructor(
    private adminService : AdminService,
    private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {

    if (!this.adminService.isAdminLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.currentAdmin = this.adminService.currentAdmin;



    this.initializeNavBar();

    this.changeActiveUrl(this.router.url);
    Utils.initializeClickNavBar(50);
    Utils.initializeScroll(50);
  }

  getAdmin() {
    this.adminService.me().subscribe(data => {

    }, error => {
      this.adminService.clearAdminFromCache();
      this.router.navigate(['/login']);
    });
  }

  initializeNavBar() {
    this.components = [
      {
        name: 'Gestion Matiére premiéres',
        visible: true,
        childrens: [
          {
            name: 'Stock Matière Première',
            url: '/mp/stock'
          },
          {
            name: 'Achats Matière Première',
            url: '/mp/achat'
          },
          {
            name: 'Consommations Matière Première',
            url: '/mp/consommation'
          }
        ]
      },
      {
        name: 'Gestion Production',
        visible: true,
        childrens: [
          {
            name: 'Recipients',
            url: '/production/recipient/list'
          },
          {
            name: 'Emballages',
            url: '/production/emballage/list'
          },
          {
            name: 'Produits',
            url: '/production/produit/list'
          },
          {
            name: 'Lots',
            url: '/production/lot/list'
          }
        ]
      },
      {
        name: 'Gestion des Ventes',
        visible: true,
        childrens: [
          {
            name: 'Gestion des commandes',
            url: '/vente/commande/list'
          },{
            name: 'Gestion des sorties',
            url: '/vente/sortie/list'
          }
        ]
      },
      {
        name:"Gestion des Clients",
        visible:true,
        childrens:[{
          name:"Liste des Clients",
          url:"/client"
        }]

      },{
        name:"Gestion des Livraisons",
        visible:true,
        childrens:[{
          name:"Liste des Livraisons",
          url:"/livraison"
        }

        ]
      }
    ];
  }

  changeActiveUrl(url: string) {
    this.components.forEach(
      component => {
        component.active = '';
        if (url.indexOf(component.url) !== -1) {
          component.active = 'active';
        }
        if (component.childrens) {
          component.childrens.forEach(
            child => {
              child.active = '';
              if (url.indexOf(child.url) !== -1) {
                child.active = 'active';
              }
            }
          );
        }
      }
    );
  }
  logout() {
    this.adminService.clearAdminFromCache();
    this.router.navigate(['login']);
  }
}

export class NavigationMain {
  public name: string;
  public active?: string;
  public childrens?: ChildrenNavigation[] = [];
  public url?: string;
  public visible?: boolean;
}

export class ChildrenNavigation {
  public name: string;
  public active?: string;
  public url?: string;

  public action?: any;
  public hidden?: boolean;
}
