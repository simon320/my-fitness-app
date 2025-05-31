import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output, signal } from '@angular/core';

import { ExerciseDbApiService } from '../../../../../infrastructure/api/exercise-db-api.service';

@Component({
  selector: 'app-body-part-filter',
  templateUrl: './body-part-filter.component.html',
  styleUrl: './body-part-filter.component.scss',
  imports: [CommonModule, FormsModule],
})
export class BodyPartFilterComponent implements OnInit {
  private exerciseService = inject(ExerciseDbApiService);
  public bodyPartSelected = output<string>();
  public bodyParts = signal<string[]>([]);
  public isOpen = signal<boolean>(false);
  public searchTerm = signal<string>('');


  ngOnInit() {
    // this.exerciseService.getAllExercises().subscribe((parts) => {
    //   console.log(parts);
    // });
    this.exerciseService.getBodyParts().subscribe((parts: string[]) => {
      this.bodyParts.set(parts);
    });
  }


  public toggleDropdown(open: boolean): void {
    setTimeout(() => {
      this.isOpen.set(open);
    }, open ? 0 : 150);
  }


  public selectMuscle(group: string): void {
    this.searchTerm.set(group);
    this.isOpen.set(false);    
    this.bodyPartSelected.emit(group);
  }
    
}