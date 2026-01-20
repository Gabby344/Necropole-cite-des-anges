/**
 * CONFIGURATION GLOBALE - Angels Memorial
 * Nécropole Cité des Anges - Kolwezi
 */

const CONFIG = {
    // Informations de l'application
    APP_NAME: "Angels Memorial",
    VERSION: "2.0.0",
    DESCRIPTION: "Service de livres d'or numériques - Nécropole Cité des Anges Kolwezi",
    
    // Informations de contact
    CONTACT: {
        EMAIL: "contact@citedesanges.cd",
        PHONE: "+243 000 000 000",
        ADDRESS: "Nécropole Cité des Anges, Kolwezi, République Démocratique du Congo",
        HOURS: "Lundi - Vendredi: 8h00 - 18h00"
    },
    
    // Configuration Firebase
    FIREBASE: {
        apiKey: "AIzaSyBenDfciup5UUHxVpVEkDOC9Id3H1fvjeY",
        authDomain: "appli-necropole-cite-des-anges.firebaseapp.com",
        projectId: "appli-necropole-cite-des-anges",
        storageBucket: "appli-necropole-cite-des-anges.firebasestorage.app",
        messagingSenderId: "595944933670",
        appId: "1:595944933670:web:f971dffb72ac72fa9619e7"
    },
    
    // Paramètres de l'application
    SETTINGS: {
        MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
        MAX_MESSAGE_LENGTH: 500,
        MAX_AUTHOR_LENGTH: 50,
        ITEMS_PER_PAGE: 10,
        AUTO_SAVE_INTERVAL: 30000, // 30 secondes
        SESSION_TIMEOUT: 7200000, // 2 heures
        CACHE_DURATION: 3600000 // 1 heure
    },
    
    // Messages par défaut
    MESSAGES: {
        WELCOME: "Bienvenue sur Angels Memorial - Cité des Anges",
        LOADING: "Chargement en cours...",
        NO_DATA: "Aucune donnée disponible",
        ERROR: "Une erreur est survenue",
        SUCCESS: "Opération réussie",
        CONFIRM_DELETE: "Êtes-vous sûr de vouloir supprimer ?",
        SESSION_EXPIRED: "Votre session a expiré"
    },
    
    // Styles
    THEME: {
        COLORS: {
            PRIMARY: "#0a0e17",
            SECONDARY: "#1a2332",
            ACCENT: "#c9a95e",
            ACCENT_LIGHT: "#e6c87e",
            SUCCESS: "#28a745",
            DANGER: "#dc3545",
            WARNING: "#ffc107",
            INFO: "#17a2b8",
            WHITE: "#ffffff",
            LIGHT_BG: "#f8fafc"
        },
        GRADIENTS: {
            PRIMARY: "linear-gradient(135deg, #0a0e17 0%, #1a2332 100%)",
            GOLD: "linear-gradient(135deg, #c9a95e 0%, #e6c87e 100%)",
            BLUE: "linear-gradient(135deg, #4a6fa5 0%, #6b93d6 100%)"
        },
        SHADOWS: {
            SM: "0 2px 10px rgba(0, 0, 0, 0.05)",
            MD: "0 10px 30px rgba(0, 0, 0, 0.1)",
            LG: "0 20px 50px rgba(0, 0, 0, 0.15)",
            GOLD: "0 10px 30px rgba(201, 169, 94, 0.2)"
        },
        RADIUS: {
            SM: "8px",
            MD: "15px",
            LG: "25px",
            XL: "35px"
        }
    },
    
    // URLs
    URLS: {
        HOME: "index.html",
        ADMIN: "admin.html",
        LOGIN: "login.html",
        BOOKS: "livres.html",
        DEFAULT_IMAGE: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    
    // Partage
    SHARE: {
        WHATSAPP: {
            TEMPLATE: "📖 *Livre d'Or Numérique - Cité des Anges*\n\nEn mémoire de {name}\n\nLaissez votre message d'hommage :\n{link}\n\n_Nécropole Cité des Anges - Kolwezi_"
        },
        FACEBOOK: {
            TEMPLATE: "Je partage ce livre d'or en mémoire de {name}"
        }
    },
    
    // Format de dates
    DATE_FORMATS: {
        DISPLAY: {
            DATE: "DD/MM/YYYY",
            DATETIME: "DD/MM/YYYY HH:mm",
            FULL: "dddd D MMMM YYYY",
            TIME: "HH:mm"
        },
        STORAGE: "YYYY-MM-DD"
    },
    
    // Validation
    VALIDATION: {
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE: /^\+?[\d\s-]{10,}$/,
        NAME: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/
    },
    
    // Configuration des rapports
    REPORTING: {
        AUTO_REFRESH: 60000, // 1 minute
        LOG_RETENTION: 30, // jours
        ANALYTICS: true
    }
};

// Fonctions utilitaires
const UTILS = {
    // Formater une date
    formatDate: function(date, format = 'DISPLAY.DATETIME') {
        if (!date) return '';
        
        const d = new Date(date);
        const formats = CONFIG.DATE_FORMATS.DISPLAY;
        
        switch(format) {
            case 'DATE':
                return d.toLocaleDateString('fr-FR');
            case 'DATETIME':
                return d.toLocaleDateString('fr-FR') + ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            case 'FULL':
                return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            case 'TIME':
                return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            default:
                return d.toLocaleDateString('fr-FR');
        }
    },
    
    // Tronquer un texte
    truncateText: function(text, maxLength = 100) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // Générer un ID unique
    generateId: function(prefix = '') {
        return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Valider une image
    validateImage: function(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = CONFIG.SETTINGS.MAX_IMAGE_SIZE;
        
        if (!validTypes.includes(file.type)) {
            return { valid: false, error: 'Type de fichier non supporté' };
        }
        
        if (file.size > maxSize) {
            return { valid: false, error: `L'image est trop volumineuse (max: ${maxSize / 1024 / 1024}MB)` };
        }
        
        return { valid: true, error: null };
    },
    
    // Copier dans le presse-papier
    copyToClipboard: function(text) {
        return navigator.clipboard.writeText(text);
    },
    
    // Télécharger un fichier
    downloadFile: function(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },
    
    // Débounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Gestionnaire d'erreurs global
const ERROR_HANDLER = {
    log: function(error, context = '') {
        console.error(`[Angels Memorial] ${context}:`, error);
        
        // En production, envoyer à un service de logging
        if (CONFIG.REPORTING.ANALYTICS) {
            this.reportToServer(error, context);
        }
    },
    
    reportToServer: function(error, context) {
        // Implémentation pour envoyer les erreurs au serveur
        const errorData = {
            timestamp: new Date().toISOString(),
            context: context,
            error: error.message || error.toString(),
            stack: error.stack,
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        // Stocker localement en attendant
        const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
        errors.push(errorData);
        localStorage.setItem('app_errors', JSON.stringify(errors.slice(-50))); // Garder les 50 dernières
    },
    
    showToast: function(message, type = 'error') {
        // Afficher une notification à l'utilisateur
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 5000);
    }
};

// Gestionnaire de session
const SESSION_MANAGER = {
    start: function(userData) {
        const session = {
            id: UTILS.generateId('session_'),
            user: userData,
            startTime: new Date().toISOString(),
            lastActivity: new Date().toISOString()
        };
        
        localStorage.setItem('current_session', JSON.stringify(session));
        this.updateActivity();
    },
    
    updateActivity: function() {
        const session = this.getCurrent();
        if (session) {
            session.lastActivity = new Date().toISOString();
            localStorage.setItem('current_session', JSON.stringify(session));
        }
    },
    
    getCurrent: function() {
        return JSON.parse(localStorage.getItem('current_session'));
    },
    
    end: function() {
        const session = this.getCurrent();
        if (session) {
            session.endTime = new Date().toISOString();
            const sessions = JSON.parse(localStorage.getItem('session_history') || '[]');
            sessions.push(session);
            localStorage.setItem('session_history', JSON.stringify(sessions));
        }
        localStorage.removeItem('current_session');
    },
    
    isExpired: function() {
        const session = this.getCurrent();
        if (!session) return true;
        
        const lastActivity = new Date(session.lastActivity);
        const now = new Date();
        const diff = now - lastActivity;
        
        return diff > CONFIG.SETTINGS.SESSION_TIMEOUT;
    }
};

// Exporter pour usage global
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
    window.UTILS = UTILS;
    window.ERROR_HANDLER = ERROR_HANDLER;
    window.SESSION_MANAGER = SESSION_MANAGER;
}

// Exporter pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        UTILS,
        ERROR_HANDLER,
        SESSION_MANAGER
    };
}
