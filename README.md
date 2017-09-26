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

7) ...

11) Ejecutamos la aplicación
Finalmente obtendremos los gafetes generados.
El último paso es dar click derecho > imprimir
Deben mostrarse 4 gafetes por hoja.



# Instructions for locally running the app
1) In folder generadorGafetes: `bower install`
2) `firebase serve`

# Como imprimir gafetes
1) Imprimir a PDF, poner en un USB
1) Imprimir en color en papel/cartulina gruesa (en Office Depot tienen papel tipo "Cougar" que viene en 14 pesos la hoja ya impresa en color)
1) Una vez impresa, corta cada hoja para tener cada gafete sin nada de borde (Office Depot me prestó la guillotina para hacerlo)
1) Pide que enmican los gafetes con enmicado grueso, dejando un espacio de ~2 centimetros arriba de cada gafete para hacer el hoyo para el cordón
1) Otra vez cortar cada gafete con la guillotina, dejando ese espacio blanco para el hoyo del cordón
1) Pide el agujero para poner el hoyo en la parta transparente arriba
