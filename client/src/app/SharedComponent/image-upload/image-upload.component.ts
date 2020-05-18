import { Component, OnInit, Input } from '@angular/core';
import { fileURLToPath } from 'url';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
    @Input() imgpacktoupdateinput:string;
    @Input() isRound: boolean = false;
    @Input() image: string;
    state: any = {}
    constructor() {
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    ngOnInit() {
        //chekeeek feha shiha ou nn
        if(this.imgpacktoupdateinput){
            this.state = {
                file: null,
                imagePreviewUrl: this.image !== undefined ? this.image:(this.isRound ? this.imgpacktoupdateinput:this.imgpacktoupdateinput)
            }
        }else {
        this.state = {
            file: null,
            imagePreviewUrl: this.image !== undefined ? this.image:(this.isRound ? './assets/img/placeholder.jpg':'./assets/img/image_placeholder.jpg')
        }
    }
    }
    handleImageChange(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.state.file = file;
            this.state.imagePreviewUrl = reader.result;
            // this.state.imagePreviewUrl1 = reader.result;
        }
        reader.readAsDataURL(file);
    }
    handleSubmit(e){
      e.preventDefault();
      console.log("heeeeeeeyy")

        // this.state.file is the file/image uploaded
        // in this function you can save the image (this.state.file) on form submit
        // you have to call it yourself
        return this.state.file;
       }
    handleClick(){
        var input = document.createElement("input");
        input.type = "file";
        input.onchange = this.handleImageChange;
        input.click();

    }
    handleRemove(){
        this.state.file = null;
        this.state.imagePreviewUrl = this.image !== undefined ? this.image:(this.isRound ? './assets/img/placeholder.jpg':'./assets/img/image_placeholder.jpg');

    }

    message()
    {
      console.log("hhhhh")
    }


}
