    participant User as User (Browser)
    participant SPA as SPA (JavaScript)
    participant Server
        User->>SPA: (1) Fill form
        User->>SPA: (2) Submit form
        SPA->>SPA: (3) Prevent default submit
        SPA->>SPA: (4) Create new note
        SPA->>SPA: (5) Add note to list
        SPA->>Server: (6) Send note to server
        Server-->>SPA: (7) Respond with status code 201
        SPA->>User: (8) Update the page (no refresh)