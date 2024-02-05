import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  template: `
    <h2 mat-dialog-title>PDF Viewer</h2>
    <mat-dialog-content>
      <iframe [src]="pdfUrl" style="width: 700px; height: 500px;"></iframe>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class PdfViewerComponent {
  pdfUrl: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { pdfBase64: string }, private sanitizer: DomSanitizer){
    const byteCharacters = atob(data.pdfBase64);
    const byteNumbers = Array.from(byteCharacters).map(ch => ch.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }
}