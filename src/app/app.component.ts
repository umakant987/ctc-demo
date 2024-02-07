import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';

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
    const reportURL = await this.reportService.getReportURL();
    console.log("Report URL>>>", reportURL);

    const result = this.reportService.downloadReportWhenReady(<string>reportURL)
    console.log("Report Download Status", result);
  }
  
}
