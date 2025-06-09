import { Component, input } from '@angular/core';

@Component({
  selector: 'icon-check',
  standalone: true,
  template: `
    <svg [attr.width]="width()" [attr.height]="height()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  `
})
export class CheckSVG {
  public width = input<number>(24);
  public height = input<number>(24);
}
