import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './index.css'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>

)
