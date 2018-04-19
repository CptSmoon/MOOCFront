import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../shared/utils';
import {AdminService} from '../shared/services/admin.service';
import {Admin} from '../shared/models/admin';
import {AlertesService} from "../shared/services/alertes.service";
import {Alertes} from "../shared/models/Alertes";

declare var jQuery;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})

export class FullLayoutComponent implements OnInit, AfterViewInit {
  components: NavigationMain[] = [];
  private currentAdmin: Admin;
  private alertes: Alertes = new Alertes();

  constructor(private adminService: AdminService,
              private alertesService: AlertesService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {

    if (!this.adminService.isAdminLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.currentAdmin = this.adminService.currentAdmin;


    this.initializeNavBar();
    this.alertesService.getNombreTotalAlertes().subscribe(response => {
      this.alertes = response;
      this.components[3].numberAlertes = this.alertes.n_factures +this.alertes.n_livraisons +
        this.alertes.n_produits_bases + this.alertes.n_produits_finis;

      this.components[3].childrens[0].numberAlertes = this.alertes.n_produits_finis;
      this.components[3].childrens[1].numberAlertes = this.alertes.n_produits_bases;
      this.components[3].childrens[2].numberAlertes = this.alertes.n_factures;
      this.components[3].childrens[3].numberAlertes = this.alertes.n_livraisons;
      console.log("helloo");
    });
    this.changeActiveUrl(this.router.url);
    Utils.initializeClickNavBar(50);
    Utils.initializeScroll(50);

  }

  ngAfterViewInit() {
    let baseContext = this;
    this.alertesService.alertesListener = {
      onChangeAlertes(typeAlerte, numberAlertes) {
        if (typeAlerte == 1) {
          baseContext.components[3].numberAlertes -=
            baseContext.components[3].childrens[0].numberAlertes;

          baseContext.components[3].childrens[0].numberAlertes = numberAlertes;

          baseContext.components[3].numberAlertes += numberAlertes;
        }
        else if (typeAlerte == 2) {
          baseContext.components[3].numberAlertes -=
            baseContext.components[3].childrens[1].numberAlertes;

          baseContext.components[3].childrens[1].numberAlertes = numberAlertes;
          baseContext.components[3].numberAlertes += numberAlertes;

        }
        else if (typeAlerte == 3) {
          baseContext.components[3].numberAlertes -=
            baseContext.components[3].childrens[2].numberAlertes;

          baseContext.components[3].childrens[2].numberAlertes = numberAlertes;
          baseContext.components[3].numberAlertes += numberAlertes;

        }
      }
    };
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
        name: 'Gestion des Ventes et des Dépenses',
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
          },{
            name: 'Devis',
            url: '/vente/devis/list'
          }, {
            name: 'Gestion des Sorties',
            url: '/vente/sortie/list'
          }, {
            name: 'Dépenses',
            url: '/vente/depenses/list',
            numberAlertes: 0
          }
        ]
      },
      {
        name: 'Alertes',
        visible: true,
        numberAlertes: 0,
        childrens: [
          {
            name: 'Produits Finis',
            url: '/alertes/produits',
            numberAlertes: 0
          }, {
            name: 'Produits de Base',
            url: '/alertes/produitsBase',
            numberAlertes: 0

          }, {
            name: 'Facturations',
            url: '/alertes/factures',
            numberAlertes: 0
          }, {
            name: 'Livraisons',
            url: '/alertes/livraisons',
            numberAlertes: 0
          }
        ]
      },{
        name: 'Ressources Humaines',
        visible: true,
        childrens: [
          {
            name: 'Ajouter Employé',
            url: '/rh/add',

          },
          {
            name: 'Liste des Employés',
            url: '/rh/list',

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
  public numberAlertes?: number;
}

export class ChildrenNavigation {
  public name: string;
  public active?: string;
  public url?: string;
  public numberAlertes?: number;

  public action?: any;
  public hidden?: boolean;
}
