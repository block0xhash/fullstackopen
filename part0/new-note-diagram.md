sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enter text in field and click Save
    Note over Browser: Form submit event
    Browser->>Server: POST /new_note

    activate Server
    Note over Server: Process POST request, create new note object with content and date
    Server-->>Browser: 302 Redirect to /notes
    deactivate Server
    
    Note over Browser: Perform new GET request as per server's Location header
    Browser->>Server: GET /notes
    
    activate Server
    Note over Server: Process GET request
    Server-->>Browser: 304 Not Modified (new_note)
    deactivate Server
    
    Browser->>Browser: Load main.css
    Browser->>Server: GET main.css
    
    activate Server
    Server-->>Browser: 200 OK (main.css)
    deactivate Server
    
    Browser->>Browser: Load main.js
    Browser->>Server: GET main.js
    
    activate Server
    Server-->>Browser: 200 OK (main.js)
    deactivate Server
    
    Browser->>Browser: Fetch raw data of notes (data.json) using AJAX
    Browser->>Server: GET /data.json
    
    activate Server
    Note over Server: Process GET request
    Server-->>Browser: 200 OK (data.json)
    
    deactivate Server
    Browser->>Browser: Render new note on page
