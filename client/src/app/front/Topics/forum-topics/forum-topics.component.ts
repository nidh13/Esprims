import {Component, OnInit} from '@angular/core';
import {UserServices} from 'src/app/services/UserServices';
import {ActivatedRoute, Router} from '@angular/router';
import {Topic} from 'src/app/models/Topic';
import {StorageService} from '../../../services/security/storage.service';
import {CommentService} from '../../../services/CommentService';
import {Comment} from '../../../models/Comment';
import {LoginService} from "../../../services/security/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TopicService} from "../../../services/TopicService";
import {AlertService} from "../../../services/managers/AlerteService";

@Component({
  selector: 'app-forum-topics',
  templateUrl: './OnePageForum.html',
  styleUrls: ['./forum-topics.component.scss']
})
export class ForumTopicsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userServices: UserServices,
              private topicService: TopicService,
              private alertService: AlertService,
              private router: Router,
              private commentService: CommentService) {
    if (StorageService.get('currentUser')) {
      this.currentUser = this.userServices.decodeToken().user;
    } else {
      this.currentUser = null;
    }
    this.topics = this.route.snapshot.data['topics'];
    this.topics.forEach((d) => {
      d.collapsed = false ;
      this.commentService.getCommentsPerTopic(d._id).subscribe((c) => {
        d.cs = c;
      });
    });
  }
  topics: Topic[];
  p = 1;
  currentUser;


  ngOnInit() {
  }


}
