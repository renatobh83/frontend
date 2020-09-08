import React, { useState } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./styles.css";
export default function ModalConfirm(props) {
  const [state, setState] = useState({
    open: false,
    callback: null,
  });

  const show = (callback) => (e) => {
    e.preventDefault();
    e = {
      ...e,
      target: { ...e.target, value: e.target.value },
    };

    setState({
      open: true,
      callback: () => callback(e),
    });
  };
  const hide = () => setState({ open: false, callback: null });

  const confirm = () => {
    state.callback();
    hide();
  };

  return (
    <>
      {props.children(show)}
      {state.open && (
        <Dialog>
          <div className="content">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <button onClick={confirm} className="danger">
              Sim
            </button>
            <button onClick={hide}>Cancelar</button>
          </div>
        </Dialog>
      )}
    </>
  );
}
