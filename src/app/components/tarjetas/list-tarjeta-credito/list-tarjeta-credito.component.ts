import { Component } from '@angular/core';
import { TarjetaService } from '../../../services/tarjeta.service'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-tarjeta-credito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrl: './list-tarjeta-credito.component.css'
})
export class ListTarjetaCreditoComponent {
  data: any[] = [];
  error: string | null = null;

  constructor(private tarjetaService: TarjetaService) { }

  ngOnInit(): void {
    this.loadData();
    this.tarjetaService.getTarjetasUpdatedListener().subscribe(() => {
      this.loadData(); // Cargar datos cuando hay un cambio
    });
  }

  loadData(): void{
    this.tarjetaService.getData('http://localhost:5192/api/TarjetaCredito/')
      .then((response) => {
        this.data = response;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}
