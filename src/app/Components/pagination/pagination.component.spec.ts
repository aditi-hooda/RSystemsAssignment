import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(1);
  });

  it('should emit nextPageEvent when nextPage is called', () => {
    spyOn(component.nextPageEvent, 'emit');
    component.nextPage();
    expect(component.nextPageEvent.emit).toHaveBeenCalled();
  });

  it('should emit prevPageEvent when prevPage is called', () => {
    spyOn(component.prevPageEvent, 'emit');
    component.prevPage();
    expect(component.prevPageEvent.emit).toHaveBeenCalled();
  });

  it('should disable "Previous" button when currentPage is 1', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const prevButton = fixture.debugElement.query(By.css('.page-item .page-link')).nativeElement;
    expect(prevButton.disabled).toBeTrue();
  });

  it('should disable "Next" button when currentPage is totalPages', () => {
    component.currentPage = 5;
    component.totalPages = 5;
    fixture.detectChanges();
    const nextButton = fixture.debugElement.query(By.css('.page-item:nth-child(3) .page-link')).nativeElement;
    expect(nextButton.disabled).toBeTrue();
  });

  it('should call prevPage on "Previous" button click', () => {
    spyOn(component, 'prevPage');
    component.currentPage = 2;
    fixture.detectChanges();
    const prevButton = fixture.debugElement.query(By.css('.page-item .page-link')).nativeElement;
    prevButton.click();
    expect(component.prevPage).toHaveBeenCalled();
  });

  it('should call nextPage on "Next" button click', () => {
    spyOn(component, 'nextPage');
    component.currentPage = 1;
    component.totalPages = 2;
    fixture.detectChanges();
    const nextButton = fixture.debugElement.query(By.css('.page-item:nth-child(3) .page-link')).nativeElement;
    nextButton.click();
    expect(component.nextPage).toHaveBeenCalled();
  });
});
