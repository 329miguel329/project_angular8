import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * @export
 * @class ServicioColegio
 */
@Injectable()
export class ServicioColegio {

  /**
   * Crear instancia de ServicioColegio.
   * @param {AngularFireDatabase} firebaseDatabase
   * Configuración de firebase
   */
  constructor (private firebaseDatabase: AngularFireDatabase) { }

  /**
   * Función para obtener listado de colegios.
   * @returns listado de colegios en formato JSON
   * @memberof ServicioColegio
   */
  public obtenerColegios() {
    return this.firebaseDatabase.list('colegios/');
  }
}
