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
    reader.onload = (event: ProgressEvent<FileReader>) => {
      // called once readAsDataURL is completed
      this.url = event.target?.result?.toString() || "";
    };

    reader.onerror = (event: ProgressEvent<FileReader>) => {
      console.error(`Invalid Image File: ${event.target?.result}`);
    };

    if (event.target?.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // read file as data url
    } else {
      console.error(`Invalid Image File: ${event.target}`);
    }
  }

  public delete(): void {
    this.url = null;
  }

}
