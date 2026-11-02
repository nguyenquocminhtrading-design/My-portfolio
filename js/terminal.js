/* terminal.js — Interactive Pipeline Simulation (Transparent & Evidence-Driven) */

const Terminal = {
  container: null,
  bodyEl: null,
  summaryEl: null,
  isExecuting: false,

  COMMANDS: {
    'cashew-ocr': {
      cmd: 'python main.py --period 2026-10 --dry-run-preview',
      label: 'Cashew Trade OCR Pipeline',
      summary: '<strong>Under the hood (Real Logic):</strong> Uses Playwright to monitor the Vietnam Customs (TCHQ) portal, downloads 4 PDF report types across 3 versions (SB/DC/CT), parses raw tables using pdfplumber + PaddleOCR, applies mathematical inverse formulas to reconstruct missing periods from M+1, and cross-reconciles against a 757-record Vinacas master dataset.',
      logs: [
        { text: '[SIMULATED DRY-RUN] Initializing headless Playwright worker...', delay: 150, cls: 'log-info' },
        { text: '[INGESTION] Scraping TCHQ publication table (Reports: 2X, 5X, 2N, 5N)', delay: 300, cls: 'log-info' },
        { text: '[DOCUMENT] Detected 4 PDF assets across Preliminary / Adjusted / Official versions', delay: 250, cls: 'log-cyan' },
        { text: '[OCR ENGINE] pdfplumber extracted tabular cells; PaddleOCR validated low-DPI headers', delay: 350, cls: 'log-purple' },
        { text: '[FALLBACK LOGIC] Reconstructed month M values via inverse delta formula from M+1 YoY', delay: 400, cls: 'log-warn' },
        { text: '[VALIDATION] Reconciled against Vincass/Vinacas.xlsx (757 records matched)', delay: 300, cls: 'log-info' },
        { text: '[ARTIFACT OUTPUT] Generated Master 8-sheet workbook: output/2026/2026-10_cashew.xlsx', delay: 300, cls: 'log-cyan' },
        { text: '✔ SIMULATION FINISHED: Ready for pipeline ingestion (Dry-run OK)', delay: 200, cls: 'log-success' }
      ]
    },
    'fund-risk': {
      cmd: 'python analyze_portfolio.py --fund DCDS --simulations 100000 --device auto',
      label: 'Fund NAV & Monte Carlo Model',
      summary: '<strong>Under the hood (Real Logic):</strong> Headless Selenium navigates Dragon Capital LWC dynamic portal, extracts NAV time-series across 2,000+ monthly Excel files using ProcessPoolExecutor, computes Sharpe/Sortino/Drawdown with pandas, and executes 100,000 geometric Brownian motion paths accelerated by PyTorch CUDA (with CPU fallback).',
      logs: [
        { text: '[SIMULATED DRY-RUN] Detecting compute accelerator (CUDA / CPU fallback)...', delay: 150, cls: 'log-info' },
        { text: '[ETL PIPELINE] Normalizing 2,000+ monthly Excel reports across 5 Dragon Capital funds', delay: 350, cls: 'log-info' },
        { text: '[PARALLEL] ProcessPoolExecutor parsed multi-sheet NAV files into unified pandas matrix', delay: 350, cls: 'log-cyan' },
        { text: '[QUANT METRICS] Computed rolling Sharpe (1.48), Sortino (1.82), Max Drawdown (-14.2%)', delay: 300, cls: 'log-purple' },
        { text: '[MONTE CARLO] Generating 100,000 stochastic price trajectories over 252 trading days', delay: 450, cls: 'log-warn' },
        { text: '[ARTIFACT OUTPUT] Serialized time-series to data/master_nav.parquet & metrics_summary.xlsx', delay: 300, cls: 'log-cyan' },
        { text: '✔ SIMULATION FINISHED: Probabilistic risk envelope evaluated (Dry-run OK)', delay: 200, cls: 'log-success' }
      ]
    },
    'token-health': {
      cmd: 'node backend/lib/sync.js --audit-tokens --graceful-fallback',
      label: 'Self-Healing Token Engine',
      summary: '<strong>Under the hood (Real Logic):</strong> Connects to Meta Graph API, exchanges short-lived user tokens for permanent 60-day/unlimited Page Access Tokens, sets up a node-cron 15-minute background polling worker, and utilizes an in-memory cache to guarantee zero dashboard blackouts if a third-party token revokes.',
      logs: [
        { text: '[SIMULATED DRY-RUN] Auditing Meta Graph API v19 OAuth session state...', delay: 150, cls: 'log-info' },
        { text: '[TOKEN EXCHANGE] Successfully converted short-lived token to Permanent Page Access Token', delay: 300, cls: 'log-success' },
        { text: '[SCHEDULER] node-cron 15-minute polling worker initialized with jitter protection', delay: 250, cls: 'log-cyan' },
        { text: '[FAIL-SAFE] Graceful degradation layer active: historical cache preserved if API 401 occurs', delay: 350, cls: 'log-info' },
        { text: '[VIRAL ALGORITHM] Scored 142 recent posts across reach velocity & engagement rate', delay: 350, cls: 'log-purple' },
        { text: '[ARTIFACT OUTPUT] Synced state to PostgreSQL table `asset_metrics` (Render Cloud deploy)', delay: 300, cls: 'log-cyan' },
        { text: '✔ SIMULATION FINISHED: Resilient OAuth synchronization flow verified (Dry-run OK)', delay: 200, cls: 'log-success' }
      ]
    }
  },

  init() {
    this.container = document.getElementById('recruiter-terminal');
    if (!this.container) return;
    this.bodyEl = this.container.querySelector('.terminal-body');
    this.summaryEl = document.getElementById('terminal-plain-summary');

    // Attach click listeners to chips
    this.container.querySelectorAll('.terminal-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.cmd;
        this.runCommand(key);
      });
    });

    // Auto-run first command with a gentle delay
    setTimeout(() => {
      this.runCommand('cashew-ocr');
    }, 600);
  },

  async runCommand(key) {
    if (this.isExecuting || !this.COMMANDS[key]) return;
    this.isExecuting = true;

    // Highlight active chip
    this.container.querySelectorAll('.terminal-chip-btn').forEach(btn => {
      btn.style.opacity = btn.dataset.cmd === key ? '1' : '0.65';
      btn.style.borderColor = btn.dataset.cmd === key ? 'var(--color-accent)' : '';
    });

    const { cmd, logs, summary } = this.COMMANDS[key];
    if (this.bodyEl) {
      this.bodyEl.innerHTML = '';
      
      // Print command prompt
      const promptLine = document.createElement('div');
      promptLine.innerHTML = `<span class="log-prompt">minh@workstation:~$</span> <span class="log-cmd">${cmd}</span>`;
      this.bodyEl.appendChild(promptLine);

      // Print logs one by one
      for (const log of logs) {
        await new Promise(r => setTimeout(r, log.delay));
        const line = document.createElement('div');
        line.className = log.cls;
        line.textContent = log.text;
        this.bodyEl.appendChild(line);
        this.bodyEl.scrollTop = this.bodyEl.scrollHeight;
      }
    }

    // Update plain-English summary below terminal
    if (this.summaryEl) {
      this.summaryEl.innerHTML = summary;
    }

    this.isExecuting = false;
  }
};

window.Terminal = Terminal;
