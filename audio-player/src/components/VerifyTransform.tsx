import { useAccount, useConnect, useWaitForTransaction } from 'wagmi'
import { useAudioRegistryVerifyAudioTransform, usePrepareAudioRegistryVerifyAudioTransform } from '../../generated'
import { AUDIO_REGISTRY_ADDRESS } from '@/contractAddresses'
import { TransformResults } from '@/pages/edit'

const VerifyTransform = ({ transformResults, signature, IPFSCID }: { transformResults: TransformResults, signature: string, IPFSCID: string }) => {
    const { address, connector, isConnected } = useAccount()

    const publicInputsArr = [
        transformResults.public_inputs.hash_full_start,
        transformResults.public_inputs.hash_full_end,
        ...transformResults.public_inputs.wav_weights_start,
        ...transformResults.public_inputs.wav_weights_end,
        ...transformResults.public_inputs.bleeps_start,
        ...transformResults.public_inputs.bleeps_end,
        transformResults.public_inputs.hash_sub_start,
        transformResults.public_inputs.hash_sub_end,
        transformResults.public_inputs.return,
    ];

    const { config } = usePrepareAudioRegistryVerifyAudioTransform({
        account: address,
        address: AUDIO_REGISTRY_ADDRESS,
        args: [
            transformResults.proof,
            publicInputsArr,
            signature,
            IPFSCID,
        ],
        enabled: true,
    })
    const { data, write } = useAudioRegistryVerifyAudioTransform({
        ...config,
        onSuccess: () => {
            console.log("Success writing to contract", data);
        }
    })
    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess: () => {
            console.log("Finished waiting for tx");
        }
    })
    console.log("Write", write);
    console.log("Config", config)
    console.log("Is loading", isLoading)


    return (
        <div>
            <button disabled={!write || isLoading} onClick={() => {
                console.log("Writing");
                write?.()
            }}>
                Verify Audio Transform.
            </button>
        </div>
    );

}

export default VerifyTransform;