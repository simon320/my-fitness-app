import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-circle-button',
  imports: [NgStyle],
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.scss']
})
export class CircleButtonComponent {
  public bgColor = input<string>('#00ff6a');      // Color de fondo
  public colorBorder = input<string>('rgba(0, 0, 0, 0.7)');      // Color del borde
  public propertiesOfShadows = input<string>('4px 3px 8px #000, inset 2px 2px 38px rgba(100, 100, 100, 0.3), inset -1px -1px 5px rgba(0, 0, 0, 0.9)');      // Propiedades de las sombras.
  public colorIcon = input<string>('#000');       // Color del icono
  public broad = input<number>(2);                // Tamaño en px
  public size = input<number>(60);                // Tamaño en px
  public icon = input<string>('▶');              // Símbolo o ícono
  public isDisabled = input<boolean>(false);      // Símbolo o ícono
  public action = output();

  onClick() {
    this.action.emit();
  }
}