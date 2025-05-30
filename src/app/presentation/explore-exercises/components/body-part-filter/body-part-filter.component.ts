import { Component, inject, OnInit, output, signal } from '@angular/core';
import { ExerciseDbApiService } from '../../../../infrastructure/api/exercise-db-api.service';

@Component({
  selector: 'app-body-part-filter',
  templateUrl: './body-part-filter.component.html',
  styleUrl: './body-part-filter.component.scss'
})
export class BodyPartFilterComponent implements OnInit {
  private exerciseService = inject(ExerciseDbApiService);
  public bodyPartSelected = output<string>();
  public bodyParts = signal<string[]>([]);


  ngOnInit() {
    // this.exerciseService.getAllExercises().subscribe((parts) => {
    //   console.log(parts);
    // });
    this.exerciseService.getBodyParts().subscribe((parts) => {
      this.bodyParts.set(parts);
    });
  }

  public onSelect(event: Event): void {
      const target = event.target as HTMLSelectElement;
      const id = target?.value;
      this.bodyPartSelected.emit(id)
  }
    
}