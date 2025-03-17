import React, { useState } from 'react'

function payment() {
    const [mail, setmail] = useState("");
    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
  return (
    <div>

<div>

      <form className="flex flex-col  rounded-xl items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl">PAYMENT</p>
        </div>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 rounded-xl"
          placeholder="Enter your name"
          required
        ></input>
        <input
          type="text"
          id="text"
          value={mail}
          onChange={(e) => setmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 rounded-xl"
          placeholder="Enter your address"
          required
        ></input>
        <input
          type="number"
          id="number"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 rounded-xl"
          placeholder="Enter your pincode"
          required
        ></input>
        <input
          type="number"
          id="number"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 rounded-xl"
          placeholder="phone number"
          required
        ></input>
        <button
          className="bg-blue-600 text-white py-1 px-2 rounded-xl"
          type="submit" 
        >
          Submit
     
        </button>
      </form>
    </div>

    </div>
  )
}

export default payment