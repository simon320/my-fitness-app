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
  public colorIcon = input<string>('#000');       // Color del icono
  public size = input<number>(60);                // Tamaño en px
  public icon = input<string>('▶');              // Símbolo o ícono
  public isDisabled = input<boolean>(false);      // Símbolo o ícono
  public action = output();

  onClick() {
    this.action.emit();
  }
}