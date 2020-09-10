#!/bin/bash
rm celeryd.pid
celery -A prsapp worker -l info --logfile=celery.log -D -E
uwsgi --http :8000 --module prsapp.wsgi
