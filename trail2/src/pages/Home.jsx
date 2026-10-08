import React, {
  useState,
} from "react";

import Modal from "../components/Modal";

function Home() {

  const [
    open,
    setOpen,
  ] = useState(false);

  return (

    <div
      style={{
        padding:40,
      }}
    >

      <h1>Home Page</h1>

      <button
        onClick={() =>
          setOpen(true)
        }
      >
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() =>
          setOpen(false)
        }
        title="Welcome"
      >

        <h3>Hello User 👋</h3>

        <p>
          This modal is reusable.
        </p>

      </Modal>

    </div>

  );

}

export default Home;