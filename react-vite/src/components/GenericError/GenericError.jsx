import { useRouteError } from "react-router-dom"

export default function GenericError() {
    const error = useRouteError()
    console.log(error)
    return <h1>{error?.errors?.message || 'Something went wrong'}</h1>
}