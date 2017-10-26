import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post-service/post.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

}
