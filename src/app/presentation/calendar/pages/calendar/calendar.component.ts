import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { Routine } from '../../../../domain/entities/routine.entity';
import { GetRoutineByDate } from '../../../../application/use-cases/routine/get-routine-by-date.usecase';
import { LocalStorageRoutineRepository } from '../../../../infrastructure/local-storage/routine.repositoty';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  providers: [LocalStorageRoutineRepository],
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
  public currentDate: Date = new Date();
  public readonly weekDays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];



  public get formattedDate(): string {
    return this.currentDate.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long'
    }).split('-').join(' de ');
  }
  


private getDaysInMonth(month: number, year: number): Date[] {
  const days: Date[] = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Convertir de domingo=0 a lunes=0

  // Agregar días vacíos (placeholders) antes del día 1
  for (let i = 0; i < startDayIndex; i++) {
    days.push(null as any); // null para representar espacios vacíos
  }

  const date = new Date(year, month, 1);
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


  public openRoutineDetails(date: Date): void {
    this.getRoutineByDate.execute(this.getDayKey(date)).subscribe({
      next: (routine) => {
        if (routine) {
          this.selectedRoutine.set(routine);
        } else {
          this.selectedRoutine.set(null);
        }
      },
      error: (err) => {
        console.error('Error fetching routine:', err);
        this.selectedRoutine.set(null);
      }
    })
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
