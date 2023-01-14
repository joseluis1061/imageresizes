const path = require('path');
const { app, BrowserWindow } = require('electron');

//Detecta si la app corre sobre una Mac
const isMac = process.platform === 'darwin';

//Detectar si estamos en modo de desarrollo
const isDev = process.env.NODE_ENV !== 'production'

//Función para crear una nueva ventana
function createMainWindow(){
  //Ventana principal y sus parametros iniciales
  const mainWindow = new BrowserWindow({
    title: 'Images Resizes',
    width: isDev ? 500:1000,
    height: 600
  });

  //Abrir las herramientas de desarrollo en modo develop
  if(isDev){
    mainWindow.webContents.openDevTools();
  }

  //Cargar un archivo HTML a la ventana
  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
  console.log('Creando ventana')
}

//Evento: Esperar a que la app este lista para;
app.whenReady().then(()=>{
  //Crear la ventana mainWindow
  createMainWindow();

  //Este fragmento me garantiza que si no tengo ninguna ventana
  //Se cree una al activar la aplicación.
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
      createMainWindow();
    }
  });
});

//Evento: Verificar si todas la ventanas estan cerradas
app.on('window-all-closed', ()=>{
  //Si no corre en Mac
  if(!isMac){
    app.quit(); //Cerrar todas las ventanas
  }
});
