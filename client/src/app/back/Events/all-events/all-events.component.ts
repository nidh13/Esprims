import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventServices } from 'src/app/services/EventServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit {
  searchText;
  collection: any;
  id;

  constructor(
    private modalService: NgbModal,
    private eventServices: EventServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.allEvents();
  }
  allEvents() {
    this.eventServices.allEvents().subscribe(data => {
      this.collection = data;
    });
  }
  delete(id) {
    this.eventServices.delete(id).subscribe(response => {
      this.allEvents();
    });
  }
}
