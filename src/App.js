import React from 'react';
import './App.css';

function App() {
  
  const [currencyOptions, setCurrencyOptions] = React.useState([])
  const[fromCurrency, setFromCurrency] = React.useState()
  const[toCurrency, setToCurrency] = React.useState()
  const[amount,setAmount]= React.useState(1)
  const[amountFromCurrency,setAmountFromCurrency] = React.useState(true)
  const[exchangerate,setExchangeRate]= React.useState()
  
  let toAmount,fromAmount ;
  if(amountFromCurrency){
    fromAmount= amount;
    toAmount  = amount*exchangerate;
  }else {
    toAmount = amount;
    fromAmount = amount/ exchangerate;
  }

  const ApiKey = "015d5af9a0e19078ca78bc807ae4fdb1";

const getData = ()=>{
  fetch(`http://api.exchangeratesapi.io/latest?access_key=${ApiKey}`)
  .then((response)=>response.json())
  .then((result)=>{
    console.log(result);
    setCurrencyOptions([result.base , ...Object.keys(result.rates)])
    setFromCurrency(result.base)
    setToCurrency(Object.keys(result.rates)[66])
    setExchangeRate(result.rates[Object.keys(result.rates)[66]])
  })
}
console.log(exchangerate);
console.log(currencyOptions);
const OnChangeFromCurrency=((event) =>{
        setFromCurrency(event.target.value)
})
const OnChangeFromAmount=((event) =>{
        setAmount(event.target.value)
        setAmountFromCurrency(true)
})

const OnChangeToAmount=((event) =>{
        setAmount(event.target.value)
        setAmountFromCurrency(false)
})
const OnChangeToCurrency=((event) =>{
  setToCurrency(event.target.value)
})

React.useEffect(()=>{
getData();
},[])

  return (

    <div className='app-pos'>
    <h1>Currency Converter</h1>
    <div className="app">
        <div>
        <input type="number" className="input" value={fromAmount} onChange={OnChangeFromAmount}/>
        <select className='select' value={fromCurrency} onChange={OnChangeFromCurrency}>
        {
          currencyOptions.map((value)=>{
          return  <option key={value} value={value}>{value}</option>
          })
        }
         
        </select>
        </div>
        <div className='arrow'>↕</div>
        <div>
        <input type="number" className="input" value={toAmount} onChange={OnChangeToAmount}/>
        <select className='select'value={toCurrency} onChange={OnChangeToCurrency}>
        {
          currencyOptions.map((value)=>{
          return  <option key={value} value={value}>{value}</option>
          })
        }
        </select>
        </div>
    </div>
    </div>
  );
}

export default App;
