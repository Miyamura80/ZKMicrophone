import { useConnect } from 'wagmi'

export function Profile() {
    const { connect, connectors, error, pendingConnector } =
        useConnect()

    return (
        <div>
            {connectors.map((connector) => (
                <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connector.connect()}
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                </button>
            ))}

            {error && <div>{error.message}</div>}
        </div>
    )
}