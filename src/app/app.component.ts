import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TarjetasComponent } from "./components/tarjetas/tarjetas.component"
import { FooterComponent } from "./components/footer/footer.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TarjetasComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
