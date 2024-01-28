import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../../app/Models/Document'; // import your Document model
import { DOCUMENTS_API } from '../constants/constants'; // import your DOCUMENT_API constant

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocumentsByLandlordId(landlordId: string): Observable<Document[]> {
    const url = `${DOCUMENTS_API}/landlord/${landlordId}`;
    return this.http.get<Document[]>(url);
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
