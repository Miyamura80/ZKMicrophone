import { useAudioRegistryAudioHashes, useAudioRegistryAudioHashLength } from "../../generated"
import { AUDIO_REGISTRY_ADDRESS } from '@/contractAddresses'

const ReadAudioHash = ({ index }: { index: number }) => {
    const { data: audioEntry } = useAudioRegistryAudioHashes({
        address: AUDIO_REGISTRY_ADDRESS,
        args: index,
    });

    return (
        <div>
            Audio entry {index}
        </div>
    )
}

const ReadRegistry = () => {
    const { data: numAudioHashes } = useAudioRegistryAudioHashLength({
        address: AUDIO_REGISTRY_ADDRESS,
    });

    const indicesArray = Array(numAudioHashes).fill(0);

    return (
        <div>
            {/* Use map() to iterate over the items array and render ItemComponent for each item */}
            {indicesArray.map((item, index) => (
                <ReadAudioHash key={index} index={index} />
            ))}
            Read Registry
        </div>
    )

}

export default ReadRegistry;