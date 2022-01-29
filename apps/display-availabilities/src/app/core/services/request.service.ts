import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AvailabilityResponse } from '../models/availability-response';
import { AvailabilityRequest } from '../models/availability-request'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private endpoint = 'https://staging-api.rosa.be/api/availabilities';

  constructor(
    private httpClient: HttpClient) {
  }

  public checkAvailabilities(request: AvailabilityRequest) :void{
    const queryParams1 =  {
      "from":request.from, 
      "to":request.to,
      "motive_id":request.motive_id,
      "is_new_patient":request.is_new_patient,
      "calendar_ids":request.calendar_ids, 
      "state":request.state
    };
   
    this.httpClient.get<AvailabilityResponse[]>(this.endpoint, {params :queryParams1})
    .pipe()
    .subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => console.log(err)});
  }
}
