import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import LoaderService from './shared/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonComponent, HttpClientModule, NgxLoadingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'phamdinhdong-vand-test';
  loading = false
  private loaderSercvice = inject(LoaderService)
  constructor() {
    this.handleSignal()
  }
  handleSignal() {
    effect(() => {
      this.loading = this.loaderSercvice.loader()
    })
  }
}
