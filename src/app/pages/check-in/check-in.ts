import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendeesService } from '../../services/attendees';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-in.html',
  styleUrl: './check-in.css',
})
export class CheckIn{
  
  attendees$: Observable<any[]>;

  constructor(private attendeesService: AttendeesService) {
    this.attendees$ = this.attendeesService.getAttendees();
  }
}
