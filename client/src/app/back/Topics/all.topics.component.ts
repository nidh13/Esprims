import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TopicService} from '../../services/TopicService';
import {UserServices} from '../../services/UserServices';
import {User} from '../../models/User';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all.topics.component.html',
  styleUrls: []
})

export class AllTopicsComponent implements OnInit {
  loggedUser: User;
  topics;

  constructor(
    private topicServices: TopicService,
    private userServices: UserServices,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loggedUser = this.userServices.decodeToken().user;
    console.log(this.loggedUser);
    if (this.loggedUser.role === 'ADMIN') {
      this.topicServices.getAll().subscribe((data) => {
        console.log(data);
        this.topics = data;
      });
    } else {
      this.topicServices.getAllByUserId(this.loggedUser.id).subscribe((data) => {
        this.topics = data;
      });
    }
  }

  getAllTopics() {
    if (this.loggedUser.role === 'ADMIN') {
      this.topicServices.getAll().subscribe((data) => {
        console.log(data);
        this.topics = data;
      });
    } else {
      this.topicServices.getAllByUserId(this.loggedUser.id).subscribe((data) => {
        this.topics = data;
      });
    }
  }

  delete(id: any) {
    if (confirm('Are you sure to delete this topic')) {
      this.topicServices.deleteTopic(id).subscribe((data) => {
          this.topics.splice(id, 1);
          // this.router.navigate(['/dash/topics']);
          this.getAllTopics();
        },
        error => {
          this.getAllTopics();
        });
    }
  }
}
