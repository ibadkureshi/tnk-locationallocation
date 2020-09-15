from django.shortcuts import render
from pmedian.tasks import *
from pandas import errors
from prsapp.common.utilities import *
import json
import pandas as pd
from django.views.decorators.csrf import csrf_exempt
from django.utils.datastructures import MultiValueDictKeyError
import glob
import os.path


@csrf_exempt
def serve_front(request):
    return render(request, 'index.html', locals())

