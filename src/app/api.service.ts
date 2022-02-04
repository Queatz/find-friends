import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attend, Meet, Place, Quiz} from "./models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  key!: string

  constructor(private http: HttpClient) {
  }

  getCode(body: GetCodePostBody) {
    return this.http.post<SuccessApiResponse>('/get-code', body)
  }

  getQuiz(body: GetQuizPostBody) {
    return this.http.post<GetQuizApiResponse>('/get-quiz', body)
  }

  createQuiz(body: QuizPostBody) {
    return this.http.post<Quiz>('/quiz', body)
  }

  updateQuiz(body: QuizUpdatePostBody) {
    return this.http.post<Quiz>(`/quiz/${this.key}`, body)
  }

  createIdea(body: IdeaPostBody) {
    return this.http.post<SuccessApiResponse>('/idea', body)
  }

  getMeet() {
    return this.http.get<MeetAttendanceApiResponse>(`/meet/${this.key}`)
  }

  createMeetPlace(body: MeetPlacesPostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`/meet/${this.key}/places`, body)
  }

  vote(body: VotePostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`/meet/${this.key}/vote`, body)
  }

  confirm(body: ConfirmPostBody) {
    return this.http.post<MeetAttendanceApiResponse>(`/meet/${this.key}/confirm`, body)
  }

  skipMeet() {
    return this.http.post<SuccessApiResponse>(`/meet/${this.key}/skip`, null)
  }

  sendMeetMessage(body: MeetMessagePostBody) {
    return this.http.post<SuccessApiResponse>(`/meet/${this.key}/message`, body)
  }

  sendProblem(body: MeetProblemPostBody) {
    return this.http.post<SuccessApiResponse>(`/meet/${this.key}/problem`, body)
  }

  sendFeedback(body: MeetFeedbackPostBody) {
    return this.http.post<SuccessApiResponse>(`/meet/${this.key}/feedback`, body)
  }
}

class GetCodePostBody {
  contact?: String
}

class GetQuizPostBody {
  contact?: String
  code?: String
}

class QuizPostBody {
  quiz?: Quiz
}

class QuizUpdatePostBody {
  token?: String
  quiz?: Quiz
}

class IdeaPostBody {
  idea?: String
}

class MeetPlacesPostBody {
  place?: Place
}

class VotePostBody {
  place?: String
}

class ConfirmPostBody {
  place?: String
}

class MeetMessagePostBody {
  message?: String
}

class MeetProblemPostBody {
  problem?: String
}

class MeetFeedbackPostBody {
  feedback?: String
}

class SuccessApiResponse {
  ok?: Boolean = true
}

class GetQuizApiResponse {
  token?: String
  quiz?: Quiz
}

class MeetAttendanceApiResponse {
  meet?: Meet
  places?: Array<Place>
  attend?: Attend
}

