import { NgModule } from "@angular/core";
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
        children: [{ path: "", redirectTo: "/guess", pathMatch: "full" }]
      },
      { path: "home", loadChildren: "./components/home/home.module#HomeModule" },
      { path: "slider", loadChildren: "./components/slider/slider.module#SliderModule" },
      { path: "api", loadChildren: "./components/api/api.module#ApiModule" },
      { path: "guess", loadChildren: "./components/guess/guess.module#GuessModule" },
      { path: "speechrecognition", loadChildren: "./components/speechrecognition/speechrecognition.module#SpeechRecognitionModule" },
      { path: "video", loadChildren: "./components/video/video.module#VideoModule" },
      { path: "timebox", loadChildren: "./components/timebox/timebox.module#TimeboxModule" }
    ]
  }
];

@NgModule({
  declarations: [SideDrawerItemComponent],
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule, SideDrawerItemComponent]
})
export class AppRoutingModule {}
