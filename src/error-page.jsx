import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();          // provides the error that was thrown
    console.log(error)
    // when the user navigates to the routes that don't exist, you'll get an error response with a "Not Found" `statusText`
    return (
        <div id="error-page">
            <h1>Oops!</h1>  
            <p>Sorry, an unexpeted error has occured.</p>   
            <p>
                <i>{error.statusText || error.message}</i>  
            </p>
        </div>
    );
}