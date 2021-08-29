import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  get themes(): string[] {
    return this._themes;
  }

  get theme(): BehaviorSubject<string> {
    return this._theme;
  }

  set theme(value: BehaviorSubject<string>) {
    this._theme = value;
  }

  private _themes = ["dark-theme", "light-theme"];
  private _theme = new BehaviorSubject("dark-theme");



  constructor(private ref: ApplicationRef) {
    // initially trigger dark mode if preference is set to dark mode on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    console.log(`OSDarkMode : ${window.matchMedia("(prefers-color-scheme: dark)").matches}`);

    if (darkModeOn) {
      this._theme.next("dark-theme");
    }

    // watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
      const turnOn = e.matches;
      this._theme.next(turnOn ? "dark-theme" : "light-theme");
      // trigger refresh of UI
      this.ref.tick();
    });
  }
}
