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
import Contact from './pages/Contact'
import Forms from './pages/Forms'
import Feedback from './pages/Feedback'
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import useExternalLinkInterceptor from './hooks/useExternalLinkInterceptor'
import ConfirmationModal from './components/ConfirmationModal';
import WebAccessibility from './pages/WebsiteAccessibility'
import TermsAndConditions from './pages/TermsAndConditions'

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
  const { showModal, handleConfirm, setShowModal } = useExternalLinkInterceptor()

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
          <Route path="/resources/forms/" element={<Forms />}/>
          <Route path="/about/contact/" element={<Contact />}/>
          <Route path="/about/feedback/" element={<Feedback />}/>
          <Route path="/website-accessibility" element={<WebAccessibility />}/>
          <Route path="/termsandconditions" element={<TermsAndConditions />}/>
        </Routes>
        <SiteFooter />
        <ConfirmationModal 
          isOpen={showModal} 
          onConfirm={handleConfirm} 
          onCancel={() => setShowModal(false)}
        />
      </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
