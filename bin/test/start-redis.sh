#!/usr/bin/env bash
# Echo commands and exit on first error
set -e
set -x

# Define our pidfile location
pidfile="test/redis.pid"

# if the redis port is not defined, define it
redis_port="$REDIS_PORT"
if test "$redis_port" = ""; then
  redis_port="9002"
fi

# Start up a redis daemon
redis-server --port "$redis_port" --daemonize yes --pidfile "$pidfile"
