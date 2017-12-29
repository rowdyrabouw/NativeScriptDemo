// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { enableProdMode } from "@angular/core";
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

enableProdMode();

platformNativeScriptDynamic().bootstrapModule(AppModule);
