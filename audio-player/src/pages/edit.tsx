import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import Navbar from '../components/Navbar';
import IPFSCard from '../components/IPFSCard';
import { RainbowConnect } from '../components/RainbowConnect';
import VerifyTransform from '@/components/VerifyTransform';
import AudioEditor from '../components/AudioEditor';
import { NetworkSwitcher } from '@/components/NetworkSwitcher';
import { Profile } from '@/components/Profile';

export interface TransformResults {
  proof: string;
  edited_audio: string;
  public_inputs: PublicInputs;
}

export interface PublicInputs {
  hash_full_start: string;
  hash_full_end: string;
  hash_sub_start: string;
  hash_sub_end: string
  wav_weights_start: string[];
  wav_weights_end: string[];
  bleeps_start: string[];
  bleeps_end: string[];
  return: string;
}

// {
//   hash_full_end: "0x0000000000000000000000000000000063e0a84f6062de5abe2a381681ffee4b",
//     hash_full_start: "0x000000000000000000000000000000005e0b2caa4210e560e0fa5cfe001ab0cf",
//       hash_sub_end: "0x00000000000000000000000000000000434ffef5f5062af989d375f91bdc27d6", 
//  …
// }

const EditPage = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transformResults, setTransformResults] = useState<TransformResults | null>(null);
  const [IPFSCID, setIPFSCID] = useState<string | null>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
      setAudioFile(event.target.files[0])
    }
  }

  const centeredDivStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div>
      <Navbar />
      <Profile />
      {/* <RainbowConnect /> */}
      <div style={centeredDivStyle} className='h-64'></div>
      {audioFile && !transformResults &&
        <div className='w-full max-w-lg mx-auto'>
          <  AudioEditor audioFile={audioFile} setTransformResults={setTransformResults} />
        </div>
      }
      {!audioFile &&
        <div style={centeredDivStyle} className='py-10'>
          <form>
            <input type="file" onChange={onFileChange} />
          </form>
        </div>
      }
      {transformResults && !IPFSCID &&
        <IPFSCard setIPFSCID={setIPFSCID} editedAudio={transformResults.edited_audio} />
      }
      {IPFSCID && transformResults && audioFile?.name &&
        <VerifyTransform transformResults={transformResults} signature={audioFile?.name.slice(0, -4)} IPFSCID={IPFSCID} />
      }
      {/* <ReadRegistry /> */}
    </div >
  );
};

export default EditPage;
