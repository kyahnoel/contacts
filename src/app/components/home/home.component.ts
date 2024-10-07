import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { DynamicDialogComponent } from '../shared/dynamic-dialog/dynamic-dialog.component';
import { ContactsService } from 'src/app/service/contacts.service';
import { Contact } from 'src/app/models/contact.model';
import { CardViewComponent } from '../card-view/card-view.component';
import { TableViewComponent } from '../table-view/table-view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  contactView: string = 'card';
  contacts: Contact[] = [];

  @ViewChild(CardViewComponent) cardViewComponent!: CardViewComponent;
  @ViewChild(TableViewComponent) tableViewComponent!: TableViewComponent;

  constructor(
    public dialog: MatDialog,
    private contactService: ContactsService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.location.subscribe((response) => {
      console.log(response);
    })
  }

  addContact(){
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == null) return;

      this.contactService.addContact(result).subscribe({
        next: () => {
          this.refreshChildren();
          console.log('success');
        },
        error: (error) => {
          console.log(error);
        }
      })
    });
  }

  triggerDisplay(action: string){
    this.contactView = action;
    this.refreshChildren();
  }

  refreshChildren(): void{
    this.cardViewComponent.getContacts();
    this.tableViewComponent.getContacts();
  }

}
