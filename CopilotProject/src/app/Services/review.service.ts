import { Injectable } from '@angular/core';
import { Review } from '../Models/Review';
import { HttpClient } from '@angular/common/http';
import { REVIEWS_API } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  getReviews(propertyId: string): Observable<Review> {
    return this.http.get<Review>(`${REVIEWS_API}/${propertyId}`);
  }

  // write a post request to push the request to the database
  updateReview(review: Review): Observable<Review> {
    console.log(review);
    if(review.id === ""){
      return this.http.post<Review>(`${REVIEWS_API}`, review);
    }
    return this.http.put<Review>(`${REVIEWS_API}/${review.id}`, review);
  }

}
