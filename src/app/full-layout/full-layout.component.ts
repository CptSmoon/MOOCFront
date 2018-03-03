import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../shared/utils';

declare var jQuery;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})

export class FullLayoutComponent implements OnInit {
  components: NavigationMain[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.initializeNavBar();
    this.changeActiveUrl(this.router.url);
    Utils.initializeClickNavBar(50);
    Utils.initializeScroll(50);
  }

  initializeNavBar() {
    this.components = [
      {
        name: 'Recipients',
        visible: true,
        childrens: [
          {
            name: 'Liste des recipients',
            url: '/production/recipient/list'
          }, {
            name: 'Ajouter un récipient',
            url: '/production/recipient/ajouter'
          }]
      },
      {
        name: 'Emballages',
        visible: true,
        childrens: [
          {
            name: 'Liste des Emballages',
            url: '/production/emballage/list'
          },
          {
            name: 'Ajouter un emballage',
            url: '/production/emballage/ajouter'
          }
        ]
      },
      {
        name: 'Produits',
        visible: true,
        childrens: [
          {
            name: 'Liste des Produits',
            url: '/production/produit/list'
          },
          {
            name: 'Ajouter un Produit',
            url: '/production/produit/ajouter'
          }
        ]
      },
      {
        name: 'Matière Première',
        visible: true,
        childrens: [
          {
            name: 'Stock Matière Première',
            url: '/mp/stock'
          },
          {
            name: 'Achats Matière Première',
            url: '/mp/achat'
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
