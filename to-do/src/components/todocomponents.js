import React from "react";
import $ from "jquery";
/**
 * El estado se basará de la siguiente manera
 * 1 = "sin hacer"
 * 2 = "en progreso"
 * 3 = "terminada"
 */
const titulos = ["Tareas", "Tareas en proceso", "Tareas finalizadas"];
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countID: 0,
      tareasSinHacer: [
        { id: -1, msg: "Hola Mundo", estado: 1 },
        { id: -2, msg: "Yo bien", estado: 1 },
      ],
      tareasEnPro: [],
      tareasTerminadas: [],
    };

    this.handleAnnadirTareaToArrary =
      this.handleAnnadirTareaToArrary.bind(this);
    this.pasarEstadoTarea = this.pasarEstadoTarea.bind(this);
  }

  handleAnnadirTareaToArrary(tarea) {
    // con slice copiamos el array para tener inmutabilidad
    if (tarea.length > 0) {
      let array = this.state.tareasSinHacer.slice();
      array.push({
        id: this.state.countID,
        msg: tarea,
        estado: 1,
      });
      // Aumentamos el estado
      let a = this.state.countID + 1;
      this.setState({
        countID: a,
        tareasSinHacer: array,
      });
    }
  }
  pasarEstadoTarea(id, estado) {
    if (estado === 1) {
      let auxiliarSinHacer = this.state.tareasSinHacer.slice();
      let auxiliarToDo = this.state.tareasEnPro.slice();
      // escogemos el objeto
      const tareaAmover = auxiliarSinHacer.find((item) => item.id === id);
      tareaAmover.estado = 2;
      // eliminamos el objeto del array sin hacer
      const arrayModificado = auxiliarSinHacer.filter((item) => item.id !== id);

      auxiliarToDo.push(tareaAmover);
      this.setState({
        tareasSinHacer: arrayModificado,
        tareasEnPro: auxiliarToDo,
      });
    }
    if (estado === 2) {
      let auxiliarEnPro = this.state.tareasEnPro.slice();
      let auxiliarDone = this.state.tareasTerminadas.slice();
      const tareaAmover = auxiliarEnPro.find((item) => item.id === id);
      tareaAmover.estado = 3;
      const arrayModificado = auxiliarEnPro.filter((item) => item.id !== id);
      auxiliarDone.push(tareaAmover);
      this.setState({
        tareasEnPro: arrayModificado,
        tareasTerminadas: auxiliarDone,
      });
    }
  }

  render() {
    return (
      <div
        className="container d-flex align-items-center justify-content-center"
        id="containerTask"
      >
        <div className="row w-100 border rounded" id="taskContainer">
          <div className="col">
            <ButtonAddTaks />
            <TaskContainer
              taskArray={this.state.tareasSinHacer}
              inProArray={this.state.tareasEnPro}
              doneArray={this.state.tareasTerminadas}
              pasarTareaFunction={this.pasarEstadoTarea}
              titulos={this.props.titulos}
            />
          </div>
          <ModalAddTask onClickButton={this.handleAnnadirTareaToArrary} />
        </div>
      </div>
    );
  }
}

class ButtonAddTaks extends React.Component {
  render() {
    return (
      <div className="row mt-3 ms-0 me-0 mb-3">
        <div className="col">
          <button
            type="button"
            className="button-4 w-100 "
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#addTaskModal"
            id="taskAddButton"
          >
            <p className="text-center mb-0">Añadir Tarea</p>
          </button>
        </div>
      </div>
    );
  }
}

class TaskContainer extends React.Component {
  render() {
    const lengthTaskTodotArray = this.props.taskArray.length;
    const lengthTaskInProArray = this.props.inProArray.length;
    const lengthTaksDoneArray = this.props.doneArray.length;
    if (
      lengthTaskTodotArray > 0 ||
      lengthTaskInProArray > 0 ||
      lengthTaksDoneArray > 0
    ) {
      // Obtenemos los Array para tratarlos
      const taskToDoArray = this.props.taskArray;
      const taskInProArray = this.props.inProArray;
      const taskDoneArray = this.props.doneArray;
      let arrayTaskColContainer = [];
      // Obtenemos los array de cada columna con sus componentes TaskRow correspondiente

      const arrayTaskRows = taskToDoArray.map((task) => (
        <TaskRow
          MsgTarea={task.msg}
          key={task.id}
          pasarTareaFunction={this.props.pasarTareaFunction}
          id={task.id}
          estado={task.estado}
        />
      ));
      arrayTaskColContainer.push(arrayTaskRows);
      const arrayInProRows = taskInProArray.map((task) => (
        <TaskRow
          MsgTarea={task.msg}
          key={task.id}
          pasarTareaFunction={this.props.pasarTareaFunction}
          id={task.id}
          estado={task.estado}
        />
      ));
      arrayTaskColContainer.push(arrayInProRows);
      const arrayDoneRows = taskDoneArray.map((task) => (
        <TaskRow
          MsgTarea={task.msg}
          key={task.id}
          pasarTareaFunction={this.props.pasarTareaFunction}
          id={task.id}
          estado={task.estado}
        />
      ));
      arrayTaskColContainer.push(arrayDoneRows);

      const containerAllTypeTask = arrayTaskColContainer.map((tasks, index) => (
        <TaskColContainer
          ArrayTaskRow={tasks}
          key={index}
          title={this.props.titulos[index]}
        />
      ));

      return (
        <div className="col">
          <div className="row mt-3 ms-0 me-0 mb-3 gx-5 gy-4">
            {containerAllTypeTask}
          </div>
        </div>
      );
    }
    return (
      <div className="row mt-3 ms-0 me-0 mb-3">
        <div className="col">
          <AdviceMsg msg="NO HAY TAREAS" />
        </div>
      </div>
    );
  }
}
class AdviceMsg extends React.Component {
  render() {
    return (
      <div className="alert alert-primary" role="alert">
        <h4>{this.props.msg}</h4>
      </div>
    );
  }
}
class TaskColContainer extends React.Component {
  render() {
    return (
      <div className="col-12 col-md-6 col-lg-4 ">
        <div className="row">
          <p className="text-center">{this.props.title}</p>
        </div>
        <div className="row">
          <div className="col border border-2 columTaks rounded p-3">
            {this.props.ArrayTaskRow}
          </div>
        </div>
      </div>
    );
  }
}

//TODO: función para el evento on click y enlazar el evento con componente
class TaskRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.pasarTareaFunction(this.props.id, this.props.estado);
  }
  render() {
    if (this.props.estado === 3) {
      return (
        <div className="row ms-0 me-0 mb-2">
          <button
            type="button"
            className="border border-2 p-0 "
            onClick={this.handleOnClick}
            disabled
          >
            {this.props.MsgTarea}
          </button>
        </div>
      );
    } else if (this.props.estado === 2) {
      return (
        <div className="row ms-0 me-0 mb-1">
          <button
            type="button"
            className="border border-2 p-0 progresTask"
            onClick={this.handleOnClick}
          >
            {this.props.MsgTarea}
          </button>
        </div>
      );
    }
    return (
      <div className="row ms-0 me-0 mb-1">
        <button
          type="button"
          className="p-0 todoTask"
          onClick={this.handleOnClick}
        >
          {this.props.MsgTarea}
        </button>
      </div>
    );
  }
}

class ModalAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tarea: "",
    };
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChangeText(e) {
    this.setState({
      tarea: e.target.value,
    });
  }
  handleOnClick() {
    this.props.onClickButton(this.state.tarea);
    this.setState({
      tarea: "",
    });
    $("#cerrarModal").click();
    $("#inputTarea").val("");
  }

  render() {
    return (
      <div
        className="modal fade"
        id="addTaskModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTaskModal">
                Añade un nueva tarea
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    id="inputTarea"
                    type="text"
                    className="form-control"
                    placeholder="Tarea...."
                    aria-label="Tarea"
                    aria-describedby="basic-addon1"
                    onChange={this.handleOnChangeText}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="cerrarModal"
              >
                Cerrar Ventana
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleOnClick}
              >
                Añadir Tarea
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Container;
