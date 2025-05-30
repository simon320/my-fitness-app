import { from, Observable, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Exercise } from '../../domain/entities/exercise.entity';
import { mockLowerArms } from '../../../assets/mock-lower-arms';
import { mockUpperArms } from '../../../assets/mock-upper-arms';
import { mockAllExercises } from '../../../assets/mock-all-exercises';


@Injectable({
  providedIn: 'root',
})
export class ExerciseDbApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://exercisedb.p.rapidapi.com';
  private headers = new HttpHeaders({
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': '7180168746msh1b401777e3c5d21p1f7bfdjsn36fa55d31f42',
  });

  // TODO => Quitar los mocks....
  toggle = false;

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises?limit=100`, { headers: this.headers });
  }


  getExercisesByBodyPart(bodyPart: string): Observable<Exercise[]> {
    // if(this.toggle) {
    //   this.toggle = !this.toggle;
    //   return of(mockLowerArms as Exercise[])
    // }
    // else {
    //   this.toggle = !this.toggle;
    //   return of(mockUpperArms as Exercise[])
    // }
    return of(mockAllExercises as Exercise[]);
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises/bodyPart/${bodyPart}?limit=10&offset=0`, { headers: this.headers });
  }


  getBodyParts(): Observable<string[]> {
    return of([ "espalda", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist" ]);
    // return this.http.get<string[]>(`${this.API_URL}/exercises/bodyPartList`, { headers: this.headers });
  }
}
