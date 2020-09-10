from django.shortcuts import render
from pmedian.tasks import *
from pandas import errors
from prsapp.common.utilities import *


def extract_csv(request):
    """
    Getting a (two-column) csv and returning it as a json
    **Expected a lat/lon csv with headers
    """
    if request.method == 'POST' and request.FILES['myfile']:

        if not validate_upload(request, '.csv'):
            return HttpResponseBadRequest("Data error: Please provide a valid csv file")

        try:
            # expecting csv with headers
            df = pd.read_csv(request.FILES['myfile'])
            if column_numeric(df[df.columns[0]]) and column_numeric(df[df.columns[1]]) and not df.isnull().values.any():
                return HttpResponse(df.to_json(orient="records"))
            else:
                return HttpResponseBadRequest("Data input error: Ensure data is numeric and no missing values exist")

        except errors.EmptyDataError:
            return HttpResponse('CSV file is empty')

    else:
        # In case of GET request, just show the form
        return render(request, 'file_upload.html', locals())


def create_task(request):
    task = p_median_calculation_task.delay()
    return HttpResponse("Task-id=" + str(task))


def get_task(request):
    """
    Return the status of a task given it's id
    """
    return get_celery_task_status(request)


def get_all_tasks(request):
    """
    Get all tasks from redis and return id, status (json)
    """
    return HttpResponse("method not defined yet")
    #return get_all_celery_tasks_redis(host='prs-redis', port=6379, db=0)
