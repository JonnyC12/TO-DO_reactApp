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
    <div className="container"></div>;
  }
}

class ButtonAddTaks extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-lg btn-block">
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
      return <div className="row"></div>;
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
  render() {}
}
