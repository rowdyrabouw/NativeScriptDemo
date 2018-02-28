import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";

import { NativeScriptHttpModule } from "nativescript-angular/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { Http } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SideDrawerComponent } from "./shared/sidedrawer/sidedrawer.component";
import { SideDrawerWrapperComponent } from "./shared/sidedrawer/sidedrawer-wrapper/sidedrawer-wrapper.component";

import { LanguageService } from "./services/language.service";
import { MarvelService } from "./services/marvel.service";

// for AoT compilation
export function translateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "/i18n/", ".json");
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    AppRoutingModule,
    NativeScriptHttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [Http],
        useFactory: translateLoaderFactory
      }
    }),
    TNSFontIconModule.forRoot({
      fa: "./assets/css/font-awesome.css"
    })
  ],
  declarations: [AppComponent, SideDrawerComponent, SideDrawerWrapperComponent],
  providers: [LanguageService, MarvelService, { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
