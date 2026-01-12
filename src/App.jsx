import React, {useState,useEffect} from "react";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";


function App() {
    const [task,setTask] = useState("");
    const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
        });


    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);



    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks]);

    
    function handleAddTask() {
        if(task.trim() === "")
        return;
        
        const newTask = {
            id: crypto.randomUUID(),
            title: task,
            completed:false,
        };
    
        setTasks([...tasks,newTask]);
        setTask("");
    
    }
    
    function handleToggleTask(id) {
        const updatedTasks = tasks.map((item) => item.id === id
            ? {...item, completed: !item.completed}
            : item
        );
    
        setTasks(updatedTasks);
    };

    function handleRemoveTask(id){
        const updatedTasks = tasks.filter((item) => item.id !== id);
        
        setTasks(updatedTasks)
    };


  return (
    <div className="app">
      <Header title="Minhas Tarefas"/>

      <input 
        type="text"
        placeholder="Digite uma tarefa"
        value={task}
        onChange={(event) => setTask(event.target.value)} 
      />
      <br></br>
      <button onClick={handleAddTask}>
        Adicionar
      </button>
      <ul>
        {tasks.map((item) => (
            
            <TaskItem 
            key={item.id}
            task={item}
            onToggle={handleToggleTask}
            onRemove={handleRemoveTask}
            />
        ))}
      </ul>

      <button className="darkLigth" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Modo Light" : "Modo Dark"}
      </button>
        
    </div>
  );
}

export default App;
