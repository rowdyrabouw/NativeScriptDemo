// Platform
import dialogs = require("ui/dialogs");

// Angular
import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

// Plugins
import {
  RadSideDrawerComponent,
  SideDrawerType
} from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";

@Component({
  moduleId: module.id,
  selector: "menu-contents",
  templateUrl: "menu.component.html"
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Input() menu: string;

  @ViewChild(RadSideDrawerComponent)
  public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;

  Klant: number;
  klantVoornaam: string;
  private Partner: number;
  private partnerVoornaam: string;
  HeeftPartner: boolean;
  Menu: boolean = true;
  private Profiel: boolean = false;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.drawer.closeDrawer();
      }
    });
    // console.log('comp page=' + this.menu);
  }

  ngAfterViewInit(): void {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectionRef.detectChanges();

    // here comes the magic!
    if (this.drawer.ios) {
      // if your menu is drawn 'below' the hostview, do this:
      this.drawer.ios.defaultSideDrawer.style.shadowMode = 1; // TKSideDrawerShadowMode.Hostview;
      // .. but if the menu is drawn 'above' the hostview, do this:
      this.drawer.ios.defaultSideDrawer.style.shadowMode = 2; // TKSideDrawerShadowMode.SideDrawer;

      // if you have shadowMode = 2, then you can add a little dim to the lower layer to add some depth. Keep it subtle though:
      this.drawer.ios.defaultSideDrawer.style.dimOpacity = 0.12;

      // then tweak the shadow to your liking:
      this.drawer.ios.defaultSideDrawer.style.shadowOpacity = 0.75; // 0-1, higher is darker
      this.drawer.ios.defaultSideDrawer.style.shadowRadius = 5; // higher is more spread

      // bonus feature: control the menu animation speed (in seconds)
      this.drawer.ios.defaultSideDrawer.transitionDuration = 0.25;
    }
  }

  toggleMenu(): void {
    this.drawer.toggleDrawerState();
  }

  public goToPage(componentName: string) {
    this.router.navigate([componentName]);
  }
}
