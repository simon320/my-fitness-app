import { NgStyle } from "@angular/common";
import { Component, input, output } from "@angular/core";



@Component({
    selector: 'app-arrow-button',
    templateUrl: './arrow-button.component.html',
    styleUrl: 'arrow-button.component.scss',
    imports: [NgStyle]
})
export class ArrowButton {
  public color = input<string>('#00ff00');     // Color de fondo
  public size = input<number>(60);               // Tamaño en px
  public iconUp = input<boolean>(true);              // Símbolo o ícono
  public action = output();

  onClick() {
    this.action.emit();
  }
}