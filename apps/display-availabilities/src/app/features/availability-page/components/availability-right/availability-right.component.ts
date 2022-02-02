import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// to avoid relative imports create index.ts (+ config in tsConfig)
import { AvailabilityRequest } from './../../../../core/models/availability-request';
import { AvailabilityResponse } from './../../../../core/models/availability-response';
import { RequestService } from './../../../../core/services/request.service';

moment.locale('fr-be');
@Component({
  selector: 'rosa-workspace-availability-right',
  templateUrl: './availability-right.component.html',
  styleUrls: ['./availability-right.component.scss'],
})
export class AvailabilityRightComponent implements OnInit {
  fromDate: Date = moment().toDate();
  today: string = moment().format('MMM D');

  maxDays: number = 6;
  currentMeetingReason = 'culturalFit';
  meetingReasons: MeetingReason[] = [
    {
      reason: 'culturalFit',
      motive_id: '61eea367ddf6c500149ae2cc',
      duration: 30,
    },
    {
      reason: 'technicalAssesement',
      motive_id: '61eea350ddf6c500149ae2cb',
      duration: 90,
    },
    {
      reason: 'firstAppointement',
      motive_id: '61379ba159d4940022b6c929',
      duration: 30,
    },
  ];

  availabilities: AvailabilityResponse[] = [];
  days: DateType[] = [];

  noSlots!: boolean;
  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.checkAvailabilities();
  }

  checkAvailabilities(): void {
    const request: AvailabilityRequest = {
      from: moment(this.fromDate).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      to: moment(this.fromDate)
        .add(this.maxDays, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      motive_id: '61eea350ddf6c500149ae2cb',
      is_new_patient: false,
      calendar_ids: '61379ba159d4940022b6c928',
      state: 'open',
    };
    this.requestService
      .checkAvailabilities(request)
      .pipe(
        map((availabilities) => {
          return availabilities;
        })
      )
      .subscribe({
        next: (res) => {
          this.availabilities = res;
          this.setCalendar(this.availabilities);
        },
        error: (err) => console.log(err),
      });
  }

  setCalendar(res: AvailabilityResponse[]): DateType[] {
    this.noSlots = true;
    for (let i = 0; i < this.maxDays; i++) {
      // TODO remove everywere toDate and use moment.Moment
      const currentDate: moment.Moment = moment(this.fromDate).add(i, 'days');

      let slots = this.setSlots(res, currentDate);
      let day: string = moment(currentDate).format('MMM D');
      let weekDay: string = moment(currentDate).format('dd').toUpperCase();

      this.noSlots = this.noSlots && slots.length === 0;
      this.days.push({ dateFR: day, weekDay: weekDay, slots: slots });
    }
    return this.days;
  }

  setSlots(
    responses: AvailabilityResponse[],
    dateFrom: moment.Moment
  ): string[] {
    let slots: string[] = [];
    for (let res of responses) {
      let dataAPI: Date | undefined = res.startAt;

      // it has to be store in new variable - moment is mutable
      let firstDate: Date = moment(dataAPI).startOf('day').toDate();
      let secondDate: Date = moment(dateFrom).startOf('day').toDate();
      let isSameDay = moment(firstDate).isSame(secondDate);

      if (isSameDay) {
        let availabilitiesDuration = res.duration;
        let slotDuration = this.meetingReasons.find(
          (reason) => reason.reason === this.currentMeetingReason
        )?.duration;
        if (availabilitiesDuration && slotDuration) {
          let numberOfSlots: number = Math.floor(
            availabilitiesDuration / slotDuration
          );

          for (let i = 0; i < numberOfSlots; i++) {
            let startTime = moment(dataAPI).add(slotDuration * i, 'minutes');

            if (moment().isBefore(startTime)) {
              slots.push(moment(startTime).format('HH:mm'));
            }
          }
        } else {
          console.log(
            'sth is missing 1st value availabilitiesDuration ,second slotDuration',
            availabilitiesDuration,
            slotDuration
          );
        }
      }
    }
    return slots;
  }

  nextDays(): void {
    this.days = [];
    this.checkAvailabilities();
  }

  previousDays(): void {
    console.log('previuos');

    this.fromDate = moment(this.fromDate)
      .subtract(this.maxDays * 2, 'days')
      .toDate();
    this.days = [];
    this.checkAvailabilities();
  }

  ngOnDestroy(): void {
    // TODO: unsubscribe => it could be takeUntil during subscribe, or list of Observable set to []
  }
}
interface DateType {
  dateFR: string;
  weekDay: string;
  slots: string[];
}

interface MeetingReason {
  reason: string;
  motive_id: string;
  duration: number;
}
