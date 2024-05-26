import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import LoaderService from './shared/loader.service';
import { LoadingInterceptor } from './interceptor/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), LoaderService, provideHttpClient(withFetch(),withInterceptorsFromDi()),  
    {
        provide:HTTP_INTERCEPTORS,
        useClass:LoadingInterceptor,
        multi:true
    }
  ],
  
};
