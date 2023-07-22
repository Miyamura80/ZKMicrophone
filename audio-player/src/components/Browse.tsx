import React from 'react';
import AudioCard from './AudioCard';

const dummy_wavs = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
]

export default function AudioList() {
  return (
    <ul role="list" className="max-w-4xl mx-auto my-4 p-4">
      {dummy_wavs.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-10">
         <AudioCard imageSrc={person.imageUrl} audioSrc={person.email} username={person.name} /> 
        </li>
      ))}
    </ul>
  )
}
