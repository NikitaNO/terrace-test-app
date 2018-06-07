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

import initialState from './state';

const reducer = (state = initialState, action) => {
  const { type, index } = action;
  const { items, history: { list, cursor } } = state;
  const newItems = [...items];

  switch (type) {
    case ITEM_ADD:
      newItems.push(action.item);

      return {
        ...state,
        items: newItems,
        isAddingNewItem: false,
        itemChangeIndex: -1,
        history: {
          list: [...list, { type, item: action.item }],
          cursor: cursor + 1,
        },
      };

    case ITEM_CHANGE:
      const oldItem = newItems[index];

      newItems[index] = action.item;

      return {
        ...state,
        items: newItems,
        itemChangeIndex: -1,
        history: {
          list: [...list, { type, index, oldItem, item: action.item }],
          cursor: cursor + 1,
        },
      };

    case ITEM_DELETE:
      const item = newItems.splice(index, 1)[0];

      return {
        ...state,
        items: newItems,
        history: {
          list: [...list, { type, index, item }],
          cursor: cursor + 1,
        },
      };

    case ITEM_UNDO:
      switch (list[cursor].type) {
        case ITEM_ADD:
          newItems.pop();
          break;

        case ITEM_CHANGE:
          newItems[list[cursor].index] = list[cursor].oldItem;
          break;

        default:
          newItems.splice(list[cursor].index, 0, list[cursor].item);
          break;
      }

      return {
        items: newItems,
        itemChangeIndex: -1,
        history: {
          list,
          cursor: cursor - 1,
        },
      };

    case ITEM_REDO:
      const nextStepCursor = cursor + 1;

      switch (list[nextStepCursor].type) {
        case ITEM_ADD:
          newItems.push(list[nextStepCursor].item);
          break;

        case ITEM_CHANGE:
          newItems[list[nextStepCursor].index] = list[nextStepCursor].item;
          break;

        default:
          newItems.splice(list[nextStepCursor].index, 1);
          break;
      }

      return {
        items: newItems,
        itemChangeIndex: -1,
        history: {
          list,
          cursor: nextStepCursor,
        },
      };

    case ITEM_SET_TO_CHANGE:
      return {
        ...state,
        isAddingNewItem: false,
        itemChangeIndex: index,
      };

    case ITEM_PREPARE_TO_ADD_NEW:
      return {
        ...state,
        isAddingNewItem: true,
        itemChangeIndex: items.length,
      };

    case TABLE_DUPLICATE:
      return {
        ...state,
        isShowingDuplicate: true,
      };

    case TABLE_SAVE:
      return {
        ...state,
        items: action.items,
        isShowingDuplicate: false,
      };

    default:
      return state;
  }
};

export default reducer;
