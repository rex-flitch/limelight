import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// pages and layouts import
import Homepage from './pages/Homepage'
import CertificateOfDeposits from './pages/CertificateOfDeposits'
import About from './pages/About'
import Resources from './pages/Resources'
import Services from './pages/Services'
import Ebanking from './pages/Ebanking'
import MobileBanking from './pages/MobileBanking'
import Security from './pages/Security'
import Privacy from './pages/Privacy'
import Faq from './pages/Faq'
import Rates from './pages/Rates'
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

// apollo client
const client = new ApolloClient({
  uri: 'https://limelight-backend-8d8b64ce3059.herokuapp.com/graphql',
  // uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
  debug: true,
  tracing: true,
  introspection: true,
  playground: true,
  connectToDevTools: true
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route exact path="/" element={<Homepage />}/>
          <Route path="/certificates-of-deposit" element={<CertificateOfDeposits />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/resources" element={<Resources />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/services/ebanking/" element={<Ebanking />}/>
          <Route path="/services/mobile-banking/" element={<MobileBanking />}/>
          <Route path="/about/security/" element={<Security />}/>
          <Route path="/about/privacy/" element={<Privacy />}/>
          <Route path="/resources/frequently-asked-questions/" element={<Faq />}/>
          <Route path="/resources/rates/" element={<Rates />}/>
        </Routes>
        <SiteFooter />
      </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
