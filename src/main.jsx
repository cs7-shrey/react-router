import { action as destroyAction } from './routes/destroy.jsx'
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditContact, { action as editAction} from './routes/edit.jsx'
import ErrorPage from './error-page.jsx'
import Index from './routes/index.jsx'
import './index.css'
import Root, {loader as rootLoader, action as rootAction} from './routes/root.jsx'
import { StrictMode } from 'react'
// Browser Router enables client side routing for our web app

const router = createBrowserRouter([
  {
    path: "/",                // root route
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [    
      {   // pathless route
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,      // router matches if the path is at the parent's path
            element: <Index />
          },
          {
            path: "/contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: "/contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops,there was an error</div>
          },
        ]
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router = {router} />
  </StrictMode>,
)
