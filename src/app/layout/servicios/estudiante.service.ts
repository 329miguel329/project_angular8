import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * @export
 * @class ServicioEstudiante
 */
@Injectable()
export class ServicioEstudiante {
  /**
   * Crear instancia de ServicioEstudiante.
   * @param {AngularFireDatabase} firebaseDatabase
   * Configuración de firebase.
   */
  constructor (private firebaseDatabase: AngularFireDatabase) {}

  /**
   * Función para obetener un listado de estudiantes
   * @returns listado de estudiantes en formato JSON
   */
  public obtenerEstudiantes() {
    return this.firebaseDatabase.list('estudiantes/');
  }
}
