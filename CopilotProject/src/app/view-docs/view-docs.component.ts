import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../Services/document.service';
import { Document } from '../Models/Document';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.css']
})
export class ViewDocsComponent implements OnInit {
  documents : Document[] = [];
  isLoading : boolean = true;
  displayedColumns: string[] = ['sno', 'username', 'property', 'documentSubmitted', 'status'];
  constructor(private documentService: DocumentService,private dialog: MatDialog) { }

  ngOnInit() {
    const landlordId = sessionStorage.getItem('id');// replace with your landlordId
    if (landlordId) {
      this.fetchDocuments(landlordId);
    }
  }

  verifyDocument(documentId: string) {
    // just change the status of the document to isVerified of documents with the documentId as true
    this.documents.forEach(document => {
      if (document.id === documentId) {
        // update document
        document.isVerified = true;
        this.updateDocument(document);
      }
    })
  }


  openPdfViewer(pdfBase64: string) {
    this.dialog.open(PdfViewerComponent, {
      data: { pdfBase64 }
    });
  }
  // update the document with the document id in which the document is verified
  updateDocument(document: Document) {
    this.documentService.updateDocument(document).subscribe({
      next: (document: Document) => {
        console.log(document);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  fetchDocuments(landlordId: string) {
    this.documentService.getDocumentsByLandlordId(landlordId).subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
        this.isLoading = false;
        console.log(documents);
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
