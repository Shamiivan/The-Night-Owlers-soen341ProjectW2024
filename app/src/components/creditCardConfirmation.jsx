'use client'
import { useState } from 'react';
import InputField from '@/components/creditCard/inputField';
import CardIconsList from './creditCard/cardIconList';
import { handleNumbersOnly, getCardType } from '../utils/creditCardUtils';
import { Button } from '@/components/ui/button';
const CreditcardForm = () => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [security, setSecurity] = useState('');
  const [errors, setErrors] = useState({});


  // Input card expiry onKeyUp handler
  const handleCardExpiry = ( e ) => {
    let expiryDate = e.target.value;
  
    if (e.keyCode !== 8) {
      if (expiryDate > 1 && expiryDate.length === 1) {
        expiryDate = '0' + expiryDate + '/';
      } else if (expiryDate.length === 2) {
        expiryDate = expiryDate + '/';
      }
      
      setExpiry(expiryDate);
    } else {
      setExpiry('');
    }
  }

  // Input fields validation handler
  const handleValidation = () => {
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors['name'] = 'Cardholder name is required';
    } else {
      errors['name'] = '';
    }

    if (!number) {
      formIsValid = false;
      errors['number'] = 'Card number is required';
    } else {
      errors['number'] = '';
    }

    if (!expiry) {
      formIsValid = false;
      errors['expiry'] = 'Expiry is required';
    } else {
      errors['expiry'] = '';
    }

    if (!security) {
      formIsValid = false;
      errors['security'] = 'CVV is required';
    } else {
      errors['security'] = '';
    }

    setErrors(errors);
    return formIsValid;
  }

  // Form onSubmit handler
  const handleSubmit = ( e ) => {
    e.preventDefault();
    

    if (handleValidation()) {
      console.log('Form submitted');
      console.log({
        name: name,
        number: number,
        expiry: expiry,
        security: security
      });
    } else {
      console.log('Form has errors');
    }
  }


  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 space-y-6 mb-8">
      <div className="w-full bg-slate-200 flex justify-center rounded-xl">
          <div className="CardPaymentForm">
              <div>
                <h3 className=" flex justify-center text-2xl font-semibold">Pay with Credit Card</h3>
                <div>

                  <form onSubmit={handleSubmit}>
                  <label htmlFor="cardholderName">Cardholder name</label>
                  <input
                    id="cardholderName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    className='bg bg-slate-100 p-1 rounded-md'
                  />
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    id="cardNumber"
                    placeholder="MM/YY"
                    type="Card Number"
                    maxLength="16"
                    value={number}
                    onKeyDown={handleNumbersOnly}
                    onChange={(e) => setNumber(e.target.value)}
                    error={errors.number}
                    className='bg bg-slate-100 p-1 rounded-md'
                  />
                  <div className="row">
                    <div className="col-6">
                    <label htmlFor="cardExpiry">Expiry Date</label>
                      <input
                        id="cardExpiry"
                        placeholder="MM/YY"
                     
                        maxLength="5"
                        value={expiry}
                        onKeyDown={handleNumbersOnly}
                        onKeyUp={handleCardExpiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        error={errors.expiry}
                        className='bg bg-slate-100 p-1 rounded-md'
                      />
                    </div>
                    <div className="col-6">
                    <label htmlFor="cardCvv">CVV</label>
                      <input
                        id="cardCvv"
                        maxLength="4"
                        value={security}
                        onKeyDown={handleNumbersOnly}
                        onChange={(e) => setSecurity(e.target.value)}
                        className='bg bg-slate-100 p-1 rounded-md'
                      />
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    className="text-uppercase mb-3"
                    type="submit"
                  >Pay Now</Button>
                </form>
                </div>
                
              </div>
          </div>
      </div>
    </div>
  );
}

export default CreditcardForm;