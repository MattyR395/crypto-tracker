import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThemeEnum } from '@enums/theme.enum';
import { Settings } from '@models/settings.model';
import { Theme } from '@models/theme.model';

const THEMES: Theme[] = [
  {
    id: ThemeEnum.LIGHT,
    name: 'Light',
    class: 'theme-light',
  },
  {
    id: ThemeEnum.DARK,
    name: 'Dark',
    class: 'theme-dark',
  }
]

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private renderer: Renderer2;

  constructor(
    private http: HttpClient,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Retrieves the Settings object from the API.
   * @returns Observable<Settings>
   */
  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${environment.apiUrl}/settings`);
  }

  /**
   * Adds a class to the DOM to change the theme.
   * @param themeId ID of the theme to change to.
   */
  setTheme(themeId: ThemeEnum) {
    const theme = THEMES.find(t => t.id === themeId);

    if (theme) {
      // Remove all the existing themes first...
      THEMES.forEach(t => {
        this.renderer.removeClass(document.body, t.class);
      })

      // ...then add our new choice
      this.renderer.addClass(document.body, theme.class);
    }
  }
  
  /**
   * Returns a list of all the available themes.
   * @returns Theme[]
   */
  getThemes(): Theme[] {
    return THEMES;
  }

  /**
   * Updates the settings in the API.
   * @param themeId ID of the theme to change to.
   * @returns 
   */
  updateTheme(themeId: ThemeEnum): Observable<unknown> {
    return this.http.patch<any>(`${environment.apiUrl}/settings/theme`, { themeId });
  }
}
