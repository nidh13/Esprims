import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../../services/security/storage.service';
import {LoginService} from '../../../services/security/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../../services/TopicService';
import {Topic} from '../../../models/Topic';
import {AlertService} from '../../../services/managers/AlerteService';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: []
})

export  class  AddTopicComponent {
  topic: Topic;

  constructor(private storageService: StorageService,
              private alertService: AlertService,
              private topicService: TopicService,
              private loginService: LoginService,
              private router: Router, private  route: ActivatedRoute) {
  }

  addTopicFrom = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categorie: new FormControl('', [Validators.required]),
  });

  addTopic() {
    if (LoginService.isLogged()) {
      const currentUser = StorageService.get('currentUser');
      console.log(StorageService.get('currentUser'));
      // tslint:disable-next-line:max-line-length
      this.topic = new Topic(this.addTopicFrom.value.titre, this.addTopicFrom.value.description, this.addTopicFrom.value.categorie, currentUser.userId);
      this.topicService.addTopic(this.topic)
        .subscribe(
          response => {
            console.log('hhhh');
            this.router.navigate(['/topics']);
          },
          error => {console.log(error); }
        );
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: ['/topics/add'] } });
      this.alertService.error('Vous devez se connecter d\'abord');
    }
  }
}
