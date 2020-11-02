#!/bin/bash
rm celeryd.pid 2>/dev/null
celery -A pmedapp worker -l info --logfile=celery.log -D -E
uwsgi --http :8000 --module pmedapp.wsgi
