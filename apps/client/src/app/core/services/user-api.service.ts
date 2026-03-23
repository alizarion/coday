import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, take } from 'rxjs/operators'
import { toSignal } from '@angular/core/rxjs-interop'
import { Signal } from '@angular/core'

export interface UserListItem {
  username: string
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly http = inject(HttpClient)

  /**
   * Signal that resolves to true if at least one other user exists.
   * Derived from a single one-shot call to GET /api/users at service instantiation.
   * Used to conditionally show the "Share thread" button.
   */
  readonly hasOtherUsers: Signal<boolean | undefined> = toSignal(
    this.http.get<UserListItem[]>('/api/users').pipe(
      take(1),
      map((users) => users.length > 0)
    )
  )

  /**
   * List all known users.
   */
  listUsers() {
    return this.http.get<UserListItem[]>('/api/users')
  }
}
