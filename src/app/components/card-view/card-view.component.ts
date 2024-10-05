import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/service/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from '../shared/dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {

  contacts: Contact[] = [];

  constructor(
    private dialog: MatDialog,
    private contactService: ContactsService
  ){}

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
      width: '500px',
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
