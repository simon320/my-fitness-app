import { Routes } from '@angular/router';
import { CalendarComponent } from './presentation/calendar/pages/calendar/calendar.component';
import { WorkoutComponent } from './presentation/workout/pages/workout/workout.component';
import { ProgressComponent } from './presentation/progress/pages/progress/progress.component';
import { HomeComponent } from './presentation/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent   },
  { path: 'calendar', component: CalendarComponent },
  { path: 'workout', component: WorkoutComponent },
  { path: 'progress', component: ProgressComponent },
];

// TODO: Cambiar la ruta por defecto a una home o al calendar...