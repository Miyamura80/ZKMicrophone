import { useAccount, useConnect, useWaitForTransaction } from 'wagmi'
import { useAudioRegistryVerifyAudioTransform, usePrepareAudioRegistryVerifyAudioTransform } from '../../generated'
import { AUDIO_REGISTRY_ADDRESS } from '@/contractAddresses'

const VerifyTransform = () => {
    const { address, connector, isConnected } = useAccount()

    // TODO: take outputs from Bleep
    const proof = "";
    const publicInputs = ["0x0000000000000000000000000000000000000000000000000000000000000002"];
    const signature = "0x000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001B";
    const ipfsCid = "0x0000000000000000000000000000000000000000000000000000000000000002";

    const { config } = usePrepareAudioRegistryVerifyAudioTransform({
        account: address,
        address: AUDIO_REGISTRY_ADDRESS,
        args: [proof, publicInputs, signature, ipfsCid],
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