import { Component, input } from '@angular/core';

@Component({
  selector: 'icon-arrow-left',
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" [attr.stroke]="color()" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 19-7-7 7-7"/>
      <path d="M19 12H5"/>
    </svg>
  `
})
export class ArrowLeftSVG {
  public color = input<string>('#01c38d');
}
