import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [RouterModule, MenubarModule, CommonModule],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Login',
                icon: 'pi pi-sign-in',
                path: 'login',
            },
            {
                label: 'Register',
                icon: 'pi pi-user-plus',
                path: 'register',
            },
        ];
    }

}
