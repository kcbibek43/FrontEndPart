import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../Services/document.service';
import { Document } from '../Models/Document';
import { PropertyService } from '../Services/property.service';
import { Property } from '../Models/Property';
import { ViewChild, ElementRef } from '@angular/core';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

declare let Razorpay : any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  id: string = "";
  userId: string = "";
  document : Document = {
    id: '',
    landLordId: '',
    tenantId: '',
    doc: '',
    isVerified: false,
    propertyId: ''
  }
  isLoading = true;
  property: Property = {
    id: '',
    location: '',
    landLordId: '',
    rent: 0,
    description: '',
    type: '',
    numOfRooms: 0,
    isAvailable: false,
    availableFrom: new Date(),
    ameneties: [],
    images: []
  };

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(private snackBar: MatSnackBar,private router: Router,private propertyService: PropertyService,private route: ActivatedRoute, private documentService: DocumentService,private dialog: MatDialog) { } // Inject DocumentService

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // get user id from session storage
    this.userId = sessionStorage.getItem('id')!;

    this.propertyService.getPropertyById(this.id).subscribe((property) => {
      this.property = property;
      console.log(this.property);
    });
    // Use userId and id to get the document from the database
    this.documentService.getDocumentsByPropertyIdAndTenantId(this.userId, this.id).subscribe((document : Document) => {
      // Now you have the document and can use it
      // For example, you might want to assign it to a property of your component
      this.document = document;
      this.isLoading = false;
    },
    (err) => {
      // If there is no document, you will get an error
      // You can handle the error here
      this.isLoading = false;
    }
    );
  }

  openPdfViewer(pdfBase64: string) {
    this.dialog.open(PdfViewerComponent, {
      data: { pdfBase64 }
    });
  }

  payment(){
    this.razorpayResponse(this.property.rent);
   // this.openSnackBar2();
   }

 

  razorpayResponse(total: number) {
    var options = {
      key: "rzp_test_Etn6dsJEZuhuup", 
      amount: total, 
      name: "Acme Corp", 
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id:  "", 
      handler: (response: any) => {
        this.snackBar.open('Payment successful!', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/home/view', this.property.id]);  
        this.updateAvailability();
        
      },
      prefill: {
        name: "Gaurav Kumar", 
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        "color": "#F37254",
      },
    };
    const sucessCallback = (payment_id: any) => {
      alert("Payment Sucessfull");
    }
    var rzp1 = new Razorpay(options,sucessCallback);
    try {
      rzp1.open();
    } catch (err) {
      console.log(err);
    }
  }

  updateAvailability(): void {
    this.property.isAvailable = false;
    this.propertyService.updateProperty(this.property).subscribe();
  }

  onFileSelected(event: any): void {
      const file = event.target.files[0];
      const reader = new FileReader();
      console.log(event);

      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64 = base64String.split(',')[1]; // Get the base64 data

        this.document.doc = base64;
        this.document.propertyId = this.id;
        this.document.tenantId = this.userId;
        this.document.landLordId = this.property.landLordId;
        console.log(this.document);
      };

      reader.readAsDataURL(file);
    }
submit(): void {
  if (this.document?.doc) {
    this.documentService.updateDocument(this.document).subscribe();
  }
}

  getProperty(id: string): void {
    this.propertyService.getPropertyById(id).subscribe((property) => {
      this.property = property;
    });
  }
}
