import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { getFormattedDate } from 'src/app/helpers/departments/get-formatted-date/getFormattedDate';
import { RecognitionsService } from 'src/app/recognitions/recognitions.service';
import { EventsService } from 'src/app/events/services/events.service';
import { IEventHistoryByUserResponse } from 'src/app/events/interfaces/event-history-by-user-response.interface';
import { IGivenRecognitionsResponse } from 'src/app/recognitions/interfaces/given-recognitions.interface';
import { IReceivedRecognitionsResponse } from 'src/app/recognitions/interfaces/received-recognitions.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public isLoading = false;
  public filter: string = '';
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private recognitionService: RecognitionsService,
    private eventService: EventsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      const { id } = params;

      if (id) {
        this.userService.getUserDetails(id).subscribe();
        this.recognitionService.getGivenRecognitions(id).subscribe();
        this.recognitionService.getReceivedRecognitions(id).subscribe();
        this.eventService.getEventHistoryByUserId(id, true).subscribe();
      }
      this.isLoading = false;
    });
  }

  get userDetails(): UserData | null {
    return this.userService.userDetails;
  }

  get givenRecognitions(): IGivenRecognitionsResponse[] | null {
    return this.recognitionService.givenRecognitions;
  }

  get receivedRecognitions(): IReceivedRecognitionsResponse[] | null {
    return this.recognitionService.receivedRecognitions;
  }

  get eventHistoryByUser(): IEventHistoryByUserResponse[] | null {
    return this.eventService.eventHistoryByUser;
  }

  getFormattedDate(date: any): string {
    return getFormattedDate(date);
  }
}
