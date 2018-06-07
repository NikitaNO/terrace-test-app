import React, { Component } from 'react';

import { Item } from '../components/Item';

export class Table extends Component {

  itemCheckHandler = evt => {
    this.props.handleSelectedItems(evt.target.value)
  }

  render() {
    const {
      items,
      addItem,
      isAddingNewItem,
      itemChangeIndex,
      itemChangeHandler,
      itemDeleteHandler,
      setItemToChange,
      isDuplicatedTable,
      isShowingDuplicate,
    } = this.props;

    return (
      <div>
        <table className="table table-striped my-2">
          <thead>
            <tr>
              {isDuplicatedTable &&
                <th></th>
              }
              <th>Item</th>
              <th>Cost per lb/kg</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <Item
                key={index}
                value={item}
                index={index}
                changeHandler={itemChangeHandler}
                deleteHandler={itemDeleteHandler}
                itemChangeIndex={itemChangeIndex}
                setItemToChange={setItemToChange}
                isDuplicatedTable={isDuplicatedTable}
                isShowingDuplicate={isShowingDuplicate}
                checkHandler={this.itemCheckHandler}
              />
            ))}
            {isAddingNewItem && <Item
              value={{ name: '', cost: 0 }}
              index={items.length}
              addItem={addItem}
              itemChangeIndex={itemChangeIndex}
              isAddingNewItem={isAddingNewItem}
              setItemToChange={setItemToChange}
            />
            }
          </tbody>
        </table>
      </div>
    );
  }
}
