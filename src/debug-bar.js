import { React, useEffect, useState } from 'react';
import './debug-bar.scss';

/**
 * DebugBar component.
 *
 * @returns {object}
 *   The component.
 */
function DebugBar() {
  const [show, setShow] = useState(true);
  const [screens, setScreens] = useState([]);

  /**
   * Load content from fixture.
   *
   * @param {string} screenPath
   *   The path to the screen.
   */
  function loadContent(screenPath) {
    document.dispatchEvent(
      new CustomEvent('startDataSync', {
        detail: {
          screenPath,
        },
      })
    );
  }

  /**
   * Loads the content from json-file.
   *
   * @param {event} event
   *   The event.
   */
  function handleFixtureSelectChange(event) {
    loadContent(event.target.value);
  }

  // Get screens data from mock api.
  useEffect(() => {
    // @TODO: Move screens url into configuration.
    fetch('/api/v1/screens')
      .then((response) => response.json())
      .then((data) => setScreens(data));
  }, []);

  return (
    <>
      {show && (
        <div className="debug-bar">
          <div className="debug-bar-header">Debug</div>
          <div className="debug-bar-content">
            <button
              className="debug-bar-button"
              type="button"
              onClick={() => setShow(false)}
            >
              Hide
            </button>
            <select
              className="debug-bar-select"
              onChange={handleFixtureSelectChange}
            >
              <option value="">None selected</option>
              {screens['hydra:member']?.length > 0 &&
                screens['hydra:member'].map((screen) => (
                  <option value={screen['@id']} id={screen.id} key={screen.id}>
                    {screen.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
      {!show && (
        <button
          className="debug-bar-toggle-button-show"
          type="button"
          onClick={() => setShow(true)}
        >
          Debug
        </button>
      )}
    </>
  );
}

export default DebugBar;
