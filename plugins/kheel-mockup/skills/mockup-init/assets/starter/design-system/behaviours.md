# Shared behaviours

Behaviours that belong to a category of components rather than to one. Each applies by default to every component
in its category; a component joins a category by naming the behaviour in its `Behaviour` section, and departs
from it only by saying so and why.

## Field validation

**Applies to.** Every form field: `ui-text-field`, `ui-select`, `ui-checkbox`, and any field added later.

**Behaviour.**

1. A field is not validated until the user leaves it or submits the form.
2. When invalid, the field shows its error message beneath itself, replacing any helper text, and takes the
   invalid state (danger border).
3. The error clears as soon as the value becomes valid, without waiting for the user to leave the field.
4. On submit with errors, focus moves to the first invalid field.

**Overriding it.** A field that validates as the user types (a password strength meter) says so in its own
Behaviour section.

**Accessibility.** The error is announced and associated with the field; invalid is never shown by colour alone —
the message and an icon carry it.

## Remote list loading

**Applies to.** Any control that fetches its options from the server: a select of customers, a search-as-you-type
field.

**Behaviour.**

1. While the request is in flight, the control shows a loading indicator in its list and nothing is selectable.
2. When the options arrive, they replace the indicator.
3. If the request fails, the list shows "Couldn't load options" with a Retry action that re-runs the request.
4. If the request returns nothing, the list says so ("No customers found").

**Overriding it.** A control whose options are always held locally has no loading state, and says so.

**Accessibility.** Loading, failure and no results are announced, not signalled by a spinner alone.

## Sortable columns

**Applies to.** Every `ui-table-column` with `sortable`.

**Behaviour.**

1. At most one column in a table is sorted at a time.
2. Clicking an unsorted column sorts ascending; clicking again sorts descending; clicking a third time returns to
   ascending. Clicking a different column moves the sort to it, ascending.
3. The sorted column shows its direction with an arrow.
4. Changing the sort returns pagination to page 1 and keeps filters and selection.

**Overriding it.** A table with a fixed, meaningful order (a ranked list) has no sortable columns.

**Accessibility.** The sorted column carries `aria-sort`; the change of order is announced.

## Filtering

**Applies to.** Filter controls above a collection: chips, selects and search fields in a table's toolbar or a
gallery's filter bar.

**Behaviour.**

1. Filters apply as soon as they change; there is no Apply button.
2. Filters combine with AND across different filters and OR within one multi-choice filter.
3. Search matches the item's name and main text fields, and combines with the filters.
4. When any filter is active, a Clear filters action appears at the end of the filter bar.
5. When filters match nothing, the collection shows the "nothing matches" empty state with Clear filters, never
   the "nothing yet" one.
6. Changing filters returns pagination to page 1.

**Overriding it.** A collection with expensive queries may use an Apply button, and says so.

**Accessibility.** The number of results is announced after a change.
