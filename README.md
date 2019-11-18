### Pizzafood

An small backend environment dockerized containing a resftul web api to a small delivery restaurant

### Running the App

If you have docker on your machine simply run `docker-compose up` to get it running.

Simply run `./entrypoin.sh` if you have setted up a postgres local with the user present in config/config.json

### Endpoints

The server runs on `http://localhost:5000`

## GET `api/orders`

Return all orders

## POST `api/orders`

Creates a new order and returns its code

Request body example:

```json
{
  "customer": {
    "name": "John Doe",
    "phone": "1234567889",
    "address": "Du Helder Street, 27"
  },
  "items": [
    {
      "menuId": 1,
      "size": "small",
      "number": 20
    },
    {
      "menuId": 2,
      "size": "medium",
      "number": 2
    }
  ]
}
```

## GET `api/orders/:code`

Return an order by code

## PUT `api/orders/items`

Updates an item from a order

Request body example:

```json
{
  "id": 1,
  "size": "small",
  "number": 12,
  "menuId": 1,
  "orderId": 1
}
```

## PUT `api/orders/status`

Updates the status of an order

Request body example:

```json
{
  "code": "1296364512439143",
  "status": "DELIVERED"
}
```

## DELETE `api/orders/items/:id`

Given the id of an item, removes it from the order.

## DELETE `api/orders/:code`

Given an code removes the respective order that has that code.

### Observations

In case you are using any of this code for a production environment don't forget to gitignore the config.json and changing the docker-compose.yml to your preferences
