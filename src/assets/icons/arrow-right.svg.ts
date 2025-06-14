import { Component, input } from '@angular/core';

@Component({
  selector: 'icon-arrow-right',
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" [attr.stroke]="color()" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  `
})
export class ArrowRightSVG {
    public color = input<string>('#01c38d');
}
