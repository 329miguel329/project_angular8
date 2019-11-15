import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ServicioEstudiante {
    usuarios: any = null;
    constructor (private firebaseDatabase: AngularFireDatabase) {}
    public obtenerEstudiantes() {
        return this.firebaseDatabase.list('estudiantes/');
    }
}
