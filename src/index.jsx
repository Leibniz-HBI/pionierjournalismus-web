import React from 'react';
import ReactDOM from 'react-dom';
import './styles/xj.css';

const bodyElem = document.getElementsByTagName("body")[0];
const detailElem = document.getElementsByClassName("detail")[0];
const detailDataElem = document.getElementsByClassName("detail-data")[0];
const detailCloseElem = document.getElementsByClassName("detail-close")[0];

const initDatawrapper = () => {
  window.addEventListener("message", e => {
    if (void 0 !== e.data["datawrapper-height"]) {
      let t = document.querySelectorAll("iframe");

      for (let a in e.data["datawrapper-height"]) {
        for (var r = 0; r < t.length; r++) {
          if (t[r].contentWindow === e.source) {
            t[r].style.height = e.data["datawrapper-height"][a] + "px"
          }
        }
      }

    }
  })
};

initDatawrapper();

const showTerm = term => {
  detailElem.classList.toggle("detail--show");
  bodyElem.classList.toggle("body--noscroll");
  detailDataElem.innerHTML = `
  <p>
    <h4>${term.term}</h4>
    This journalism term first appeared in a New York Times article from ${term.appeared_year.substr(0,10)},
    the number of Google Scholar search results is ${term.search_results_gscholar}. We decided to file it under "${term.categories}".
  </p>
  ${term.definition ? '<p><h5 class="h5">Definition</h5>'+term.definition+'</p>' : ''}
  <p>
    <h5 class="h5">Sources</h5>
    <ul class="sources">
      <li>${term.source_1_citation} ${term.source_1_doi ? '<a class="a--small" href="'+ term.source_1_doi +'" target="_blank">→</a>' : ''}</li>
      <li>${term.source_2_citation} ${term.source_2_doi ? '<a class="a--small" href="'+ term.source_2_doi +'" target="_blank">→</a>' : ''}</li>
      <li>${term.source_3_citation} ${term.source_3_doi ? '<a class="a--small" href="'+ term.source_3_doi +'" target="_blank">→</a>' : ''}</li>
  </p>
  `
}

const closeTerm = () => {
  detailElem.classList.toggle("detail--show");
  bodyElem.classList.toggle("body--noscroll");
}

detailCloseElem.addEventListener("click", closeTerm);

ReactDOM.render(
  <div>
  <iframe title="" aria-label="Karte" id="datawrapper-chart-tVTuK" src="https://datawrapper.dwcdn.net/tVTuK/4/" scrolling="no" frameBorder="0"></iframe>
  </div>,
  document.getElementsByClassName('app')[0]
);