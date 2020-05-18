import {Component, OnInit} from '@angular/core';
import {CommentService} from 'src/app/services/CommentService';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServices} from 'src/app/services/UserServices';
import {Topic} from '../../../models/Topic';
import {Comment} from '../../../models/Comment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../services/security/login.service';
import {StorageService} from '../../../services/security/storage.service';
import {AlertService} from '../../../services/managers/AlerteService';
import {TopicService} from '../../../services/TopicService';

@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
  styleUrls: ['./single-topic.component.scss']
})
export class SingleTopicComponent implements OnInit {
  topic: Topic;
  model: any = {};
  comments: any = [];
  public data: any = [];
  num_topic;
  comment;

  userLogged;
  addCommentFrom = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });


  constructor(
    private commentService: CommentService,
    private userService: UserServices,
    private topicService: TopicService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.topic = this.route.snapshot.data['topicSelected'][0];
    this.comments = this.route.snapshot.data['comments'];
    console.log(this.comments);
  }

  ngOnInit() {
  }


  addComment() {
    if (LoginService.isLogged()) {
      const currentUser = StorageService.get('currentUser');
      const com = new Comment(this.addCommentFrom.value.text);
      this.topicService.addCommentToTopic(this.topic['_id'], this.userService.getIdUserByToken(), com)
        .subscribe(
          response => {
            this.getAllComments();
            this.addCommentFrom.value.text.val('');
            this.router.navigate(['/topics/', this.topic['_id']]);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.router.navigate(['/login'], {queryParams: {returnUrl: ['/topics/add']}});
      this.alertService.error('Vous devez se connecter d\'abord');
    }
  }

  deleteComment(id) {
    this.topicService.deleteComment(id).subscribe(data => {
      console.log(data);
    });
    this.comments.splice(id,1);
    this.getAllComments();

  }

  getAllComments() {
    this.topicService.getAllCommentsByTopic(this.topic['_id']).subscribe(
      data => {
        this.comments = data;
    });
  }


}
