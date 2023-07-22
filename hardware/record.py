#!/usr/bin/env python3
import pyaudio
import wave
from argparse import ArgumentParser
from buttons import FileButton


FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
CHUNK = 1024
DEVICE_INDEX = 2
btn = FileButton("./button_state.txt")


def configure_audio():
    audio = pyaudio.PyAudio()
    stream = audio.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        input=True,
        frames_per_buffer=CHUNK,
        input_device_index=DEVICE_INDEX,
    )
    return audio, stream


def parse_args():
    parser = ArgumentParser(description="Record audio from microphone")
    parser.add_argument("-f", "--file", type=str, help="Output file name")
    return parser.parse_args()


def main(args=None):
    if args is None:
        args = parse_args()

    audio, stream = configure_audio()

    frames = []
    seaconds = 0
    try:
        start_state = btn.state()
        while btn.state() == start_state:
            data = stream.read(CHUNK)
            frames.append(data)
            seaconds += CHUNK / RATE
    except KeyboardInterrupt:
        yes_no = input(f"Save recording to {args.file}? [y/N]")
        if yes_no.lower() != "y":
            return

    print("Video length: ", seaconds, " seconds")
    stream.stop_stream()
    stream.close()
    audio.terminate()
    
    with wave.open(args.file, "wb") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(audio.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b"".join(frames))


if __name__ == "__main__":
    main()
