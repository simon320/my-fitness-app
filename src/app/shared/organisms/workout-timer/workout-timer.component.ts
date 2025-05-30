import { Component, OnDestroy, computed, signal, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleButtonComponent } from "../../atoms/circle-button/circle-button.component";

@Component({
  selector: 'app-workout-timer',
  standalone: true,
  imports: [CommonModule, CircleButtonComponent],
  templateUrl: './workout-timer.component.html',
  styleUrls: ['./workout-timer.component.scss']
})
export class WorkoutTimerComponent implements OnDestroy {
  public countdown = input<number | undefined>();

  readonly time = signal(0);
  readonly isRunning = signal(false);

  private intervalId: any;

  readonly displayTime = computed(() => {
    const cd = this.countdown();
    return cd ? cd - this.time() : this.time();
  });


//////////////////////

  public actionLeft = output();
  public actionRight = output();
  public isDisabledLeft = input<boolean>(false);
  public isDisabledRight = input<boolean>(false);
  

  onClickLeft() {
    this.actionLeft.emit();
  }

  onClickRight() {
    this.actionRight.emit();
  }

//////////////////////


  constructor() {
    effect(() => {
      if (this.isRunning()) {
        this.startInterval();
      } else {
        this.clearInterval();
      }
    });

    // Si es countdown, preestablecer tiempo en 0
    effect(() => {
      if (this.countdown()) {
        this.time.set(0);
      }
    });
  }

  private startInterval() {
    this.intervalId = setInterval(() => {
      const cd = this.countdown();
      this.time.update((t) => {
        if (cd && t >= cd) {
          this.isRunning.set(false);
          return t;
        }
        return t + 1;
      });
    }, 1000);
  }

  private clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggleTimer() {
    this.isRunning.update((r) => !r);
  }

  reset() {
    this.time.set(0);
    this.isRunning.set(false);
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }
}
