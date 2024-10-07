import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ContactsService } from 'src/app/service/contacts.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  contact: Contact = {
    name: '',
    email: '',
    contact: '',
  };

  id: string = '';

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactsService
  ){
    
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.contactService.getContact(this.id).subscribe({
      next: (response: Contact) => {
        this.contact.name = response.name;
        this.contact.email = response.email;
        this.contact.contact = response.contact;
      }
    })
  }
}
