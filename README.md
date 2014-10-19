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

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Unlicense
As of Oct 18 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
