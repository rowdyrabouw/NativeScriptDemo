import { Directive, ElementRef } from "@angular/core";
import { isIOS } from "platform";

// Declare these so the TypeScript compiler doesn’t complain about these references.
declare var UIImage: any;
declare var UIControlState: any;

@Directive({
  selector: "[slider-icon]"
})
export class SliderIconDirective {
  constructor(private el: ElementRef) {
    if (isIOS) {
      let uiSlider = this.el.nativeElement.ios;
      uiSlider.setThumbImageForState(UIImage.imageNamed("shield.png"), UIControlState.Normal);
    }
  }
}
