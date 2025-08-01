import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: false,
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private cousersService: CoursesService) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    const courses$ = this.cousersService
      .loadAllCourses()
      .pipe(map((courses) => courses.sort(sortCoursesBySeqNo)));

    // courses$.subscribe((val) => console.log(val));

    this.beginnerCourses$ = courses$.pipe(
      map((courses) => courses.filter((cou) => cou.category == "BEGINNER"))
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) => courses.filter((cou) => cou.category == "ADVANCED"))
    );
  }
}
