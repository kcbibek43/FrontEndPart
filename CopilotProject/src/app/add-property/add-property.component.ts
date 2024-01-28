import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PropertyService } from '../Services/property.service';
import { Router } from '@angular/router';
import { Property } from '../Models/Property';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  propertyForm!: FormGroup ;
  ameneties = ['Gym', 'Swimming Pool', 'Clubhouse', 'Games Room', 'Rooftop Lounge', 'Community Garden', 'Parking'];

  constructor(private fb: FormBuilder, private propertyService: PropertyService, private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.propertyForm = this.fb.group({
      location: '',
      landLordId: sessionStorage.getItem('id'),
      rent: '',
      description: '',
      type: '',
      numOfRooms: '',
      isAvailable: true,
      availableFrom: '',
      amenities: this.buildAmenities(),
      images: this.fb.array([])
    });
  }

  buildAmenities() {
    const arr = this.ameneties.map(amenity => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  get images() {
    return this.propertyForm.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.propertyForm.value);

    if (this.propertyForm.valid) {
      const property: Property = {
        id: '',
        location: this.propertyForm.value.location,
        landLordId: this.propertyForm.value.landLordId,
        rent: this.propertyForm.value.rent,
        description: this.propertyForm.value.description,
        type: this.propertyForm.value.type,
        numOfRooms: this.propertyForm.value.numOfRooms,
        isAvailable: this.propertyForm.value.isAvailable,
        availableFrom: this.propertyForm.value.availableFrom,
        ameneties: this.propertyForm.value.amenities,
        images: this.propertyForm.value.images,
      };

      property.ameneties = property.ameneties
        .map((selected, i) => selected ? this.ameneties[i] : null)
        .filter((amenity): amenity is string => amenity !== null);

      console.log(property);
      this.propertyService.addProperty(property).subscribe({
        next: response => {
          // handle successful response
          this.router.navigate(['/home']); // navigate to home page
          this.snackBar.open('Property added successfully', 'Close', {
            duration: 2000,
          });
        },
        error: error => {
          // handle error response
          this.snackBar.open('Failed to add property', 'Close', {
            duration: 2000,
          });
        }
      });
    }


  }
}
