import { Component,OnInit } from '@angular/core';
import { StoryService } from '../../Services/story/story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  stories: any[] = [];
  currentPage = 1;
  totalPages = 30; // Placeholder, update this based on API response

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.getNewestStories(this.currentPage);
  }

  getNewestStories(pageNumber: number) {
    this.storyService.getNewestStories(this.totalPages, pageNumber).subscribe(
      (data: any[]) => {
        this.stories = data;
      },
      (error) => {
        console.error('Error fetching stories:', error);
      }
    );
  }

  search(query: string) {
    if (query.trim() !== '') {
      this.storyService.searchStories(query,this.totalPages,this.currentPage).subscribe(
        (data: any[]) => {
          this.stories = data;
        },
        (error) => {
          console.error('Error searching stories:', error);
        }
      );
    } else {
      this.getNewestStories(this.currentPage); // Fetch all stories if query is empty
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getNewestStories(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getNewestStories(this.currentPage);
    }
  }
}
