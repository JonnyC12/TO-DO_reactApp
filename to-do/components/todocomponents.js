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
      tareasSinHacer: [],
      tareasEnPro: [],
      tareasTerminadas: [],
      tareaAnnadir: "",
    };
    this.handleAnnadirTarea = this.handleAnnadirTarea.bind(this);
    this.handleAnnadirTareaToArrary =
      this.handleAnnadirTareaToArrary.bind(this);
  }
  handleAnnadirTarea(stringTarea) {
    this.setState = { tareaAnnadir: stringTarea };
  }
  handleAnnadirTareaToArrary() {
    // con slice copiamos el array para tener inmutabilidad
    if (this.tareaAnnadir.length > 0) {
      let array = this.state.tareasSinHacer.slice();
      array.push({
        id: this.state.countID,
        msg: this.state.tareaAnnadir,
        estado: 1,
      });
      // Aumentamos el estado
      let a = this.state.countID + 1;
      this.setState = {
        contID: a,
        tareasSinHacer: array,
        tareaAnnadir: "",
      };
    }
  }
  pasarEstadoTarea(id, estado) {
    if (estado === 1) {
      let auxiliarSinHacer = this.state.tareasSinHacer.slice();
      let auxiliarToDo = this.state.tareasEnPro.slice();
      // escogemos el objeto
      const tareaAmover = auxiliarSinHacer.find((item) => item.id === id);
      // eliminamos el objeto del array sin hacer
      const arrayModificado = auxiliarSinHacer.filter((item) => item.id !== id);

      auxiliarToDo.push(tareaAmover);
      this.setState = {
        tareasSinHacer: arrayModificado,
        tareasEnPro: auxiliarToDo,
      };
    }
    if (estado === 2) {
      let auxiliarEnPro = this.state.tareasEnPro.slice();
      let auxiliarDone = this.state.tareasTerminadas.slice();
      const tareaAmover = auxiliarEnPro.find((item) => item.id === id);
      const arrayModificado = auxiliarEnPro.filter((item) => item.id !== id);
      auxiliarDone.push(tareaAmover);
      this.setState = {
        tareasEnPro: arrayModificado,
        tareasTerminadas: auxiliarDone,
      };
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
        <ModalAddTask
          onChangeText={this.handleAnnadirTarea}
          onClickButton={this.handleAnnadirTareaToArrary}
        />
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
            data-toggle="modal"
            data-target="#exampleModalCenter"
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
          onClick={this.props.pasarTareaFunction}
        />
      ));
      arrayTaskColContainer.push(arrayTaskRows);
      const arrayInProRows = taskInProArray.map((task) => (
        <TaskRow
          MsgTarea={task}
          key={task.id}
          onClick={this.props.pasarTareaFunction}
        />
      ));
      arrayTaskColContainer.push(arrayInProRows);
      const arrayDoneRows = taskDoneArray.map((task) => (
        <TaskRow
          MsgTarea={task}
          key={task.id}
          onClick={this.props.pasarTareaFunction}
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
    <div className="col-12 col-md-6 col-lg-4">{this.props.ArrayTaskRow}</div>;
  }
}

//TODO: función para el evento on click y enlazar el evento con componente
class TaskRow extends React.Component {
  render() {
    return (
      <div className="row">
        <button type="button" className="btn btn-outline-primary">
          this.props.MsgTarea
        </button>
      </div>
    );
  }
}

class ModalAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChangeText = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChangeText(e) {
    this.props.onChangeText(e.target.value);
  }
  handleOnClick() {
    this.props.onClickButton;
  }
  render() {
    return (
      <div
        class="modal fade"
        id="addTaskModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addTaskModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addTaskModal">
                Añade un nueva tarea
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Tarea...."
                    aria-label="Tarea"
                    aria-describedby="basic-addon1"
                    onChange={this.handleOnChangeText}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar Ventana
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onclick={this.handleOnClick}
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
