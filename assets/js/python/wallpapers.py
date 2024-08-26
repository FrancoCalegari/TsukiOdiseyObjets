import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import json
import os
import shutil

# Inicializamos la variable para almacenar la ruta del archivo JSON
json_path = None

# Función para seleccionar el archivo JSON
def select_json_file():
    global json_path
    json_path = filedialog.askopenfilename(title="Seleccionar archivo JSON", filetypes=[("JSON Files", "*.json")])
    if json_path:
        load_data()
        update_treeview()
    else:
        messagebox.showwarning("Advertencia", "No se seleccionó ningún archivo JSON.")
        root.quit()

# Función para cargar el contenido del archivo JSON
def load_data():
    global data
    if json_path and os.path.exists(json_path):
        with open(json_path, "r") as file:
            data = json.load(file)
    else:
        data = {"wallpapers": []}

# Función para guardar los cambios en el archivo JSON
def save_data():
    if json_path:
        with open(json_path, "w") as file:
            json.dump(data, file, indent=4)
    else:
        messagebox.showerror("Error", "No se ha seleccionado ningún archivo JSON.")

# Función para agregar un nuevo wallpaper
def add_wallpaper():
    category = category_combobox.get()
    name = name_entry.get()
    price = price_entry.get()
    link = link_entry.get()

    if not (category and name and price and link):
        messagebox.showwarning("Advertencia", "Todos los campos deben estar completos.")
        return

    img_path = filedialog.askopenfilename(title="Seleccionar imagen", filetypes=[("JPG Files", "*.jpg"), ("PNG Files", "*.png")])
    if img_path:
        # Copiar la imagen a la ruta deseada
        img_name = os.path.basename(img_path)
        new_img_path = f"./assets/img/wallpapers/{img_name}"
        shutil.copy(img_path, new_img_path)

        # Agregar el nuevo wallpaper al JSON
        new_wallpaper = {
            "category": category,
            "name": name,
            "img": new_img_path,
            "price": int(price),
            "link": link
        }
        data["wallpapers"].append(new_wallpaper)
        save_data()
        update_treeview()
        clear_entries()

# Función para actualizar el Treeview
def update_treeview():
    for item in tree.get_children():
        tree.delete(item)
    
    for wallpaper in data["wallpapers"]:
        tree.insert("", "end", values=(wallpaper["category"], wallpaper["name"], wallpaper["price"], wallpaper["link"]))

# Función para cargar los detalles seleccionados en los campos de entrada
def load_selected(event):
    selected_item = tree.selection()
    if selected_item:
        index = tree.index(selected_item)
        wallpaper = data["wallpapers"][index]

        category_combobox.set(wallpaper["category"])  # Usamos el combobox en lugar del entry
        name_entry.delete(0, tk.END)
        name_entry.insert(0, wallpaper["name"])

        price_entry.delete(0, tk.END)
        price_entry.insert(0, wallpaper["price"])

        link_entry.delete(0, tk.END)
        link_entry.insert(0, wallpaper["link"])

# Función para editar un wallpaper seleccionado
def edit_wallpaper():
    selected_item = tree.selection()
    if not selected_item:
        messagebox.showwarning("Advertencia", "Selecciona un elemento para editar.")
        return

    index = tree.index(selected_item)
    data["wallpapers"][index]["category"] = category_combobox.get()  # Usamos el combobox en lugar del entry
    data["wallpapers"][index]["name"] = name_entry.get()
    data["wallpapers"][index]["price"] = int(price_entry.get())
    data["wallpapers"][index]["link"] = link_entry.get()

    img_path = filedialog.askopenfilename(title="Seleccionar imagen (opcional)", filetypes=[("JPG Files", "*.jpg"), ("PNG Files", "*.png")])
    if img_path:
        img_name = os.path.basename(img_path)
        new_img_path = f"./assets/img/wallpapers/{img_name}"
        shutil.copy(img_path, new_img_path)
        data["wallpapers"][index]["img"] = new_img_path

    save_data()
    update_treeview()
    clear_entries()

# Función para eliminar un wallpaper seleccionado
def delete_wallpaper():
    selected_item = tree.selection()
    if not selected_item:
        messagebox.showwarning("Advertencia", "Selecciona un elemento para eliminar.")
        return

    index = tree.index(selected_item)
    del data["wallpapers"][index]

    save_data()
    update_treeview()
    clear_entries()

# Función para limpiar los campos de entrada
def clear_entries():
    category_combobox.set("")  # Limpiar el combobox
    name_entry.delete(0, tk.END)
    price_entry.delete(0, tk.END)
    link_entry.delete(0, tk.END)

# Cargar los datos iniciales
data = {"wallpapers": []}

# Interfaz Gráfica
root = tk.Tk()
root.title("Gestor de Wallpapers JSON")

# Labels y Entry fields
# Cambiar el Entry por un Combobox para la categoría
ttk.Label(root, text="Categoría:").grid(row=0, column=0, padx=10, pady=5)
category_combobox = ttk.Combobox(root, values=["mobile", "pc"], state="readonly")
category_combobox.grid(row=0, column=1, padx=10, pady=5)

ttk.Label(root, text="Nombre:").grid(row=1, column=0, padx=10, pady=5)
name_entry = ttk.Entry(root)
name_entry.grid(row=1, column=1, padx=10, pady=5)

ttk.Label(root, text="Precio:").grid(row=2, column=0, padx=10, pady=5)
price_entry = ttk.Entry(root)
price_entry.grid(row=2, column=1, padx=10, pady=5)

ttk.Label(root, text="Enlace:").grid(row=3, column=0, padx=10, pady=5)
link_entry = ttk.Entry(root)
link_entry.grid(row=3, column=1, padx=10, pady=5)

# Botones de acción
add_button = ttk.Button(root, text="Agregar Wallpaper", command=add_wallpaper)
add_button.grid(row=4, column=0, padx=10, pady=5, sticky="ew")

edit_button = ttk.Button(root, text="Editar Wallpaper", command=edit_wallpaper)
edit_button.grid(row=4, column=1, padx=10, pady=5, sticky="ew")

delete_button = ttk.Button(root, text="Eliminar Wallpaper", command=delete_wallpaper)
delete_button.grid(row=5, column=0, padx=10, pady=5, sticky="ew")

clear_button = ttk.Button(root, text="Limpiar Campos", command=clear_entries)
clear_button.grid(row=5, column=1, padx=10, pady=5, sticky="ew")

# Treeview para mostrar los wallpapers
columns = ("category", "name", "price", "link")
tree = ttk.Treeview(root, columns=columns, show="headings")
tree.heading("category", text="Categoría")
tree.heading("name", text="Nombre")
tree.heading("price", text="Precio")
tree.heading("link", text="Enlace")
tree.grid(row=6, column=0, columnspan=2, padx=10, pady=10)

tree.bind("<<TreeviewSelect>>", load_selected)

# Cargar los datos en el Treeview
update_treeview()

# Seleccionar el archivo JSON después de configurar la interfaz
select_json_file()

root.mainloop()
