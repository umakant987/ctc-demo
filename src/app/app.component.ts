import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ctc-demo';

  constructor(private reportService: ReportService) {

  }

  ngOnInit(): void {
      // this.downloadReport();
  }

  async downloadReport(){
    this.reportService.getReportURL().pipe(
      tap((reportURL) => console.log("Report URL>>>", reportURL)),
      switchMap((reportURL) => this.reportService.downloadReportWhenReady(reportURL)),
    ).subscribe(result => console.log("Report Download Status", result));
  }
  
}
