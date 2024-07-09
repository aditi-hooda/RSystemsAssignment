import { TestBed } from '@angular/core/testing';

import { StoryService } from './story.service';
import { HttpClientModule } from '@angular/common/http';

describe('StoryService', () => {
  let service: StoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
            imports: [
              HttpClientModule
            ]
          }).compileComponents();
    service = TestBed.inject(StoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
