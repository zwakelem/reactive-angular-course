import { AfterViewInit, Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import moment from "moment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Course } from "../model/course";
import { LoadingService } from "../services/loading.service";
import { MessagesService } from "../services/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  standalone: false,
  providers: [LoadingService, MessagesService],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private courseStore: CoursesStore,
    private messagesService: MessagesService
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value;

    this.courseStore.saveCourse(this.course.id, changes).subscribe();

    this.dialogRef.close(changes);

    /*const saveCourse$ = this.courseService
      .saveCourse(this.course.id, changes)
      .pipe(
        catchError((err) => {
          const message = "Could not save course";
          console.log(message, err);
          this.messagesService.showErrors(message);
          return throwError(err);
        })
      );
    this.loadingService
      .showLoaderUntilCompleted(saveCourse$)
      .subscribe((val) => {
        this.dialogRef.close(val);
      });*/
  }

  close() {
    this.dialogRef.close();
  }
}
