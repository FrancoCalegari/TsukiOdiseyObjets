import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import json
import os

class ModularApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Modular App")
        self.modules = {}
        
        # Crear un contenedor para los módulos
        self.module_frame = tk.Frame(root)
        self.module_frame.pack(fill=tk.BOTH, expand=True)
        
        # Menú principal
        self.menu = tk.Menu(root)
        self.root.config(menu=self.menu)
        
        # Menú de módulos
        self.module_menu = tk.Menu(self.menu, tearoff=0)
        self.menu.add_cascade(label="Módulos", menu=self.module_menu)
        
        # Menú para cargar módulos
        self.menu.add_command(label="Cargar Módulo", command=self.load_module)
        
        # Cargar módulos automáticamente
        self.load_modules_from_directory("modules")

    def load_modules_from_directory(self, directory):
        # Cargar módulos automáticamente desde un directorio
        if not os.path.exists(directory):
            os.makedirs(directory)
        
        for file in os.listdir(directory):
            if file.endswith(".py"):
                self.load_module_from_path(os.path.join(directory, file))
    
    def load_module_from_path(self, module_path):
        # Cargar un módulo desde una ruta específica
        try:
            module_name = os.path.basename(module_path).split(".")[0]
            module = {}
            with open(module_path, "r") as file:
                exec(file.read(), module)
            
            # Buscar la función `init_module` en el módulo
            if "init_module" in module:
                # Crear un marco para el módulo y añadirlo a la ventana principal
                module_frame = tk.Frame(self.module_frame)
                module_frame.pack(fill=tk.BOTH, expand=True)
                module["init_module"](self, module_frame)
                
                # Agregar la opción al menú
                self.modules[module_name] = {"frame": module_frame, "run_module": module.get("run_module")}
                self.module_menu.add_command(label=module_name, command=lambda name=module_name: self.show_module(name))
            else:
                messagebox.showerror("Error", f"El módulo {module_name} no contiene la función 'init_module'.")
        except Exception as e:
            messagebox.showerror("Error", f"Error al cargar el módulo: {e}")

    def load_module(self):
        # Cargar un módulo desde un archivo Python
        module_path = filedialog.askopenfilename(filetypes=[("Python Files", "*.py")])
        if not module_path:
            return
        
        self.load_module_from_path(module_path)
    
    def show_module(self, module_name):
        # Mostrar el módulo en la ventana principal
        for mod_name, mod_info in self.modules.items():
            mod_info["frame"].pack_forget()  # Ocultar todos los módulos
        
        module_info = self.modules.get(module_name)
        if module_info and module_info["run_module"]:
            module_info["frame"].pack(fill=tk.BOTH, expand=True)  # Mostrar el módulo seleccionado
            module_info["run_module"](self)  # Ejecutar la función `run_module` del módulo
        else:
            messagebox.showerror("Error", f"El módulo {module_name} no contiene la función 'run_module'.")

if __name__ == "__main__":
    root = tk.Tk()
    app = ModularApp(root)
    root.mainloop()
