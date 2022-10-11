# Simple Backend and Frontend
The above is a simple project to make both a frontend and backend services.

## Backend
The backend is a simple nodejs app, which supports websockets to make updates
to the frontend a bit more really time and fast. Also from a resource stand-point
websocket is a faster option for a bi-directional communication which means more
really time updates without the client polling the backend.

### Start backend
1. Navigate to backend folder
2. type npm start (this should start the server on 8080)
```sh
# assume pwd is the git-repo root
cd backend
npm start
```

### how to send commands to the server
There are a bunch of simple commands available on the server which can be called to
help with testing of the frontend. This can be called from the browser or any 
http-client (like postman). But to avoid to much complication all calls are `GET`
method calls which means your browser can just hit the url and it should start
```sh
# paste the below URL to your browser after if you don't have curl
curl http://localhost:8080/api/start
```

The usually syntax for the commands are `http://localhost:8080/api/{command}` where
command is the command name as mentioned below

* **start** - starts the server giving back random data to all listeners
* **stop** - stops the server
* **resetScore** - reset the user score to zero (go for testing if animation works.
  Since new properties forces animation more often)
* **resetTime** - reset the default data-modification time back to 1000ms
* **slowest** - increases data-modification time to 10000ms
* **slower** - increases data-modification time by 100ms
* **slowerBy2** - increases data-modification time by half
* **faster** - reduces data-modification time by 100ms
* **fasterBy2** - reduces data-modification time by half
* **fastest** - reduces data-modification time to 1ms (extreme testing)

## Frontend
Is a simple react webapp, with typescript (which I just picked by during this work
and not going to lie I did have my inhabitions but wow, caught a lot of issues because
of the type-check), with support for websockets and webworker.

**NOTE**: The current implementation of websockets doesn't have a fail-over retry,
which basically means that once the server dies the frontend can't reconnect to the
server unless the page is refreshed.

### Start frontend
1. Navigate to frontend folder
2. type npm start (react webpack server should start at 3000)
```sh
# assume pwd is the git-repo root
cd frontend
npm start
```
