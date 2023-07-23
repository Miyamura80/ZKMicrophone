import React from 'react';
import AudioCard from './AudioCard';

const dummy_wavs = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
  },
]

export default function AudioList() {
  return (
    <ul role="list" className="max-w-4xl mx-auto my-4 p-4">
      {dummy_wavs.map((person)  => (
        <li key={person.email} className="flex justify-between gap-x-6 py-10">
         <AudioCard audioSrc={person.email} fileName={person.name} /> 
        </li>
      ))}
    </ul>
  )
}
