/**
 * DocToTex - Application Main Orchestrator
 * Adheres to Clean Code principles and SRP.
 */
class App {
    constructor() {
        this.parsedDocument = null;
        this.generatedLatexData = null;
        this.currentActiveFileTab = 'cls';
        this.previewRenderer = null;
        this.parser = new window.DocxParser();
        
        // Cache DOM elements
        this.elements = {
            docxInput: document.getElementById('docx-file-input'),
            browseBtn: document.getElementById('browse-btn'),
            uploadCard: document.getElementById('upload-card'),
            loadingOverlay: document.getElementById('loading-overlay'),
            workspaceGrid: document.getElementById('workspace-grid'),
            configPanel: document.getElementById('config-panel'),
            previewPanel: document.getElementById('preview-panel'),
            
            // Config options
            compilerSelect: document.getElementById('compiler-select'),
            formatSelect: document.getElementById('format-select'),
            fontSelect: document.getElementById('font-select'),
            citationsSelect: document.getElementById('citations-select'),
            citationStyleGroup: document.getElementById('citation-style-group'),
            citationStyleSelect: document.getElementById('citation-style-select'),
            toggleHyperref: document.getElementById('toggle-hyperref'),
            toggleBooktabs: document.getElementById('toggle-booktabs'),
            toggleGraphicx: document.getElementById('toggle-graphicx'),
            
            // View tabs
            tabLayout: document.getElementById('tab-layout'),
            tabCode: document.getElementById('tab-code'),
            layoutViewport: document.getElementById('layout-viewport'),
            codeViewportContainer: document.getElementById('code-viewport-container'),
            paperSheet: document.getElementById('paper-sheet'),
            
            // Code file tab selectors
            fileTabCls: document.getElementById('file-tab-cls'),
            fileTabTex: document.getElementById('file-tab-tex'),
            fileTabBib: document.getElementById('file-tab-bib'),
            
            // Code preview block viewports
            codeClsViewport: document.getElementById('code-cls-viewport'),
            codeTexViewport: document.getElementById('code-tex-viewport'),
            codeBibViewport: document.getElementById('code-bib-viewport'),
            codeClsBlock: document.getElementById('code-cls-block'),
            codeTexBlock: document.getElementById('code-tex-block'),
            codeBibBlock: document.getElementById('code-bib-block'),
            
            // Trigger Actions
            copyBtn: document.getElementById('copy-btn'),
            downloadBtn: document.getElementById('download-btn')
        };
    }

    /**
     * Initializes the application components.
     */
    init() {
        this.previewRenderer = new window.PreviewRenderer(
            this.elements.paperSheet,
            {
                cls: this.elements.codeClsBlock,
                tex: this.elements.codeTexBlock,
                bib: this.elements.codeBibBlock
            }
        );

        this.setupEventListeners();
    }

    // ==========================================================
    // Event Subscriptions
    // ==========================================================

    setupEventListeners() {
        this.elements.browseBtn.addEventListener('click', () => this.elements.docxInput.click());
        this.elements.docxInput.addEventListener('change', () => this.handleFileSelect());

        this.setupDragAndDrop();
        this.setupConfigChangeTriggers();
        
        // Navigation View Mode Tabs
        this.elements.tabLayout.addEventListener('click', () => this.setViewMode('layout'));
        this.elements.tabCode.addEventListener('click', () => this.setViewMode('code'));

        // Code File Select Tabs
        document.querySelectorAll('.file-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const fileType = tab.getAttribute('data-file');
                this.selectFileTab(fileType);
            });
        });

        this.elements.copyBtn.addEventListener('click', () => this.handleCopyCode());
        this.elements.downloadBtn.addEventListener('click', () => this.handleDownloadZip());
    }

    setupDragAndDrop() {
        this.elements.uploadCard.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.elements.uploadCard.classList.add('dragover');
        });

        this.elements.uploadCard.addEventListener('dragleave', () => {
            this.elements.uploadCard.classList.remove('dragover');
        });

        this.elements.uploadCard.addEventListener('drop', (e) => {
            e.preventDefault();
            this.elements.uploadCard.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                this.elements.docxInput.files = e.dataTransfer.files;
                this.handleFileSelect();
            }
        });
    }

    setupConfigChangeTriggers() {
        const controls = [
            this.elements.compilerSelect,
            this.elements.formatSelect,
            this.elements.fontSelect,
            this.elements.citationsSelect,
            this.elements.citationStyleSelect,
            this.elements.toggleHyperref,
            this.elements.toggleBooktabs,
            this.elements.toggleGraphicx
        ];

        controls.forEach(ctrl => {
            ctrl.addEventListener('change', () => this.handleConfigChange());
        });
    }

    // ==========================================================
    // State / Lifecycle Handlers
    // ==========================================================

    handleFileSelect() {
        const file = this.elements.docxInput.files[0];
        if (!file) return;

        this.elements.uploadCard.style.display = 'none';
        this.elements.loadingOverlay.style.display = 'flex';
        this.setLoadingStatus('Extraindo contêiner ZIP...', 'Descompactando arquivos XML do Word...');

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target.result;
                
                this.setLoadingStatus('Analisando documento...', 'Mapeando estilos, margens e tabelas...');
                this.parsedDocument = await this.parser.parse(arrayBuffer);

                this.setLoadingStatus('Gerando LaTeX...', 'Formatando arquivos de estilo e código...');
                this.showWorkspace();
                this.updateOutput();
            } catch (error) {
                console.error(error);
                alert('Erro ao processar o arquivo. Certifique-se de que é um documento .docx válido.');
                this.resetInterface();
            }
        };
        reader.readAsArrayBuffer(file);
    }

    setLoadingStatus(title, subtitle) {
        document.getElementById('loading-status').innerText = title;
        document.getElementById('loading-subtext').innerText = subtitle;
    }

    showWorkspace() {
        this.elements.loadingOverlay.style.display = 'none';
        this.elements.workspaceGrid.classList.add('parsed');
        this.elements.configPanel.style.display = 'flex';
        this.elements.previewPanel.style.display = 'flex';
    }

    resetInterface() {
        this.parsedDocument = null;
        this.generatedLatexData = null;
        this.elements.uploadCard.style.display = 'flex';
        this.elements.loadingOverlay.style.display = 'none';
        this.elements.workspaceGrid.classList.remove('parsed');
        this.elements.configPanel.style.display = 'none';
        this.elements.previewPanel.style.display = 'none';
    }

    handleConfigChange() {
        this.updateCitationPanelVisibility();
        this.updateFileTabsVisibility();
        this.updateOutput();
    }

    updateCitationPanelVisibility() {
        if (this.elements.citationsSelect.value !== 'none') {
            this.elements.citationStyleGroup.style.display = 'flex';
            if (this.generatedLatexData) this.elements.fileTabBib.style.display = 'block';
        } else {
            this.elements.citationStyleGroup.style.display = 'none';
            this.elements.fileTabBib.style.display = 'none';
            if (this.currentActiveFileTab === 'bib') this.selectFileTab('tex');
        }
    }

    updateFileTabsVisibility() {
        if (this.elements.formatSelect.value === 'preamble') {
            this.elements.fileTabCls.style.display = 'none';
            if (this.currentActiveFileTab === 'cls') this.selectFileTab('tex');
        } else {
            this.elements.fileTabCls.style.display = 'block';
        }
    }

    // ==========================================================
    // UI Helpers & Orchestration Updates
    // ==========================================================

    getOptions() {
        return {
            compiler: this.elements.compilerSelect.value,
            classFormat: this.elements.formatSelect.value,
            citations: this.elements.citationsSelect.value,
            citationStyle: this.elements.citationStyleSelect.value,
            fontOverride: this.elements.fontSelect.value,
            includeHyperref: this.elements.toggleHyperref.checked,
            includeBooktabs: this.elements.toggleBooktabs.checked,
            includeGraphics: this.elements.toggleGraphicx.checked
        };
    }

    updateOutput() {
        if (!this.parsedDocument) return;

        const options = this.getOptions();

        // 1. Generate latex text configuration
        const generator = new window.LatexGenerator(this.parsedDocument, options);
        this.generatedLatexData = generator.generate();

        // 2. Render code highlighted blocks
        this.previewRenderer.renderCode(this.generatedLatexData);
        this.elements.fileTabBib.style.display = (options.citations !== 'none') ? 'block' : 'none';

        // 3. Render HTML mockup layout preview page
        this.previewRenderer.renderLayout(this.parsedDocument, options.fontOverride);
    }

    setViewMode(mode) {
        if (mode === 'layout') {
            this.elements.tabLayout.classList.add('active');
            this.elements.tabCode.classList.remove('active');
            this.elements.layoutViewport.classList.add('active');
            this.elements.codeViewportContainer.style.display = 'none';
        } else {
            this.elements.tabCode.classList.add('active');
            this.elements.tabLayout.classList.remove('active');
            this.elements.layoutViewport.classList.remove('active');
            this.elements.codeViewportContainer.style.display = 'flex';
        }
    }

    selectFileTab(fileKey) {
        this.currentActiveFileTab = fileKey;
        
        this.elements.fileTabCls.classList.remove('active');
        this.elements.fileTabTex.classList.remove('active');
        this.elements.fileTabBib.classList.remove('active');
        
        this.elements.codeClsViewport.classList.remove('active');
        this.elements.codeTexViewport.classList.remove('active');
        this.elements.codeBibViewport.classList.remove('active');

        if (fileKey === 'cls') {
            this.elements.fileTabCls.classList.add('active');
            this.elements.codeClsViewport.classList.add('active');
        } else if (fileKey === 'tex') {
            this.elements.fileTabTex.classList.add('active');
            this.elements.codeTexViewport.classList.add('active');
        } else if (fileKey === 'bib') {
            this.elements.fileTabBib.classList.add('active');
            this.elements.codeBibViewport.classList.add('active');
        }
    }

    // ==========================================================
    // Action Triggers copy & download
    // ==========================================================

    handleCopyCode() {
        if (!this.generatedLatexData) return;

        const textToCopy = this.getTextForActiveTab();
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.showCopyFeedback();
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    getTextForActiveTab() {
        if (this.currentActiveFileTab === 'cls') return this.generatedLatexData.cls;
        if (this.currentActiveFileTab === 'tex') return this.generatedLatexData.tex;
        return this.generatedLatexData.bib;
    }

    showCopyFeedback() {
        const originalText = this.elements.copyBtn.innerHTML;
        this.elements.copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Copiado!
        `;
        setTimeout(() => {
            this.elements.copyBtn.innerHTML = originalText;
        }, 2000);
    }

    async handleDownloadZip() {
        if (!this.parsedDocument || !this.generatedLatexData) return;

        const originalBtnHTML = this.elements.downloadBtn.innerHTML;
        this.elements.downloadBtn.disabled = true;
        this.elements.downloadBtn.innerHTML = 'Compactando...';

        try {
            const options = {
                classFormat: this.elements.formatSelect.value,
                citations: this.elements.citationsSelect.value
            };
            
            await window.ZipPackager.download(this.parsedDocument, this.generatedLatexData, options);
        } catch (err) {
            console.error('ZIP compilation failed: ', err);
            alert('Erro ao compactar arquivos.');
        } finally {
            this.elements.downloadBtn.disabled = false;
            this.elements.downloadBtn.innerHTML = originalBtnHTML;
        }
    }
}

window.App = App;

// Instantiate and start app on page load
window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
    window.appInstance = app;
});
