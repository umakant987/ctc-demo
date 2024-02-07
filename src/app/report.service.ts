import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReportURL() {
    // return this.http.get<string>('reportURLApiEndpoint');
    const reportPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('myreportUrl');
        }, 3000)
    });

    return reportPromise;
  }

  checkReportStatus(reportURL: string){
    // return this.http.get<any>('reportStatusApiEndpoint', { params: { reportURL } });

    console.log("checkReportStatus is called");
    const reportReadyPomise = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve('success');
        }, 20000)
    });

    return from(reportReadyPomise);
  }

  downloadReport(reportURL: string) {
    // return this.http.get<any>('downloadReportApiEndpoint', { params: { reportURL } });

    return 'Report downloaded successfully';
  }

  pollReportStatus(reportURL: string) {
    console.log("inside pollReportStatus");
    return timer(0, 0.2 * 60 * 1000) // Poll every 5 minutes
      .pipe(
        switchMap(() => this.checkReportStatus(reportURL))
      );
  }

  downloadReportWhenReady(reportURL: string): Observable<any> {
    return this.pollReportStatus(reportURL)
      .pipe(
        switchMap(status => {
          if (status === 'success') {
            return this.downloadReport(reportURL);
          } else if (status === 'inProgress') {
            // Continue polling
            return of(null);
          } else {
            throw new Error('Report generation failed.');
          }
        })
      );
  }
}
