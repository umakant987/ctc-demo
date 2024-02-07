import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, of, from, interval, Subject } from 'rxjs';
import { filter, map, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReportURL() {
    return timer(3000).pipe(
      map(() => 'myreportUrl')
    );
  }

  checkReportStatus(reportURL: string){
    return timer(3000).pipe(
      map((number) => number > 3 ? 'success' : 'inProgress')
    );
  }

  downloadReport(reportURL: string) {
    // return this.http.get<any>('downloadReportApiEndpoint', { params: { reportURL } });

    return of('Report downloaded successfully');
  }

  pollReportStatus(reportURL: string) {
    return timer(0, 5000) // Poll every 5 minutes
      .pipe(
        map((number) => number > 1 ? 'success' : 'inProgress'),
        // switchMap(() => this.checkReportStatus(reportURL))
      );
  }

  downloadReportWhenReady(reportURL: string): Observable<any> {
    const takeUntil$ = new Subject<void>();
    return this.pollReportStatus(reportURL)
      .pipe(
        switchMap(status => {
          console.log(status);
          
          if (status === 'success') {
            takeUntil$.next();
            takeUntil$.complete();
            return this.downloadReport(reportURL);
          } else if (status === 'inProgress') {
            // Continue polling
            return of(null);
          } else {
            throw new Error('Report generation failed.');
          }
        }),
        filter((result) => !!result),
        take(1),
      );
  }
}
