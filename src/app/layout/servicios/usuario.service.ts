import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * @export
 * @class ServicioUsuario
 */
@Injectable()
export class ServicioUsuario {
  /**
   * Crear instancia de ServicioUsuario.
   * @param {AngularFireDatabase} firebaseStorage
   * se utiliza para cargar la base de datos de firebase, se debe cambiar por la configuración de la base de datos.
   */
  constructor (private firebaseStorage: AngularFireDatabase) {}
  /**
   * Función para obtener listado de usuarios
   * @returns listado de usarios en formato JSON
   */
  public obtenerUsuarios() {
      return this.firebaseStorage.list('usuarios/');
  }
}
