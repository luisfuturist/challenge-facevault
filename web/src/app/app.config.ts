import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNzI18n(pt_BR), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
};
