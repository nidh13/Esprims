import {Component, OnInit, ViewChild} from "@angular/core";
import {ImageUploadComponent} from "src/app/SharedComponent/image-upload/image-upload.component";
import {Event} from "src/app/models/Event";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageUploadServicService} from "src/app/SharedComponent/image-upload/image-upload-servic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {finalize} from "rxjs/operators";
import {EventServices} from "src/app/services/EventServices";

@Component({
  selector: "app-update-event",
  templateUrl: "./update-event.component.html",
  styleUrls: ["./update-event.component.scss"]
})
export class UpdateEventComponent implements OnInit {
  @ViewChild(ImageUploadComponent)
  private testComponent: ImageUploadComponent;
  public formsubmitted: boolean;
  public picturemap: string;
  img =
    "https://journal-lepetitcorse.fr/wp-content/uploads/2018/04/no-image.jpg";
  id;

  closeResult: string;
  closeResult1: string;

  event: Event = {
    _id: "",
    title: "",
    date_event: null,
    description: "",
    picture: ""
  };

  constructor(
    private eventService: EventServices,
    private storage: AngularFireStorage,
    public serviceimage: ImageUploadServicService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.event._id = params.get("id");
    });
  }

  ngOnInit() {
    this.getEvent(this.id);
  }

  open(content) {
    this.modalService
      .open(content, {ariaLabelledBy: "modal-basic-title"})
      .result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  getEvent(id) {
    this.eventService.getEvent(this.id).subscribe(data => {
      console.log(data);
      this.event.title = data.title;
      this.event.description = data.description;
      this.event.picture = data.picture;
      this.event.date_event = data.date_event;
    });
  }

  onclickenvoyer(e, content) {
    var pictureinfo: any[] = this.testComponent.handleSubmit(e);
    if (pictureinfo == null) {
      this.event._id = this.id;
      this.eventService.update(this.event).subscribe(response => {
        console.log(response);
      });
    } else {
      var filePath = `${pictureinfo["name"]
        .split(".")
        .slice(0, -1)
        .join(".")}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, pictureinfo)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              console.log(url);
              this.picturemap = url;
              console.log(this.picturemap);
              console.log("Events to update", this.event);
              if (this.picturemap != null) {
                this.event.picture = this.picturemap;
              }
              this.event._id = this.id;
              this.eventService.update(this.event).subscribe(response => {
                console.log(response);
              });
            });
          })
        )
        .subscribe();
      this.router.navigate(['/dash/events']);

    }


    this.open(content);
    this.router.navigate(["dash/allevents"]);
  }
}
