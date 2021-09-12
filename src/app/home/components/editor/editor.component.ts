import { Component, OnInit } from '@angular/core';
import { LocationService } from "./services/location.service";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Role } from './model/role';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  geoLocation= "";
  locationDetails = "";
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  roles: Role[] = [
    {name: 'Full Stack Developer'},
    {name: 'UX Designer'}
  ];

  constructor(private location: LocationService) {
  }

  ngOnInit(): void {
    this.location.getLocation().subscribe((res) => {
      if (res) {
        this.geoLocation = `${res?.city}, ${res?.regionName}, ${res?.country}`;
        this.locationDetails = this.geoLocation;
      }
    }, error => {
      console.error("Error retrieving location.");
    });
  }

  locationReset(): void {
    this.locationDetails = this.geoLocation;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.roles.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(role: Role): void {
    const index = this.roles.indexOf(role);

    if (index >= 0) {
      this.roles.splice(index, 1);
    }
  }
}
