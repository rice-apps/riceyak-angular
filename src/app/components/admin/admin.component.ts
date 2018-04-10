import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service/auth.service';
import {PostService} from '../../services/post-service/post.service';
import {Post} from '../../models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {Report} from '../../models/report';

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
          this.reports.sort((a, b) => {
            if (a.reviewed && !b.reviewed) return 1;
            if (b.reviewed && !a.reviewed) return -1;
            return 0;
          })
        });
    });
  }

  /**
   * Mark a report as reviewed
   */
  ReportReviewed(result: boolean, report: Report) {
    this.postService.postReportReview(result, report)
      .then(report => {
        const idx = this.reports.findIndex(p => p._id === report._id);
        this.reports[idx] = report;
      });
  }
}
