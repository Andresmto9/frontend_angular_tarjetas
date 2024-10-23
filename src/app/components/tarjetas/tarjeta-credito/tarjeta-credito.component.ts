import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TarjetaService } from '../../../services/tarjeta.service'
import Swal from 'sweetalert2'
import { TarjetaCredito } from '../../../models/TarjetaCredito';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})
export class TarjetaCreditoComponent implements OnDestroy {
  data: any;
  error: string | null = null;
  form: FormGroup;
  suscription: Subscription = new Subscription;
  tarjeta: TarjetaCredito = new TarjetaCredito;
  IDtarjeta: number = 0
  url: string = "http://localhost:5192/api/TarjetaCredito/"

  constructor(private formBuilder: FormBuilder, private tarjetaService: TarjetaService) {
    this.form = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      tarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
  }

  ngOnInit(): void{
    this.tarjetaService.obtenerTarjeta().subscribe(data => {
      this.tarjeta = data

      this.form.patchValue({
        titular: this.tarjeta.titular,
        tarjeta: this.tarjeta.numeroTarjeta,
        expiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv,
      })

      this.IDtarjeta = (this.tarjeta.id === undefined ? 0 : this.tarjeta.id);
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }


  // Funcionalidad para registrar una nueva tarjeta de credito
  moduloTarjeta(){
    if(this.IDtarjeta === 0){
      this.setNuevaTarjeta()
    }else{
      this.updateTarjeta(this.IDtarjeta);
    }
  }

  setNuevaTarjeta(){
    const arrTarjeta: TarjetaCredito = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('tarjeta')?.value,
      fechaExpiracion: this.form.get('expiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    this.tarjetaService.postData(this.url, arrTarjeta)
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

  updateTarjeta(IDtarjeta: number){
    console.log(IDtarjeta)
    const arrTarjeta: TarjetaCredito = {
      id: IDtarjeta,
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('tarjeta')?.value,
      fechaExpiracion: this.form.get('expiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    this.tarjetaService.updateData(`${this.url}${IDtarjeta}`, arrTarjeta)
      .then((response) => {
        this.data = response;
        this.form.reset()
        Swal.fire({
          title: "¡PERFECTO!",
          icon: "success",
          text: "Se actualizo la tarjeta con éxito.",
          confirmButtonText: `Aceptar`,
          confirmButtonColor: "#28a745",
        }).then((result) => {
          if (result.isConfirmed) {
            this.tarjetaService.notifyTarjetasUpdated();
            this.IDtarjeta = 0;
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "UN MOMENTO!",
          icon: "error",
          text: "Ocurrió un problema al actualizar la tarjeta.",
          confirmButtonText: `Aceptar`,
          confirmButtonColor: "#28a745",
        });
        this.error = error.message;
      });
  }
}
