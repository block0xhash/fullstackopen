   sequenceDiagram

   participant User
    participant Browser
    participant Server

    User->>Browser: Enter URL https://studies.cs.helsinki.fi/exampleapp/spa
    activate Browser
    Browser->>Server: HTTP GET /spa
    activate Server
    Server-->>Browser: HTML document (spa.html)
    deactivate Server
    Browser->>Server: HTTP GET /main.css
    activate Server
    Server-->>Browser: css file (main.css)
    deactivate Server
    Browser->>Server: HTTP GET /spa.js
    activate Server
    Server-->>Browser: JavaScript file (spa.js)
    deactivate Server
    Browser->>Server: HTTP GET /data.json
    activate Server
    Server-->>Browser: JSON data (notes)
    deactivate Server
    Note right of Browser: Browser executes JavaScript which renders notes using DOM-API
    deactivate Browser