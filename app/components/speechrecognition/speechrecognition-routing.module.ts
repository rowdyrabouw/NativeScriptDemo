import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SpeechRecognitionComponent } from "./speechrecognition.component";
import { DirectionsComponent } from "./directions.component";

const routes: Routes = [{ path: "", component: SpeechRecognitionComponent }, { path: "directions", component: DirectionsComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SpeechRecognitionRoutingModule {}
