import React from "react";

function TaskItem({task, onToggle , onRemove}) {
     return (
          <li>
            <input 
                type="checkbox"
                checked={task.completed}
                onChange={ ()=> onToggle(task.id)} 
            />

            <span
                style={{textDecoration: task.completed ? "line-Through" : "none",}}
            >
                {task.title}
            </span>

            <button className="delete" onClick={() => onRemove(task.id)}>
                Excluir
            </button>
          </li>
  );
}

export default TaskItem;