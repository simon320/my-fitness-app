import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTrackerComponent } from './exercise-tracker.component';

describe('ExerciseTrackerComponent', () => {
  let component: ExerciseTrackerComponent;
  let fixture: ComponentFixture<ExerciseTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
