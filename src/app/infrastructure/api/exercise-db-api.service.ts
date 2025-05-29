import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Exercise } from '../../domain/entities/exercise.entity';


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


  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises`);
  }


  getExercisesByBodyPart(bodyPart: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises/bodyPart/${bodyPart}?limit=10&offset=0`, { headers: this.headers });
  }


  getBodyParts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/exercises/bodyPartList`, { headers: this.headers });
  }
}
