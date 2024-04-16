import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import router from './router';
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
