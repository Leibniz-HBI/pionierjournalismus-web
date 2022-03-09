# Pioneer Journalism Website
This repository contains all the code needed to build and update the webapp running at pioneerjournalism.org via Github Pages.  

### Prerequisites

1. Node
2. Webpack

## Development
### Getting started
```bash
npm install # install deps
npm run start:development
```

### Deployment
Deploy to Github Pages with `npm run deploy`. Alternatively, build and drag the resulting production files manually to the Github Pages branch `main`.

### Update Mapping Table
To update the mapping table, simply replace `src/csv/mapping.csv` with a fresh export from our Google spreadsheet and re-run build/wait for hot reloading if the development server is running.

### Update Maps
The various maps showing geolocations of our actors are generated with [https://datawrapper.io](Datawrapper)  and integrated via iframes. We use the automated geolocation lookup provided by Datawrapper on our "Ort" data column. To update these, please create your own maps with Datawrapper and edit the `MappingTable()` function in `index.jsx` accordingly with your new iframe URLs.


### Todo
- [x] Replace multiple cumbersome Datawrapper maps with a single map
- [x] Add Unit tests via Jest
    
### Copyright
(c) Leibniz HBI, Hamburg 2022
