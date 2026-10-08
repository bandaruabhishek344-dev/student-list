import React,{
  useState,
} from "react";

import Modal from "../components/Modal";

function Profile(){

  const[
    show,
    setShow,
  ]=useState(false);

  return(

    <div
      style={{
        padding:40,
      }}
    >

      <h1>Profile Page</h1>

      <button
        onClick={()=>
          setShow(true)
        }
      >
        View Profile
      </button>

      <Modal
        isOpen={show}
        onClose={()=>
          setShow(false)
        }
        title="Profile Details"
      >

        <img
          src="https://i.pravatar.cc/150"
          alt="profile"
        />

        <h2>John Doe</h2>

        <p>
          React Developer
        </p>

      </Modal>

    </div>

  );

}

export default Profile;