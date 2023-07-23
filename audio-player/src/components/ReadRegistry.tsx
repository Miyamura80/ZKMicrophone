import { useAudioRegistryAudioEntries } from "../../generated"
import { AUDIO_REGISTRY_ADDRESS } from '@/contractAddresses'

const ReadRegistry = () => {
    const { data: audioEntries } = useAudioRegistryAudioEntries({
        address: AUDIO_REGISTRY_ADDRESS,
    });

    console.log("Audio entries", audioEntries);

    return (
        <div>
            Read Registry
        </div>
    )

}

export default ReadRegistry;