import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  islogined=new BehaviorSubject(false);

  constructor(private _HttpClient: HttpClient) {}

  getData(categoryname: any): Observable<any> {
    let res = this._HttpClient.get(
      `https://places-review-kfs6g2oec-belalashraf238s-projects.vercel.app/api/places/type/${categoryname}`
    );
    console.log(res);
    return res;
  }

  getCategories(): Observable<any> {
    let res = this._HttpClient.get(
      `https://run.mocky.io/v3/4f63960e-7787-40e7-a417-5cc7077b496f`
    );
    console.log(res);
    return res;
  }

  getpage(id: string): Observable<any> {
    console.log(`ID: ${id}`); 
    return this._HttpClient.get(
      `https://places-review-kfs6g2oec-belalashraf238s-projects.vercel.app/api/places/${id}`
    );

  }

  getinfo():Observable<any> {
    return this._HttpClient.get(
      `https://run.mocky.io/v3/91c29591-05a0-456a-966a-4eb9af30ae2a`
    );
  }
  getownerinfo():Observable<any> {
    return this._HttpClient.get(
      `https://run.mocky.io/v3/984afc33-24a8-48a7-94b6-c675d33a1184`
    );
  }
  getownername():Observable<any> {
    return this._HttpClient.get(
      `https://run.mocky.io/v3/ccfe0092-1d6f-4907-8735-d46bc786557e`
    );
  }
  getwishlistitems():Observable<any> {
    return this._HttpClient.get(
      `https://run.mocky.io/v3/aa417330-867b-497c-adf4-8d3968708899`
    );
  }

  loginUser(data: any): Observable<any> {
    let res=this._HttpClient.post('https://dummyjson.com/users/login', data);
    return res;
   }
}
