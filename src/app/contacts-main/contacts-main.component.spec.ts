import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsmainComponent } from './contacts-main.component';

describe('ContactsHeaderComponent', () => {
  let component: ContactsmainComponent;
  let fixture: ComponentFixture<ContactsmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactsmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
