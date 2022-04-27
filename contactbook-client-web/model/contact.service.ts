import { Injectable } from '@angular/core';
import { Contact } from "../model/contact";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiURL: string = 'https://localhost:7187/';

  constructor(private http: HttpClient) {
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiURL + 'contactitems');
  }

  postNewContact(contact: any): Observable<Contact> {
    let body = JSON.stringify(contact);

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    return this.http.post<Contact>(this.apiURL + 'contactitems', body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  putContact(contact: Contact, id: number): Observable<Contact> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    return this.http.put<Contact>(this.apiURL + 'contactitems/' + id, contact, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteContact(id: number): Observable<unknown> {
    const url = this.apiURL + 'contactitems/' + id;

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    return this.http.delete(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private MYCONTACTS: Contact[] = [
    {
      "id": 1,
      "title": "Herr",
      "surname": "Smith",
      "forename": "John",
      "dateOfBirth": "2001-01-16",
      "street": "Brucker Str.",
      "houseNumber": 8,
      "district": "Bayern",
      "city": "Egenhofen",
      "postCode": 82281,
      "country": "DE",
      "telephoneNumber": "+4918345558833",
      "iban": "DE63 1001 1001 1001 1001 10"
    },
    {
      "id": 2,
      "title": "Herr",
      "surname": "Schmidt",
      "forename": "Johannes",
      "dateOfBirth": "1984-03-04",
      "street": "Brucker Str.",
      "houseNumber": 8,
      "district": "Bayern",
      "city": "Egenhofen",
      "postCode": 82281,
      "country": "DE",
      "telephoneNumber": "+4918345558833",
      "iban": "DE63 1001 1001 1001 1001 10"
    },
  ];

  // to test with local mock data
  public getMyContacts(): Contact[] {
    return this.MYCONTACTS;
  }
}
