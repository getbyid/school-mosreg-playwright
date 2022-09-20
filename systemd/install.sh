#!/bin/sh

UNITS_DIR=~/.config/systemd/user
UNIT_NAME=school-mosreg

if [ ! -d $UNITS_DIR ]; then
    echo "Create a missing user units directory"
    mkdir -p $UNITS_DIR
fi

APP_DIR=$(cd "$(dirname "$0")" && cd .. && pwd)
cp "$APP_DIR/systemd/$UNIT_NAME.service" $UNITS_DIR
cp "$APP_DIR/systemd/$UNIT_NAME.timer" $UNITS_DIR
sed -i -E "s|\{APP_DIR\}|$APP_DIR|" $UNITS_DIR/$UNIT_NAME.service

systemctl --user enable $UNIT_NAME.timer
systemctl --user start $UNIT_NAME.timer
