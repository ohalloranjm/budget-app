# Backend API Routes

Unless otherwise specified, **all routes** require authentication.

- Error Response: Require authentication

  - Status Code: 401
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

Unless they do not have a body, **all requests and responses** have a `Content-Type` header of `application/json`.

## Budgets

### View All Your Budgets

- Request
  - Method: `GET`
  - Route: `/budgets`
- Response
  - Status code: 200
  - Body:
    ```json
    {
      "Budgets": [
        {
          "id": 1,
          "name": "Groceries",
          "allocated": 1000,
          "start_date": "03-01-2024",
          "end_date": null,
          "spent": 105.47,
          "icon": "shopping-bag.png"
        }
      ]
    }
    ```

### View a Summary of Your Budgets for a Specific Month

- Request
  - Method: `GET`
  - Route: `/budgets/months/:yyyymm`
- Response
  - Status code: 200
  - Body:
    ```json
    {
      "Month": "2024-09",
      "Budgets": [
        {
          "id": 1,
          "name": "Groceries",
          "allocated": 1000,
          "spent": 105.47,
          "icon": "shopping-bag.png"
        }
      ]
    }
    ```

### View Budget Details for a Specific Month

- Request
  - Method: `GET`
  - Route: `/budgets/:budgetId/months/:yyyymm`
- Response
  - Status code: 200
  - Body:
    ```json
    {
      "Month": "2024-09",
      "Budget": {
        "id": 1,
        "name": "Groceries",
        "allocated": 1000,
        "spent": 105.47,
        "icon": "shopping-bag.png",
        "Transactions": [
            {
                "id": 1,
                "date": 2024-09-10,
                "name": "Wallmart run",
                "amount": 99.80
            }
        ]
      }
    }
    ```
- Error response: Budget month not found
  - Status code: 404
  - Body
    ```json
    {
      "message": "Budget month not found"
    }
    ```

### Create a New Budget

- Request
  - Method: `POST`
  - Route: `/budgets`
  - Body:
    ```json
    {
      "name": "Groceries",
      "allocated": 1000,
      "startDate": "2023-04-01",
      "endDate": "2024-01-31",
      "icon": "shopping-bag.png"
    }
    ```
    - Optional fields:
      - `startDate`: defaults to the first of the current month
      - `endDate`: blank field or `null` indicates a budget with no defined end date
- Successful response
  - Status code: 201
  - Body:
    ```json
    {
      "message": "Budget successfully created",
      "Budget": {
        "id": 1,
        "name": "Groceries",
        "allocated": 1000,
        "startDate": "2023-04-01",
        "endDate": "2024-01-31",
        "icon": "shopping-bag.png"
      }
    }
    ```
- Error response: Bad request

  - Status code: 400
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "name": "Name is required",
        "allocated": "Budget allocation is required",
        "allocated": "Budget allocation must be a positive number",
        "startDate": "Start date is required",
        "startDate": "Date must be in YYYY-MM-DD format",
        "startDate": "Start date must be the 1st day of a month",
        "endDate": "Date must be in YYYY-MM-DD format",
        "endDate": "End date must be the last day of a month",
        "endDate": "End date cannot be on or before start date",
        "dateRange": "The provided date range overlaps with an existing budget with the same name",
        "icon": "Icon must be one of <options A, B, etc.>"
      }
    }
    ```

### Edit a Budget

- Request
  - Method: `PUT`
  - Route: `/budgets/:budgetId`
  - Body
    ```json
    {
      "name": "Clothes",
      "allocated": 100,
      "startDate": "2025-01-01",
      "endDate": "2025-12-31",
      "icon": "shirt.png"
    }
    ```
    - Optional fields: All (a blank field will not be changed)
- Successful response
  - Status code: 200
  - Body
    ```json
    {
      "message": "Budget successfully updated",
      "Budget": {
        "id": 1,
        "name": "Clothes",
        "allocated": 100,
        "startDate": "2025-01-01",
        "endDate": "2025-12-31",
        "icon": "shirt.png"
      }
    }
    ```
- Error response: Bad request

  - Status code: 400
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "allocated": "Budget allocation must be a positive number",
        "startDate": "Date must be in YYYY-MM-DD format",
        "startDate": "Start date must be the 1st day of a month",
        "endDate": "Date must be in YYYY-MM-DD format",
        "endDate": "End date must be the last day of a month",
        "endDate": "End date cannot be on or before start date",
        "dateRange": "The provided date range overlaps with an existing budget with the same name",
        "dateRange": "The provided date range excludes one or more existing transactions",
        "icon": "Icon must be one of <options A, B, etc.>"
      }
    }
    ```

- Error response: Budget not found
  - Status code: 404
  - Body
    ```json
    {
      "message": "Budget not found"
    }
    ```

### Delete a Budget

- Request
  - Method: `DELETE`
  - Route: `/budgets/:budgetId`
- Successful response
  - Status code: 200
  - Body
    ```json
    {
      "message": "Successfully deleted"
    }
    ```
- Error response: Budget not found
  - Status code: 404
  - Body
    ```json
    {
      "message": "Budget not found"
    }
    ```
