import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, tap } from 'rxjs'

export interface UserListItem {
  username: string
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly http = inject(HttpClient)
  private cache: UserListItem[] | null = null

  /**
   * List all known users. Results are cached in memory after the first call.
   */
  listUsers(): Observable<UserListItem[]> {
    if (this.cache) {
      return of(this.cache)
    }
    return this.http.get<UserListItem[]>('/api/users').pipe(
      tap((users) => {
        this.cache = users
      })
    )
  }

  /**
   * Clear the cached user list (e.g. after adding a new user that should appear).
   */
  clearCache(): void {
    this.cache = null
  }
}
