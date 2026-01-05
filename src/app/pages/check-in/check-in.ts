import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attendee, AttendeesService } from '../../services/attendees';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-in.html',
  styleUrl: './check-in.css',
})
export class CheckIn{
  
  attendees$: Observable<any[]>;

  newAttendee = {
    name: '',
    document: '',
    phone: '',
  };

  constructor(private attendeesService: AttendeesService) {
    this.attendees$ = this.attendeesService.getAttendees();
  }

    // Marcar / desmarcar asistencia
    toggleAttendance(attendee: Attendee) {
      this.attendeesService.toggleCheckIn(attendee);
    }

    addAttendee() {
      if (!this.newAttendee.name || !this.newAttendee.document) return;
  
      this.attendeesService.addAttendee(this.newAttendee).then(() => {
        // limpiar formulario
        this.newAttendee = { name: '', document: '', phone: '' };
      });
    }
}
