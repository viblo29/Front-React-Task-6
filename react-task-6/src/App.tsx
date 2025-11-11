import { useState, useRef } from "react";

const App = () => {
  const cardHolderNameRef = useRef("");
  const cardNumberRef = useRef(0);
  const yearRef = useRef(0);
  const monthRef = useRef(0);
  const cvcRef = useRef(0);

  const [message, setMessage] = useState("");

  const localStorageKey = "cardData";

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setMessage("");

    const cardData = {
      name: cardHolderNameRef.current.value.trim(),
      number: cardNumberRef.current.value.trim(),
      month: monthRef.current.value.trim(),
      year: yearRef.current.value.trim(),
      cvc: cvcRef.current.value.trim(),
    };

    if (
      !cardData.name ||
      !cardData.number ||
      !cardData.month ||
      !cardData.year ||
      !cardData.cvc
    ) {
      setMessage("შეავსეთ ყველაფერი");
      return;
    }

    try {
      localStorage.setItem(localStorageKey, JSON.stringify(cardData));

      console.log(
        "Card data saved to localStorage without re-render",
      );
      setMessage("✅ ბარათის მონაცემები წარმატებით შეინახა!");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      setMessage("❌ მონაცემების შენახვისას მოხდა შეცდომა.");
    }
  };

  const isError = message.includes("❌") || message.includes("შეავსეთ");
  
  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
    border: '1px solid red',
    padding: '8px',
    borderRadius: '4px',
    marginTop: '10px',
    textAlign: 'center'
  };

  const successStyle = {
    color: 'green',
    fontWeight: 'bold',
    border: '1px solid green',
    padding: '8px',
    borderRadius: '4px',
    marginTop: '10px',
    textAlign: 'center'
  };

  return (
    <div style={{ padding: '20px', display:"flex", flexDirection:"column", alignItems:"center" }}>
      <h1>დაამატე ბარათი შენს საფულეში.</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '15px' }}>
        <div>
          <label htmlFor="cardName">ბარათის მფლობელის სახელი</label>
          <input
            ref={cardHolderNameRef}
            id="cardName"
            type="text"
            placeholder="მაგ. ნიკა თავართქილაძე"
            defaultValue=""
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label htmlFor="cardNumber">ბარათის ნომერი</label>
          <input
            ref={cardNumberRef}
            id="cardNumber"
            type="tel"
            maxLength={16}
            placeholder="xxxx xxxx xxxx xxxx"
            defaultValue=""
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>

          <div style={{ flex: 2 }}>
            <label>Expiration Date (MM / YY)</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                ref={monthRef}
                type="tel"
                maxLength={2}
                placeholder="MM"
                defaultValue=""
                style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                ref={yearRef}
                type="tel"
                maxLength={2}
                placeholder="YY"
                defaultValue=""
                style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="cvc">CVC</label>
            <input
              ref={cvcRef}
              id="cvc"
              type="tel"
              maxLength={3}
              placeholder="123"
              defaultValue=""
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>
        
        {message && (
          <div style={isError ? errorStyle : successStyle}>
            {message}
          </div>
        )}

        <button 
          type="submit"
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          მონაცემების შენახვა
        </button>
      </form>
    </div>
  );
};

export default App;