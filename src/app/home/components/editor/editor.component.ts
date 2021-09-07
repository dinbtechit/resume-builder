import { Component, OnInit } from '@angular/core';
import { LocationService } from "./services/location.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  geoLocation= "";
  locationDetails = "";

  constructor(private location: LocationService) {
  }

  ngOnInit(): void {
    this.location.getLocation().subscribe((res) => {
      if (res) {
        this.geoLocation = `${res?.city}, ${res?.regionName}, ${res?.country}`;
        this.locationDetails = this.geoLocation;
      }
    });
  }

  locationReset(): void {
    this.locationDetails = this.geoLocation;
  }
}
