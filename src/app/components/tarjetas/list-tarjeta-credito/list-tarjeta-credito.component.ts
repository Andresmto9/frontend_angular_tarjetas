import { Component } from '@angular/core';
import { TarjetaService } from '../../../services/tarjeta.service'
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-list-tarjeta-credito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrl: './list-tarjeta-credito.component.css'
})
export class ListTarjetaCreditoComponent {
  url: string = "http://localhost:5192/api/TarjetaCredito/"
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
    this.tarjetaService.getData(this.url)
      .then((response) => {
        this.data = response;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  eliminarTarjeta(id: number): void{
    this.tarjetaService.deleteData(`${this.url}${id}`)
      .then((response) => {
        Swal.fire({
          title: "¡PERFECTO!",
          icon: "success",
          text: "Se elimino con éxito la tarjeta seleccionada.",
          confirmButtonText: `Aceptar`,
          confirmButtonColor: "#28a745",
        }).then((result) => {
          if (result.isConfirmed) {
            this.tarjetaService.notifyTarjetasUpdated();
          }
        });
      }).catch((error)=>{
        console.log(error)
      })
  }

  editar(tarjeta: object){
    this.tarjetaService.actualizar(tarjeta);
  }
}
