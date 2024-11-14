import { useState } from 'react'
import './App.css'
const App = ()=>{
  const [resultValue,setResultValue] = useState("")
  const [boyValue,setBoyValue] = useState("")
  const [girlValue,setGirlValue] = useState("")
  const submitForm = (e)=>{
    e.preventDefault()
    let boy=boyValue.replace(/\s+/g, '').toUpperCase();
    let girl=girlValue.replace(/\s+/g, '').toUpperCase()
    if(boy!==""&&girl!==""){
    let flames = "FLAMES";
    for (let i = 0; i < boy.length; i++) {
      for (let j = 0; j < girl.length; j++) {
        if (boy[i] === girl[j]) {
          boy = boy.slice(0, i) + boy.slice(i + 1);
          girl = girl.slice(0, j) + girl.slice(j + 1);
          i--;
          break;
        }
      }
    }
    const ans = boy.length + girl.length;
    while (flames.length !== 1) {
      var temp;
      if (ans > flames.length) {
        temp = ans % flames.length;
        if (temp === 0) {
          temp = flames.length;
        }
      }
      else {
        temp = ans;
      }
      flames = flames.slice(temp)+flames.slice(0, temp - 1);
    }
    switch (flames) {
      case "F": setResultValue("Friends");
        break;
      case "L": setResultValue("Lovers");
        break;
      case "A": setResultValue("Affection");
        break;
      case "M": setResultValue("Marriage");
        break;
      case "E": setResultValue("Enemies");
        break;
      case "S": setResultValue("Siblings");
        break;
    }
      formSubmission()
    }       
  }
  const clearData = ()=>{
    setBoyValue("")
    setGirlValue("")
    setResultValue("")
  }

   const formSubmission = ()=>{
    fetch(process.env.API_URL,{
      method:"POST",
      body:JSON.stringify({"boy":boyValue,"girl":girlValue}),
      headers: {
          "content-type":"application/json"
      }
  })
  .then((response)=>console.log(response))
  .catch((err)=>console.log("Err : ",err))
  }
  return(
    <div className='container'>
      <h2>FLAMES</h2>
      <form onSubmit={submitForm} autoComplete='off' method="post">
        <label htmlFor="boy">Your Name : </label>
        <input type="text" name="boy" id="boy" onChange={(e)=>setBoyValue(e.target.value)} value={boyValue} />
        <label htmlFor="girl">Lover Name : </label>
        <input type="text" name="girl" id="girl" onChange={(e)=>setGirlValue(e.target.value)} value={girlValue} />
        <div className='buttons'>
          <button type="submit">check</button>
          <button type="reset" onClick={clearData}>reset</button>
        </div>
        <span id="result" name="result">{resultValue}</span>
      </form>
    </div>
  )
}

export default App