import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../../app/Models/Document'; // import your Document model
import { DOCUMENTS_API, DOCUMENTS_API_PROPERTY } from '../constants/constants'; // import your DOCUMENT_API constant

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }




  getDocumentsByLandlordId(landlordId: string): Observable<Document[]> {
    const url = `${DOCUMENTS_API}/landlord/${landlordId}`;
    return this.http.get<Document[]>(url);
  }

  // write a function to get the document by tenant id
  getDocumentsByTenantId(tenantId: string): Observable<Document[]> {
    const url = `${DOCUMENTS_API}/tenant/${tenantId}`;
    return this.http.get<Document[]>(url);
  }

  // write a function to get the document by property id and tenent id using document api property constant
  getDocumentsByPropertyIdAndTenantId(tenantId: string, propertyId: string): Observable<Document> {
    const url = `${DOCUMENTS_API_PROPERTY}/${propertyId}/${tenantId}`;
    return this.http.get<Document>(url);
  }

  // write a function to post the document to the database
  updateDocument(document: Document): Observable<Document> {
    // if the document id is empty, then post the document to the database
    // else, update the document with the document id
    if(document.id === ""){
      return this.http.post<Document>(`${DOCUMENTS_API}`, document);
    }
    return this.http.put<Document>(`${DOCUMENTS_API}/${document.id}`, document);
  }
}
