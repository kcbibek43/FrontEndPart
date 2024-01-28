import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../Services/property.service';
import { Property } from '../Models/Property';
import { ReviewService } from '../Services/review.service';
import { Review } from '../Models/Review';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent {
  id: string | null = null;
  isLoading = true;
  property: Property | undefined;
  review: Review = {
    id: '',
    propertyId: '',
    review: [],
    rating: [],
    userName: []
  };
  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private reviewService: ReviewService) { }
  reviewForm = new FormGroup({
    review: new FormControl(''),
    rating: new FormControl('')
  });
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.propertyService.getPropertyById(this.id).subscribe(property => {
        this.property = property;
        this.isLoading = false;
      });
      this.getReviews();
    }

}

getReviews(): void {
  this.reviewService.getReviews(this.id!).subscribe((reviews : Review)=> {
    this.review = reviews;
    this.isLoading = false;
  });
}

onSubmit(): void {
  console.log(this.reviewForm.value);
  // in the current review object, push  the review and rating and usrename  with the new values from the form and session storage in tthe list in the review respectively
  this.review?.review.push(this.reviewForm.value.review!);
  this.review?.rating.push(+(this.reviewForm.value.rating!));
  this.review?.userName.push(sessionStorage.getItem('userName')!);
  // add the property id to the review object
  this.review.propertyId = this.property?.id!;



  if (this.review) {
    this.reviewService.updateReview(this.review).subscribe(review => {
      this.review = review;
      this.getReviews();
      this.reviewForm.reset();
      
    });
  }
}
}
