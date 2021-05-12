import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Restaurant } from '../model/restaurant';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private base = "http://localhost:8081/apis/restaurant"

  constructor(private http: HttpClient) { }

  getAllRestaurants = async (pageSize: number, page: number, query?: string): Promise<HttpResponse<Restaurant[]>> => {
    let params = `page-size=${pageSize}&page=${page}`
    // POSSIBLE SEARCH IMPLEMENTATION (future)
    // params += (typeof query !== 'undefined') ? `&${query}` : '' 

    return new Promise((resolve, reject) => {
      this.http.get<Restaurant[]>(`${this.base}?${params}`, {observe: 'response'}).subscribe(
      (resp) => {
        resolve(resp)
      },
      (err) => {
        reject(err)
      }
    )})
  }

  getRestaurant = (id: number): Promise<Restaurant> => {
    return new Promise((resolve, reject) => {
      this.http.get<Restaurant>(`${this.base}/${id}`).subscribe(
      (resp) => {
        resolve(resp)
      },
      (err) => {
        reject(err)
      }
    )})
  }

  createRestaurant = (payload: Restaurant): Promise<Restaurant> => {
    const headers = {'content-type': 'application/json'}
    return new Promise((resolve, reject) => {
      this.http.post<Restaurant>(this.base, JSON.stringify(payload), {'headers': headers})
        .subscribe(
          (resp) => {
            resolve(resp)
          },
          (err) => {
            reject(err)
          }
        )
    })
  }

  updateRestaurant = (payload: Restaurant) => {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.base}/${payload.restaurantId}`, payload).subscribe(
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
    
    
  }

  deleteRestaurant = (id: number): Promise<HttpResponse<any>> => {
    return new Promise((resolve, reject) => {
      this.http.delete<Restaurant>(`${this.base}/${id}`, {observe: 'response'}).subscribe(
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  addManager = (id: number, user: User): Promise<HttpResponse<Restaurant>> => {
    const payload = {
      userId: user.userId,
      username: user.username,
      role: user.role,
      isActive: user.isActive
    }
    console.log(payload)
    const endpoint = `s/${Number(id)}/managers`
    return new Promise((resolve, reject) => {
      this.http.put<Restaurant>(`${this.base}${endpoint}`, payload, {observe: 'response'}).subscribe(
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  removeManager = (id: number, payload: User): Promise<HttpResponse<Restaurant>> => {
    const endpoint = `s/${id}/managers/${payload.userId}`
    return new Promise((resolve, reject) => {
      this.http.delete<Restaurant>(`${this.base}${endpoint}`, {observe: 'response'}).subscribe(
        (resp) => {
          resolve(resp)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }
}