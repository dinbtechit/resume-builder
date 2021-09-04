import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

  url: string | null = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  async onSelectFile(event: any): Promise<void> {
    await this.uploadImage(event);
  }

  uploadImage(event: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      if (event.target?.result && typeof event.target?.result == 'string') {
        this.url = event.target?.result || "";
      } else {
        console.error(`Invalid Image File: ${event.target?.result}`);
      }
    };
  }

  public delete(): void {
    this.url = null;
  }

}
