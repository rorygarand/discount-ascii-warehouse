Discount Ascii Warehouse
====

[Working Demo](http://ascii.rorygarand.com)

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage should display a list of products for people to browse.

The application is atypical in that responses are returned in newline delimited json. The data service uses [Oboe.js](http://oboejs.com) to parse json as a stream. The factory/service code was heavily inspired by [angular-oboe](https://github.com/RonB/angular-oboe). Thanks RonB!

Info
----

### How do I start the app?

Start with `node index.js`.


Requirements
----

- Display products in a grid.
- Each product has a "size" field, which is the font-size in pixels. Display the faces in their correct size, to give customers a realistic impression of what they're buying.
- Each product also has a "price" field, in cents, formatted as dollars like `$3.51`.
- Provide the user an option to sort the products in ascending order. Can sort by "size", "price" or "id".
- The product grid should automatically load more items as you scroll down.
- The product database is under high load due to growing demand for ascii, so please display an animated "loading..." message while the user waits.
- To improve the user's experience, pre-emptively fetch the next batch of results in advance, making use of idle-time.  But they still should not be displayed until the user has scrolled to the bottom of the product grid.
- When the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".

Products API
----

- Basic query looks like this: `/api/products`
- Response format is newline-delimited JSON.
- To get a larger results set use the `limit` parameter, eg: `/api/products?limit=100`
- To paginate results use the `skip` parameter, eg: `/api/products?limit=15&skip=30` (returns 15 results starting from the 30th).
- To sort results use the `sort` parameer, eg: `/api/products?sort=price`. Valid sort values are `price`, `size` and `id`.

Ads
----

- Insert an advertisement after every 20 products. T `?r` query param is randomly generated each time an ad is displayed.
- Ads are randomly selected, but a user must never see the same ad twice in a row.

Todo List
----

- Add tests.
- Destroy products in the DOM at the top of the list as the page scrolls down. 
- Change 'whenNearingEnd' directive to load more products whenever the loading bar is on the screen, rather than watching the bottom of the screen.