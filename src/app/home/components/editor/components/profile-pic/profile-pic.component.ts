import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

  url: string | ArrayBuffer | null | undefined = '';
  imageName = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelectFile(event: any): void {

    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.error("Only images are supported");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event: ProgressEvent<FileReader>) => {
      // called once readAsDataURL is completed
      this.url = reader.result || "";
    };

    reader.onerror = (event: ProgressEvent<FileReader>) => {
      console.error(`Invalid Image File: ${event.target?.result}`);
    };
  }

  public delete(): void {
    this.url = "";
    this.imageName = "";
  }

}
