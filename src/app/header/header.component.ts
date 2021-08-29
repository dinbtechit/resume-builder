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
    this.themeToggle.setValue(this.themeService.theme.value == 'dark-theme');
    this.themeToggle.valueChanges.subscribe((darkMode) => {
      this.changeTheme(darkMode ? 'dark-theme' : 'light-theme');
    });
  }

  changeTheme(theme: string) {
    this.themeService.theme.next(theme);
  }

  ngOnDestroy(): void {
    this.themeService.theme.unsubscribe();
  }
}
