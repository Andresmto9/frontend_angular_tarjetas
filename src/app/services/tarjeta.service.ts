import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { TarjetaCredito } from '../models/TarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  constructor() { }

  private tarjetasUpdated = new Subject<void>();
  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any) ;

  getTarjetasUpdatedListener() {
    return this.tarjetasUpdated.asObservable();
  }

  notifyTarjetasUpdated() {
    this.tarjetasUpdated.next();
  }

  obtenerTarjeta(){
    return this.actualizarFormulario.asObservable();
  }

  actualizar(tarjeta: any){
    this.actualizarFormulario.next(tarjeta);
  }

  getData(url: string): Promise<any> {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
      });
  }

  getDataById(url: string): Promise<any>{
    return fetch(url, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (!response.ok){
          throw new Error('Error por parte del servidor');
        }
        return response.json();
      })
      .catch((error) => {
        console.log("Error del fecth para actualziar")
        throw error;
      })
  }

  postData(url: string, data: any): Promise<any> {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error por parte del servidor');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error generado por el fetch:', error);
        throw error;
      });
  }

  updateData(url: string, data: any): Promise<any>{
    return fetch(url, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log("Error del fecth para actualziar")
        throw error;
      })
  }

  deleteData(url: string): Promise<any>{
    return fetch(url, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (!response.ok){
          throw new Error('Error por parte del servidor');
        }
        return response.json();
      })
      .catch((error) => {
        console.log("Error del fecth para actualziar")
        throw error;
      })
  }
}
