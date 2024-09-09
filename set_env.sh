#!/bin/sh
export RUNNING=$RANDOM
echo Running: $RUNNING
envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.$RUNNING.js
sed -i "s/env.min.js/env.$RUNNING.js/g" /usr/share/nginx/html/index.html
# exec nginx -g 'daemon off;'