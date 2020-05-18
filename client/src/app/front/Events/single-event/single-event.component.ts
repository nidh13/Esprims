import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { EventServices } from 'src/app/services/EventServices';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss']
})
export class SingleEventComponent implements OnInit {

  event: Event;

  constructor(
    private eventService: EventServices,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.event = this.route.snapshot.data['eventSelected'];
    console.log("single Events", this.event);
  }


  ngOnInit() {
    this.event = this.route.snapshot.data['eventSelected'];

  }

}
