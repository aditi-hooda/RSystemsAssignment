import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { StoryListComponent } from './story-list.component';
import { StoryService } from '../../Services/story/story.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockStoryService {
  getNewestStories(totalPages: number, pageNumber: number) {
    return of([]);
  }
  searchStories(query: string, totalPages: number, pageNumber: number) {
    return of([]);
  }
}

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let storyService: StoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryListComponent],
      providers: [{ provide: StoryService, useClass: MockStoryService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNewestStories on ngOnInit', () => {
    spyOn(component, 'getNewestStories');
    component.ngOnInit();
    expect(component.getNewestStories).toHaveBeenCalledWith(component.currentPage);
  });

  it('should fetch stories on getNewestStories call', () => {
    const stories = [{ title: 'Test Story', by: 'Author', postedOn: 'Today' }];
    spyOn(storyService, 'getNewestStories').and.returnValue(of(stories));
    component.getNewestStories(1);
    expect(component.stories).toEqual(stories);
  });

  it('should handle error on getNewestStories call', () => {
    spyOn(storyService, 'getNewestStories').and.returnValue(throwError('Error'));
    spyOn(console, 'error');
    component.getNewestStories(1);
    expect(console.error).toHaveBeenCalledWith('Error fetching stories:', 'Error');
  });

  it('should search stories correctly', () => {
    const stories = [{ title: 'Test Story', by: 'Author', postedOn: 'Today' }];
    spyOn(storyService, 'searchStories').and.returnValue(of(stories));
    component.search('Test');
    expect(component.stories).toEqual(stories);
  });

  it('should handle error on search call', () => {
    spyOn(storyService, 'searchStories').and.returnValue(throwError('Error'));
    spyOn(console, 'error');
    component.search('Test');
    expect(console.error).toHaveBeenCalledWith('Error searching stories:', 'Error');
  });

  it('should fetch all stories if search query is empty', () => {
    spyOn(component, 'getNewestStories');
    component.search('');
    expect(component.getNewestStories).toHaveBeenCalledWith(component.currentPage);
  });

  it('should navigate to the next page and fetch stories', () => {
    spyOn(component, 'getNewestStories');
    component.currentPage = 1;
    component.totalPages = 3;
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.getNewestStories).toHaveBeenCalledWith(2);
  });

  it('should not navigate to the next page if on the last page', () => {
    spyOn(component, 'getNewestStories');
    component.currentPage = 3;
    component.totalPages = 3;
    component.nextPage();
    expect(component.currentPage).toBe(3);
    expect(component.getNewestStories).not.toHaveBeenCalled();
  });

  it('should navigate to the previous page and fetch stories', () => {
    spyOn(component, 'getNewestStories');
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
    expect(component.getNewestStories).toHaveBeenCalledWith(1);
  });

  it('should not navigate to the previous page if on the first page', () => {
    spyOn(component, 'getNewestStories');
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(1);
    expect(component.getNewestStories).not.toHaveBeenCalled();
  });
});
