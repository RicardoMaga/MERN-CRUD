import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./services/api";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });
  const [editItem, setEditItem] = useState(null); // Guarda o item em edição

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  const handleCreate = async () => {
    if (!newItem.name || !newItem.description) return alert("Preencha todos os campos!");
    try {
      await createItem(newItem);
      setNewItem({ name: "", description: "" });
      await fetchItems();
    } catch (error) {
      console.error("Erro ao criar item:", error);
    }
  };

  const handleUpdate = async (id) => {
    if (!editItem || editItem._id !== id) return;

    try {
      await updateItem(id, { name: editItem.name, description: editItem.description });
      setEditItem(null); // Sai do modo de edição
      await fetchItems();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      await fetchItems();
    } catch (error) {
      console.error("Erro ao apagar item:", error);
    }
  };

  return (
    <div>
      <h1>MERN CRUD</h1>
      <input
        placeholder="Nome"
        value={newItem.name}
        onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
      />
      <input
        placeholder="Descrição"
        value={newItem.description}
        onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
      />
      <button onClick={handleCreate}>Adicionar Item</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editItem && editItem._id === item._id ? (
              <>
                <input
                  value={editItem.name}
                  onChange={(e) => setEditItem((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                  value={editItem.description}
                  onChange={(e) => setEditItem((prev) => ({ ...prev, description: e.target.value }))}
                />
                <button onClick={() => handleUpdate(item._id)}>Salvar</button>
                <button onClick={() => setEditItem(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {item.name} - {item.description}
                <button onClick={() => setEditItem(item)}>Editar</button>
                <button onClick={() => handleDelete(item._id)}>Apagar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;