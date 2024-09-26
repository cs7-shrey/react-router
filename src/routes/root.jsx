import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";
// Outlet is used to tell the root route where we want it to render its child routes

// wrapping the contact loader inside a loader function
// mandatory to have it as an object

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`)
    // return null; --> this also works if you don't intend to use the data further in the frontend
}

export async function loader({request}) {
    const url = new URL(request.url)
    const q = url.searchParams.get("q")
    const contacts = await getContacts(q);
    return { contacts, q };
}
export default function Root() {
    console.log(useLoaderData());
    const { contacts, q } = useLoaderData();
    // useNavigation returns the current navigation state: it can be one of "idle" | "submitting" | "loading"
    const navigation = useNavigation();
    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q])
    const submit = useSubmit();

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q")
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>  
                <div>
                    {/* search form: default method -> get */}
                    <Form id="search-form" role="search">
                        <input 
                            type="search"
                            aria-label="Search contacts"
                            placeholder="Search"
                            name="q"
                            id = "q"
                            className={searching ? "loading": ""}
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch
                                });
                            }}
                        />
                        <div 
                            id="search-spinner" 
                            aria-hidden 
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        >
                        </div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                {contacts.length ? (
                <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                    <NavLink    
                     to={`contacts/${contact.id}`}
                     className={
                        // when the user is in the URL in NavLink, isActive is true When it's about to be active (the data is still loading) then isPending will be true.
                        ({isActive, isPending}) => {
                            return isActive
                                    ? "active"
                                    : isPending
                                    ? "pending"
                                    : ""
                        }
                     }
                    >
                        {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                        ) : (
                        <i>No Name</i>
                        )}{" "}
                        {contact.favorite && <span>★</span>}
                    </NavLink>
                    </li>
                ))}
                </ul>
                ) : (
                    <p>
                        <i>No contacts</i>
                    </p>
                )}
                </nav>
            </div>
            <div 
                id="detail"
                className = {
                    navigation.state === "loading" ? "loading": ""
                }
            >
                <Outlet />
            </div>
        </>
    )
}