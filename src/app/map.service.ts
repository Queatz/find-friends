import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private readonly apiKey = 'pk.eyJ1IjoiamFjb2JmZXJyZXJvIiwiYSI6ImNraXdyY211eTBlMmcycW02eDNubWNpZzcifQ.1KtSoMzrPCM0A8UVtI_gdg'

  constructor(private http: HttpClient) { }

  staticMap(geo: string): string {
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${geo},14,0,45/400x300@2x?access_token=${this.apiKey}`
  }

  autocomplete(text: string, types = 'place', proximity?: string): Observable<Array<PlaceResult>> {
    return this.http.get<Array<PlaceResult>>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?country=us&types=${types}${proximity ? `&proximity=${proximity}` : '' }&access_token=${this.apiKey}`).pipe(
      map((res: any) => {
        console.log(res)

        return res.features.map((x: any) => ({
          name: x.text,
          full: x.place_name,
          geo: x.center,
          address: x.properties?.address,
          state: (x.context as Array<any>).filter(y => y.id.startsWith('region'))?.[0]?.short_code?.split('-')?.[1]
        }))
      })
    )
  }
}

export class PlaceResult {
  name!: string
  full!: string
  geo!: Array<number>
  state?: string
  address?: string
}
