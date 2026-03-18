import { Observable } from 'rxjs'

/**
 * Represents a single autocomplete suggestion item.
 */
export interface AutocompleteItem {
  /** Unique identifier (username, agent ID, etc.) */
  id: string
  /** Display label */
  name: string
  /** Optional secondary text */
  description?: string
}

/**
 * Abstract data source for the autocomplete component.
 * Implement this to provide domain-specific autocomplete suggestions.
 *
 * @example
 * class UserAutocompleteSource extends AutocompleteDataSource {
 *   search(query: string): Observable<AutocompleteItem[]> {
 *     return this.userApi.listUsers().pipe(
 *       map(users => users.filter(u => u.username.includes(query)))
 *     )
 *   }
 * }
 */
export abstract class AutocompleteDataSource {
  abstract search(query: string): Observable<AutocompleteItem[]>
}
