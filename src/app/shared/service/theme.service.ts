import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _themes = ["dark-theme", "light-theme"];
  defaultOSTheme = new BehaviorSubject("dark-theme");
  userSelectedTheme: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem("userSelectedTheme") || "");

  constructor(private ref: ApplicationRef) {
    // initially trigger dark mode if preference is set to dark mode on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (darkModeOn) {
      this.defaultOSTheme.next("dark-theme");
    } else {
      this.defaultOSTheme.next("light-theme");
    }

    // watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
      const turnOn = e.matches;
      this.defaultOSTheme.next(turnOn ? "dark-theme" : "light-theme");
      // trigger refresh of UI
      this.ref.tick();
    });
  }

  isDarkModeSelected(): boolean {
    return this.userSelectedTheme.value ? this.userSelectedTheme.value == 'dark-theme' : this.defaultOSTheme.value == 'dark-theme'
  }

  setUserSelectedTheme(darkMode: boolean): void {
    const theme = darkMode ? 'dark-theme' : 'light-theme';
    this.userSelectedTheme.next(theme);
    localStorage.setItem("userSelectedTheme", theme);
  }
}
