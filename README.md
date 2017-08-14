# Descripción de las carpetas

### 1. Código HTML del form que capturará la información del desalumno, esta información será enviada en un archivo de Google Spreadsheet. (docs -- el nombre es así para la configuración de Github pages)
### 2. Código necesario en el archivo Google Spreadsheet para que este pueda recibir la información capturada en el form. (Appscript).(appscript)
### 3. Aplicación en AngularJS que obtendrá información del archivo Google Spreadsheet, este desplegará los gafetes generados en una página web. (generadorGafetes)

# Configuración
1) Copiar archivo index.html de la carpeta registro.devf.mx
2) Crear un Google Spreadsheet nuevo con los siguientes elementos en una fila de una página llamada responses:
timeline, name, last_name, email, marca, serie, photo

Una vez completados los pasos anteriores, en el documento Google Spreadsheet seleccionar la pestaña herramientas: Herramientas > Editor de secuencia de comandos ...

3) En la carpeta appscript se encuentran los dos archivos que irán en el Script editor, ir a Archivo > Nuevo >
   a) Archivo de secuencia de commandos, se debe llamar “appscript”.
   b) Archivo HTML, se debe llamar success.

4) Copiar y pegar el código que se encuentra en la carpeta registro.devf.mx
5) Seleccionar la opción Publicar > Publicar como aplicación web.
   a) Versión del proyecto: nuevo
   b) Ejecutar la aplicación como: yo
   c) Quién tiene acceso a la aplicación: Cualquier persona, incluso de forma anónima

6) Después de publicar, se generará un link. Copiar el link y pégalo en la etiqueta action del form que se encuentra en el documento index.html de la carpeta registro.devf.mx

### Una vez completados todos estos pasos el form debe enviar las respuestas al archivo Google Spreadsheet

7) Generar la siguiente URL con los datos necesarios:
   ID del documento Google Spreadsheet, el ID del documento lo encontraremos en la URL generada al compartuir el archivo Google Spreadsheet y el nombre de la hoja del documento: https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=SheetID&sheet=NombreDeLaHoja

  Al realizar este paso obtendremos un JSON similar a este: https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1vsf043AXxF9gz9lSaxf46hABz9lSVDQl9hr7dQlSDFI&sheet=responses

  Si existen problemas en este paso, consultar el siguiente video: https://www.youtube.com/watch?v=31oaHj5eDxc

8) Dentro de la carpeta generadorGafetes:
   Dirigirse a app/factories/Factory.js
   Dentro de la función “dataJson()” • Copiar la URL generada en el paso anterior p.e:     https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1vsf043AXxF9gz9lSaxf46hABz9lSVDQl9hr7dQlSDFI&sheet=responses

9) Dirigirse a app/components/gaf.component.html
Esta es la estructura del gafete a generar, donde se iterarán los elementos existentes:
• {{student.photo}}: Corresponde al link de la imagen del desalumno.
• {{student.name}}: Corresponde al nombre del desalumno.
• {{student.last_name}}: Corresponde al apellido el desalumno.
• {{student.marca}}: Corresponde a la marca de la laptop del desalumno.
• {{student.serie}}: Corresponde al número de serie de la laptop del desalumno.
• {{student.condn}}: Corresponde al tamaño de la fuente del nombre.

10) Únicamente queda hacer deploy a la carpeta generadorGafetes, se recomienda usar:
• 200! OK webserver para usar la aplicación de manera local.
• Firebase para utilizar la aplicación desde cualquier computadora.

11) Ejecutamos la aplicación
Finalmente obtendremos los gafetes generados.
El último paso es dar click derecho > imprimir
Deben mostrarse 4 gafetes por hoja.
