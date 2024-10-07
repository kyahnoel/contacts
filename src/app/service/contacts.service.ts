import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient
  ) { }

  url = 'http://localhost:3200/contacts';

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/${id}`);
  }

  addContact(data: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.url, data);
  }

  updateContact(id: string, data: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.url}/${id}`, data);
  }

  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${this.url}/${id}`);
  }

}
