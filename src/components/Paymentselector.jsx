import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import paypal from "../assets/paypal.svg"
import applepay from "../assets/apple-pay.svg"
import googlepay from "../assets/google-pay.svg"
import mastercard from "../assets/mastercard.svg"
import paytm from "../assets/paytm.svg"
import visa from "../assets/visa.svg"
import toast from 'react-hot-toast'

   
const paymentmethod = [
  {
    id: "googlepay",
    name: "Google Pay",
    image: googlepay,
  },
  {
    id: "applepay",
    name: "Apple Pay",
    image: applepay,
  },
  {
    id: "paypal",
    name: "PayPal",
    image: paypal,
  },
  {
    id: "paytm",
    name: "Paytm",
    image: paytm,
  },
  {
    id: "visa",
    name: "Visa",
    image: visa,
  },
  {
    id: "mastercard",
    name: "Mastercard",
    image: mastercard
  }
];

function Paymentselector() {
  const method=JSON.parse(localStorage.getItem('prevMethod'))||"";
  
  const [selectedMethod, setSelectedMethod] = useState(method);
  

  const [googlepay, setGooglepay] = useState("");
  const [applepay, setApplepay] = useState("");
  const [paytm, setPaytmpay] = useState("");
  const [paypal, setPaypal] = useState("");
  const [visaData, setVisaData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
  });
  const [masterCardData, setMasterCardData]=useState({
     cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
  })

  const isValidUpi = (inputValue) => {
    const upiRegex = /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/;
    if (inputValue.length == 0) return true;
    return upiRegex.test(inputValue);
  }

  const isValidEmail = (email) => {
    const str = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length == 0) return true;
    return str.test(applepay);
  }

  const isValidPhone = (phone) => {
    const str = /^[6-9]\d{9}$/;
    if (phone.length == 0) return true;
    return str.test(phone);
  }

  const isValidCardNumber = (cardNumber) => {
    return /^\d{16}$/.test(cardNumber);
  }

  const isValidDate = (cardDate) => {
    return /^\d{2}\/\d{2}$/.test(cardDate);
  }

  const isValidCvv = (cardCvv) => {
    return /^\d{3,4}$/.test(cardCvv);
  }

  const isValidName = (name) => {
    return /^[a-zA-Z ]{3,}$/.test(name);
  }

  const handleChange = (field, value) => {
    setVisaData(prev => ({ ...prev, [field]: value }));
  };
   const handleMasterCardChange = (field, value) => {
    setMasterCardData(prev => ({ ...prev, [field]: value }));
  };


  const handlePaypal = () => {
    if (isValidUpi(paypal) && paypal.trim().length !== 0) {
      setPaypal("");
      toast.success("Submited");
      localStorage.setItem('prevMethod', JSON.stringify("paypal"));
    }
  }
  const handleGooglepay = () => {
    if (isValidUpi(googlepay) && googlepay.trim().length !== 0) {
      setGooglepay("");
      toast.success("Submited");
      localStorage.setItem('prevMethod', JSON.stringify('googlepay'));
    }
  }

  const handleApplepay = () => {
    if (isValidEmail(applepay) && applepay.trim().length !== 0) {
      setApplepay("");
      toast.success("Submited");
      localStorage.setItem('prevMethod', JSON.stringify('applepay'));
    }
  }

  const handlePaytm = () => {
    if (isValidPhone(paytm) && paytm.trim().length !== 0) {
      setPaytmpay("");
      toast.success("Submited");
      localStorage.setItem('prevMethod', JSON.stringify('paytm'))
    }
  }

  const handleVisa = () => {
    if (
      isValidCardNumber(visaData.cardNumber) &&
      isValidCvv(visaData.cvv) &&
      isValidDate(visaData.expiry) &&
      isValidName(visaData.cardholderName)
    ) {
      toast.success("submited");
      setVisaData({
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardholderName: '',
      });
      localStorage.setItem('prevMethod', JSON.stringify('visa'))
    }
  }

  const handleMasterCard = () => {
    if (
      isValidCardNumber(masterCardData.cardNumber) &&
      isValidCvv(masterCardData.cvv) &&
      isValidDate(masterCardData.expiry) &&
      isValidName(masterCardData.cardholderName)
    ) {
      toast.success("submited");
      setMasterCardData({
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardholderName: '',
      });

      localStorage.setItem('prevMethod', JSON.stringify('mastercard'));
    }
  }

  const methodField = (selectedMethod) => {
    switch (selectedMethod) {
      case "paypal":
        return (<>
          <input type="text" placeholder="Enter your PayPal ID" className="input" value={paypal} onChange={(e) => setPaypal(e.target.value)} />
          {!isValidUpi(paypal) && <p className='text-red-500'>Please enter a valid PayPal ID (e.g., name@okhdfcbank)</p>}
          <br /><br />
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={handlePaypal}>Pay Now</button>
        </>);

      case "googlepay":
        return (<>
          <input type="text" placeholder="Enter your UPI ID (e.g. name@okaxis)" value={googlepay} onChange={(e) => setGooglepay(e.target.value)} className="input" />
          {!isValidUpi(googlepay) && <p className='text-red-500'>Please enter a valid Google Pay ID</p>}
          <br /><br />
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={handleGooglepay}>Pay Now</button>
        </>);

      case "applepay":
        return (<>
          <input type="email" placeholder="Enter Apple-linked Email ID" value={applepay} onChange={(e) => setApplepay(e.target.value)} className="input" />
          {!isValidEmail(applepay) && <p className='text-red-500'>Please enter a valid Apple Pay Email ID</p>}
          <br /><br />
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={handleApplepay}>Pay Now</button>
        </>);

      case "paytm":
        return (<>
          <input type="tel" placeholder="Enter Paytm Mobile Number" value={paytm} onChange={(e) => setPaytmpay(e.target.value)} className="input" />
          {!isValidPhone(paytm) && <p className='text-red-500'>Please enter a valid Paytm Phone Number</p>}
          <br /><br />
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={handlePaytm}>Pay Now</button>
        </>);

      case "visa":
        return (
          <>
            <div className="space-y-4">
              <div>
                <input type="number" placeholder="Card Number" value={visaData.cardNumber} onChange={(e) => handleChange("cardNumber", e.target.value)} className="input" maxLength={16} />
                {!isValidCardNumber(visaData.cardNumber) && <p className='text-red-400'>Card Number should be of 16 digit</p>}
              </div>
              <div className="flex gap-3">
                <span>
                  <input type="text" placeholder="MM/YY" value={visaData.expiry} onChange={(e) => handleChange("expiry", e.target.value)} className="input" />
                  {!isValidDate(visaData.expiry) && <p className='text-red-400'>Enter a valid date</p>}
                </span>
                <span>
                  <input type="password" placeholder="CVV" value={visaData.cvv} onChange={(e) => handleChange("cvv", e.target.value)} className="input" />
                  {!isValidCvv(visaData.cvv) && <p className='text-red-400'>Enter valid CVV</p>}
                </span>
              </div>
              <div>
                <input type="text" placeholder="Cardholder Name" value={visaData.cardholderName} onChange={(e) => handleChange("cardholderName", e.target.value)} className="input" />
                {!isValidName(visaData.cardholderName) && <p className='text-red-400'>Enter card holder's name</p>}
              </div>
            </div>
            <br />
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={handleVisa}>Pay Now</button>
          </>
        );
      case "mastercard":
        return (
          <>
            <div className="space-y-4">
              <div>
                <input type="number" placeholder="Card Number" value={masterCardData.cardNumber} onChange={(e) => handleMasterCardChange("cardNumber", e.target.value)} className="input" maxLength={16} />
                {!isValidCardNumber(masterCardData.cardNumber) && <p className='text-red-400'>Card Number should be of 16 digit</p>}
              </div>
              <div className="flex gap-3">
                <span>
                  <input type="text" placeholder="MM/YY" value={masterCardData.expiry} onChange={(e) => handleMasterCardChange("expiry", e.target.value)} className="input" />
                  {!isValidDate(masterCardData.expiry) && <p className='text-red-400'>Enter a valid date</p>}
                </span>
                <span>
                  <input type="password" placeholder="CVV" value={masterCardData.cvv} onChange={(e) => handleMasterCardChange("cvv", e.target.value)} className="input" />
                  {!isValidCvv(masterCardData.cvv) && <p className='text-red-400'>Enter valid CVV</p>}
                </span>
              </div>
              <div>
                <input type="text" placeholder="Cardholder Name" value={masterCardData.cardholderName} onChange={(e) => handleMasterCardChange("cardholderName", e.target.value)} className="input" />
                {!isValidName(masterCardData.cardholderName) && <p className='text-red-400'>Enter card holder's name</p>}
              </div>
            </div>
            <br />
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={handleMasterCard}>Pay Now</button>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Select Payment Method
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {paymentmethod.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex flex-col items-center border p-2 rounded-lg cursor-pointer transform transition-all duration-200 ease-in-out ${selectedMethod === method.id ? "bg-blue-100 border-blue-500 scale-103 shadow-md" : "hover:shadow-md"}`}
            >
              <img src={method.image} alt="" className="h-16 mb-2" />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedMethod && (
            <motion.div
              className="mt-6 space-y-3"
              key={selectedMethod}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-lg font-semibold">Enter Details</h1>
              <div>
                {methodField(selectedMethod)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Paymentselector;
