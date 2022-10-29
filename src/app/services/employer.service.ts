import { EntrepriseModel } from './../Models/entrepriseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  baseUrl = " http://localhost:3000/entreprise"

  constructor(private http:HttpClient) { }


  getAllEmployer() {
    return this.http.get(this.baseUrl);
  }

  getEmployebyID(id: any) {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createEmployer(employerData: any) {
    return this.http.post(this.baseUrl, employerData);
  }

  updateEmployer(id: any, employerData: any) {
    return this.http.put(this.baseUrl + '/' + id, employerData);
  }


  removeEmploye(id: any) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
