import React from "react";
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tareasSinHacer: [],
      tareasEnPro: [],
      tareasTerminadas: [],
    };
  }
  render() {
    <div className="container">
      <ButtonAddTaks />
      <TaskContainer
        taskArray={this.state.tareasSinHacer}
        inProArray={this.state.tareasEnPro}
        doneArray={this.state.tareasTerminadas}
      />
    </div>;
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

      const arrayTaskRows = taskToDoArray.map((task, index) => (
        <TaskRow MsgTarea={task} key={index} />
      ));
      arrayTaskColContainer.push(arrayTaskRows);
      const arrayInProRows = taskInProArray.map((task, index) => (
        <TaskRow MsgTarea={task} key={index} />
      ));
      arrayTaskColContainer.push(arrayInProRows);
      const arrayDoneRows = taskDoneArray.map((task, index) => (
        <TaskRow MsgTarea={task} key={index} />
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

class Modal extends React.Component {
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
              <button type="button" class="btn btn-primary">
                Añadir Tarea
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
