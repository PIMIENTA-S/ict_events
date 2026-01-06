import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc
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

  // Tiempo real
  getAttendees(): Observable<Attendee[]> {
    return collectionData(this.attendeesRef, {
      idField: 'id',
    }) as Observable<Attendee[]>;
  }

  // sirve para marcar o desmarcar asistencia
  toggleCheckIn(attendee: Attendee) {
    if (!attendee.id) return;

    const attendeeDoc = doc(this.firestore, `attendess/${attendee.id}`);

    return updateDoc(attendeeDoc, {
      checkedIn: !attendee.checkedIn,
      checkedInAt: !attendee.checkedIn ? serverTimestamp() : null,
    });
  }

  // Crear nuevo asistente
  addAttendee(attendee: {
    name: string;
    document: string;
    phone?: string;
  }) {
    return addDoc(this.attendeesRef, {
      ...attendee,
      checkedIn: false,
      checkedInAt: null,
    });
  }
  

}