import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { Routine } from '../../../../domain/entities/routine.entity';
import { RoutineService } from '../../../../application/services/routine.service';
import { LocalStorageCompletedDaysRepository } from '../../../../infrastructure/local-storage/completed-days.repository';
import { LocalStorageRoutineRepository } from '../../../../infrastructure/local-storage/routine.repositoty';
import { GetRoutineByDate } from '../../../../application/use-cases/routine/get-routine-by-date.usecase';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  // private repository = new LocalStorageCompletedDaysRepository();
  // private getDaysUseCase = new GetCompletedDays(this.repository);
  // private toggleDayUseCase = new ToggleCompletedDay(this.repository);

  private repository = inject(LocalStorageRoutineRepository);
  private router = inject(Router);
  private readonly today = new Date();
  // private readonly completedDays = signal<Set<string>>(this.getDaysUseCase.execute());

  public selectedRoutine = signal<Routine | null>(null);
  public getRoutineByDate = new GetRoutineByDate(this.repository);
  public readonly currentMonth = signal(this.today.getMonth());
  public readonly currentYear = signal(this.today.getFullYear());
  public readonly days = signal(this.getDaysInMonth(this.currentMonth(), this.currentYear()));



  private getDaysInMonth(month: number, year: number): Date[] {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }


  public prevMonth(): void {
    const m = this.currentMonth();
    const y = this.currentYear();
    this.currentMonth.set(m === 0 ? 11 : m - 1);
    this.currentYear.set(m === 0 ? y - 1 : y);
    this.days.set(this.getDaysInMonth(this.currentMonth(), this.currentYear()));
  }


  public nextMonth(): void {
    const m = this.currentMonth();
    const y = this.currentYear();
    this.currentMonth.set(m === 11 ? 0 : m + 1);
    this.currentYear.set(m === 11 ? y + 1 : y);
    this.days.set(this.getDaysInMonth(this.currentMonth(), this.currentYear()));
  }


  public getDayKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }


  // public isCompleted(date: Date): boolean {
  //   return this.completedDays().has(this.getDayKey(date));
  // }


  // public toggleDay(date: Date) { // TODO: Implementar en el HTML cuando querramos que se pueda marcar un día como completado.
  //   const updated = this.toggleDayUseCase.execute(this.getDayKey(date));
  //   this.completedDays.set(updated);
  // }


  public async openRoutineDetails(date: Date): Promise<void> {
    const routine = await this.getRoutineByDate.execute(this.getDayKey(date));
    if (routine) {
      this.selectedRoutine.set(routine);
    }
  }


  public startWorkout(): void {
    const routine = this.selectedRoutine();
    if (!routine) return;

    const todayKey = this.getDayKey(new Date());
    if (routine.date > todayKey) { // TODO: Si la rutina es del futuro, no se puede comenzar. ¿QUIERO ESTO?
      alert('No podés comenzar una rutina del futuro 🕒');
      return;
    }

    // this.routineService.setRoutine(routine);
    this.selectedRoutine.set(null);
    this.router.navigate(['/workout']);
  }
}
