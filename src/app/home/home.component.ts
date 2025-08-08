import { Component, OnInit } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Course, sortCoursesBySeqNo } from "../model/course";

import { CoursesService } from "../services/courses.service";
import { LoadingService } from "../services/loading.service";
import { MessagesService } from "../services/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: false,
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    // private cousersService: CoursesService,
    // private loadingService: LoadigService,
    // private messagesService: MessagesService,
    private coursesStore: CoursesStore
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");

    /*
    const courses$ = this.cousersService.loadAllCourses().pipe(
      map((courses) => courses.sort(sortCoursesBySeqNo)),
      catchError((err) => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      })
    );

    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    // courses$.subscribe((val) => console.log(val));

    this.beginnerCourses$ = courses$.pipe(
      map((courses) => courses.filter((cou) => cou.category == "BEGINNER"))
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) => courses.filter((cou) => cou.category == "ADVANCED"))
    );
    */
  }
}
