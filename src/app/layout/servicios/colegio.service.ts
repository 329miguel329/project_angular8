import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ServicioColegio {
    constructor (private firebaseDatabase: AngularFireDatabase) {}
    public obtenerColegios() {
        return this.firebaseDatabase.list('colegios/');
    }
}
