import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import {PostService} from "../../services/post-service/post.service";
import {Post} from "../../models/post";
import {ActivatedRoute, Router} from "@angular/router";
import {Report} from "../../models/report";

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {

    reports: Report[];

    constructor(private postService: PostService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.postService.getReportedPosts()
                .then(reports => {
                    this.reports = reports;
                });
        });
    }

    /**
     * Mark a report as reviewed
     */
    ReportReviewed(result: boolean, report: Report){
        this.postService.postReportReview(result, report)
            .then(reports=>this.reports=reports)
    }
}