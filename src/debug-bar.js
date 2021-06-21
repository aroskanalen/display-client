import { React, useState } from 'react';
import './debug-bar.scss';
import { v4 as uuidv4 } from 'uuid';

/**
 * DebugBar component.
 *
 * @returns {JSX.Element}
 *   The component.
 */
function DebugBar() {
  const [show, setShow] = useState(true);

  const fixtures = [
    {
      key: 'debug-bar-fixture-1',
      title: 'slide: text-box top',
      file: './fixtures/text-box/slide1.json'
    },
    {
      key: 'debug-bar-fixture-2',
      title: 'slide: text-box left',
      file: './fixtures/text-box/slide2.json'
    },
    {
      key: 'debug-bar-fixture-3',
      title: 'slide: text-box right',
      file: './fixtures/text-box/slide3.json'
    },
    {
      key: 'debug-bar-fixture-4',
      title: 'slide: text-box bottom',
      file: './fixtures/text-box/slide4.json'
    },
    {
      key: 'debug-bar-fixture-5',
      title: 'slide: text-box colors',
      file: './fixtures/text-box/slide5.json'
    },
    {
      key: 'debug-bar-fixture-6',
      title: 'slideshow1',
      file: './fixtures/slideshow/slideshow1.json'
    },
    {
      key: 'debug-bar-fixture-7',
      title: 'slideshow2',
      file: './fixtures/slideshow/slideshow2.json'
    },
    {
      key: 'debug-bar-fixture-8',
      title: 'calendar1',
      file: './fixtures/calendar/calendar1.json'
    },
    {
      key: 'debug-bar-fixture-9',
      title: 'bookreview1',
      file: './fixtures/book-review/book-review1.json'
    }
  ];

  /**
   * Emit screen data.
   *
   * @param {object} screen
   *   The screen data to emit.
   */
  function emitContent(screen) {
    const event = new CustomEvent('content', {
      detail: {
        screen
      }
    });

    document.dispatchEvent(event);
  }

  /**
   * Load content from fixture.
   *
   * @param {string} fixture
   *   The path to the fixture.
   */
  function loadContent(fixture) {
    // Emit empty screen if fixture is null.
    if (fixture === '') {
      emitContent({
        regions: []
      });
      return;
    }

    fetch(fixture)
      .then((response) => response.json())
      .then((jsonData) => {
        const screen = {
          regions: [
            {
              id: `region${uuidv4()}`,
              playlists: [
                {
                  id: 'uniquePlaylist1',
                  slides: [jsonData]
                }
              ]
            }
          ]
        };

        emitContent(screen);
      });
  }

  /**
   * Set data synchronization enabled or disabled.
   *
   * @param {boolean} enabled
   *   Boolean. Enabled or disable data synchronization.
   */
  function setDataSync(enabled) {
    if (enabled) {
      document.dispatchEvent(new Event('startDataSync'));
    } else {
      document.dispatchEvent(new Event('stopDataSync'));
    }
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

  return (
    <>
      {show && (
        <div className="debug-bar">
          <div className="debug-bar-header">Debug</div>
          <div className="debug-bar-content">
            <button className="debug-bar-button" type="button" onClick={() => setShow(false)}>
              Hide
            </button>
            <button
              className="debug-bar-button"
              type="button"
              id="startDataSync"
              key="startDataSync"
              onClick={() => {
                setDataSync(true);
              }}
            >
              Start data sync
            </button>

            <button
              className="debug-bar-button"
              type="button"
              id="stopDataSync"
              key="stopDataSync"
              onClick={() => {
                setDataSync(false);
              }}
            >
              Stop data sync
            </button>
            <select className="debug-bar-select" onChange={handleFixtureSelectChange}>
              <option value="">None selected</option>
              {fixtures.map((fixture) => (
                <option value={fixture.file} id={fixture.title} key={fixture.file}>
                  {fixture.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {!show && (
        <button className="debug-bar-toggle-button-show" type="button" onClick={() => setShow(true)}>
          Debug
        </button>
      )}
    </>
  );
}

export default DebugBar;
