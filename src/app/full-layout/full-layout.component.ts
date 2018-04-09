import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../shared/utils';
import {AdminService} from '../shared/services/admin.service';
import {Admin} from '../shared/models/admin';

declare var jQuery;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})

export class FullLayoutComponent implements OnInit {
  components: NavigationMain[] = [];
  private currentAdmin: Admin;

  constructor(private adminService: AdminService,
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
        name: 'Gestion des Produits de base',
        visible: true,
        childrens: [
          {
            name: 'Gestion des commandes d\'achat',
            url: '/produit-base/commande/list'
          },
          {
            name: 'Gestion des achats',
            url: '/produit-base/achat/list'
          },
          {
            name: 'Stock produit de base',
            url: '/produit-base/stock'
          }]/*,
          {
            name: 'Stock Produits',
            url: '/produit'
          }, {
            name: 'Ajouter une commande',
            url: '/produit/commande/add'
          }, {
            name: 'Ajouter un achat',
            url: '/produit/achat/add'
          }, {
            name: 'Liste des Commandes',
            url: '/produit/commande/list'
          }, {
            name: 'Liste des Achats',
            url: '/produit/achat/list'
          }*/


      },
      {
        name: 'Gestion Production',
        visible: true,
        childrens: [
          {

            name: 'Gestion des produits fini',
            url: '/production/produit/list'
          }, {

            name: 'Ordres de Fabrication',
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
          }, {
            name: 'Gestion des Livraisons',
            url: '/vente/livraison/list'
          }, {
            name: 'Facutration',
            url: '/vente/facture/list'
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
  public numberAlertes?: number ;
}

export class ChildrenNavigation {
  public name: string;
  public active?: string;
  public url?: string;

  public action?: any;
  public hidden?: boolean;
}
