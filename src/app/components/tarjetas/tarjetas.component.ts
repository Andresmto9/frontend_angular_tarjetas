import { Component } from '@angular/core';
import { TarjetaCreditoComponent } from "./tarjeta-credito/tarjeta-credito.component"
import { ListTarjetaCreditoComponent } from "./list-tarjeta-credito/list-tarjeta-credito.component"
import { FooterComponent } from "../footer/footer.component"

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [
    TarjetaCreditoComponent,
    ListTarjetaCreditoComponent,
    FooterComponent
  ],
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.css'
})
export class TarjetasComponent {

}
