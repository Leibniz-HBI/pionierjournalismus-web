import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime'
import './styles/xj.css';

import sampleData from './csv/mapping.csv'
const headerRow = sampleData.shift();

const bodyElem = document.getElementsByTagName("body")[0];
const detailElem = document.getElementsByClassName("detail")[0];
const detailDataElem = document.getElementsByClassName("detail-data")[0];
const detailCloseElem = document.getElementsByClassName("detail-close")[0];

function App() {
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

  const [showMapWithName, SetShowMapWithName] = useState('All');
  const [data, SetData] = useState(sampleData);

  const handleSelectMap = async event => {
    SetShowMapWithName(event.target.value);
    filterData(event.target.value)
  }

  const filterData = async category => {
    if (category === 'All') {
      SetData(sampleData);
      return;
    }

    SetData(sampleData.filter(row => row['Akteurstyp'] === category)
    )
  }

  const MappingTable = () => {

    return (
      <table>
        <thead>
          <tr style={{fontWeight: 600}}>
            {Object.keys(headerRow).map((key, index) => 
              <td key={index}>{key}</td>
            )}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key, index) => 
            <tr>
              {Object.keys(data[index]).map((k, i) => 
                <td key={i}>{data[index][k] && data[index][k].substr(0,40)}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>)
  }

  return (
    <div>
      <div className="select-wrapper">
        <select onChange={handleSelectMap}>
          <option value="All">Alle</option>
          <option value="Startup">Startups</option>
          <option value="Individual">Individuelle</option>
        </select>
      </div>
      <div className={(showMapWithName ==='All' && 'map-visible') + ' map-hidden map'}>
        <iframe title="Total" aria-label="Karte" id="datawrapper-chart-tVTuK" src="https://datawrapper.dwcdn.net/tVTuK/4/" scrolling="no" frameBorder="0"></iframe>
      </div>
      <div className={(showMapWithName ==='Startup' && 'map-visible') + ' map-hidden map'}>
        <iframe title="Startups" aria-label="Karte" id="datawrapper-chart-Ekvei" src="https://datawrapper.dwcdn.net/J3fnh/1/" scrolling="no" frameBorder="0"></iframe>
      </div>
      <MappingTable/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementsByClassName('app')[0]);

function AddEntry() {
  const [isValidationDone, setIsValidationDone] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const emailAddress = location.state?.emailAddress || null;

  const handleSubmit = async e => {
    const form = document.querySelector('.signup-form');

    if (!form.checkValidity()) {
      return;
    }

    e && e.preventDefault();

    document.querySelector('[name=js-pj-submit]').classList.add('inactive');

    const message = await handleFormSubmit(e);

    // if (message.result === 'error' && message.msg.indexOf('already subscribed') > -1) {
    //   setValidationMessage('We have already received your request.');
    //   return;
    // }

    if (message.result === 'error' && message.msg.indexOf('enter a different ') > -1) {
      setValidationMessage('Invalid email address.');
      return;
    }

    if (message.result === 'success') {
      setValidationMessage('Thanks.');
    }
    
    setIsValidationDone(true);
  };

  return (
    <>
      <a name="add-entry"></a>
      <img className="emoji" src="https://abs.twimg.com/emoji/v2/svg/1f44b.svg"></img>
      <p className="p">This is a work-in-progress. We're sure there are many more pioneering actors, startups and projects out there! Let us know about yours.</p>
      { !isValidationDone &&
      <div className="add-form">
        <form className="signup-form mt-8" action="https://mc.us16.list-manage.com/subscribe/post-json?u=e7f679ff891132aed61f9e1db&id=cc6290134b" method="GET">
          <input required className="" placeholder="Name des Projekts/Startups"></input>
          <input required className="" placeholder="Website"></input>
          <input defaultValue={emailAddress} required type="email" className="" placeholder="deine@email.com"></input>
          <button onClick={handleSubmit} name="js-pj-submit" className="button button--black button--fullwidth mod--displayblock" type="submit">
            Abschicken <span className="pj-nudge-elem pr-2">→</span>
          </button>
          <span className="text-xs text-gray-700 pl-4">{ validationMessage }</span>
        </form>
      </div>
      }
      { isValidationDone &&
        <p className="text-sm max-w-lg mt-8 text-green-900">
          Thanks for reaching out!
        </p>
      }
      <a href="https://twitter.com/commfigurations" target="_blank"><button class="button button--fullwidth mod--displayblock">@commfigurations on Twitter</button></a>
      <a href="mailto:submit@xjournalism.org" target="_blank"><button class="button button--fullwidth mod--displayblock">Send us a Mail</button></a>
    </>
  );
};

ReactDOM.render(<AddEntry />, document.getElementsByClassName('add-entry')[0]);
