import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SideDrawerWrapperComponent } from "./shared/sidedrawer/sidedrawer-wrapper/sidedrawer-wrapper.component";
import { SideDrawerComponent } from "./shared/sidedrawer/sidedrawer.component";
import { SideDrawerItemComponent } from "./shared/sidedrawer/sidedrawer-item/sidedrawer-item.component";

const routes: Routes = [
  {
    path: "",
    component: SideDrawerComponent,
    children: [
      {
        path: "",
        component: SideDrawerWrapperComponent,
        children: [{ path: "", redirectTo: "/slider", pathMatch: "full" }]
      },
      { path: "slider", loadChildren: "./components/slider/slider.module#SliderModule" },
      { path: "guess", loadChildren: "./components/guess/guess.module#GuessModule" },
      { path: "speechrecognition", loadChildren: "./components/speechrecognition/speechrecognition.module#SpeechRecognitionModule" }
    ]
  }
];

@NgModule({
  declarations: [SideDrawerItemComponent],
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule, SideDrawerItemComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppRoutingModule {}
