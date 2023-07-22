#!/usr/bin/env python3
import pyaudio


if __name__ == '__main__':
    p = pyaudio.PyAudio()
    info = p.get_host_api_info_by_index(0)
    num_devices = info['deviceCount']
    assert type(num_devices) == int 

    devices = []

    for i in range(num_devices):
        device = p.get_device_info_by_host_api_device_index(0, i)
        devices.append((i, device['name']))

    print(devices)
