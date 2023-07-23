import { useConnect } from 'wagmi'

export function Profile() {
    const { connect, connectors, error, pendingConnector } =
        useConnect()

    console.log(connectors);
    return (
        <div>
            <button
                disabled={false}
                key={"metaMask"}
                onClick={() => connectors[0].connect()}
            >
                {"MetaMask"}
            </button>

            {error && <div>{error.message}</div>}
        </div >
    )
}