import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Contagem } from '../Model/contagem';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContagemService {

  contagemCollection: AngularFirestoreCollection<Contagem>

  constructor(
    private afs: AngularFirestore
  ) {
    this.contagemCollection =  this.afs.collection<Contagem>('Contagem')
   }

   getcontagens() {
    return this. contagemCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addContagem(contagem: Contagem) {
    return this. contagemCollection.add(contagem);
  }

  getContagem(id: string) {
    return this. contagemCollection.doc<Contagem>(id).valueChanges();
  }

  updateContagem(id: string, contagem: Contagem) {
    return this. contagemCollection.doc<Contagem>(id).update(contagem);
  }

  deleteContagem(id: string) {
    return this. contagemCollection.doc(id).delete();
  }

}
