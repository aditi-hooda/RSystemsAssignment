import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LoaderComponent } from './loader.component';
import { LoadingIndicatorService } from './../../Services/loading-indicator/loading-indicator.service';

class MockLoadingIndicatorService {
  isLoading$ = new BehaviorSubject<boolean>(false);
}

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loadingIndicatorService: MockLoadingIndicatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [
        { provide: LoadingIndicatorService, useClass: MockLoadingIndicatorService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    loadingIndicatorService = TestBed.inject(LoadingIndicatorService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading based on the service', () => {
    loadingIndicatorService.isLoading$.next(true);
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();

    loadingIndicatorService.isLoading$.next(false);
    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
  });

  it('should display loader when isLoading is true', () => {
    loadingIndicatorService.isLoading$.next(true);
    fixture.detectChanges();
    const loaderElement = fixture.debugElement.query(By.css('.loader-overlay'));
    expect(loaderElement).toBeTruthy();
  });

  it('should not display loader when isLoading is false', () => {
    loadingIndicatorService.isLoading$.next(false);
    fixture.detectChanges();
    const loaderElement = fixture.debugElement.query(By.css('.loader-overlay'));
    expect(loaderElement).toBeFalsy();
  });
});
