from django.shortcuts import render
from pmedian.tasks import *
from pandas import errors
from prsapp.common.utilities import *
import json
import pandas as pd
from django.views.decorators.csrf import csrf_exempt
from django.utils.datastructures import MultiValueDictKeyError

@csrf_exempt
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

# {"name": "test", // xristis
#   "id": "000", //keno
#   "time": {"submit": "???"},// front
#   "job_type": "pmedian",// front
#   "input":
#   {"demand":
#   {"file": "pmedian/functions/data/demand_data.csv", "lat_column": 0, "long_column": 1}//xristis
#   }, "properties":
# {"type": "geographic", //default
#   "cost_type": "time",//xristis
#   "demand_pts": {"if_out_of_bounds": "exclude"},//default
#   "box": {"sw": "52.25,-0.1", "ne": "52.5,0.4", "grid_height": "None", "grid_length": 10},//xristis
#   "p_val": {"min": 3, "max": 5}}}//xristis

@csrf_exempt
def create_task(request):
    if request.method == 'POST':
        try:
            request.FILES['myfile']
            print(json.loads(request.POST.get('data')))

            task = p_median_calculation_task.delay()
            return HttpResponse("Task-id=" + str(task))
        except MultiValueDictKeyError:
            return HttpResponseBadRequest("Please provide the correct input data")
    else:
        return HttpResponse(status=405, reason="Method not allowed")


@csrf_exempt
def get_task(request):
    """
    Return the status of a task given it's id
    """
    try:
        task_id = request.GET['task-id']
        result = AsyncResult(task_id)
        result_dct = {result.task_id: {'status': result.status, 'result': result.result, 'date_done': str(result.date_done)}}
        return HttpResponse(json.dumps(result_dct))

    except KeyError:
        return HttpResponseBadRequest("Please provide a valid task-id")

@csrf_exempt
def get_all_tasks(request):
    """
    Get all celery tasks from  and return id, status (json)
    """

    import glob
    path = "/tmp/results/celery-task-meta-*"
    results = (glob.glob(path))

    result_dct = {}
    for result in results:
        result_dct[result[len(path)-1:]] = {'status': AsyncResult(result[len(path)-1:]).status
            , 'result': AsyncResult(result[len(path)-1:]).result, 'date_done': str(AsyncResult(result[len(path)-1:]).date_done)}

    return HttpResponse(json.dumps(result_dct))

