from pandas.api.types import is_numeric_dtype
from celery.result import AsyncResult
import json
#import redis
from django.http import HttpResponseBadRequest, HttpResponse
import mimetypes


def column_numeric(column):
    """
    Ensure that the dataframe has only numeric values
    """
    # numeric only data
    if not is_numeric_dtype(column):
        return False
    else:
        return True


def validate_upload(request, extension='.csv'):
    """
    Ensure that the file uploaded is of a defined type
    """

    # check that a file is provided
    if len(request.FILES) == 0 or not request.FILES['myfile'].name.endswith(extension):
        return False
    else:
        return True


def download_output_file(request):
    """
    Return the requested output file for the user to download locally
    """
    try:
        filename = request.GET['filename']
        filepath = 'output/' + filename
        fl = open(filepath, 'r')
        mime_type, _ = mimetypes.guess_type(filepath)
        response = HttpResponse(fl, content_type=mime_type)
        response['Content-Disposition'] = "attachment; filename=%s" % filename
        return response
    except KeyError:
        return HttpResponseBadRequest("Please provide a filename")
