import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThemeEnum } from '@enums/theme.enum';
import { Settings } from '@models/settings.model';
import { Theme } from '@models/theme.model';
import { UiScale } from '@models/ui-scale.model';

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
];

const UI_SCALES: UiScale[] = [
  { id: 1, scale: .5 },
  { id: 2, scale: .75 },
  { id: 3, scale: 1 },
  { id: 4, scale: 1.25 },
  { id: 5, scale: 1.5 },
];

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
   * Returns a list of all the available UI scales.
   * @returns UiScale[]
   */
  getUiScales(): UiScale[] {
    return UI_SCALES;
  }

  /**
   * Updates the theme ID setting in the API.
   * @param themeId ID of the theme to change to.
   * @returns 
   */
  updateTheme(themeId: ThemeEnum): Observable<unknown> {
    return this.http.patch<any>(`${environment.apiUrl}/settings/theme`, { themeId });
  }

  /**
   * Updates the UI scale setting in the API.
   * @param uiScaleId ID of the UI scale to change to.
   * @returns 
   */
  updateUiScale(uiScaleId: number): Observable<unknown> {
    return this.http.patch<any>(`${environment.apiUrl}/settings/ui-scale`, { uiScaleId });
  }

  /**
   * Sets the UI to scale by the given scale.
   * @param uiScaleId ID of the UI scale to change to.
   */
  setUiScale(uiScaleId: number): void {
    const uiScale = UI_SCALES.find(u => u.id === uiScaleId);

    if (uiScale) {
      const currentFontSize = parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue('--font-size-base').replace(/\D/g, ''));

      // Set our new base font-size on the document element.
      this.renderer.setStyle(document.documentElement, 'font-size', `${currentFontSize * uiScale.scale}px`);
    }
  }
}
