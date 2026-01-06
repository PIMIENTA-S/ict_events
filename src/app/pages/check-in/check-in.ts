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
export class CheckIn {
  // Stream inicio
  attendees$: Observable<Attendee[]>;

  // copia para poder filtrar
  attendees: Attendee[] = [];
  filteredAttendees: Attendee[] = [];

  // búsqueda
  search = '';

  // formulario
  showAddForm = false;

  newAttendee = {
    name: '',
    document: '',
    phone: '',
  };

  constructor(private attendeesService: AttendeesService) {
    this.attendees$ = this.attendeesService.getAttendees();

    // cambios tiempo real
    this.attendees$.subscribe(data => {
      this.attendees = data;
      this.filterAttendees();
    });
  }

  // filtrar mientras escribe
  filterAttendees() {
    const term = this.search.trim();

    if (!term) {
      this.filteredAttendees = [];
      this.showAddForm = false;
      return;
    }

    this.filteredAttendees = this.attendees.filter(a =>
      a.document.includes(term)
    );

    this.showAddForm = this.filteredAttendees.length === 0;
  }

  // marca 0 desmarcar
  toggleAttendance(attendee: Attendee) {
    const index = this.filteredAttendees.findIndex(a => a.id === attendee.id);
    if (index !== -1) {
      this.filteredAttendees[index] = {
        ...this.filteredAttendees[index],
        checkedIn: !this.filteredAttendees[index].checkedIn
      };
    }
  
    // Actualizar en Firebase
    this.attendeesService.toggleCheckIn(attendee);
  }

  //registrar nuevo
  addAttendee() {
    if (!this.newAttendee.name || !this.newAttendee.document) return;

    this.attendeesService.addAttendee(this.newAttendee).then(() => {
      this.newAttendee = { name: '', document: '', phone: '' };
      this.search = '';
      this.filteredAttendees = [];
      this.showAddForm = false;
    });
  }
}