import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import { AnecdotesContextProvider } from './AnecdotesContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AnecdotesContextProvider>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
  </AnecdotesContextProvider>
)