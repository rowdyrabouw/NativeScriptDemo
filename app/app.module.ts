import {
  NgModule,
  NgModuleFactoryLoader,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";

import {
  NativeScriptRouterModule,
  NSModuleFactoryLoader
} from "nativescript-angular/router";
import { AppRoutes, AppComponents } from "./app.routing";
import { Http } from "@angular/http";

import { AppComponent } from "./app.component";
import { SliderIconDirective } from "./components/native/slider.directive";

// for AoT compilation
export function translateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, ...AppComponents, SliderIconDirective],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    NativeScriptHttpModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(AppRoutes),
    TNSFontIconModule.forRoot({
      fa: "assets/css/font-awesome-vendor.css"
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [Http],
        useFactory: translateLoaderFactory
      }
    })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
  ]
})
export class AppModule {}
