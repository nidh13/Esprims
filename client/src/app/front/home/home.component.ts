import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/Event';
import {Topic} from '../../models/Topic';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: Event[];
  topics: Topic[];

  slidesStore: [
    {
      id: 1,
      src: '../../../assets/nidhal/assets/img/bg-img/1.jpg',
      alt: 'Slider 1'
      title: 'Slider 1'
    },
    {
      id: 2,
      src: '../../../assets/nidhal/assets/img/bg-img/2.jpg',
      alt: 'Slider 2'
      title: 'Slider 2'
    }
  ];

  constructor(private route: ActivatedRoute) {
    this.events = this.route.snapshot.data['events'];
    this.topics = this.route.snapshot.data['topics'];
    this.topics.sort((x, y) => {
      if (x.comments.length > y.comments.length) {
        return -1;
      }
      if (x.comments.length < y.comments.length) {
        return 1;
      }
      return 0;
    });
  }

  ngOnInit() {
  }

}
