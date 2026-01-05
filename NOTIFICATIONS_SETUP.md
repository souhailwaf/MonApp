# Configuration des Notifications Push

Ce guide explique comment configurer les notifications push dans votre application Expo avec Firebase.

## 📋 Prérequis

1. Un projet Firebase configuré
2. Les variables d'environnement Firebase dans un fichier `.env`

## 🔧 Configuration

### 1. Créer le fichier `.env`

Créez un fichier `.env` à la racine du projet avec vos clés Firebase :

```env
EXPO_PUBLIC_FIREBASE_API_KEY=votre_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
EXPO_PUBLIC_FIREBASE_APP_ID=votre_app_id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=votre_client_id.apps.googleusercontent.com
```

⚠️ **Important** : Le fichier `.env` est déjà dans `.gitignore` et ne sera pas commité sur GitHub.

### 2. Initialiser Firebase

Le service Firebase est déjà configuré dans `services/firebase.js`. Il s'initialise automatiquement avec les variables d'environnement.

### 3. Utiliser les notifications

#### Exemple basique dans votre composant :

```javascript
import { useEffect } from 'react';
import { 
  registerForPushNotificationsAsync, 
  schedulePushNotification,
  addNotificationReceivedListener 
} from './services/notifications';

function MonComposant() {
  useEffect(() => {
    // Demander les permissions et obtenir le token
    const setupNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        console.log('Token:', token);
        // Envoyer ce token à votre serveur pour les notifications push
      }
    };
    setupNotifications();

    // Écouter les notifications reçues
    const subscription = addNotificationReceivedListener(notification => {
      console.log('Notification reçue:', notification);
    });

    return () => subscription.remove();
  }, []);

  // Programmer une notification locale
  const handleScheduleNotification = async () => {
    await schedulePushNotification({
      title: "Nouvelle tâche",
      body: "Vous avez une nouvelle tâche à faire",
      data: { todoId: '123' },
      trigger: { seconds: 5 } // Dans 5 secondes
    });
  };
}
```

## 📱 Fonctions disponibles

### `registerForPushNotificationsAsync()`
Demande les permissions et retourne le token Expo Push.

### `schedulePushNotification({ title, body, data, trigger })`
Programme une notification locale.

### `cancelAllNotifications()`
Annule toutes les notifications programmées.

### `getBadgeCount()`
Retourne le nombre de notifications non lues.

### `resetBadge()`
Réinitialise le badge à 0.

### `addNotificationReceivedListener(callback)`
Écoute les notifications reçues (même quand l'app est ouverte).

### `addNotificationResponseReceivedListener(callback)`
Écoute les clics sur les notifications.

## 🚀 Prochaines étapes

1. Créez votre fichier `.env` avec vos vraies clés Firebase
2. Redémarrez votre serveur Expo : `npm start`
3. Testez sur un appareil physique (les notifications ne fonctionnent pas sur simulateur/émulateur)
4. Intégrez les notifications dans vos écrans selon vos besoins

## 📚 Documentation

- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)


