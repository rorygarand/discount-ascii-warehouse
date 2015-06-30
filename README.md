Discount Ascii Warehouse
====

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage should display a list of products for people to browse.

Requirements
----

Your task is to implement the following features:

- display the products in a grid.
- each product has a "size" field, which is the font-size in pixels. We should display the faces in their correct size, to give customers a realistic impression of what they're buying.
- each product also has a "price" field, in cents. This should be formatted as dollars like `$3.51`.
- give the user an option to sort the products in ascending order. Can sort by "size", "price" or "id".
- the product grid should automatically load more items as you scroll down.
- our product database is under high load due to growing demand for ascii, so please display an animated "loading..." message while the user waits.
- to improve the user's experience, we should always pre-emptively fetch the next batch of results in advance, making use of idle-time.  But they still should not be displayed until the user has scrolled to the bottom of the product grid.
- when the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".

Products API
----

- The basic query looks like this: `/api/products`
- The response format is newline-delimited JSON.
- To get a larger results set use the `limit` parameter, eg: `/api/products?limit=100`
- To paginate results use the `skip` parameter, eg: `/api/products?limit=15&skip=30` (returns 15 results starting from the 30th).
- To sort results use the `sort` parameer, eg: `/api/products?sort=price`. Valid sort values are `price`, `size` and `id`.

Ads
----

- after every 20 products we need to insert an advertisement from one of our sponsors. Use the same markup as the advertisement in the header, but make sure the `?r` query param is randomly generated each time an ad is displayed.
- Ads should be randomly selected, but a user must never see the same ad twice in a row.

FAQ
----

### How do I start the app?

Start with `node index.js`. The server will look for any files you add to the `static/` directory.
