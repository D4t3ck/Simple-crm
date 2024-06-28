import { Component, inject } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId: string | null = '';
  user: User = new User();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      /* console.log('received current ID', this.userId); */
      this.getUser();
    });
  }

  getUser() {
    if (this.userId) {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      docData(userDocRef).subscribe(
        (user: any) => {
          this.user = new User(user);
          console.log('Retrieved user', this.user);
        },
        (error: any) => {
          console.error('Error retrieving user:', error);
        }
      );
    } else {
      console.error('User ID is null');
    }
  }
}
