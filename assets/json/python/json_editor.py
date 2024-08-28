import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import json

def init_module(app, module_frame):
    # Cargar la interfaz del módulo dentro de module_frame
    app.module_frame = module_frame  # Usa el module_frame proporcionado en lugar de crear una nueva ventana
    
    # Variables
    app.file_path = ""
    app.data = []
    app.selected_index = None
    
    # GUI Components
    app.load_button = tk.Button(module_frame, text="Cargar JSON", command=lambda: load_json(app))
    app.load_button.pack(pady=10)
    
    app.save_button = tk.Button(module_frame, text="Guardar JSON", command=lambda: save_json(app), state=tk.DISABLED)
    app.save_button.pack(pady=10)
    
    app.create_button = tk.Button(module_frame, text="Crear Entrada", command=lambda: create_entry(app), state=tk.DISABLED)
    app.create_button.pack(pady=10)
    
    app.update_button = tk.Button(module_frame, text="Actualizar Selección", command=lambda: open_edit_window(app), state=tk.DISABLED)
    app.update_button.pack(pady=10)
    
    app.delete_button = tk.Button(module_frame, text="Eliminar Selección", command=lambda: delete_entry(app), state=tk.DISABLED)
    app.delete_button.pack(pady=10)
    
    app.tree = ttk.Treeview(module_frame, columns=("type", "place", "startHour", "endHour"), show="headings")
    app.tree.heading("type", text="Type")
    app.tree.heading("place", text="Place")
    app.tree.heading("startHour", text="Start Hour")
    app.tree.heading("endHour", text="End Hour")
    app.tree.pack(pady=10)
    app.tree.bind("<ButtonRelease-1>", lambda event: on_tree_select(app))
    
    def load_json(app):
        app.file_path = filedialog.askopenfilename(filetypes=[("JSON files", "*.json")])
        if not app.file_path:
            return
        
        try:
            with open(app.file_path, 'r') as file:
                app.data = json.load(file)
            update_tree(app)
            app.save_button.config(state=tk.NORMAL)
            app.create_button.config(state=tk.NORMAL)
            app.update_button.config(state=tk.DISABLED)
            app.delete_button.config(state=tk.DISABLED)
        except Exception as e:
            messagebox.showerror("Error", f"No se pudo cargar el archivo JSON: {e}")

    def save_json(app):
        if not app.file_path:
            messagebox.showwarning("Advertencia", "No se ha cargado ningún archivo JSON.")
            return
        
        try:
            with open(app.file_path, 'w') as file:
                json.dump(app.data, file, indent=4)
            messagebox.showinfo("Éxito", "Archivo JSON guardado correctamente.")
        except Exception as e:
            messagebox.showerror("Error", f"No se pudo guardar el archivo JSON: {e}")

    def create_entry(app):
        open_edit_window(app, new_entry=True)
    
    def update_tree(app):
        # Clear existing data
        for item in app.tree.get_children():
            app.tree.delete(item)
        
        # Insert new data
        for item in app.data:
            app.tree.insert("", tk.END, values=(item.get("type"), item.get("place"), item.get("startHour"), item.get("endHour")))

    def on_tree_select(app):
        if app.tree.selection():
            app.update_button.config(state=tk.NORMAL)
            app.delete_button.config(state=tk.NORMAL)
            app.selected_index = app.tree.index(app.tree.selection()[0])
        else:
            app.update_button.config(state=tk.DISABLED)
            app.delete_button.config(state=tk.DISABLED)

    def delete_entry(app):
        if app.selected_index is not None:
            del app.data[app.selected_index]
            update_tree(app)
    
    def open_edit_window(app, new_entry=False):
        edit_window = tk.Toplevel(app.root)
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
        if not new_entry and app.selected_index is not None:
            selected_item = app.data[app.selected_index]
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
                    app.data.append(new_data)
                else:
                    app.data[app.selected_index] = new_data
                
                update_tree(app)
                edit_window.destroy()
            else:
                messagebox.showwarning("Advertencia", "Todos los campos deben ser completados correctamente.")
        
        save_button = tk.Button(edit_window, text="Guardar", command=save_changes)
        save_button.grid(row=4, column=0, columnspan=2, pady=10)

def run_module(app):
    # No se necesita implementación para esta función en el contexto actual
    pass
