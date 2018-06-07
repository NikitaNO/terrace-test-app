import React, { Component } from 'react';

export class Item extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props.value, isHoverMode: false };
  }

  changeHandler = (evt) => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  }

  mouseEnterLeaveHandler = () => {
    this.setState({ isHoverMode: !this.state.isHoverMode });
  }

  enterChangeMode = () => {
    this.setState({ isHoverMode: false });

    const { index, setItemToChange } = this.props;

    setItemToChange(index);
  }

  submit = () => {
    const { name, cost } = this.state;
    const {
      index,
      addItem,
      changeHandler,
      isAddingNewItem,
    } = this.props;

    const item = { name, cost: +cost };

    if (isAddingNewItem) {
      addItem(item);
    } else {
      changeHandler(index, item);
    }
  }

  deleteHandler = () => {
    const { deleteHandler, index } = this.props;

    deleteHandler(index);
  }

  renderView() {
    const { isHoverMode } = this.state;
    const {
      itemChangeIndex,
      isDuplicatedTable,
      isShowingDuplicate,
      checkHandler,
      index,
      value: { name, cost }
    } = this.props;

    return (
      <tr
        onMouseEnter={this.mouseEnterLeaveHandler}
        onMouseLeave={this.mouseEnterLeaveHandler}>
        {isDuplicatedTable &&
          <td>
            <input
              type="checkbox"
              value={index}
              onChange={checkHandler}
            />
          </td>
        }
        <td>{name}</td>
        <td>${cost}</td>
        {itemChangeIndex === -1 && isHoverMode && !isDuplicatedTable && <td>
          <button onClick={this.enterChangeMode} disabled={isShowingDuplicate} className="btn btn-sm btn-primary mr-1">Edit</button>
          <button onClick={this.deleteHandler} disabled={isShowingDuplicate} className="btn btn-sm btn-primary">Delete</button>
        </td>}
      </tr>
    );
  }

  renderInputs() {
    const { name, cost } = this.state;
    const { setItemToChange } = this.props;

    return (
      <tr
        onMouseEnter={this.mouseEnterLeaveHandler}
        onMouseLeave={this.mouseEnterLeaveHandler}>
        <td width="200">
          <div className="input-group input-group-sm">
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={this.changeHandler} />
          </div>
        </td>
        <td>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              type="number"
              name="cost"
              value={cost}
              className="form-control"
              onChange={this.changeHandler} />
          </div>
        </td>
        <td>
          <button onClick={this.submit} className="btn btn-sm btn-success mr-1">Save</button>
          <button onClick={() => setItemToChange(-1)} className="btn btn-sm btn-danger">Cancel</button>
        </td>
      </tr>
    );
  }

  render() {
    const { itemChangeIndex, index } = this.props;

    return (
      itemChangeIndex === index ? this.renderInputs() : this.renderView()
    );
  }
}
