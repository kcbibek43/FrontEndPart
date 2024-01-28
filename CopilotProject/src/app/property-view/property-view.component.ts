import { Component } from '@angular/core';
import { Property } from '../Models/Property';
import { PropertyService } from '../Services/property.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.css']
})
export class PropertyViewComponent {
  role :string | null = '';
 // Adjust the path as needed
 isLoading = true;
 searchTerm: string = '';
 locationSearchTerm: string = '';
 selectedRoomCount: string = '';
 selectedPriceRange: string = '';
properties: Property[] = [];
filteredProperties: Property[] = [];
constructor(private propertyService: PropertyService,private router: Router) { }

ngOnInit(): void {
  this.role = sessionStorage.getItem('role');
  if (this.role === 'tenant') {
    this.propertyService.getProperties().subscribe(
      properties => {
        this.properties = properties;
        this.filteredProperties = properties;
        this.isLoading = false;
      },
      error =>{
        this.isLoading = false;
        console.error(error)
      }

    );
  } else if (this.role === 'landlord') {
    const landlordId = sessionStorage.getItem("id"); // Assuming the landlordId is stored in the session
    if (landlordId) {
      this.propertyService.getPropertiesByLandlordId(landlordId).subscribe(
        properties => {
          this.properties = properties;
          this.filteredProperties = properties;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          console.error(error)}
      );
    }
  }
}
viewProperty(id: string): void {
  this.router.navigate(['home/view/', id]);
}

search(): void {
  console.log(this.searchTerm);
  if (this.searchTerm) {
    this.filteredProperties = this.properties.filter(property =>
      property.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } else {
    this.filteredProperties = this.properties;
  }
}

locationSearch(): void {
  if (this.locationSearchTerm) {
    this.filteredProperties = this.properties.filter(property =>
      property.location.toLowerCase().includes(this.locationSearchTerm.toLowerCase())
    );
  } else {
    this.filteredProperties = this.properties;
  }
}



filterByRoomCount(): void {
  const roomCount = Number(this.selectedRoomCount);

  if (roomCount) {
    this.filteredProperties = this.properties.filter(property =>
      property.numOfRooms === roomCount
    );
  } else {
    this.filteredProperties = this.properties;
  }
}

filterByPriceRange(): void {
  const [min, max] = this.selectedPriceRange.split('-').map(Number);

  if (min && max) {
    this.filteredProperties = this.properties.filter(property =>
      property.rent >= min && property.rent <= max
    );
  } else {
    this.filteredProperties = this.properties;
  }
}
}
