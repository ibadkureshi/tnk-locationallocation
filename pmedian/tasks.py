from celery import shared_task


@shared_task
def p_median_calculation_task():
    print("pmedian calculation")
    return "pmedian calculation"