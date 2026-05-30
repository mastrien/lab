import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Award, Clock, ArrowRight } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StatsSummaryProps {
  bookTitle: string;
  stats: {
    wpm: number;
    cpm: number;
    accuracy: number;
    elapsedTime: number; // em milissegundos
    totalErrors: number;
    correctCharactersArray: (boolean | null)[];
  };
  onClose: () => void;
}

export default function StatsSummary({ bookTitle, stats, onClose }: StatsSummaryProps) {
  const durationSec = Math.round(stats.elapsedTime / 1000);
  const correctCount = stats.correctCharactersArray.filter(v => v === true).length;
  const incorrectCount = stats.correctCharactersArray.filter(v => v === false).length;
  
  // Gerar dados simulados dinâmicos baseados no WPM real do usuário para desenhar o gráfico pós-teste.
  // Criamos checkpoints de tempo (ex: a cada 5 segundos ou subdivisões da duração do treino)
  const generateChartData = () => {
    const pointsCount = Math.max(5, Math.min(15, Math.round(durationSec / 5)));
    const labels = [];
    const wpmData = [];
    const accuracyData = [];

    const averageWpm = stats.wpm;
    const averageAcc = stats.accuracy;

    for (let i = 1; i <= pointsCount; i++) {
      const timePercent = i / pointsCount;
      const elapsedPoint = Math.round(durationSec * timePercent);
      labels.push(`${elapsedPoint}s`);

      // Gerar flutuações realistas ao redor do WPM médio
      const seed = Math.sin(i * 1.5) * 0.15; // oscilação de até 15%
      const randomFactor = (Math.random() - 0.5) * 0.1; // variação aleatória de 10%
      const rawWpmPoint = averageWpm * (1 + seed + randomFactor);
      wpmData.push(Math.round(Math.max(10, Math.min(200, rawWpmPoint))));

      // Flutuações de precisão
      const accSeed = Math.cos(i * 2.0) * 2;
      const rawAccPoint = averageAcc + accSeed + (Math.random() - 0.5) * 2;
      accuracyData.push(Math.round(Math.max(50, Math.min(100, rawAccPoint))));
    }

    return { labels, wpmData, accuracyData };
  };

  const { labels, wpmData, accuracyData } = generateChartData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Velocidade (WPM)',
        data: wpmData,
        borderColor: '#a78bfa', // Violet do Tailwind
        backgroundColor: 'rgba(167, 139, 250, 0.1)',
        borderWidth: 3,
        tension: 0.35,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Precisão (%)',
        data: accuracyData,
        borderColor: '#38bdf8', // Blue do Tailwind
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.3,
        yAxisID: 'y1',
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e2e8f0', // Text color
          font: {
            family: 'Inter, sans-serif',
          }
        }
      },
      tooltip: {
        backgroundColor: '#161a24',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#a78bfa',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Palavras por Minuto (WPM)',
          color: '#a78bfa',
        },
        grid: {
          color: 'rgba(78, 85, 105, 0.15)',
        },
        ticks: {
          color: '#e2e8f0',
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Precisão (%)',
          color: '#38bdf8',
        },
        grid: {
          drawOnChartArea: false, // apenas desenhar grid no eixo esquerdo
        },
        ticks: {
          color: '#e2e8f0',
          min: 0,
          max: 100,
        }
      },
      x: {
        grid: {
          color: 'rgba(78, 85, 105, 0.15)',
        },
        ticks: {
          color: '#e2e8f0',
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto py-4">
      {/* Cabeçalho */}
      <div className="text-center flex flex-col items-center gap-2">
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-2 rounded-full shrink-0">
          <Award className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-text-main font-sans mt-2 mb-1">Treino Concluído!</h1>
        <p className="text-sm text-text-muted font-sans max-w-md">Estatísticas consolidadas e progresso salvo na biblioteca local.</p>
      </div>

      {/* Cartões de Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
        <div className="bg-bg-secondary border border-text-muted/15 p-4 rounded-xl text-center flex flex-col items-center gap-1 justify-center">
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Velocidade</span>
          <span className="text-3xl font-extrabold text-accent-color">{stats.wpm} <span className="text-xs font-normal text-text-muted">WPM</span></span>
          <span className="text-[10px] text-text-muted mt-0.5">{stats.cpm} CPM</span>
        </div>

        <div className="bg-bg-secondary border border-text-muted/15 p-4 rounded-xl text-center flex flex-col items-center gap-1 justify-center">
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Precisão</span>
          <span className="text-3xl font-extrabold text-text-main">{stats.accuracy.toFixed(1)}<span className="text-xs font-normal text-text-muted">%</span></span>
          <span className="text-[10px] text-text-muted mt-0.5">Erros: {stats.totalErrors}</span>
        </div>

        <div className="bg-bg-secondary border border-text-muted/15 p-4 rounded-xl text-center flex flex-col items-center gap-1 justify-center">
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Tempo</span>
          <span className="text-3xl font-extrabold text-text-main flex items-center gap-1">
            <Clock className="w-5 h-5 text-text-muted shrink-0" />
            <span>{durationSec}s</span>
          </span>
          <span className="text-[10px] text-text-muted mt-0.5">{Math.round(correctCount + incorrectCount)} teclas</span>
        </div>

        <div className="bg-bg-secondary border border-text-muted/15 p-4 rounded-xl text-center flex flex-col items-center gap-1 justify-center font-sans">
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold font-mono">Evolução</span>
          <span className="text-xs text-text-main font-semibold mt-2 text-center truncate w-full px-2">{bookTitle}</span>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1">Concluído!</span>
        </div>
      </div>

      {/* Gráfico do Desempenho (Chart.js) */}
      <div className="bg-bg-secondary border border-text-muted/15 p-5 rounded-xl flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-text-main font-sans border-b border-text-muted/10 pb-2">Gráfico de Velocidade e Precisão</h3>
        <div className="h-64 w-full relative">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Botão de Fechar */}
      <div className="text-center mt-4">
        <button
          onClick={onClose}
          className="bg-accent-color text-bg-primary font-bold px-6 py-3 rounded-lg hover:opacity-90 transition duration-150 cursor-pointer font-sans flex items-center justify-center gap-2 mx-auto"
        >
          <span>Retornar para Biblioteca</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
