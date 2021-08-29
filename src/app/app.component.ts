import { Component, HostBinding, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";
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
  private themingSubscription: Subscription;


  constructor(private themingService: ThemeService) {
    this.themingSubscription = this.themingService.theme.subscribe((theme: String) => {
      this.themeMode = theme;
    });
  }

  ngOnDestroy(): void {
    this.themingSubscription.unsubscribe();
  }

}
