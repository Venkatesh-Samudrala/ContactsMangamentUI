import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { first } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('raises the onNext event when clicked', () => {
    const comp = new PaginationComponent();
    const current: number = 3;
    comp.current = current;

    comp.next.pipe(first()).subscribe((selectedCurrentPage: number) => expect(selectedCurrentPage).toBe(current));
    comp.onNext();
  });

  it('raises the onPrevious event when clicked', () => {
    const comp = new PaginationComponent();
    const current: number = 3;
    comp.current = current;

    comp.previous.pipe(first()).subscribe((selectedCurrentPage: number) => expect(selectedCurrentPage).toBe(current));
    comp.onPrevious();
  });

  it('raises the onGoTo event when clicked', () => {
    const comp = new PaginationComponent();
    const page: number = 3;

    comp.goTo.pipe(first()).subscribe((selectedCurrentPage: number) => expect(selectedCurrentPage).toBe(page));
    comp.onGoTo(page);
  });

});
