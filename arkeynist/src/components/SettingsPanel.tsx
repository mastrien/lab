import { Settings, Eye, Keyboard, Type } from 'lucide-react';

export interface UserSettings {
  theme: string;
  caseSensitive: boolean;
  punctuationSensitive: boolean;
  accentSensitive: boolean;
  fontSize: string;
  displayMode: 'autoscroll' | 'paginated';
  fontFamily: 'sans' | 'mono';
  chunkSize: number;
}

interface SettingsPanelProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
}

export default function SettingsPanel({ settings, onUpdateSettings }: SettingsPanelProps) {
  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    onUpdateSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="bg-bg-secondary border border-text-muted/20 p-6 rounded-xl flex flex-col gap-6">
      <div className="flex items-center gap-2 border-b border-text-muted/10 pb-3">
        <Settings className="w-5 h-5 text-accent-color" />
        <h2 className="text-xl font-bold text-text-main font-sans">Configurações Gerais</h2>
      </div>

      <div className="flex flex-col gap-5">
        {/* 1. Escolha de Temas */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-text-muted uppercase tracking-wider font-semibold font-mono flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-accent-color" />
            <span>Tema Visual</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'dark-slate', label: 'Dark Slate (Padrão)', desc: 'Slate escuro com Violeta' },
              { id: 'dark-focado', label: 'Dark Focado', desc: 'Fundo preto com Verde Esmeralda' },
              { id: 'light-suave', label: 'Light Suave', desc: 'Papel amarelado acolhedor' },
              { id: 'cinza-tecnico', label: 'Cinza Técnico', desc: 'Estilo editor de código' },
            ].map((themeOpt) => (
              <button
                key={themeOpt.id}
                onClick={() => updateSetting('theme', themeOpt.id)}
                className={`text-left p-3 rounded-lg border text-sm transition duration-150 cursor-pointer ${
                  settings.theme === themeOpt.id
                    ? 'border-accent-color bg-bg-primary text-text-main font-semibold shadow-md'
                    : 'border-text-muted/10 hover:border-text-muted/30 bg-bg-primary/45 text-text-muted hover:text-text-main'
                }`}
              >
                <div className="font-sans text-sm">{themeOpt.label}</div>
                <div className="text-[10px] text-text-muted/80 mt-0.5 font-sans">{themeOpt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Visualização do Texto */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-text-muted uppercase tracking-wider font-semibold font-mono flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-accent-color" />
            <span>Estilo de Visualização</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => updateSetting('displayMode', 'autoscroll')}
              className={`p-3 rounded-lg border text-sm font-sans text-center transition duration-150 cursor-pointer ${
                settings.displayMode === 'autoscroll'
                  ? 'border-accent-color bg-bg-primary text-text-main font-semibold'
                  : 'border-text-muted/10 hover:border-text-muted/30 bg-bg-primary/45 text-text-muted hover:text-text-main'
              }`}
            >
              Autoscroll (Linha Única)
            </button>
            <button
              onClick={() => updateSetting('displayMode', 'paginated')}
              className={`p-3 rounded-lg border text-sm font-sans text-center transition duration-150 cursor-pointer ${
                settings.displayMode === 'paginated'
                  ? 'border-accent-color bg-bg-primary text-text-main font-semibold'
                  : 'border-text-muted/10 hover:border-text-muted/30 bg-bg-primary/45 text-text-muted hover:text-text-main'
              }`}
            >
              Página (Parágrafos)
            </button>
          </div>
        </div>

        {/* 2.5 Chunk Size (Desempenho) */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-text-muted uppercase tracking-wider font-semibold font-mono">Tamanho dos chunks/blocos</label>
          <select
            value={settings.chunkSize || 200}
            onChange={(e) => updateSetting('chunkSize', parseInt(e.target.value))}
            className="bg-bg-primary border border-text-muted/20 rounded-lg p-2 text-sm text-text-main focus:outline-none focus:border-accent-color transition duration-150 font-sans cursor-pointer"
          >
            <option value="100">100 (Muito Baixo - Otimizado)</option>
            <option value="200">200 (Baixo - Padrão)</option>
            <option value="400">400 (Médio)</option>
            <option value="800">800 (Alto)</option>
          </select>
        </div>

        {/* 3. Tipografia e Tamanho */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-text-muted uppercase tracking-wider font-semibold font-mono">Fonte</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => updateSetting('fontFamily', e.target.value as 'sans' | 'mono')}
              className="bg-bg-primary border border-text-muted/20 rounded-lg p-2 text-sm text-text-main focus:outline-none focus:border-accent-color transition duration-150 font-sans cursor-pointer"
            >
              <option value="sans">Proporcional (Inter / Sans)</option>
              <option value="mono">Monoespaçada (JetBrains / Code)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-text-muted uppercase tracking-wider font-semibold font-mono">Tamanho da Fonte</label>
            <select
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', e.target.value)}
              className="bg-bg-primary border border-text-muted/20 rounded-lg p-2 text-sm text-text-main focus:outline-none focus:border-accent-color transition duration-150 font-sans cursor-pointer"
            >
              <option value="text-sm">Pequeno (14px)</option>
              <option value="text-base">Médio (16px)</option>
              <option value="text-lg">Confortável (18px)</option>
              <option value="text-xl">Grande (20px)</option>
              <option value="text-2xl">Muito Grande (24px)</option>
            </select>
          </div>
        </div>

        {/* 4. Validação e Rigor */}
        <div className="flex flex-col gap-2 border-t border-text-muted/10 pt-4">
          <label className="text-xs text-text-muted uppercase tracking-wider font-semibold font-mono flex items-center gap-1.5">
            <Keyboard className="w-3.5 h-3.5 text-accent-color" />
            <span>Validação e Rigor</span>
          </label>
          <div className="flex flex-col gap-2.5 mt-1 font-sans">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.caseSensitive}
                onChange={(e) => updateSetting('caseSensitive', e.target.checked)}
                className="w-4 h-4 rounded accent-accent-color cursor-pointer bg-bg-primary border-text-muted/20"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-main">Sensível a Maiúsculas/Minúsculas</span>
                <span className="text-xs text-text-muted">Se ativo, letras maiúsculas devem ser digitadas exatamente com Shift</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.punctuationSensitive}
                onChange={(e) => updateSetting('punctuationSensitive', e.target.checked)}
                className="w-4 h-4 rounded accent-accent-color cursor-pointer bg-bg-primary border-text-muted/20"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-main">Sensível à Pontuação/Sinais</span>
                <span className="text-xs text-text-muted">Se desativado, o motor valida automaticamente qualquer caractere de pontuação especial</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={settings.accentSensitive}
                onChange={(e) => updateSetting('accentSensitive', e.target.checked)}
                className="w-4 h-4 rounded accent-accent-color cursor-pointer bg-bg-primary border-text-muted/20"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-main">Sensível a Acentos</span>
                <span className="text-xs text-text-muted">Se desativado, permite digitar sem se preocupar com acentuação (ex: 'a' valida 'á')</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
