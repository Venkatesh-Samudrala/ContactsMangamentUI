// import { Component } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
// import { ContactHttpService } from '../_services/http.services';
import { ContactHttpService } from '../services/contact.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-contacts-main',
    standalone: true,
    templateUrl: './contacts-main.component.html',
    styleUrl: './contacts-main.component.css',
    imports: [PaginationComponent,CommonModule,ContactEditComponent]
})
export class ContactsmainComponent implements OnInit{
  public currentPageContacts: Contact[] = [];
  public TotalContacts: Contact[] = [];
  public selectedContact: Contact | null = null;
  public current: number = 1;
  public total: number = 1;
  public perPage = 10
  isContactsExists:boolean=false;
  public displayedColumns: string[] = ['Id','First Name', 'Last Name', 'Email', 'Action'];
  public isContactEdit: boolean=false;
  // public currentPageContacts: MatTableDataSource<Element>
  constructor(private contactHttpService: ContactHttpService,  public dialog: MatDialog) {
    
  }
  // ngOnInit(): void {
  //   this.searchContact('');
  // }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactHttpService.getContacts().subscribe((data) => {
      this.TotalContacts =  data;
      // console.log(this.TotalContacts);
      this.isContactsExists=true;
      this.total = Math.ceil(this.TotalContacts.length / this.perPage);
      this.currentPageContacts = this.paginate(this.current, this.perPage);
    });
  }

  deleteContact(Contact: Contact): void {
    let id =Number(Contact.id);
    this.contactHttpService.deleteContact(id).subscribe(() => {
      alert("contact deleted successfully");
      this.loadContacts();
    });
    this.isContactEdit = false;
  }

  editContact(contact: Contact): void {
    this.selectedContact = { ...contact };
    this.isContactEdit = true;
  }
  resetFlags(){
    this.isContactEdit = false;
    this.selectedContact = null;
  }

  saveContact(editedContact: Contact): void {
   
    if (editedContact.id) {
      this.contactHttpService.updateContact(editedContact.id, editedContact).subscribe(() => {
        alert("contact updated successfully");
        this.loadContacts();
        // this.selectedContact = null;
        this.resetFlags();
      });
    } else {
      this.contactHttpService.addContact(editedContact).subscribe(() => {
        alert("contact added successfully");
        this.loadContacts();
        // this.selectedContact = null;
        this.resetFlags();
      });
    }
  }

  addContact(newContact: Contact): void {
    this.contactHttpService.addContact(newContact).subscribe(() => {
      alert("contact added successfully");
      this.loadContacts();
      this.resetFlags();
    });
  }
  addContactClick()
  {
    this.resetFlags();
  this.isContactEdit=true;

  }

  cancelEdit(): void {
    // this.selectedContact = null;
    // this.isContactEdit = false;
    this.resetFlags();
  }


  searchContact(
    event: string|null
    ) {
    //const searchTerm: string = (event.target as HTMLInputElement).value;

    // this.contactHttpService.getContacts<Contact[]>(searchInput)).subscribe((result: any) => {
    this.contactHttpService.getContacts().subscribe((result: any) => {
      this.TotalContacts =  result;
      console.log(this.TotalContacts);
      // JSON.parse(localStorage.getItem('currentUser')!);
      this.isContactsExists=true;
      this.total = Math.ceil(this.TotalContacts.length / this.perPage);
      this.currentPageContacts = this.paginate(this.current, this.perPage);
    })
  }

  searchStories(searchInput: any) {
    searchInput == null ? "" : searchInput;
    this.searchContact(searchInput.value);
  }
  public onGoTo(page: number): void {
    this.current = page
    this.currentPageContacts = this.paginate(this.current, this.perPage)
  }
  
  public onNext(page: number): void {
    this.current = page + 1
    this.currentPageContacts = this.paginate(this.current, this.perPage)
  }
  
  public onPrevious(page: number): void {
    this.current = page - 1
    this.currentPageContacts = this.paginate(this.current, this.perPage)
  }
  
  public paginate(current: number, perPage: number): Contact[] {
    return [...this.TotalContacts.slice((current - 1) * perPage).slice(0, perPage)]
  }

}


