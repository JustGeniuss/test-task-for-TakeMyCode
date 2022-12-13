import { sortList } from "../../api";

export const ListItem = ({
  item,
  onItemSelect,
  dragedItem,
  setDragedItem,
  setList,
  callbackRef,
}) => {
  const dragStartHandler = (e, item) => {
    setDragedItem(item);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e, item) => {
    e.preventDefault();
    sortList(dragedItem.id, item.id).then((res) => {
      if (res.data.success) {
        setList((prevValue) => {
          const list = [...prevValue];
          const fromIndex = list.indexOf(
            list.find((element) => element.id === dragedItem.id)
          );
          const toIndex = list.indexOf(
            list.find((element) => element.id === item.id)
          );
          const movingElement = list.splice(fromIndex, 1)[0];
          list.splice(toIndex, 0, movingElement);
          return list;
        });
      }
    });
  };

  return (
    <div
      className="item"
      draggable={true}
      ref={callbackRef}
      onDragStart={(e) => {
        dragStartHandler(e, item);
      }}
      onDragOver={(e) => {
        dragOverHandler(e);
      }}
      onDrop={(e) => {
        dropHandler(e, item);
      }}
    >
      <input
        onChange={() => {
          onItemSelect(item.id);
        }}
        type="checkbox"
        checked={item.isSelected}
      />
      {item.text}
    </div>
  );
};
