import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetCompletedDaysUseCase } from '../../../../application/use-cases/get-completed-days.usecase';
import { ToggleCompletedDayUseCase } from '../../../../application/use-cases/toggle-completed-day.usecase';
import { LocalStorageCompletedDaysRepository } from '../../../../infrastructure/local-storage/completed-days.repository';
import { Routine } from '../../../../domain/entities/routine';
import { GetRoutineByDateUseCase } from '../../../../application/use-cases/get-routine-by-date.usecase';
import { RoutineApiService } from '../../../../infrastructure/api/routine-api.service';
import { RoutineService } from '../../../../application/services/routine.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  providers: [RoutineService],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  private repo = new LocalStorageCompletedDaysRepository();
  private getDaysUseCase = new GetCompletedDaysUseCase(this.repo);
  private toggleDayUseCase = new ToggleCompletedDayUseCase(this.repo);
  private routineService = inject(RoutineService);
  private router = inject(Router);

  readonly today = new Date();
  readonly currentMonth = signal(this.today.getMonth());
  readonly currentYear = signal(this.today.getFullYear());

  readonly completedDays = signal<Set<string>>(this.getDaysUseCase.execute());

  getDaysInMonth(month: number, year: number): Date[] {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  readonly days = signal(this.getDaysInMonth(this.currentMonth(), this.currentYear()));

  getDayKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  isCompleted(date: Date): boolean {
    return this.completedDays().has(this.getDayKey(date));
  }

  toggleDay(date: Date) {
    const updated = this.toggleDayUseCase.execute(this.getDayKey(date));
    this.completedDays.set(updated);
  }

  prevMonth() {
    const m = this.currentMonth();
    const y = this.currentYear();
    this.currentMonth.set(m === 0 ? 11 : m - 1);
    this.currentYear.set(m === 0 ? y - 1 : y);
    this.days.set(this.getDaysInMonth(this.currentMonth(), this.currentYear()));
  }

  nextMonth() {
    const m = this.currentMonth();
    const y = this.currentYear();
    this.currentMonth.set(m === 11 ? 0 : m + 1);
    this.currentYear.set(m === 11 ? y + 1 : y);
    this.days.set(this.getDaysInMonth(this.currentMonth(), this.currentYear()));
  }

  private routineRepo = new RoutineApiService();
  getRoutineByDate = new GetRoutineByDateUseCase(this.routineRepo);

  selectedRoutine = signal<Routine | null>(null);

  openRoutineDetails(date: Date) {
    const routine = this.getRoutineByDate.execute(this.getDayKey(date));
    if (routine) {
      this.selectedRoutine.set(routine);
    }
  }

  startWorkout() {
    const routine = this.selectedRoutine();
    if (!routine) return;

    const todayKey = this.getDayKey(new Date());
    if (routine.date > todayKey) {
      alert('No podés comenzar una rutina del futuro 🕒');
      return;
    }

    this.routineService.setRoutine(routine);
    console.log(routine);
    
    this.selectedRoutine.set(null);

    this.router.navigate(['/workout']);
  }
}
