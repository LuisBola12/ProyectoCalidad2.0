import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarStyle.scss";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import usePost from "../../shared/hooks/usePost";
import { useSelector } from "react-redux";
import { getHoursEmployer } from "../../Utils/Calendar/getCalendarInfo";
import { Pagination } from "../Pagination/Pagination";
import Swal from "sweetalert2";
import validate from "../../Utils/Calendar/calendarValidations";
import { removeTimeFromDate } from "../../shared/removeTimeFromDate";

export const CalendarComp = () => {
  const user = useSelector((state) => state.user.user);
  const proyecto = useSelector((state) => state.activeProject.projectName);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [hours, setHours] = useState("");
  const [hoursRegister, setHoursRegister] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [infoRecieved, setInfoRecieved] = useState(false);
  const [infoSend, setInfoSend] = useState(1);
  const { post } = usePost(
    process.env.REACT_APP_BACKEND_LOCALHOST + "employee/hours"
  );
  const dateMin = null;

  const dateToString = () => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };


  const handleClose = () => {
    setShow(false);
    setHours("");
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSave = () => {
    const actualDate = dateToString();
    if (validate(hours) === false) {
      let string = "";
      string = JSON.stringify({
        Email: user.Email,
        Proyecto: proyecto,
        Fecha: actualDate,
        CantidadHoras: hours,
      });
      post(string);
      handleClose();
      Swal.fire({
        title: "Done!",
        text: `Hours Registered successfully`,
        icon: "success",
        confirmButtonColor: "darkgreen",
      });
      setInfoSend(infoSend + 1);
    }
  };

  useEffect(() => {
    const getHours = async () => {
      const data = await getHoursEmployer(user.Cedula, proyecto);
      if (data) {
        setHoursRegister(data);
        setInfoRecieved(true);
      }
    };
    getHours();
  }, [infoSend]);

  const maxPage = Math.ceil(hoursRegister.length / 7);

  return !infoRecieved ? (
    <div className="loader"></div>
  ) : (
    <>
      <h1 className="text-center">Calendar</h1>
      <div className="calendar-page">
        <div className="calendar-table-container">
          <div className="calendar-table-div">
            {hoursRegister.length === 0 ? (
              <>
                <table className="calendar-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Register Hours</th>
                    </tr>
                  </thead>
                </table>
                <div className="calendar-table-empty"> No Hours Enter </div>
              </>
            ) : (
              <>
                <table className="calendar-table">
                  <thead>
                    <tr>
                      <th className="table-left-border">Date</th>
                      <th className="table-right-border">Register Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hoursRegister
                      .slice((pageNumber - 1) * 7, (pageNumber) * 7 )
                      .map((element, index) => (
                        <tr key={index}>
                          <td className="table-left-border">{removeTimeFromDate(element.Fecha)}</td>
                          <td className="table-right-border">{element.Cantidad}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <Pagination
            page={pageNumber}
            setPage={setPageNumber}
            maxPage={maxPage}
          />
        </div>
        <div className="calendar-container">
          <Calendar
            value={date}
            onChange={setDate}
            onClickDay={handleShow}
            minDetail="year"
            maxDate={new Date()}
            minDate={dateMin}
            next2Label={null}
            prev2Label={null}
          />
          {date && (
            <p className="text-center">
              <span className="bold">Selected date:</span> {date.toDateString()}
            </p>
          )}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Hours for {date.toDateString()} :</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  id="calendar_hours"
                  type="text"
                  value={hours}
                  onChange={(e) => {
                    setHours(e.target.value);
                  }}
                  placeholder="Hours"
                  autoFocus
                />
                <div>
                  <label
                    className="calendar-error"
                    id="calendar_error_name"
                  ></label>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
