import { action as destroyAction } from './routes/destroy.jsx'
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import EditContact, { action as editAction} from './routes/edit.jsx'
import ErrorPage from './error-page.jsx'
import Index from './routes/index.jsx'
import './index.css'
import Root, {loader as rootLoader, action as rootAction} from './routes/root.jsx'
import { StrictMode } from 'react'
// Browser Router enables client side routing for our web app

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"
        element={<Root />}
        loader={rootLoader}
        action={rootAction}
        errorElement={<ErrorPage/>}
    >
        <Route
            errorElement={<ErrorPage/>}
        >
            <Route path="contacts/:contactId"
                element={<Contact/>}
                loader={contactLoader}
                action={contactAction}
            />
            <Route path="contacts/:contactId/edit"
                element={<EditContact/>}
                loader={contactLoader}
                action={editAction}
            />
            <Route path="contacts/:contactId/destroy" 
                action={destroyAction}
            />
        </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router = {router} />
  </StrictMode>,
)
