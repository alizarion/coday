import { Observable, map } from 'rxjs'
import { AutocompleteDataSource, AutocompleteItem } from '@whoz-oss/design-system'
import { UserApiService } from './user-api.service'

/**
 * Autocomplete data source for user search.
 * Filters the global user list, excluding specified userIds.
 */
export class UserAutocompleteSource extends AutocompleteDataSource {
  constructor(
    private readonly userApi: UserApiService,
    private readonly excludedUserIds: () => string[] // function so it's always current
  ) {
    super()
  }

  search(query: string): Observable<AutocompleteItem[]> {
    const lowerQuery = query.toLowerCase()
    return this.userApi.listUsers().pipe(
      map((users) => {
        const excluded = this.excludedUserIds()
        return users
          .filter((u) => !excluded.includes(u.username))
          .filter((u) => u.username.toLowerCase().includes(lowerQuery))
          .map((u) => ({ id: u.username, name: u.username }))
      })
    )
  }
}
