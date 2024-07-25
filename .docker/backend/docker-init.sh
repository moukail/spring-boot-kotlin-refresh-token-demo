#!/usr/bin/env bash

# create new project if not exists
if [ ! -d "./src" ]; then
  . /home/install.sh
fi

./gradlew clean
./gradlew -i bootRun &

while true; do
  inotifywait -e modify,create,delete,move -r ./src/ && \
  ./gradlew -i assemble
done

java -jar ./build/libs/demo-0.0.1.jar help

tail -f /dev/null

