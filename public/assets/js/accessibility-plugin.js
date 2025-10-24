// Plugin de Acessibilidade
class AccessibilityPlugin {
    constructor() {
        this.isHighContrast = false;
        this.fontSize = 100; // porcentagem
        this.isReading = false;

        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        
        this.init();
    }
    
    init() {
        this.createAccessibilityPanel();
        this.loadSettings();
        this.setupEventListeners();
    }
    
    createAccessibilityPanel() {
        // Criar o painel de acessibilidade
        const panel = document.createElement('div');
        panel.id = 'accessibility-panel';
        panel.className = 'accessibility-panel';
        
        panel.innerHTML = `
            <div class="accessibility-toggle" id="accessibility-toggle">
                <span><img src="/assets/img/acessibilidade.png" class="icon-aces"></span>
            </div>
            <div class="accessibility-content" id="accessibility-content">
                <h3>Ferramentas de Acessibilidade</h3>
                
                <div class="accessibility-group">
                    <h4>Fonte</h4>
                    <button id="increase-font" class="accessibility-btn">A+</button>
                    <button id="decrease-font" class="accessibility-btn">A-</button>
                    <button id="reset-font" class="accessibility-btn">Reset</button>
                </div>
                
                <div class="accessibility-group">
                    <h4>Contraste</h4>
                    <button id="toggle-contrast" class="accessibility-btn">Alto Contraste</button>
                </div>
                
                <div class="accessibility-group">
                    <h4>Leitura</h4>
                    <button id="toggle-reading" class="accessibility-btn">Ler Página</button>
                    <button id="stop-reading" class="accessibility-btn">Parar Leitura</button>
                </div>
                
                <div class="accessibility-group">
                    <button id="reset-all" class="accessibility-btn reset-btn">Resetar Tudo</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
    }
    
    setupEventListeners() {
        // Toggle do painel
        document.getElementById('accessibility-toggle').addEventListener('click', () => {
            this.togglePanel();
        });
        
        // Controles de fonte
        document.getElementById('increase-font').addEventListener('click', () => {
            this.increaseFontSize();
        });
        
        document.getElementById('decrease-font').addEventListener('click', () => {
            this.decreaseFontSize();
        });
        
        document.getElementById('reset-font').addEventListener('click', () => {
            this.resetFontSize();
        });
        
        // Contraste
        document.getElementById('toggle-contrast').addEventListener('click', () => {
            this.toggleHighContrast();
        });
        
        // Leitura
        document.getElementById('toggle-reading').addEventListener('click', () => {
            this.toggleReading();
        });
        
        document.getElementById('stop-reading').addEventListener('click', () => {
            this.stopReading();
        });
        
        // Reset
        document.getElementById('reset-all').addEventListener('click', () => {
            this.resetAll();
        });
        
        // Evento para leitura de texto ao clicar
        document.addEventListener('click', (e) => {
            const isAccessibilityFeatureActive = this.isReading;
            const isInteractiveElement = e.target.tagName === 'A' || e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON';
            const isPluginControl = e.target.closest('#accessibility-panel');

            if (isAccessibilityFeatureActive && !isPluginControl) {
                if (isInteractiveElement) e.preventDefault();
                if (this.isReading) {
                    this.readElement(e.target);
                }
            }
        });
    }
    
    togglePanel() {
        const content = document.getElementById('accessibility-content');
        content.classList.toggle('show');
    }
    
    increaseFontSize() {
        if (this.fontSize < 150) {
            this.fontSize += 10;
            this.applyFontSize();
            this.saveSettings();
        }
    }
    
    decreaseFontSize() {
        if (this.fontSize > 80) {
            this.fontSize -= 10;
            this.applyFontSize();
            this.saveSettings();
        }
    }
    
    resetFontSize() {
        this.fontSize = 100;
        this.applyFontSize();
        this.saveSettings();
    }
    
    applyFontSize() {
        document.documentElement.style.fontSize = this.fontSize + '%';
    }
    
    toggleHighContrast() {
        this.isHighContrast = !this.isHighContrast;
        
        if (this.isHighContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        
        this.saveSettings();
    }
    
    toggleReading() {
        this.isReading = !this.isReading;
        const btn = document.getElementById('toggle-reading');
        
        if (this.isReading) {
            btn.textContent = 'Modo Leitura ON';
            btn.classList.add('active');
            this.showMessage('Clique em qualquer texto para ouvir');
        } else {
            btn.textContent = 'Ler Página';
            btn.classList.remove('active');
            this.stopReading();
        }
        
        this.saveSettings();
    }
    
    readElement(element) {
        let textToRead = '';
        
        if (element.alt) {
            textToRead = element.alt;
        } else if (element.title) {
            textToRead = element.title;
        } else if (element.textContent) {
            textToRead = element.textContent.trim();
        }
        
        if (textToRead) {
            this.speak(textToRead);
        }
    }
    
    speak(text) {
        this.speechSynthesis.cancel();
        
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.lang = 'pt-BR';
        this.currentUtterance.rate = 0.8;
        this.currentUtterance.pitch = 1;
        
        this.speechSynthesis.speak(this.currentUtterance);
    }
    
    stopReading() {
        this.speechSynthesis.cancel();
        const btn = document.getElementById('toggle-reading');
        if (btn) {
            btn.textContent = 'Ler Página';
            btn.classList.remove('active');
        }
        this.isReading = false;
    }
    
    showMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'accessibility-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    resetAll() {
        this.fontSize = 100;
        this.isHighContrast = false;
        this.isReading = false;

        this.applyFontSize();
        document.body.classList.remove('high-contrast');
        this.stopReading();
        
        const readingBtn = document.getElementById('toggle-reading');
        if (readingBtn) {
            readingBtn.classList.remove('active');
            readingBtn.textContent = 'Ler Página';
        }

        // Checagem segura para toggle-libras (caso exista futuramente)
        const librasBtn = document.getElementById('toggle-libras');
        if (librasBtn) librasBtn.classList.remove('active');
        
        this.saveSettings();
        this.showMessage('Configurações resetadas');
    }
    
    saveSettings() {
        const settings = {
            fontSize: this.fontSize,
            isHighContrast: this.isHighContrast,
            isReading: this.isReading,
        };
        
        localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            
            this.fontSize = settings.fontSize || 100;
            this.isHighContrast = settings.isHighContrast || false;
            this.isReading = settings.isReading || false;

            this.applyFontSize();
            
            if (this.isHighContrast) {
                document.body.classList.add('high-contrast');
            }
            
            if (this.isReading) {
                const btn = document.getElementById('toggle-reading');
                btn.textContent = 'Modo Leitura ON';
                btn.classList.add('active');
            }
        }
    }
}

// Inicializar o plugin quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityPlugin = new AccessibilityPlugin();
});
