import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ServicioUsuario {
    usuarios: any = null;
    constructor (private firebaseStorage: AngularFireDatabase) {}
    public obtenerUsuarios() {
        return this.firebaseStorage.list('usuarios/');
    }
}
