import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Course } from "../model/course";
import { delay, map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  loadAllCourses(): Observable<Course[]> {
    /*console.log("ERROR loading courses!");
    return throwError(() => new Error("Error occurred!!"));*/

    return this.http.get<Course[]>("/api/courses").pipe(
      // delay(3500),
      map((res) => res["payload"]),
      shareReplay() // share the results will all observables which stops multiples http calls
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    /* console.log("ERROR loading courses!");
    return throwError(() => new Error("Could not save course!!")); */

    return this.http
      .put(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: {
          filter: search,
          pageSize: "100",
        },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }
}
