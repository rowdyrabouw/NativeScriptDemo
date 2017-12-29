// Angular
import { Component } from "@angular/core";

// Plugins
import { FingerprintAuth } from "nativescript-fingerprint-auth";

// Shared
import { MenuComponent } from "../../shared/menu/menu.component";

@Component({
  moduleId: module.id,
  selector: "fingerprint",
  templateUrl: "fingerprint.component.html"
})
export class FingerprintComponent {
  private fingerprintAuth: FingerprintAuth;
  constructor(private menuComponent: MenuComponent) {
    this.fingerprintAuth = new FingerprintAuth();
    this.fingerprintAuth.available().then((avail: boolean) => {
      console.log(`Available? ${avail}`);
    });
  }

  doVerifyFingerprint(): void {
    this.fingerprintAuth
      .verifyFingerprint({
        message: "Scan your finger" // optional
      })
      .then(
        () => {
          alert({
            title: "Fingerprint / passcode OK",
            okButtonText: "Sweet"
          });
        },
        () => {
          alert({
            title: "Fingerprint NOT OK / canceled",
            okButtonText: "Mmkay"
          });
        }
      );
  }

  doVerifyFingerprintWithCustomFallback(): void {
    this.fingerprintAuth
      .verifyFingerprintWithCustomFallback({
        message: "Scan yer finger", // optional
        fallbackMessage: "Enter PIN" // optional
      })
      .then(
        () => {
          alert({
            title: "Fingerprint OK",
            okButtonText: "Sweet"
          });
        },
        error => {
          alert({
            title: "Fingerprint NOT OK",
            message: error.code === -3 ? "Show custom fallback" : error.message,
            okButtonText: "Mmkay"
          });
        }
      );
  }

  toggleDrawer(): void {
    this.menuComponent.toggleMenu();
  }
}
