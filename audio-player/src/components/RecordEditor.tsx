import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';

const RecordEditor = () => {
    let index: number = 1;
    return (
        <WaveRecorder index={index} />
    )
}

let audioElements: any[] = [];

function WaveRecorder(props: { index: number; }) {
    const waveAudioRef = useRef({} as WaveSurfer);
    const audioContainerRef = useRef({} as HTMLElement);

    useEffect(() => {
        const audioElement = document.querySelector(
            `#waveform_${props["index"]}`
        ) as HTMLElement;
        audioContainerRef.current = audioElement;
        const waveform = WaveSurfer.create({
            container: audioElement,
            waveColor: "#0569ff",
            progressColor: "#0353cc",
        });
        const record = waveform.registerPlugin(RecordPlugin.create())

        // waveform.load(pathToFile);
        audioElements.push(waveform);
        waveAudioRef.current = waveform;
        return () => {
            waveform.destroy();
            audioElements.splice(0, audioElements.length);
        };
    });

    return <>
        <h1>Press Record to start recording 🎙️</h1>

        <button id="record">Record</button>
        <button id="play" disabled>Play</button>

        {/* <a style={"display": "none"}>Download audio</a> */}


        <div id={`waveform_${props["index"]}`}>
        </div>
    </>;
}

export default RecordEditor;