import styles from './Error.module.scss';

const Error = (props:any) => {

    const {error} = props;

    return <div>
        <p>{error.message}</p>

        <button onClick={() => window.location.reload()}>Refresh Page</button>
    </div>
}

export default Error;