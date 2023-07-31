#!/usr/bin/env bash

if [ $API_HOST ]; then
	echo "SET API_HOST--->" $API_HOST
	sed -i 's#'''API_HOST'''#'''$API_HOST'''#g' /etc/nginx/nginx.conf
fi

nginx -g "daemon off;"
