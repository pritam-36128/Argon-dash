import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notifications } from '../mock-notifications';
import { Notification } from '../models/Notification';
import { LatestNotification } from '../models/LatestNotification';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationUrl = 'http://localhost:8000/getnotifications/';

  constructor(
    private http: HttpClient
  ) { }
  
  // fetching data from mock data
  getThisNotifications(): Observable<Notification[]> {
    const notifications = of(Notifications);
    return notifications;
  }


  // fetching data from backend using http request
  getLatestNotifications(): Observable<LatestNotification[]> {
    return this.http.get<LatestNotification[]>(this.notificationUrl)
      .pipe(                                                    // pipe is used for chaining
        tap(_ => console.log('fetched notifcations')),
        catchError(this.handleError<LatestNotification[]>('getLatestNotification', []))
      );
  }

  // (generic) error handler
  private handleError<T>(operation: string, result?: T ) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed`)
      // empty array will be passed
      return of(result as T)
    }
  };
}
