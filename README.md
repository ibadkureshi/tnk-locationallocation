# Patient Routing Service

Use this query in a browser when the container is running.

http://localhost:8000/query?userid=X&postcode=PE218RN

1. Use this query in a browser when the container is running.

http://localhost:8000/query?userid=X&postcode=PE218RN

2. The p-median runs using input from disk for the moment. The input is located at the `pmedian/functions/data` folder. In this input, the keys "name" and "id" are test and 000 respectively. Hence the output created is test_000.json

http://localhost:8000/pmedian/create-task

This will return a task-id. 

Then at http://localhost:8000/pmedian/get-task?task-id=<task-id> you will see the progress of the task. Initially this will be STARTED, but after  2-3 minutes it will trun to SUCCESS.

Once succesful you can download the output at
http://localhost:8000/pmedian/get-file?filename=test_000.json 

If you can't be bothered to wait for 2-3 minutes you can check the download link at http://localhost:8000/pmedian/get-file?filename=test.txt