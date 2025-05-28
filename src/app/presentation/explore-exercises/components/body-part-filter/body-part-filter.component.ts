import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExerciseDbApiService } from '../../../../infrastructure/api/exercise-db-api.service';

@Component({
  selector: 'app-body-part-filter',
  templateUrl: './body-part-filter.component.html',
})
export class BodyPartFilterComponent implements OnInit {
  bodyParts: string[] = [];

  @Output() bodyPartSelected = new EventEmitter<string>();

  constructor(private exerciseService: ExerciseDbApiService) {}

  ngOnInit() {
    this.exerciseService.getBodyParts().subscribe((parts) => {
      this.bodyParts = parts;
    });
  }

  onSelect(event: Event) {
      const target = event.target as HTMLSelectElement;
      const id = target?.value;
      this.bodyPartSelected.emit(id)
  }
    
}