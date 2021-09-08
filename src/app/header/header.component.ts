import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../shared/service/theme.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  themeToggle = new FormControl(false);

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeToggle.setValue(this.themeService.isDarkModeSelected());
    this.themeToggle.valueChanges.subscribe((darkMode) => {
      this.themeService.setUserSelectedTheme(darkMode);
    });
  }
}
