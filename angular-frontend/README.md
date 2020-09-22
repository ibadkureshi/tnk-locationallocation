# Run app docker

## Development

In order to run web application seperated from django backend please comment in angular.json file the next line
`"deployUrl": "/static/angular/"`

### Build project

Make sure that line `"deployUrl": "/static/angular/"` exsist and is not commented in angular.json

```bash
ng build --prod --output-path ${location-to-django-application}tnk-locationallocation\static\angular\ --watch --output-hashing none
```

# TrackAndKnowFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.
