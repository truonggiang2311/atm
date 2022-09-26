import React, { useState } from 'react';
import { faCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import Draggable from 'react-draggable';

import { get, post, remove } from '../../services/httpRequest';
import { PATH_URL } from '../../const/pathUrl';
import { Atm } from '../../models/Atm';
import { Queue } from '../../models/Queue';
import atmImg from '../../assets/atm.jpeg';
import styles from './MainLayout.module.css';
import Logout from './Logout';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const cx = classNames.bind(styles);

export default function MainLayout() {
  const [atms, setAtms] = useState([]);
  const [queues, setQueues] = useState([]);
  const [processedClient, setProcessedClient] = useState([]);
  const [newAtm, setNewAtm] = useState('');
  const [newTransaction, setNewTransaction] = useState(0);
  const [peopleName, setPeopleName] = useState('');
  const [isAddTransaction, setIsAddTransaction] = useState(false);

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(PATH_URL.getAtms);
      const data = await response;
      setAtms(data.atm);
      setQueues(data.queue.slice(0, 5));
      setProcessedClient(data.processedClient);
    };
    fetchApi();
  });

  const handleClickAddAtm = () => {
    setIsAddTransaction(false);
    openModal();
  };

  const handleClickAddTransaction = () => {
    setIsAddTransaction(true);
    openModal();
  };

  const handleSubmitAddAtm = () => {
    const fetchApi = async () => {
      const response = await post(PATH_URL.addAtm, { name: newAtm });
      const data = await response;
      setAtms(data);
    };
    fetchApi();
  };

  const handleSubmitAddTransaction = () => {
    const fetchApi = async () => {
      const response = await post(PATH_URL.addTransaction, {
        namePeople: peopleName,
        transaction: newTransaction,
      });
      const data = await response;
      if (!!data.success) {
        alert('add people success');
      } else {
        alert('add people fail');
      }
    };
    fetchApi();
  };

  const handleChangeNewAtm = (e: any) => {
    setNewAtm(e.target.value);
  };

  const handleRemoveAtm = (id: string) => {
    console.log('first');
    const fetchApi = async () => {
      const response = await remove(PATH_URL.removeAtm + '/' + id);
      const data = await response;
    };
    fetchApi();
  };

  const handleChangeNewPeople = (e: any) => {
    setPeopleName(e.target.value);
  };

  const handleChangeNewTransaction = (e: any) => {
    setNewTransaction(Number(e.target.value));
  };

  return (
    <div className="container pt-2">
      <Logout />
      <button onClick={handleClickAddAtm} type="button" className="btn btn-primary">
        Add ATM
      </button>
      <button onClick={handleClickAddTransaction} type="button" className="btn btn-primary ms-2">
        Add Transaction
      </button>

      <div className="row ">
        <div className="col-8">
          <div className="row mt-1">
            {atms.map((atm: Atm) => (
              <Draggable
                // axis="x"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                grid={[25, 25]}
                scale={1}
                key={atm.id}
              >
                <div className="handle col-lg-4 col-12">
                  <div className="text-end">
                    <FontAwesomeIcon
                      onClick={() => handleRemoveAtm(atm.id)}
                      className={cx('remove-icon')}
                      icon={faCircleXmark}
                    />
                  </div>
                  <img className={cx('atm-img')} src={atmImg} alt="atm"></img>
                  <p className="text-center">{atm.name}</p>
                  <p className="text-center">{atm.status}</p>
                  <div className="row">
                    <div className="col-2">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="col-10">
                      <strong>{atm.client}</strong>
                      <p>Pending transition: {atm.transaction}</p>
                    </div>
                  </div>
                </div>
              </Draggable>
            ))}
          </div>
        </div>
        <div className="col-4">
          <h3>Queue</h3>
          <div className="border border-5">
            {queues.map((queue: Queue) => (
              <div key={queue.namePeople} className="border border-2 p-3">
                <FontAwesomeIcon icon={faUser} />
                <p className="mb-0">
                  <span className="text-primary">Name: </span>
                  {queue.namePeople}
                </p>
                <p className="mb-0">Transaction: {queue.transaction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-0">
        <h2>Processed client</h2>
        {atms.map((atm: Atm) => (
          <li key={atm.id}>
            <strong>{atm.name}</strong>:{atm.processedClientsAtm.slice(-10)}
          </li>
        ))}
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {!isAddTransaction ? (
            <>
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add New ATM</h2>
              <div>ATM name</div>
              <form>
                <input className="form-control" onChange={handleChangeNewAtm} />
                <div className="d-flex justify-content-between mt-2">
                  <button className="btn btn-primary" onClick={handleSubmitAddAtm}>
                    Add ATM
                  </button>
                  <button className="btn btn-secondary ps-3 pe-3" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add New Transaction</h2>
              <form>
                <div>Name</div>
                <input className="form-control" onChange={handleChangeNewPeople} />
                <div>Transaction</div>
                <input
                  type="number"
                  className="form-control"
                  onChange={handleChangeNewTransaction}
                />
                <div className="d-flex justify-content-between mt-2">
                  <button className="btn btn-primary" onClick={handleSubmitAddTransaction}>
                    Add Transaction
                  </button>
                  <button className="btn btn-secondary ps-3 pe-3" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}
