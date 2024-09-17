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
      "Month": "2024-09",
      "Budgets": [
        {
          "id": 1,
          "name": "Groceries",
          "allocated": 200,
          "start_date": "03-01-2024",
          "end_date": null,
          "spent": 105.47
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
          "allocated": 200,
          "spent": 105.47
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
        "allocated": 200,
        "spent": 105.47,
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
