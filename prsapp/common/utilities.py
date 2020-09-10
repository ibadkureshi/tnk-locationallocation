from pandas.api.types import is_numeric_dtype
from celery.result import AsyncResult
import json
import redis
from django.http import HttpResponseBadRequest, HttpResponse


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


def get_celery_task_status(request):
    """
    Return the status of a task given it's id
    """
    try:
        task_id = request.GET['task-id']
        res = AsyncResult(task_id)
        return HttpResponse(res.status)
    except KeyError:
        return HttpResponseBadRequest("Please provide a task-d")

