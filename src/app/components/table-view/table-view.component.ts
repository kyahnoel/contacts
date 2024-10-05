import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

import { ContactsService } from 'src/app/service/contacts.service';
import { DynamicDialogComponent } from '../shared/dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {

  contacts: Contact[] = [];

  constructor(
    private contactService: ContactsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(){
    this.contactService.getAllContacts().subscribe({
      next: (response: Contact[]) => {
        this.contacts = response;
      }
    })
  }

  editContact(contact: Contact){
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      width: '350px',
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == null) return;

      this.contactService.updateContact(result.id, result).subscribe({
        next: () => {
          this.getContacts();
          console.log('successfully update');
        },
        error: (error) => {
          console.log(error);
        }
      });
    });
  }

  deleteContact(contact: Contact){
    if(!contact) return;

    const confirm = window.confirm('Delete Contact?');
    if(!confirm) return;

    this.contactService.deleteContact(contact.id!).subscribe({
      next: () => {
        this.getContacts();
        console.log('successfully deleted!');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
