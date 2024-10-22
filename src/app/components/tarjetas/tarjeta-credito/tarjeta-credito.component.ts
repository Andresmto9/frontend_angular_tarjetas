import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TarjetaService } from '../../../services/tarjeta.service'
import Swal from 'sweetalert2'
import { TarjetaCredito } from '../../../models/TarjetaCredito';

@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})
export class TarjetaCreditoComponent {
  data: any;
  error: string | null = null;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private tarjetaService: TarjetaService) {
    this.form = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      tarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
  }

  // Funcionalidad para registrar una nueva tarjeta de credito
  setNuevaTarjeta(){
    const arrTarjeta: TarjetaCredito = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('tarjeta')?.value,
      fechaExpiracion: this.form.get('expiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    this.tarjetaService.postData('http://localhost:5192/api/TarjetaCredito/', arrTarjeta)
      .then((response) => {
        this.data = response;
        this.form.reset()
        Swal.fire({
          title: "¡PERFECTO!",
          icon: "success",
          text: "Se registro la tarjeta con éxito.",
          confirmButtonText: `Aceptar`,
          confirmButtonColor: "#28a745",
        }).then((result) => {
          if (result.isConfirmed) {
            this.tarjetaService.notifyTarjetasUpdated();
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "UN MOMENTO!",
          icon: "error",
          text: "Ocurrió un problema al registrar la tarjeta.",
          confirmButtonText: `Aceptar`,
          confirmButtonColor: "#28a745",
        });
        this.error = error.message;
      });
  }
}
