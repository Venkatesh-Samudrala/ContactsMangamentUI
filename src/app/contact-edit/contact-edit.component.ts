
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  // @Input() contact!: Contact;
  @Input() editMode: boolean = false;
  @Input() contactToEdit: Contact | null = null;

  newContact: Contact = { firstName: '', lastName: '', email: '' };

  @Output() add: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() update: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  ngOnInit(): void {
    // If in edit mode, initialize the form with the existing contact details
    if (this.editMode && this.contactToEdit) {
      this.newContact = { ...this.contactToEdit };
    }
  }

  onSubmit(): void {
    if(this.validateContact())
    {
      if (this.editMode) {

        this.update.emit(this.newContact);
      } else {
        this.add.emit(this.newContact);
      }
     
      this.resetForm();
    }
    
  }

  validateContact(): boolean {
    if(this.newContact.firstName=='')
    {
      alert("first Name is required");
      return false;
     // throw new Error('First name required');
    }
    else if(this.newContact.lastName=='')
    {
      alert("last name is required");
      return false;
     // throw new Error('First name required');
    }
    else if(this.newContact.email=='')
    {
      alert("email is required");
      return false;
     // throw new Error('First name required');
    }
    return true;
  }
  onCancel(): void {
    this.cancel.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.newContact = { firstName: '', lastName: '', email: '' };
  }
}


// src/app/contact-edit.component.ts



