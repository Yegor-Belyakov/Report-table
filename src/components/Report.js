import React, { useState } from "react";

import Table from "react-bootstrap/Table";
import Modal from "./modal/Modal";
import Pagination from "./pagination/pagination";
import { paginate } from "../utils/paginate";

import InfoCard from "./infoCard/InfoCard";

function Report({ fruits, handleDelete, setFruits }) {
  const [fruit, setFruit] = useState({
    fruitName: "",
    fruitSort: "",
    fruitFormat: "",
    fruitAlignment: "",
  });

  const count = fruits.length;
  const pageSize = 20;
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const fruitCrop = paginate(fruits, currentPage, pageSize);

  const [currentFruit, setCurrentFruit] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [editedFruitId, setEditedFruitId] = useState();

  const [newName, setNewName] = useState("");
  const nameChangeHandler = (id) => {
    setFruits((prevFruits) =>
      prevFruits.map((el) => {
        if (el.dataField === id) {
          el.caption = newName;
          return el;
        }
        return el;
      })
    );
    setEditedFruitId();
    setNewName("");
  };

  const addNewFruit = () => {
    const newFruit = {
      dataField: +fruits[fruits.length - 1].dataField + 1,
      caption: fruit.fruitName,
      dataType: fruit.fruitSort,
      format: fruit.fruitFormat,
      alignment: fruit.fruitAlignment,
    };
    setFruits([...fruits, newFruit]);
    setFruit({
      fruitName: "",
      fruitSort: "",
      fruitFormat: "",
      fruitAlignment: "",
    });
  };

  const openInfo = (fruit) => {
    setShowInfoModal(true);
    setCurrentFruit(fruit);
  };

  return (
    <>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Номер</th>
              <th scope="col">Наименование</th>
              <th scope="col">Сорт</th>
              <th scope="col">Формат</th>
              <th scope="col">Расположение</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {fruitCrop.map((fruit) => (
              <tr key={fruit.dataField} onDoubleClick={() => openInfo(fruit)}>
                <td>{fruit.dataField}</td>
                <td>
                  <>
                    {editedFruitId === fruit.dataField ? (
                      <>
                        <input
                          onDoubleClick={(e) => e.stopPropagation()}
                          placeholder={fruit.caption}
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                        ></input>
                        <button
                          onClick={() => nameChangeHandler(fruit.dataField)}
                          className="btn btn-outline-success btn-sm m-1"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>{fruit.caption}</>
                    )}
                    {
                      <button
                        onDoubleClick={(e) => e.stopPropagation()}
                        className={"btn btn-outline-success btn-sm m-1"}
                        onClick={() => setEditedFruitId(fruit.dataField)}
                      >
                        Изменить
                      </button>
                    }
                  </>
                </td>

                <td>{fruit.dataType}</td>
                <td>{fruit.format}</td>
                <td>{fruit.alignment}</td>

                <td>
                  <div onClick={(e) => e.stopPropagation()}>
                    <button
                      className={"btn btn-outline-danger"}
                      onClick={() => handleDelete(fruit.dataField)}
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <input
          value={fruit.fruitName}
          onChange={(e) => setFruit({ ...fruit, fruitName: e.target.value })}
          type={"text"}
          placeholder="Название фрукта"
        />
        <input
          value={fruit.fruitSort}
          onChange={(e) => setFruit({ ...fruit, fruitSort: e.target.value })}
          type={"text"}
          placeholder="Сорт"
        />
        <input
          value={fruit.fruitFormat}
          onChange={(e) => setFruit({ ...fruit, fruitFormat: e.target.value })}
          type={"text"}
          placeholder="Формат"
        />
        <input
          value={fruit.fruitAlignment}
          onChange={(e) =>
            setFruit({ ...fruit, fruitAlignment: e.target.value })
          }
          type={"text"}
          placeholder="Расположение"
        />

        <button className="btn btn-primary m-2" onClick={addNewFruit}>
          Добавить
        </button>
      </div>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      {showInfoModal && currentFruit && (
        <Modal visible={showInfoModal} setVisible={setShowInfoModal}>
          <InfoCard
            currentFruit={currentFruit}
            setShowInfoModal={setShowInfoModal}
          />
        </Modal>
      )}
    </>
  );
}

export default Report;
