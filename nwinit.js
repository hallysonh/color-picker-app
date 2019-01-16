const WIN_APP_HEIGHT = 45;

// Load library
var gui = require('nw.gui');

// Reference to window and tray
var win = gui.Window.get();

var tray = new gui.Tray({ title: 'Color Picker', icon: 'icon.png' });

// Give it a menu
var menu = new nw.Menu();
menu.append(new nw.MenuItem({ label: 'Exit', click: () => win.close() }));
tray.menu = menu;

// Show window and remove tray when clicked
tray.on('click', function() {
  if (!win) {
    win = gui.Window.get();
  }
  win.show();
  win.focus();
});

// Get the minimize event
win.on('minimize', function() {
  // Hide window
  this.hide();
});

win.on('focus', () => {
  win.x = screen.width - win.width;
  win.y = screen.height - win.height - WIN_APP_HEIGHT;
});

win.on('blur', () => {
  win.minimize();
});

win.on('exit', () => {
  tray.remove();
  tray = null;
});

const minBtn = document.getElementById('minbtn');
minBtn && minBtn.addEventListener('click', () => win.minimize());

const closeBtn = document.getElementById('closebtn');
closeBtn && closeBtn.addEventListener('click', () => win.close());
