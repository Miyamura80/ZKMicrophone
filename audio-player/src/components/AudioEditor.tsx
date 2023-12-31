import { PublicInputs, TransformResults } from '@/pages/edit';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions.js';


const AudioEditor = ({ audioFile, setTransformResults }: { audioFile: File | null, setTransformResults: any }) => {
    let index: number = 1;
    if (audioFile) {
        return (
            <WaveAudio index={index} audioFile={audioFile} setTransformResults={setTransformResults} />
        )
    }
    return (
        <p>
            Error, no file sent
        </p>
    )
}

let audioElements: any[] = [];

function arrayBufferToBase64(buffer: Uint8Array) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
let wsRegions: RegionsPlugin;
let waveform: WaveSurfer;

function WaveAudio(props: { index: number; audioFile: File; setTransformResults: any }) {
    // const waveAudioRef = useRef<WaveSurfer>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContainerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // const audioElement = document.querySelector(
        //     `#waveform_${props["index"]}`
        // ) as HTMLElement;
        const audioElement = audioContainerRef.current;
        if (!audioElement) return;
        waveform = WaveSurfer.create({
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
        waveform.load(props.audioFile.name);
        audioElements.push(waveform);
        // waveAudioRef.current = waveform;

        // Add bleep region
        wsRegions = waveform.registerPlugin(RegionsPlugin.create())

        wsRegions.addRegion({
            start: 0.5,
            end: 1,
            content: 'bleep this',
            color: 'rgba(234, 255, 218, 0.5)',
            resize: false,
        })

        // Handle region clicks
        // wsRegions.on('region-double-clicked', handleRegionClick);

        // Clean up the waveform instance on unmount
        return () => {
            waveform.destroy();
            audioElements = [];
        };
    }, [props.audioFile]);

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

    const handleBleep = () => {
        // Calls into POST
        // Returns:
        // Message: "status"
        // "edited_audio": "base 64 encoded string",
        // "proof": "base64 encoded string"

        const regions: Region[] = wsRegions.getRegions();
        console.log("regions", regions);
        const region = regions[0]; // only support one region for now
        const { start, end } = region;
        const decodedData = waveform.getDecodedData();
        if (!decodedData) {
            console.log("no decoded data for waveform");
            return;
        }
        console.log("decodedData", decodedData);

        const chunkSizeBytes = 2;
        const bucketSizeBytes = 1000;
        // might be off by one but w/e
        const startIndex = Math.floor((start / (region as any).totalDuration) * chunkSizeBytes * decodedData.length / bucketSizeBytes);
        const endIndex = Math.floor((end / (region as any).totalDuration) * chunkSizeBytes * decodedData.length / bucketSizeBytes);
        const leftIndices = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);
        const bucketDatas: string[] = [...Array(endIndex - startIndex)].map(i => arrayBufferToBase64(new Uint8Array([...Array(bucketSizeBytes).fill(0)])));

        const formData = new FormData();
        formData.append("file", props.audioFile);
        formData.append("bucket_size", `${bucketSizeBytes}`);
        formData.append("left_indices", leftIndices.join(" "));
        // Signature is ~encoded~ in the file name, remove `.wav`
        const signature = props.audioFile.name.slice(0, -4);
        formData.append("signature", signature);
        formData.append("bucket_datas", bucketDatas.join(" "));

        axios.post('http://localhost:5000/api/audioUpload', formData, {
            headers: {
                // 'application/json' is the modern content-type for JSON, but some
                // older servers may use 'text/json'.
                // See: http://bit.ly/text-json
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => {
                console.log("Success", response)
                if (response.data && response.data.edited_audio && response.data.proof) {
                    const transformResults: TransformResults = response.data;
                    props.setTransformResults(transformResults);
                }
            })
            .catch((error) => {
                console.log("Error", error)
            })
    }

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
                    onClick={handleBleep}
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