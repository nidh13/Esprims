import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../../models/Topic";
import {ActivatedRoute, Router} from "@angular/router";
import {UserServices} from "../../../services/UserServices";
import {TopicService} from "../../../services/TopicService";
import {AlertService} from "../../../services/managers/AlerteService";
import {CommentService} from "../../../services/CommentService";
import {StorageService} from "../../../services/security/storage.service";
import {Comment} from "../../../models/Comment";
import {LoginService} from "../../../services/security/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'TopicDetail',
  templateUrl: './topic.detail.html',
})
export class TopicDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userServices: UserServices,
              private topicService: TopicService,
              private alertService: AlertService,
              private router: Router,
              private commentService: CommentService) {
    if (StorageService.get('currentUser')) {
      this.currentUser = this.userServices.decodeToken().user;
    } else {
      this.currentUser = null
    }
  }

  @Input() topic: any;
  currentUser;


  addCommentFrom = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });
  const;
  auxDislike;
  auxLike;

  ngOnInit(): void {
  }


  collapseCardTopic(t: Topic) {
    if (t.collapsed === true) {
      t.collapsed = false;
    } else {
      t.collapsed = true;
    }
  }

  getComment(c: Comment) {
    return this.commentService.getComment(c._id);
  }

  alreadyInLikers(c: any) {
    // tslint:disable-next-line:forin
    let check;
    for (const i of c.likers) {
      if (this.currentUser.id === i) {
        check = true;
      } else {
        check = false;
      }
    }
    return check;
  }

  alreadyInDisliker(c: any) {
    // tslint:disable-next-line:forin
    let check;
    for (const i of c.dislikers) {
      if (this.currentUser.id === i) {
        check = true;
      } else {
        check = false;
      }
    }
    return check;
  }

  dislike(c: any) {
    if (c.dislikers.length !== 0) {
      for (const l of c.dislikers) {
        console.log('here');
        if (this.currentUser.id === l) {
          this.auxDislike = false;
          break;
        } else {
          this.auxDislike = true;
        }
      }
    } else {
      this.auxDislike = false;
      console.log(this.auxDislike, '123');
    }
    console.log(this.auxDislike, '92');
    if (this.auxDislike === false) {
      this.commentService.dislikeComment(c._id, this.currentUser.id).subscribe((data) => {
        console.log(data);
        const list = c.dislikers;
        c.dislikers.push(this.currentUser);
        c.dislikers = list;
        c.likers.splice(c.likers.indexOf(this.currentUser._id), 1);
        this.auxDislike = true;
        console.log(c.dislikers);
      }, error => {
        console.log(error);
      });
    }
    console.log(c.dislikers);
  }

  like(c: any) {
    console.log(c.likers, 'likers');
    if (c.likers.length !== 0) {
      for (const l of c.likers) {
        console.log('here');
        if (this.currentUser.id === l) {
          this.auxLike = false;
          break;
        } else {
          this.auxLike = true;
        }
      }
    } else {
      this.auxLike = false;
      console.log(this.auxLike, '123');
    }
    console.log(this.auxLike, '125');
    if (this.auxLike === false) {
      this.commentService.likeComment(c._id, this.currentUser.id).subscribe((data) => {
        console.log(data);
        const list = c.likers;
        list.push(this.currentUser);
        c.likers = list;
        c.dislikers.splice(c.dislikers.indexOf(this.currentUser._id), 1);
        this.auxLike = true;
      }, error => {
        console.log(error);
      });
    }
  }


  addComment(t) {
    console.log(t);
    if (LoginService.isLogged()) {
      console.log('isLoggeed');
      const com = new Comment(this.addCommentFrom.value.text);
      this.topicService.addCommentToTopic(t._id, this.currentUser.id, com)
        .subscribe(
          response => {
            console.log(response, 'response');
            console.log(t.comments, 't.comments avant');
            t.cs.push(response);
            // this.topicService.getAllCommentsByTopic(t._id).subscribe(
            //   data => {
            //     t.cs = data;
            //   });
            console.log(t.cs, 't.comments aprés');
            // this.getAllComments();
            this.addCommentFrom.value.text = '';
            // this.router.navigate(['/topics/', this.topic['_id']]);
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

  deleteComment(t: Topic, c: Comment, i: number) {
    this.topicService.deleteComment(c._id).subscribe(data => {
      console.log(data);
    });
    t.cs.splice(i, 1);
    // this.getAllComments(t._id);
  }


}
