import {
  ITEM_ADD,
  ITEM_UNDO,
  ITEM_REDO,
  ITEM_CHANGE,
  ITEM_DELETE,
  ITEM_SET_TO_CHANGE,
  ITEM_PREPARE_TO_ADD_NEW,
  TABLE_DUPLICATE,
  TABLE_SAVE,
} from './constants';

export const addItem = item => ({
  type: ITEM_ADD,
  item,
});

export const changeItem = (index, item) => ({
  type: ITEM_CHANGE,
  item,
  index,
});

export const deleteItem = index => ({
  type: ITEM_DELETE,
  index,
});

export const setItemToChange = index => ({
  type: ITEM_SET_TO_CHANGE,
  index,
});

export const prepareToAddNewItem = () => ({
  type: ITEM_PREPARE_TO_ADD_NEW,
});

export const undo = () => ({
  type: ITEM_UNDO,
});

export const redo = () => ({
  type: ITEM_REDO,
});

export const showDuplicateTable = () => ({
  type: TABLE_DUPLICATE,
});

export const saveTable = items => ({
  type: TABLE_SAVE,
  items
});
