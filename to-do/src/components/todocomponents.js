import React from "react";
/**
 * El estado se basará de la siguiente manera
 * 1 = "sin hacer"
 * 2 = "en progreso"
 * 3 = "terminada"
 */

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countID: 0,
      tareasSinHacer: Array(1).fill({ id: 1, msg: "hola", estado: 1 }),
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
        contID: a,
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
      <div className="container">
        <ButtonAddTaks />
        <TaskContainer
          taskArray={this.state.tareasSinHacer}
          inProArray={this.state.tareasEnPro}
          doneArray={this.state.tareasTerminadas}
          pasarTareaFunction={this.pasarEstadoTarea}
        />
        <ModalAddTask onClickButton={this.handleAnnadirTareaToArrary} />
      </div>
    );
  }
}

class ButtonAddTaks extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-lg btn-block"
            data-bs-toggle="modal"
            data-bs-target="#addTaskModal"
          >
            Añadir Tarea
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
        <TaskColContainer ArrayTaskRow={tasks} key={index} />
      ));

      return <div className="row">{containerAllTypeTask}</div>;
    }
    return (
      <div className="row">
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
      <div className="col-12 col-md-6 col-lg-4 border border-primary">
        {this.props.ArrayTaskRow}
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
    return (
      <div className="row">
        <button
          type="button"
          className="btn btn-outline-primary"
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
