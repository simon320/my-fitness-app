import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Exercise } from '../../domain/entities/exercise.entity';


@Injectable({
  providedIn: 'root',
})
export class ExerciseDbApiService {
  private readonly API_URL = 'https://exercisedb-api.vercel.app/api/v1';

  constructor(private http: HttpClient) {}

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises`);
  }

  getExercisesByBodyPart(bodyPart: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises/bodyPart/${bodyPart}`);
  }

  getBodyParts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/bodyParts`);
  }
}
