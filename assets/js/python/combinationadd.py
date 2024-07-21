import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image, ImageTk
import json
import os

class ImageManagerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Gestor de Combinaciones de Imágenes")
        self.data = []
        self.file_path = ""

        # Frame principal y canvas para el scrolling
        self.main_frame = tk.Frame(root)
        self.main_frame.pack(fill=tk.BOTH, expand=True)

        self.canvas = tk.Canvas(self.main_frame)
        self.scroll_y = tk.Scrollbar(self.main_frame, orient="vertical", command=self.canvas.yview)
        self.scroll_y.pack(side=tk.RIGHT, fill=tk.Y)
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        self.canvas.configure(yscrollcommand=self.scroll_y.set)

        self.frame = tk.Frame(self.canvas)
        self.canvas.create_window((0, 0), window=self.frame, anchor="nw")

        self.frame.bind("<Configure>", self.on_frame_configure)

        # Widgets
        self.load_button = tk.Button(root, text="Cargar Archivo JSON", command=self.load_file)
        self.load_button.pack(pady=10)

        self.add_button = tk.Button(root, text="Agregar Combinación", command=self.open_add_combination_window)
        self.add_button.pack(pady=10)

        self.load_data_button = tk.Button(root, text="Cargar Datos en JSON", command=self.save_file)
        self.load_data_button.pack(pady=10)

    def load_file(self):
        self.file_path = filedialog.askopenfilename(title="Seleccionar archivo JSON", filetypes=[("JSON files", "*.json")])
        if self.file_path:
            try:
                with open(self.file_path, 'r') as file:
                    self.data = json.load(file)
                self.update_table()
            except Exception as e:
                messagebox.showerror("Error", f"Error al cargar el archivo: {e}")

    def save_file(self):
        if not self.file_path:
            messagebox.showwarning("Advertencia", "Primero carga un archivo JSON.")
            return
        try:
            with open(self.file_path, 'w') as file:
                json.dump(self.data, file, indent=4)
            messagebox.showinfo("Éxito", "Datos guardados correctamente.")
        except Exception as e:
            messagebox.showerror("Error", f"Error al guardar el archivo: {e}")

    def open_add_combination_window(self):
        self.add_window = tk.Toplevel(self.root)
        self.add_window.title("Agregar Nueva Combinación")

        self.add_window.transient(self.root)
        self.add_window.grab_set()
        self.add_window.focus_set()

        tk.Label(self.add_window, text="Seleccionar imagen del objeto 1").pack(pady=5)
        self.obj1_path = tk.StringVar()
        tk.Entry(self.add_window, textvariable=self.obj1_path, state='readonly').pack(pady=5)
        tk.Button(self.add_window, text="Seleccionar Imagen", command=lambda: self.select_image(1)).pack(pady=5)

        tk.Label(self.add_window, text="Seleccionar imagen del objeto 2").pack(pady=5)
        self.obj2_path = tk.StringVar()
        tk.Entry(self.add_window, textvariable=self.obj2_path, state='readonly').pack(pady=5)
        tk.Button(self.add_window, text="Seleccionar Imagen", command=lambda: self.select_image(2)).pack(pady=5)

        tk.Label(self.add_window, text="Seleccionar imagen del objeto 3").pack(pady=5)
        self.obj3_path = tk.StringVar()
        tk.Entry(self.add_window, textvariable=self.obj3_path, state='readonly').pack(pady=5)
        tk.Button(self.add_window, text="Seleccionar Imagen", command=lambda: self.select_image(3)).pack(pady=5)

        tk.Label(self.add_window, text="Seleccionar imagen de resultado").pack(pady=5)
        self.result_path = tk.StringVar()
        tk.Entry(self.add_window, textvariable=self.result_path, state='readonly').pack(pady=5)
        tk.Button(self.add_window, text="Seleccionar Imagen", command=lambda: self.select_image(4)).pack(pady=5)

        tk.Button(self.add_window, text="Agregar Combinación", command=self.add_combination).pack(pady=10)

    def select_image(self, img_type):
        file_path = filedialog.askopenfilename(title="Seleccionar imagen", filetypes=[("Image files", "*.png")])
        if file_path:
            if img_type == 1:
                self.obj1_path.set(file_path)
            elif img_type == 2:
                self.obj2_path.set(file_path)
            elif img_type == 3:
                self.obj3_path.set(file_path)
            elif img_type == 4:
                self.result_path.set(file_path)

    def add_combination(self):
        obj_files = [self.obj1_path.get(), self.obj2_path.get(), self.obj3_path.get()]
        result_file = self.result_path.get()

        if all(os.path.isfile(path) for path in obj_files) and os.path.isfile(result_file):
            new_combination = {
                "objets": [self.convert_to_pattern(path) for path in obj_files],
                "result": self.convert_to_pattern(result_file)
            }
            self.data.append(new_combination)
            self.update_table()
            self.add_window.destroy()
        else:
            messagebox.showwarning("Advertencia", "Debes seleccionar 3 imágenes de objetos y 1 imagen de resultado.")

    def convert_to_pattern(self, path):
        return "./assets/img/objets/" + os.path.basename(path)

    def convert_from_pattern(self, path):
        return os.path.join("assets/img/objets", os.path.basename(path))

    def update_table(self):
        for widget in self.frame.winfo_children():
            widget.destroy()

        # Table headers
        header_frame = tk.Frame(self.frame)
        header_frame.pack(fill=tk.X)

        tk.Label(header_frame, text="Objeto 1", width=20, anchor="w").pack(side=tk.LEFT, padx=5)
        tk.Label(header_frame, text="Objeto 2", width=20, anchor="w").pack(side=tk.LEFT, padx=5)
        tk.Label(header_frame, text="Objeto 3", width=20, anchor="w").pack(side=tk.LEFT, padx=5)
        tk.Label(header_frame, text="Resultado", width=20, anchor="w").pack(side=tk.LEFT, padx=5)
        tk.Label(header_frame, text="Acciones", width=20, anchor="w").pack(side=tk.LEFT, padx=5)

        for i, combination in enumerate(self.data):
            frame = tk.Frame(self.frame)
            frame.pack(fill=tk.X, pady=5)

            # Display images and actions
            for j, img_path in enumerate(combination.get('objets', [])):
                img = self.load_image(self.convert_from_pattern(img_path))
                if img:
                    img = ImageTk.PhotoImage(img)
                    img_label = tk.Label(frame, image=img, width=120)
                    img_label.image = img
                    img_label.pack(side=tk.LEFT, padx=5)
                else:
                    tk.Label(frame, text=f"NaN: Imagen de Objeto {j+1} no encontrada").pack(side=tk.LEFT, padx=5)

                modify_button = tk.Button(frame, text=f"Modificar Objeto {j+1}", command=lambda idx=i, j=j: self.modify_image(idx, j, 'object'))
                modify_button.pack(side=tk.LEFT, padx=5)

                delete_button = tk.Button(frame, text=f"Eliminar Objeto {j+1}", command=lambda idx=i, j=j: self.delete_image(idx, j, 'object'))
                delete_button.pack(side=tk.LEFT, padx=5)

            result_img = self.load_image(self.convert_from_pattern(combination.get('result', '')))
            if result_img:
                result_img = ImageTk.PhotoImage(result_img)
                result_label = tk.Label(frame, image=result_img, width=120)
                result_label.image = result_img
                result_label.pack(side=tk.LEFT, padx=5)
            else:
                tk.Label(frame, text="NaN: Imagen de Resultado no encontrada").pack(side=tk.LEFT, padx=5)

            modify_result_button = tk.Button(frame, text="Modificar Resultado", command=lambda idx=i: self.modify_image(idx, None, 'result'))
            modify_result_button.pack(side=tk.LEFT, padx=5)

            delete_result_button = tk.Button(frame, text="Eliminar Resultado", command=lambda idx=i: self.delete_image(idx, None, 'result'))
            delete_result_button.pack(side=tk.LEFT, padx=5)

    def load_image(self, path):
        try:
            img = Image.open(path)
            return img
        except:
            return None

    def on_frame_configure(self, event):
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))

    def modify_image(self, index, img_index, img_type):
        combination = self.data[index]

        if img_type == 'object':
            new_img_files = filedialog.askopenfilenames(title="Seleccionar nueva imagen", filetypes=[("Image files", "*.png")])
            if new_img_files:
                combination['objets'][img_index] = self.convert_to_pattern(new_img_files[0])
        elif img_type == 'result':
            new_result_file = filedialog.askopenfilename(title="Seleccionar nueva imagen de resultado", filetypes=[("Image files", "*.png")])
            if new_result_file:
                combination['result'] = self.convert_to_pattern(new_result_file)

        self.update_table()

    def delete_image(self, index, img_index, img_type):
        combination = self.data[index]

        if img_type == 'object':
            if messagebox.askyesno("Confirmar", "¿Estás seguro de que deseas eliminar esta imagen de objeto?"):
                combination['objets'][img_index] = self.convert_to_pattern(filedialog.askopenfilename(title="Seleccionar nueva imagen de objeto", filetypes=[("Image files", "*.png")]))
        elif img_type == 'result':
            if messagebox.askyesno("Confirmar", "¿Estás seguro de que deseas eliminar esta imagen de resultado?"):
                combination['result'] = self.convert_to_pattern(filedialog.askopenfilename(title="Seleccionar nueva imagen de resultado", filetypes=[("Image files", "*.png")]))

        self.update_table()

if __name__ == "__main__":
    root = tk.Tk()
    app = ImageManagerApp(root)
    root.mainloop()
