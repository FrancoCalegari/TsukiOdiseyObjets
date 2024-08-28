import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import json

class JSONEditorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("JSON Editor")
        
        # Variables
        self.file_path = ""
        self.data = []
        self.selected_index = None
        
        # GUI Components
        self.load_button = tk.Button(root, text="Cargar JSON", command=self.load_json)
        self.load_button.pack(pady=10)
        
        self.save_button = tk.Button(root, text="Guardar JSON", command=self.save_json, state=tk.DISABLED)
        self.save_button.pack(pady=10)
        
        self.create_button = tk.Button(root, text="Crear Entrada", command=self.create_entry, state=tk.DISABLED)
        self.create_button.pack(pady=10)
        
        self.tree = ttk.Treeview(root, columns=("type", "place", "startHour", "endHour"), show="headings")
        self.tree.heading("type", text="Type")
        self.tree.heading("place", text="Place")
        self.tree.heading("startHour", text="Start Hour")
        self.tree.heading("endHour", text="End Hour")
        self.tree.pack(pady=10)
        self.tree.bind("<ButtonRelease-1>", self.on_tree_select)
        
        self.update_button = tk.Button(root, text="Actualizar Selección", command=self.open_edit_window, state=tk.DISABLED)
        self.update_button.pack(pady=10)
        
        self.delete_button = tk.Button(root, text="Eliminar Selección", command=self.delete_entry, state=tk.DISABLED)
        self.delete_button.pack(pady=10)
    
    def load_json(self):
        self.file_path = filedialog.askopenfilename(filetypes=[("JSON files", "*.json")])
        if not self.file_path:
            return
        
        try:
            with open(self.file_path, 'r') as file:
                self.data = json.load(file)
            self.update_tree()
            self.save_button.config(state=tk.NORMAL)
            self.create_button.config(state=tk.NORMAL)
            self.update_button.config(state=tk.DISABLED)
            self.delete_button.config(state=tk.DISABLED)
        except Exception as e:
            messagebox.showerror("Error", f"No se pudo cargar el archivo JSON: {e}")
    
    def save_json(self):
        if not self.file_path:
            messagebox.showwarning("Advertencia", "No se ha cargado ningún archivo JSON.")
            return
        
        try:
            with open(self.file_path, 'w') as file:
                json.dump(self.data, file, indent=4)
            messagebox.showinfo("Éxito", "Archivo JSON guardado correctamente.")
        except Exception as e:
            messagebox.showerror("Error", f"No se pudo guardar el archivo JSON: {e}")
    
    def create_entry(self):
        self.open_edit_window(new_entry=True)
    
    def update_tree(self):
        # Clear existing data
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Insert new data
        for item in self.data:
            self.tree.insert("", tk.END, values=(item.get("type"), item.get("place"), item.get("startHour"), item.get("endHour")))
    
    def on_tree_select(self, event):
        if self.tree.selection():
            self.update_button.config(state=tk.NORMAL)
            self.delete_button.config(state=tk.NORMAL)
            self.selected_index = self.tree.index(self.tree.selection()[0])
        else:
            self.update_button.config(state=tk.DISABLED)
            self.delete_button.config(state=tk.DISABLED)
    
    def delete_entry(self):
        if self.selected_index is not None:
            del self.data[self.selected_index]
            self.update_tree()
    
    def open_edit_window(self, new_entry=False):
        edit_window = tk.Toplevel(self.root)
        edit_window.title("Editar Entrada")
        
        tk.Label(edit_window, text="Type:").grid(row=0, column=0, padx=10, pady=5)
        type_entry = tk.Entry(edit_window)
        type_entry.grid(row=0, column=1, padx=10, pady=5)
        
        tk.Label(edit_window, text="Place:").grid(row=1, column=0, padx=10, pady=5)
        place_entry = tk.Entry(edit_window)
        place_entry.grid(row=1, column=1, padx=10, pady=5)
        
        tk.Label(edit_window, text="Start Hour (0-23):").grid(row=2, column=0, padx=10, pady=5)
        start_hour_entry = tk.Entry(edit_window)
        start_hour_entry.grid(row=2, column=1, padx=10, pady=5)
        
        tk.Label(edit_window, text="End Hour (0-23):").grid(row=3, column=0, padx=10, pady=5)
        end_hour_entry = tk.Entry(edit_window)
        end_hour_entry.grid(row=3, column=1, padx=10, pady=5)
        
        # If updating an existing entry, populate the fields
        if not new_entry and self.selected_index is not None:
            selected_item = self.data[self.selected_index]
            type_entry.insert(0, selected_item.get("type", ""))
            place_entry.insert(0, selected_item.get("place", ""))
            start_hour_entry.insert(0, selected_item.get("startHour", ""))
            end_hour_entry.insert(0, selected_item.get("endHour", ""))
        
        def save_changes():
            type_value = type_entry.get()
            place_value = place_entry.get()
            try:
                start_hour_value = int(start_hour_entry.get())
                end_hour_value = int(end_hour_entry.get())
            except ValueError:
                messagebox.showerror("Error", "Las horas deben ser valores numéricos.")
                return
            
            if type_value and place_value and 0 <= start_hour_value <= 23 and 0 <= end_hour_value <= 23:
                new_data = {
                    "type": type_value,
                    "place": place_value,
                    "startHour": start_hour_value,
                    "endHour": end_hour_value
                }
                
                if new_entry:
                    self.data.append(new_data)
                else:
                    self.data[self.selected_index] = new_data
                
                self.update_tree()
                edit_window.destroy()
            else:
                messagebox.showwarning("Advertencia", "Todos los campos deben ser completados correctamente.")
        
        save_button = tk.Button(edit_window, text="Guardar", command=save_changes)
        save_button.grid(row=4, column=0, columnspan=2, pady=10)
    
if __name__ == "__main__":
    root = tk.Tk()
    app = JSONEditorApp(root)
    root.mainloop()
