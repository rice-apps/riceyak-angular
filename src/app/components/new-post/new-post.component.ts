import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post-service/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public newPostForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['']
    });
  }

  postPost() {
    this.postService.postPost(this.newPostForm.value['title'], this.newPostForm.value['body'])
      .then(post => this.router.navigate([`/posts/${post._id}`]));
  }

  get title() {
    return this.newPostForm.get('title');
  }

  get body() {
    return this.newPostForm.get('body');
  }

}
