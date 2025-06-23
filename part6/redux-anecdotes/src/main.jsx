import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './NotificationContext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Provider>
  </QueryClientProvider>
)