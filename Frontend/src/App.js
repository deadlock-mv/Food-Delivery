import Main from './components/main';
import Header from './components/website/HeaderHome';
import Footer from './components/website/Footer';
import './components/CSS/image.css'

function App(){
    return(
    <div className="App">
    <Header />
        <Main />
    <Footer />
    </div>
    );
}

export default App;
