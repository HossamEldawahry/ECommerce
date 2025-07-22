import { Component } from '@angular/core';
import { HomeComponent } from "../../pages/home/home.component";
import { UserNavComponent } from "../../components/user-nav/user-nav.component";
import { UserFooterComponent } from "../../components/user-footer/user-footer.component";

@Component({
  selector: 'app-user-layout',
  imports: [HomeComponent, UserNavComponent, UserFooterComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
