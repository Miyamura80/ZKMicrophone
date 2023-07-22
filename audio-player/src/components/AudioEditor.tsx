import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

const WaveSurferComponent: React.FC = () => {
  let ws: WaveSurfer;

  useEffect(() => {
    if (waveformRef.current) {
      ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
        plugins: [RegionsPlugin.create()]
      });

      ws.load('https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav');

      ws.on('ready', () => {
        wsRegions = ws.addRegion({
          start: 0,
          end: 8,
          content: 'Resize me',
          color: 'rgba(255, 0, 0, 0.5)',
          drag: false,
          resize: true,
        });
        // add more regions as required
      });
    }

    return () => {
      ws && ws.destroy();
    };
  }, []);

  return (
    <html>
    <div id="waveform"></div>
    </p>
  </html>
  );
};

export default WaveSurferComponent;
