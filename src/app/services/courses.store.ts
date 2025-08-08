import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "./loading.service";
import { MessagesService } from "./messages.service";

@Injectable({
  providedIn: "root", // this means its a Singleton, one instance for the whole app
})
export class CoursesStore {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messagesService: MessagesService
  ) {
    this.loadCourses();
  }

  loadCourses() {
    const loadCourses$ = this.http.get<Course[]>("/api/courses").pipe(
      map((response) => response["payload"]),
      catchError((err) => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((courses) => this.subject.next(courses))
    );

    this.loading.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    // 1st find current value of course array
    const courses = this.subject.getValue();
    // find index of course we are updating
    const index = courses.findIndex((course) => course.id == courseId);
    // create new course from old course,& apply changes
    const newCourse: Course = { ...courses[index], ...changes };
    // add new Course to array
    const newCoursesArray: Course[] = courses.slice(0);
    newCoursesArray[index] = newCourse;
    // emit new array
    this.subject.next(newCoursesArray);

    // send to backend
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      catchError((err) => {
        const message = "Could not save course!!";
        console.log(message, err);
        this.messagesService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category == category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }
}
