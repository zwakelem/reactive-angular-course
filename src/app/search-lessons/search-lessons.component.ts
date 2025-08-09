import { Component, OnInit } from "@angular/core";
import { CoursesService } from "../services/courses.service";
import { Observable } from "rxjs";
import { Lesson } from "../model/lesson";

@Component({
  selector: "course",
  templateUrl: "./search-lessons.component.html",
  styleUrls: ["./search-lessons.component.css"],
  standalone: false,
})
export class SearchLessonsComponent implements OnInit {
  searchResults$: Observable<Lesson[]>;
  activeLesson: Lesson;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {}

  onSearch(searchString: string) {
    this.searchResults$ = this.coursesService.searchLessons(searchString);
  }

  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }

  onBackToSearch() {
    this.activeLesson = null;
  }
}
