from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse
import json, uuid
from prs.tasks import *


def routePatient(request):
    userid = str(request.GET.get('userid'))
    postcode = str(request.GET.get('postcode'))
    jid = userid + '-' + str(uuid.uuid4().int)
    print(userid, postcode)

    id = prs_task.delay(jid, userid)

    return HttpResponse(id)


def home(request):
    """
        Home page view
        params: the HTTPRequest
        returns: the home page view
    """

    # return render(request, 'index.html')
    return HttpResponse("API Page. Contact endpoint please.")


def prsquery(request):
    """
        params: An HTTP request
        returns: An HTTP response

        >Load JSON file
        >Add celery task for the query to the Redis queue
        >Send response back to the API
    """

    # Note, consider moving the json loading part inside the celery task
    return routePatient(request)
