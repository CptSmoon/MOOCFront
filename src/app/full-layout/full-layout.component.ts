import {AfterViewInit, Component, OnInit} from '@angular/core';
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

  constructor(

              private route: ActivatedRoute,
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
        name: 'Gestion des Cours',
        visible: true,
        childrens: [
          {
            name: 'Ajouter Cours',
            url: '/cours/add'
          },{
            name: 'Lister Cours',
            url: '/cours/list'
          }]},
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
