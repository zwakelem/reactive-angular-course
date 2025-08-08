import { Component, OnInit } from "@angular/core";
import { MessagesService } from "../services/messages.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
  standalone: false,
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  errors$: Observable<string[]>;

  constructor(public messagesService: MessagesService) {
    console.log("created messages component...");
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => (this.showMessages = true))
    );
  }

  onClose() {
    this.showMessages = false;
  }
}
