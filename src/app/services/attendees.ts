import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Attendee {
  id?: string;
  name: string;
  document: string;
  phone?: string;
  checkedIn: boolean;
  checkedInAt?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AttendeesService {
  private attendeesRef;

  constructor(private firestore: Firestore) {
    this.attendeesRef = collection(this.firestore, 'attendess');
  }

  //Escucha asistentes en tiempo real
  getAttendees(): Observable<Attendee[]> {
    return collectionData(this.attendeesRef, {
      idField: 'id',
    }) as Observable<Attendee[]>;
  }

  // Marcar asistencia
  checkIn(attendeeId: string) {
    const attendeeDoc = doc(this.firestore, `attendess/${attendeeId}`);
    return updateDoc(attendeeDoc, {
      checkedIn: true,
      checkedInAt: serverTimestamp(),
    });
  }
}
