import './styles/index.scss'
import Header from './components/header';
import Footer from './components/footer';
import FormConnection from './components/form';


function App() {
  return (
    <div className="app">
     <Header />
     <div className="app__center">
        <FormConnection />
     </div>
     <Footer />
    </div>
  );
}
export default App;
