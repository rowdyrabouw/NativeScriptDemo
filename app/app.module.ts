import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";

import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SideDrawerComponent } from "./shared/sidedrawer/sidedrawer.component";
import { SideDrawerWrapperComponent } from "./shared/sidedrawer/sidedrawer-wrapper/sidedrawer-wrapper.component";

import { LanguageService } from "./services/language.service";
import { MarvelService } from "./services/marvel.service";

// for AoT compilation
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "/i18n/", ".json");
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: createTranslateLoader
      }
    }),
    TNSFontIconModule.forRoot({
      fa: "./assets/css/font-awesome.css"
    })
  ],
  declarations: [AppComponent, SideDrawerComponent, SideDrawerWrapperComponent],
  providers: [LanguageService, MarvelService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
