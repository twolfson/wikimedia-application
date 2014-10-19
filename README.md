# wikimedia-application [![Build status](https://travis-ci.org/twolfson/wikimedia-application.png?branch=master)](https://travis-ci.org/twolfson/wikimedia-application)

Application for Wikimedia software engineer position

## Prompt
You are building an API for a mini-Wikipedia with only a single article called 'Latest_plane_crash'. Just after a plane crash happened, there is a surge of API requests for this article from app and desktop users (>20k req/s). As an approximation for some data massaging, each request for the article in your server needs to recursively calculate fibonacci(34).

At the same time, a lot of editors following the news are scrambling to update the page as details emerge (up to 10 attempted edits/s). Editing happens by downloading the current revision of the text, modifying it and posting it back to the API. The article contains HTML, and should be persisted stored as a plain file on disk. Your code will run on a single 12-core server.

Please design and implement a simple server providing this API using an environment of your choice. Please describe which other resources you'd use in production to handle the request rates mentioned, and how you'd interact with those resources.

## Getting Started
This repository depends on `node>=0.10.0` and `git`.

```bash
# Clone repository
git clone https://github.com/twolfson/wikimedia-application
cd wikimedia-application

# Install dependencies and devDependencies
npm install

# Run test suite
npm test
```

Currently, there is no `bin` script to start the server. See `twolfson/twolfson.com` for an example of a similar one:

https://github.com/twolfson/twolfson.com/blob/3.34.1/bin/twolfson.com

## Planning
- Build `node` server based on `express`
  - `GET /articles` unimplemented
  - `GET /articles/:id`
  - `GET /articles/:id/:revision` unimplemented
  - `PUT /articles/:id`
  - `POST /articles` unimplemented
  - `DELETE /articles/:id` unimplemented
- Create `gitignore'd` directory to save HTML files
- Save URL names to disk with `encodeURIComponent` names
- Figure out ideal locking mechanism. I would like to avoid writing to disk but we do need an external service to scale indefinitely.
  - For reference, since this is a single core machine exercise we *could* use disk and have the master process only allow one worker to write at a time.
  - We also have to worry about timing out those locks...
- For now, use dumb overwriting of files. However, leave note about more advanced diff techniques to handle conflicts (e.g. realtime one that Etherpad uses)

## Explanation
This application is very incomplete from the prompt. Unfortunately, I spent 1 hour setting up the server to my customization (which is test driven and make testing as easy as possible). Here is what is missing:

- Add in versioning system to articles. Either via front matter on articles or in a persistent store. Probably the latter since disk is slooooow.
- Move to common response format for article responses `{revision: numeric-id, content: content}`
- Add in locking mechanism, probably via Redis, using `errorception/redis-lock` since it is the simplest to setup and I know it is easily testable
- Add tests for updates
- Add tests for updates + race conditions
- Add tests for reads while an update is occuring (moar race conditions)
- Add authentication/edit auditing

In production, we would:

- Spin up 12 processes on same machine with different ports
    - The `bin` script should allow for `--port` overriding
- Place processes behind load balancer like HA proxy
- If we start to get multiple machines
    - Move file handling into its own service
    - Move to multiple Redis' for redundancy in case a machine dies
- If we can't keep up with requests
    - Look for alternatives to writing articles to disk because it is slow
        - Maybe writing to in-memory store and persisting via a task queue
    - Perf our library although it is quite lean

## Documentation
### Filesystem
- `config/` - Contains all different settings for our server
- `lib/` - Container heart of server
    - `controllers/` - Functions that handle business logic of requests
    - `errors/` - Container for error constructors and handlers
    - `routes.js` - Per-environmeent routes to controller mapping
    - `wikimedia-application.js` - Wrapper around `express` that binds routes and sets up application
- `test/` - Container for tests
    - `data/` - Container for test data
    - `utils/` - Utilities for testing
    - `*.js` - Tests for different routes/controllers

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Unlicense
As of Oct 18 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
