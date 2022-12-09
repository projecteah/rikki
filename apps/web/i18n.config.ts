export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      'app.title': 'Rikki',
      'input.placeholder': "what's on your mind...",
      'input.send': 'send',
      'settings.title': 'sync settings',
      'settings.apiBase': 'api base url',
      'settings.password': 'password',
      'settings.cancel': 'cancel',
      'settings.save': 'save',
      'settings.loginFailed': 'login failed',
      'settings.syncFailed': 'sync failed',
      'action.sync': 'sync',
      'action.delete': 'delete',
      'action.settings': 'settings',
      'empty': 'no notes yet',
    },
  },
}))
