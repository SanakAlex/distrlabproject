#!/bin/bash
if test -z "secret"; then
    echo "secret not defined"
    exit 1
fi

export INIT_DUMP='bookcase-service-dump.js'

auth="-u user -p secret"

# MONGODB USER CREATION
(
echo "setup mongodb auth"
create_user="if (!db.getUser('user')) { db.createUser({ user: 'user', pwd: 'secret', roles: [ {role:'readWrite', db:'iptstud'} ]}) }"
until mongo iptstud --eval "$create_user" || mongo iptstud $auth --eval "$create_user"; do sleep 5; done
killall mongod
sleep 1
killall -9 mongod
) &

# INIT DUMP EXECUTION
(
if test -n "$INIT_DUMP"; then
    echo "execute dump file"
	until mongo iptstud $auth $INIT_DUMP; do sleep 5; done
fi
) &

echo "start mongodb without auth"
chown -R mongodb /data/db
gosu mongodb mongod "$@"

echo "restarting with auth on"
sleep 5
exec gosu mongodb /usr/local/bin/docker-entrypoint.sh --auth "$@"
