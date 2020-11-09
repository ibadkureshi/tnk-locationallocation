# Track&Know: Genetic p-Median Solver

## Quick Start

If you have your own Open Route Service pass it using the ORS_HOST environment variable:

* `docker run -p 8000:8000 -e ORS_HOST=` *https://yourhost/ors*  `ibadkureshi/tnk-pmed:latest`

If you are using the public Open Route Service (the API playground) pass you key to the code

* `docker run -p 8000:8000 -e ORS_KEY=` *your key*  `ibadkureshi/tnk-pmed:latest`

Note: *this is not recommended due to rate limits and the code doesn't optimise against number of api/routing calls*

Then open a browser and go to `http://localhost:8000/`

## About Track & Know

<img src="https://github.com/ibadkureshi/tnk-locationallocation/blob/master/docs/images/proj-logo.png?raw=true" align="right" alt="Track&Know Logo" >

* **Project Title** - Big Data for Mobility Tracking Knowledge Extraction in Urban Areas
* **Project Website** - `https://trackandknowproject.eu/`
* **Work Package** - WP4: Big Data Analytics (BDA Toolbox) [*Leader: CNR*]
* **Task & Deliverable** - 4.1 Analytics for mobility patterns detection and forecasting [*Leader: UPRC*]
* **Component Leader** - Inlecom Group

## Acknowledgement

!["Funded by EU logo"](https://github.com/ibadkureshi/tnk-locationallocation/raw/master/docs/images/EU-H2020.jpg "Funded by EU H2020") This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 780754.

## Background

Location-allocation problems typical deal with provisioning of resources between facilities based on historic demand. The p-median approach is one such model that aims to minimise the total demand-weighted distance between the demand points and the facilities. This NP-Hard problem aims to locate p facilities to serve n demand, by minimising the total demand-weighted distance between the facilities and the demand.

The Track&Know Genetic p-Median Solver uses a genetic algorithm approach to solve the problem in polynomial time. This tool plays an important role in translating mobility information into policy and management recommendations. This project is a parallelised and containerised implementation in Python of a Genetic Algorithm approach to solve the p-Median problem. The underlying model is based on the following research paper:

> Alp, O., Erkut, E., & Drezner, Z. (2003). An efficient genetic algorithm for the p-median problem. Annals of Operations research, 122(1-4), 21-42.

## Documentation

* Details about the [algorithm](./docs/algorithm.md)
* Details about the [implementation](./docs/imple.md)
* How to [contribute](./CONTRIB)
* Other software/tools/models from [Track&Know](https://trackandknowproject.eu)

## Maintainers

* Dr. Ibad Kureshi
* Dr. Panos Protopapas
* Ms. Angeliki Mylonaki
* Mr. Tasos Kakouris