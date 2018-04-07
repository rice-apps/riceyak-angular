import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PostService} from '../../services/post-service/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @ViewChild('newPostModal') newPostModal: ElementRef;
  @Output() submitted = new EventEmitter<any>();

  newPostForm: FormGroup;
  loading = false;
  submitButtonText: String = 'Post!';

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['']
    });
  }

  postPost() {
    this.loading = true;
    this.submitButtonText = 'Submitting...';
    this.postService.postPost(this.newPostForm.value['title'], this.newPostForm.value['body'])
      .then((post) => {
        this.loading = false;
        this.newPostModal.nativeElement.click();
        this.submitted.emit(post);
      });
  }

  get title() {
    return this.newPostForm.get('title');
  }

  get body() {
    return this.newPostForm.get('body');
  }

}
