import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store} from './Store/Store.js'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './Context/Authstatus.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
)
