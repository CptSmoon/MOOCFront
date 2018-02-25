import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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

    jQuery('.has_sub a').on('click', function () {
      console.log('Click 2 !!!');

      if (!jQuery(this).hasClass('subdrop')) {
        // hide any open menus and remove all other classes
        jQuery('ul', jQuery(this).parents('ul:first')).slideUp(350);
        jQuery('a', jQuery(this).parents('ul:first')).removeClass('subdrop');
        jQuery('#sidebar-menu .pull-right i').removeClass('md-remove').addClass('md-add');

        // open our new menu and add the open class
        jQuery(this).next('ul').slideDown(350);
        jQuery(this).addClass('subdrop');
        jQuery('.pull-right i', jQuery(this).parents('.has_sub:last')).removeClass('md-add').addClass('md-remove');
        jQuery('.pull-right i', jQuery(this).siblings('ul')).removeClass('md-remove').addClass('md-add');
      } else if (jQuery(this).hasClass('subdrop')) {
        jQuery(this).removeClass('subdrop');
        jQuery(this).next('ul').slideUp(350);
        jQuery('.pull-right i', jQuery(this).parent()).removeClass('md-remove').addClass('md-add');
      }
    });

    if (jQuery("#wrapper").hasClass("enlarged")) {
      jQuery(".slimscrollleft").css("overflow", "inherit").parent().css("overflow", "inherit");
      jQuery(".slimscrollleft").siblings(".slimScrollBar").css("visibility", "hidden");
    } else {
      jQuery(".slimscrollleft").css("overflow", "hidden").parent().css("overflow", "hidden");
      jQuery(".slimscrollleft").siblings(".slimScrollBar").css("visibility", "visible");
    }

  }
  initializeNavBar() {
    this.components = [
      {
        name: "Dashboard",
        visible: true,
        childrens: []
      }, {
        name: "Récipients",
        visible: true,
        childrens: [
          {
            name: "Liste des récipients",
            url: "/recipients/list"
          }, {
            name: "Ajouter un récipient",
            url: "/recipients/add"
          }]
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
