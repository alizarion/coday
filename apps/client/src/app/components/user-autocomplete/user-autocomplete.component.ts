import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { AutocompleteInputComponent, AutocompleteItem } from '@whoz-oss/design-system'
import { UserApiService } from '../../core/services/user-api.service'
import { UserAutocompleteSource } from './user-autocomplete-source'

/**
 * UserAutocompleteComponent — user search autocomplete.
 *
 * Wraps ds-autocomplete-input with a UserAutocompleteSource data source.
 * Consumers provide an exclusion list and react to user selection.
 *
 * @example
 * <app-user-autocomplete
 *   [excludedUserIds]="excludedIds"
 *   (userSelected)="onUserSelected($event)"
 * />
 */
@Component({
  selector: 'app-user-autocomplete',
  standalone: true,
  imports: [AutocompleteInputComponent],
  template: `
    <ds-autocomplete-input
      [dataSource]="dataSource"
      [placeholder]="placeholder"
      [disabled]="disabled"
      (itemSelected)="onItemSelected($event)"
    />
  `,
})
export class UserAutocompleteComponent implements OnInit {
  @Input() excludedUserIds: string[] = []
  @Input() placeholder: string = 'Search username'
  @Input() disabled: boolean = false

  @Output() userSelected = new EventEmitter<string>()

  private readonly userApi = inject(UserApiService)

  protected dataSource!: UserAutocompleteSource

  ngOnInit(): void {
    this.dataSource = new UserAutocompleteSource(this.userApi, () => this.excludedUserIds)
  }

  protected onItemSelected(item: AutocompleteItem): void {
    this.userSelected.emit(item.id)
  }
}
