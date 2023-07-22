import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
// import RecordPlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/record.esm.js'
// import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js'; // Assuming the plugin URL is this
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js'; // Assuming the plugin URL is this


const AudioEditor = ({ audioUrl, tempFile }: { tempFile: boolean; audioUrl: string | null}) => {
    let index: number = 1;
    return (
        <WaveAudio index={index} pathToFile={audioUrl ? audioUrl : "./example.wav"} />
    )
}

let audioElements: any[] = [];

function WaveAudio(props: { index: number; pathToFile: string}) {
    // const waveAudioRef = useRef<WaveSurfer>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContainerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // const audioElement = document.querySelector(
        //     `#waveform_${props["index"]}`
        // ) as HTMLElement;
        const audioElement = audioContainerRef.current;
        if (!audioElement) return;
        const waveform = WaveSurfer.create({
                container: audioElement,
                waveColor: "#363020",
                progressColor: "#4F759B",
                /** The color of the playpack cursor */
                cursorColor: '#4F759B',
                /** The cursor width */
                cursorWidth: 2,
                /** Play the audio on load */
                autoplay: false,
                /** Pass false to disable clicks on the waveform */
                interact: true,
                /** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
                barWidth: 2,
                /** Minimum pixels per second of audio (i.e. zoom level) */
                minPxPerSec: 1,
            });
        // audioContainerRef.current = audioElement;
        waveform.load(props.pathToFile);
        audioElements.push(waveform);
        // waveAudioRef.current = waveform;

        // Add bleep region
        const wsRegions = waveform.registerPlugin(RegionsPlugin.create())

        wsRegions.addRegion({
            start: 0.5,
            end: 1,
            content: 'bleep this',
            color: 'rgba(234, 255, 218, 0.5)',
            resize: false,
        })

           // Handle region clicks
        wsRegions.on('region-double-clicked', handleRegionClick);

        // Clean up the waveform instance on unmount
        return () => {
            waveform.destroy();
            audioElements = [];
            };
        }, [props.pathToFile]);

    const handleRegionClick = (region: any, event: any) => {
        console.log('Clicked region:', region);
        console.log('Start:', region.start);
        console.log('End:', region.end);
    };


    const handleWaveformClick = () => {
        console.log('Toggled audio')
        const lastWaveformInstance = audioElements[audioElements.length - 1];
        if (lastWaveformInstance) {
        if (isPlaying) {
            lastWaveformInstance.pause();
        } else {
            lastWaveformInstance.play();
        }
        setIsPlaying((prevState) => !prevState);
        }
    };

   return (
    <div className="flex-col items-center space-y-2">
      <div className="flex space-x-2">
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white"
          onClick={handleWaveformClick}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className="px-4 py-2 rounded-full bg-red-500 text-white"
        //   onClick={handleBleep}
        >
          Bleep
        </button>
      </div>
      <div
        id={`waveform_${props.index}`}
        // onClick={handleWaveformClick}
        ref={audioContainerRef}
      ></div>
    </div>
  ); 
}

export default AudioEditor;