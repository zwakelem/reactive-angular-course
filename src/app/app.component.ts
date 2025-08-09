import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./services/loading.service";
import { MessagesService } from "./services/messages.service";
import { CommonModule } from "@angular/common";
import { AuthStore } from "./services/auth.store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [LoadingService, MessagesService, CommonModule],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthStore) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
