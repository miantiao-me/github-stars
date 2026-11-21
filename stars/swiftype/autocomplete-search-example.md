---
project: autocomplete-search-example
stars: 4
description: |-
    Example showing how to use Swiftype's jQuery autocomplete and search plugins together
url: https://github.com/swiftype/autocomplete-search-example
---

# Swiftype Autocomplete and Search Example

This example shows how to combine the Swiftype autocomplete and search jQuery libraries to create a common search experience: autocomplete results plus redirecting to a full search results page.

This example uses a search engine based on the Swiftype website created using our [web crawler](https://swiftype.com/documentation/crawler).

## How it works

On the index.html, there is a search box. The autocomplete is configured with the `swiftype` function (see [Swiftype's autocomplete plugin](https://github.com/swiftype/swiftype-autocomplete-jquery/) for details). Additionally, there is a jQuery submit event handler that redirects to the search results page with the `stq` hash parameter set.

On the search results page, the form is repeated, but without the redirect (since the browser is already on that page). The `swiftypeSearch` function is also configured. This handles displaying the search results in the provided `resultContainingElement`. See the [Swiftype search plugin](https://github.com/swiftype/swiftype-search-jquery/) for more details.


