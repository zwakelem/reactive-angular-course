import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  loadCourseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay());
  }

  loadAllCoursesLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: {
          pageSize: "100000",
          courseId: courseId.toString(),
        },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }

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
