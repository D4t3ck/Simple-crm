import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    MatDialogClose,
    MatCardModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: Date | any;
  loading: false | any;

  firestore: Firestore = inject(Firestore);
  items$: Observable<any>;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
  }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is:', this.user);

    try {
      const usersCollection = collection(this.firestore, 'users');
      const result = await addDoc(usersCollection, this.user.toJSON());
      this.loading = false;
      console.log('Adding user finished', result);
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
}
