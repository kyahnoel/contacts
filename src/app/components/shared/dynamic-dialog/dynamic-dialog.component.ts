import { Component, Inject } from '@angular/core';
import { 
  FormControl, 
  Validators, 
  ValidatorFn, 
  ValidationErrors, 
  AbstractControl,
  FormGroup
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent {

  contacts = new FormGroup({
    name: new FormControl('',[
      Validators.required,
    ]),
    contact: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^[0-9]*$/),
      this.phoneNumberValidator()
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ])
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private dialogRef: MatDialogRef<DynamicDialogComponent>
  ){ 
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneRegex = /^[0-9]{11}$/; 
      const valid = phoneRegex.test(control.value);
      return valid ? null : { invalidPhoneNumber: true };
    };
  }

  hasData(){
    if(this.data){
      this.contacts.patchValue({
        name: this.data.name,
        contact: this.data.contact,
        email: this.data.email,
      })
    }
  }

  ngOnInit(): void {
    this.hasData();
  }

  onAdd(): void{
    this.dialogRef.close(this.contacts.value);
  }

  onUpdate(): void {
    let data: Contact = {
      id: this.data.id,
      name: this.contacts.value.name ?? '',
      contact: this.contacts.value.contact ?? '',
      email: this.contacts.value.email ?? ''
    }

    this.dialogRef.close(data);
  }

  onCancel(): void{
    this.dialogRef.close(null);
  }

}
