import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister } from '../interfaces/iregister';
import { API_BASE_URL } from '../apiRoot/baseurl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient) { }
  register(registerData: IRegister) : Observable<any> {
    // Simulate a registration API call
    return this._httpClient.post(`${API_BASE_URL}/users`, registerData);
  }
}
