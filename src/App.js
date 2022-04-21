import './css/App.css';
import CreditCardForm from './components/credit-card-form/creditCardForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1 style={{paddingTop:"1 rem"}}>Enter payment details to continue...</h1>
     <CreditCardForm>
     </CreditCardForm>
    </div>
  );
}

export default App;
