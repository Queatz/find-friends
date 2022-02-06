import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attend, Meet, MeetWithAttendance, Place, PlaceWithVotes, Quiz} from "./models";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * The meet attend key
   */
  key = ''

  constructor(private http: HttpClient) {
  }

  getCode(body: GetCodePostBody) {
    return this.http.post<SuccessApiResponse>(`${environment.api}/get-code`, body)
  }

  getQuiz(body: GetQuizPostBody) {
    return this.http.post<GetQuizApiResponse>(`${environment.api}/get-quiz`, body)
  }

  createQuiz(body: QuizPostBody) {
    return this.http.post<Quiz>(`${environment.api}/quiz`, body)
  }

  updateQuiz(body: QuizUpdatePostBody) {
    return this.http.post<Quiz>(`${environment.api}/quiz/${body?.quiz?.id?.split('/')?.[1]}`, body)
  }

  createIdea(body: IdeaPostBody) {
    return this.http.post<SuccessApiResponse>(`${environment.api}/idea`, body)
  }

  getMeet() {
    return this.http.get<MeetAttendanceApiResponse>(`${environment.api}/attend/${this.key}`)
  }

  createMeetPlace(body: MeetPlacesPostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`${environment.api}/attend/${this.key}/places`, body)
  }

  vote(body: VotePostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`${environment.api}/attend/${this.key}/vote`, body)
  }

  confirm(body: ConfirmPostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`${environment.api}/attend/${this.key}/confirm`, body)
  }

  skipMeet() {
    return this.http.post<MeetAttendanceApiResponse>(`${environment.api}/attend/${this.key}/skip`, null)
  }

  unskipMeet() {
    return this.http.post<MeetAttendanceApiResponse>(`${environment.api}/attend/${this.key}/unskip`, null)
  }

  sendProblem(body: MeetProblemPostBody) {
    return this.http.post<SuccessApiResponse>(`${environment.api}/attend/${this.key}/problem`, body)
  }

  sendMeetMessage(meetId: string, body: MeetMessagePostBody) {
    return this.http.post<SuccessApiResponse>(`${environment.api}/meet/${meetId}/message`, body)
  }

  sendFeedback(meetId: string, body: MeetFeedbackPostBody) {
    return this.http.post<SuccessApiResponse>(`${environment.api}/meet/${meetId}/feedback`, body)
  }
}

export class GetCodePostBody {
  contact?: string
}

export class GetQuizPostBody {
  contact?: string
  code?: string
}

export class QuizPostBody {
  quiz?: Quiz
}

export class QuizUpdatePostBody {
  token?: string
  quiz?: Quiz
}

export class IdeaPostBody {
  idea?: string
}

export class MeetPlacesPostBody {
  place?: Place
}

export class VotePostBody {
  place?: string
}

export class ConfirmPostBody {
  meet?: string
  response?: boolean
}

export class MeetMessagePostBody {
  message?: string
}

export class MeetProblemPostBody {
  problem?: string
}

export class MeetFeedbackPostBody {
  feedback?: string
}

export class SuccessApiResponse {
  ok?: Boolean = true
}

export class GetQuizApiResponse {
  token?: string
  quiz?: Quiz
}

export class MeetAttendanceApiResponse {
  attend?: Attend
  name?: string
  attendees?: number
  places?: Array<PlaceWithVotes>
  meets?: Array<MeetWithAttendance>
}
