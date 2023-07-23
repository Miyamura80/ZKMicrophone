import { useAccount, useConnect, useWaitForTransaction } from 'wagmi'
import { useAudioRegistryDummyAddAudio, useAudioRegistryVerifyAudioTransform, usePrepareAudioRegistryDummyAddAudio, usePrepareAudioRegistryVerifyAudioTransform } from '../../generated'
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
    const { config } = usePrepareAudioRegistryDummyAddAudio({
        account: address,
        address: AUDIO_REGISTRY_ADDRESS,
        args: [
            "0x06c72fd91d3428d8990e489fe80750772d8df4201a3ed1d93d1e9010f21e5c55",
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "0x06c72fd91d3428d8990e489fe80750772d8df4201a3ed1d93d1e9010f21e5c55",
        ],
        enabled: true,
    })
    const { data, write } = useAudioRegistryDummyAddAudio({
        ...config,
        onSuccess: () => {
            console.log("Success writing to contract", data);
        }
    })

    // const { config } = usePrepareAudioRegistryVerifyAudioTransform({
    //     account: address,
    //     address: AUDIO_REGISTRY_ADDRESS,
    //     args: [
    //         transformResults.proof,
    //         publicInputsArr,
    //         signature,
    //         IPFSCID,
    //     ],
    //     enabled: true,
    // })
    // const { data, write } = useAudioRegistryVerifyAudioTransform({
    //     ...config,
    //     onSuccess: () => {
    //         console.log("Success writing to contract", data);
    //     }
    // })
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