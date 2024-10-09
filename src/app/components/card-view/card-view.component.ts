import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/service/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from '../shared/dynamic-dialog/dynamic-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {

  contacts: Contact[] = [];

  constructor(
    private dialog: MatDialog,
    private contactService: ContactsService,
    public router: Router
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

  editContact(contact: Contact, e: Event){
    e.stopPropagation();
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

  deleteContact(contact: Contact, e: Event){
    e.stopPropagation();
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
