import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Todo {
  name: string
}

interface todoId extends Todo {
  id: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todocol: AngularFirestoreCollection<Todo>;
  // todos: Observable<Todo[]>;
  todos: any;
  name: string;
  tododoc: AngularFirestoreDocument<Todo>;
  todoes: Observable<Todo>;
  constructor(private afs: AngularFirestore,public navCtrl: NavController) {
    this.todocol = this.afs.collection('todo');
   // this.todos = this.todocol.valueChanges();
   this.todos = this.todocol.snapshotChanges()
   .map(actions => {
     return actions.map(a => {
       const data = a.payload.doc.data() as Todo;
       const id = a.payload.doc.id;
       return { id, data };
     });
   });
  }

  addTodo() {
    this.afs.collection('todo').add({'name': this.name})
  }

  deleteTodo(todoId) {
    this.afs.doc('todo/' + todoId).delete();
  }

}
