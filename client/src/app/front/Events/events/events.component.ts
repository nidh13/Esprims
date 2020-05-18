import {Component, OnInit} from '@angular/core';
import {Event} from 'src/app/models/Event';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[];
  p = 1;

  constructor(
    private route: ActivatedRoute
  ) {
    this.events = this.route.snapshot.data['events'];
    console.log(this.events);
  }

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
    console.log(this.events);
  }

}
