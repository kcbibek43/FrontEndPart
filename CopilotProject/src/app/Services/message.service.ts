import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../app/Models/Message'; // replace with the actual path to your Message model
import { MESSAGES_API } from '../constants/constants'; // replace with the actual path to your Constants

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages() {
      const role = sessionStorage.getItem('role');
      let url;

      // if the role is landlord, then get the messages by landlord id
      // else, get the messages by tenant id
      if(role === 'landlord'){
        const landlordId = sessionStorage.getItem('id');
        url = `${MESSAGES_API}/landlord/${landlordId}`;
      }
      else{
        const tenantId = sessionStorage.getItem('id');
        url = `${MESSAGES_API}/tenant/${tenantId}`;
      }
      return this.http.get<Message[]>(url);
  }
}