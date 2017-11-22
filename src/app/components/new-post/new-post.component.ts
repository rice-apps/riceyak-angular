import { AlertService } from './../../services/alert.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../../services/post-service/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @ViewChild('newPostModal') newPostModal: ElementRef;

  public newPostForm: FormGroup;
  private loading: boolean = false;
  private submitButtonText: String = "Hoot!";

  constructor(private postService: PostService, 
    private fb: FormBuilder, private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['']
    });
  }

  postPost() {
    this.loading = true;
    this.submitButtonText = "Submitting...";
    this.postService.postPost(this.newPostForm.value['title'], this.newPostForm.value['body'])
      .then(post => {
        this.loading = false;
        this.newPostModal.nativeElement.click();
        this.router.navigate([`/posts/${post._id}`]);
        this.alertService.pushAlert('alert-success', 'Posted!')
      });
  }

  get title() {
    return this.newPostForm.get('title');
  }

  get body() {
    return this.newPostForm.get('body');
  }

}
