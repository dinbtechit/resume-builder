import { Component, HostBinding, OnDestroy} from '@angular/core';
import { ThemeService } from "./shared/service/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  title = 'Resume Builder';

  @HostBinding('class')
  themeMode: String = "";

  constructor(private themingService: ThemeService) {
    this.themingService.theme.subscribe((theme: String) => {
      this.themeMode = theme;
    });
  }

  ngOnDestroy(): void {
    this.themingService.theme.unsubscribe();
  }

}
