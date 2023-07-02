import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { Notification } from '../models/Notification';
import { LatestNotification } from '../models/LatestNotification';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public active = 1;
  public menuItems: any[];
  public isCollapsed = true;
  public notifications: Notification[];
  public latestNotifications: LatestNotification[];

  constructor(
    private router: Router,
    private notificationService: NotificationsService,
    ) { }

  getThisNotifications(): void {
    this.notificationService.getThisNotifications()
      .subscribe(notifications => this.notifications = notifications);
  }

  getLatestNotifications(): void {
    this.notificationService.getLatestNotifications()
      .subscribe(notifications => this.latestNotifications = notifications)
  }

  ngOnInit(): void {
    this.getThisNotifications();
    this.getLatestNotifications();
    console.log(this.notifications);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
