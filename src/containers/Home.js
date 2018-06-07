import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as itemActions from '../redux/item/actions';

import { Table } from '../components/Table';

import 'bootstrap/dist/css/bootstrap.css';

class Home extends Component {

  constructor() {
    super();

    this.state = {
      selectedItems: []
    };
  }

  save = () => {
    let selectedItems = this.props.items.filter((item, index) => this.state.selectedItems.includes(index));
    console.log(selectedItems);
    this.props.saveTable(selectedItems);
    this.setState({selectedItems: []});
  }

  changeSelectedItems = index => {
    this.setState(prevState => ({
      selectedItems: [...prevState.selectedItems, +index]
    }));
  }

  render() {
    const {
      undo,
      redo,
      items,
      history,
      addItem,
      changeItem,
      deleteItem,
      itemChangeIndex,
      isAddingNewItem,
      prepareToAddNewItem,
      setItemToChange,
      showDuplicateTable,
      isShowingDuplicate,
      history: { cursor, list: { length } },
    } = this.props;

    return (
      <div className="d-flex justify-content-center">
        <div>
          <Table
            undo={undo}
            redo={redo}
            items={items}
            addItem={addItem}
            history={history}
            itemChangeIndex={itemChangeIndex}
            isAddingNewItem={isAddingNewItem}
            isDuplicatedTable={false}
            isShowingDuplicate={isShowingDuplicate}
            itemChangeHandler={changeItem}
            itemDeleteHandler={deleteItem}
            setItemToChange={setItemToChange}>
          </Table>
          {!isAddingNewItem && <div>
            <button
              className="btn btn-sm btn-primary mx-1"
              onClick={prepareToAddNewItem}
              disabled={isShowingDuplicate}>
              Add new row
            </button>
            <button className="btn btn-sm btn-primary mx-1" onClick={showDuplicateTable}>Rebuild Table</button>
            {cursor > -1 && <button className="btn btn-sm btn-primary ml-2" onClick={undo}>Undo</button>}
            {!!length && cursor < length - 1 && <button className="btn btn-sm btn-primary ml-2" onClick={redo}>Redo</button>}
          </div>}
          {isShowingDuplicate && <div>
            <Table
              undo={undo}
              redo={redo}
              items={items}
              addItem={addItem}
              history={history}
              itemChangeIndex={itemChangeIndex}
              isAddingNewItem={isAddingNewItem}
              isDuplicatedTable={true}
              itemChangeHandler={changeItem}
              itemDeleteHandler={deleteItem}
              setItemToChange={setItemToChange}
              handleSelectedItems={this.changeSelectedItems}>
            </Table>
            <button className="btn btn-sm btn-primary mx-1" onClick={this.save}>Save Table</button>
          </div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  items: {
    items,
    history,
    itemChangeIndex,
    isAddingNewItem,
    isShowingDuplicate,
  },
}) => ({
  items,
  history,
  itemChangeIndex,
  isAddingNewItem,
  isShowingDuplicate,
});

const mapDispatchToProps = {
  ...itemActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
