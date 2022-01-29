import { RequestService } from './../../../../core/services/request.service';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import * as moment from 'moment';
import {AvailabilityRequest} from './../../../../core/models/availability-request'

@Component({
  selector: 'rosa-workspace-availability-right',
  templateUrl: './availability-right.component.html',
  styleUrls: ['./availability-right.component.scss']
})
export class AvailabilityRightComponent implements OnInit {

  private endpoint = 'https://staging-api.rosa.be/api/availabilities';

  constructor(
    private requestService :RequestService
    ) {
  }

  ngOnInit(): void {
      console.log('right part')
  }



  checkAvailabilities() :void{
   const request : AvailabilityRequest = {
    from : moment().format("YYYY-MM-DD HH:mm:ss"),
    to : moment().add(5, 'days').format("YYYY-MM-DD HH:mm:ss"), 
    motive_id: '61eea350ddf6c500149ae2cb',
    is_new_patient:false, 
    calendar_ids:'61379ba159d4940022b6c928', 
    state:'open'
  }
    this.requestService.checkAvailabilities(request);
}

}
