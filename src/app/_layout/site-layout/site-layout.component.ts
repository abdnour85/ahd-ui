import { Component } from '@angular/core';
import { SiteHeaderComponent } from '../site-header/site-header.component';
import { SiteFooterComponent } from '../site-footer/site-footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [SiteHeaderComponent, SiteFooterComponent, RouterOutlet],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.scss'
})
export class SiteLayoutComponent {

}
