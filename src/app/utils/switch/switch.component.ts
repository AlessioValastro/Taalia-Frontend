import { Component, output } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css',
})
export class SwitchComponent {
  switchChanged = output<boolean>();

  toggleSwitch(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.switchChanged.emit(checked);
  }
}
