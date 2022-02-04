import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attend, Meet, Place, Quiz} from "./models";
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
    return this.http.get<MeetAttendanceApiResponse>(`${environment.api}/meet/${this.key}`)
  }

  createMeetPlace(body: MeetPlacesPostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`${environment.api}/meet/${this.key}/places`, body)
  }

  vote(body: VotePostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`${environment.api}/meet/${this.key}/vote`, body)
  }

  confirm(body: ConfirmPostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`${environment.api}/meet/${this.key}/confirm`, body)
  }

  skipMeet() {
    return this.http.post<SuccessApiResponse>(`${environment.api}/meet/${this.key}/skip`, null)
  }

  sendMeetMessage(body: MeetMessagePostBody) {
    return this.http.post<SuccessApiResponse>(`${environment.api}/meet/${this.key}/message`, body)
  }

  sendProblem(body: MeetProblemPostBody) {
    return this.http.post<SuccessApiResponse>(`${environment.api}/meet/${this.key}/problem`, body)
  }

  sendFeedback(body: MeetFeedbackPostBody) {
    return this.http.post<SuccessApiResponse>(`${environment.api}/meet/${this.key}/feedback`, body)
  }
}

class GetCodePostBody {
  contact?: string
}

class GetQuizPostBody {
  contact?: string
  code?: string
}

class QuizPostBody {
  quiz?: Quiz
}

class QuizUpdatePostBody {
  token?: string
  quiz?: Quiz
}

class IdeaPostBody {
  idea?: string
}

class MeetPlacesPostBody {
  place?: Place
}

class VotePostBody {
  place?: string
}

class ConfirmPostBody {
  place?: string
}

class MeetMessagePostBody {
  message?: string
}

class MeetProblemPostBody {
  problem?: string
}

class MeetFeedbackPostBody {
  feedback?: string
}

class SuccessApiResponse {
  ok?: Boolean = true
}

class GetQuizApiResponse {
  token?: string
  quiz?: Quiz
}

class MeetAttendanceApiResponse {
  meet?: Meet
  places?: Array<Place>
  attend?: Attend
}

