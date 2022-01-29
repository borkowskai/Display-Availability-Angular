import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailabilityResponse } from '../models/availability-response';
import { AvailabilityRequest } from '../models/availability-request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private endpoint = 'https://staging-api.rosa.be/api/availabilities';

  constructor(private httpClient: HttpClient) {}

  public checkAvailabilities(
    request: AvailabilityRequest
  ): Observable<AvailabilityResponse[]> {
    const queryParams = {
      from: request.from,
      to: request.to,
      motive_id: request.motive_id,
      is_new_patient: request.is_new_patient,
      calendar_ids: request.calendar_ids,
      state: request.state,
    };

    return this.httpClient.get<AvailabilityResponse[]>(this.endpoint, {
      params: queryParams,
    });
  }
}
