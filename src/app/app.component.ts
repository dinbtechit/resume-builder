import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ThemeService } from "./shared/service/theme.service";
import { HeaderComponent } from "./header/header.component";
import { combineLatest, forkJoin, Observable } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  title = 'Resume Builder';

  @HostBinding('class')
  themeMode: string = "";

  constructor(private themingService: ThemeService) {
    combineLatest([this.themingService.defaultOSTheme, this.themingService.userSelectedTheme])
      .subscribe(([osTheme, userSelectedTheme]) => {
      console.log(`OS Theme : ${osTheme}`);
      console.log(`user Selected Theme: ${userSelectedTheme}`);
      this.themeMode = userSelectedTheme? userSelectedTheme :osTheme;
    });
  }

  ngOnDestroy(): void {
    this.themingService.defaultOSTheme.unsubscribe();
    this.themingService.userSelectedTheme.unsubscribe();
  }

}
