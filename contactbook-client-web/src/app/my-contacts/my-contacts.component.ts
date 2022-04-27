import { Component, OnInit } from '@angular/core';

import { Contact } from 'model/contact';
import { ContactService } from "model/contact.service";

import { Table } from 'primeng/table';
import { FormBuilder } from '@angular/forms';

import { AgePipe } from "src/app/age.pipe";

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.scss']
})
export class MyContactsComponent implements OnInit {

  contacts!: Contact[];
  contactsString!: Contact[];

  displayAddContact: boolean = false;
  displayEditContact: boolean = false;

  constructor(private contactService: ContactService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  newContactForm = this.formBuilder.group({
    title: '',
    surname: '',
    forename: '',
    dateOfBirth: '',
    street: '',
    houseNumber: '',
    district: '',
    city: '',
    postCode: '',
    country: '',
    telephoneNumber: '',
    iban: ''
  });

  editContactForm = this.formBuilder.group({
    title: '',
    surname: '',
    forename: '',
    dateOfBirth: '',
    street: '',
    houseNumber: '',
    district: '',
    city: '',
    postCode: '',
    country: '',
    telephoneNumber: '',
    iban: ''
  });

  clear(table: Table) {
    table.clear();
  }

  getAllContacts(): void {
    this.contacts = this.contactService.getMyContacts();

    if (this.contacts)
      this.contacts.forEach(function (value) {
        if (value.dateOfBirth != null)
          value.age = new AgePipe().transform(value.dateOfBirth);
        else
          value.age = null;
      });

    this.contactService.getAllContacts().subscribe((contact: any) => {
      this.contactsString = contact;

      this.contactsString.forEach(function (value) {
        if (value.dateOfBirth != null)
          value.age = new AgePipe().transform(value.dateOfBirth);
        else
          value.age = null;
      });
    });
  }

  showEditContact(contact: Contact): void {
    this.editContactForm.setValue({
      title: contact.title,
      surname: contact.surname,
      forename: contact.forename,
      dateOfBirth: contact.dateOfBirth,
      street: contact.street,
      houseNumber: contact.houseNumber,
      district: contact.district,
      city: contact.city,
      postCode: contact.postCode,
      country: contact.country,
      telephoneNumber: contact.telephoneNumber,
      iban: contact.iban
    });
    this.displayEditContact = true;
  }

  onSubmitEditContact(contact: Contact): void {
    console.log("contact: " + JSON.stringify(contact));
    console.log("Edit Contact View: " + JSON.stringify(this.editContactForm.value));
    this.contactService
      .putContact(this.editContactForm.value, contact.id)
      .subscribe(contact => this.getAllContacts());
    this.editContactForm.reset();
    this.displayEditContact = false;
  }

  onAddContact(): void {
    this.contactService
      .postNewContact(this.newContactForm.value)
      .subscribe(contact => {
        if (contact.dateOfBirth != null)
          contact.age = new AgePipe().transform(contact.dateOfBirth);
        else
          contact.age = null;
        this.contactsString.push(contact);
      });
    this.newContactForm.reset();
    this.displayAddContact = false;
  }

  onDeleteContact(contact: Contact) {
    this.contactService.deleteContact(contact.id).subscribe(contact => this.getAllContacts());
  }
}
