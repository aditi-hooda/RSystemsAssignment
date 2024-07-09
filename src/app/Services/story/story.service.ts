import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingIndicatorService } from './../loading-indicator/loading-indicator.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiUrl = 'https://localhost:7002/api/Stories'; // Replace with your API URL

  constructor(private http: HttpClient, private loadingIndicatorService: LoadingIndicatorService) { }

  // Fetch newest stories
  getNewestStories(pageSize: number, pageNumber: number): Observable<any[]> {
    this.loadingIndicatorService.show();
    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<any[]>(`${this.apiUrl}/newest`, { params })
    .pipe(
      tap(() => this.loadingIndicatorService.hide()));
  }

  // Search stories by title
  searchStories(query: string,pageSize: number, pageNumber: number): Observable<any[]> {
    this.loadingIndicatorService.show();
    let params = new HttpParams()
    .set('query', query)
    .set('pageSize', pageSize.toString())
    .set('pageNumber', pageNumber.toString());
    
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params }).pipe(
      tap(() => this.loadingIndicatorService.hide()));
  }
}