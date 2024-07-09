import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchEvent with query on search method call', () => {
    spyOn(component.searchEvent, 'emit');
    component.query = 'Test Query';
    component.search();
    expect(component.searchEvent.emit).toHaveBeenCalledWith('Test Query');
  });

  it('should call search method on button click', () => {
    spyOn(component, 'search');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    expect(component.search).toHaveBeenCalled();
  });

  it('should call search method on enter key press', () => {
    spyOn(component, 'search');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.search).toHaveBeenCalled();
  });
});
