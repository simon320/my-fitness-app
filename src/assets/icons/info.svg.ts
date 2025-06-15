import { Component, input } from '@angular/core';

@Component({
  selector: 'icon-info',
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" [attr.stroke]="color()" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  `
})
export class InfoSVG {
  public color = input<string>('#043527d6');
}
