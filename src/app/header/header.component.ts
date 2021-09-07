import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from "../shared/service/theme.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  themeToggle = new FormControl(false);

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeToggle.setValue(this.themeService.defaultOSTheme.value == 'dark-theme');
    this.themeToggle.valueChanges.subscribe((darkMode) => {
      this.themeService.userSelectedTheme.next(darkMode ? 'dark-theme' : 'light-theme');
    });
  }

  ngOnDestroy(): void {
    this.themeService.defaultOSTheme.unsubscribe();
  }
}
