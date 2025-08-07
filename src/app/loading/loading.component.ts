import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoadigService } from "../services/loading.service";

@Component({
  selector: "loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
  standalone: false,
  providers: [],
})
export class LoadingComponent implements OnInit {
  constructor(public loadingService: LoadigService) {}

  ngOnInit() {}
}
