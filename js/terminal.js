/* terminal.js — Interactive Recruiter CLI Simulation */

const Terminal = {
  container: null,
  bodyEl: null,
  isExecuting: false,

  COMMANDS: {
    'cashew-ocr': {
      cmd: 'run cashew-ocr --period 2026-10 --source tchq',
      logs: [
        { text: '[INIT] Initializing Headless Playwright worker...', delay: 150, cls: 'log-info' },
        { text: '[SCRAPER] Navigating to https://www.customs.gov.vn/statistic ...', delay: 350, cls: 'log-info' },
        { text: '[SCRAPER] Target located: Cashew Export Reports (2X, 5X, 2N, 5N)', delay: 250, cls: 'log-cyan' },
        { text: '[INGEST] Downloaded 4 PDF assets (VN-SB, VN-DC, VN-CT)', delay: 300, cls: 'log-info' },
        { text: '[OCR] Multi-engine extraction: pdfplumber + PaddleOCR initialized', delay: 400, cls: 'log-purple' },
        { text: '[FALLBACK] Mathematical inverse growth applied: derived period 2026-09 via M+1 delta', delay: 450, cls: 'log-warn' },
        { text: '[RECON] Cross-checking 757 records against Vinacas Master Dataset...', delay: 350, cls: 'log-info' },
        { text: '[OUTPUT] Generated master workbook (8 sheets) -> output/2026/2026-10_cashew.xlsx', delay: 300, cls: 'log-cyan' },
        { text: '✔ PIPELINE EXECUTION COMPLETE: 0 errors, delta reconciled, status: OK (1.82s)', delay: 200, cls: 'log-success' }
      ]
    },
    'fund-risk': {
      cmd: 'eval fund-risk --fund DCDS --simulations 100000 --device cuda:0',
      logs: [
        { text: '[CUDA] Detected GPU: NVIDIA Tensor Core (CUDA 12.2 active)', delay: 150, cls: 'log-purple' },
        { text: '[ETL] Ingesting 2,000+ monthly NAV reports from Dragon Capital...', delay: 300, cls: 'log-info' },
        { text: '[PARALLEL] ProcessPoolExecutor normalized 5 fund series (DCDS, DCBF, DCDE, DCIP, Diamond)', delay: 400, cls: 'log-cyan' },
        { text: '[STATS] Calculating rolling Sharpe: 1.48 | Sortino: 1.82 | Max Drawdown: -14.2%', delay: 350, cls: 'log-info' },
        { text: '[MONTE-CARLO] Running 100,000 geometric Brownian motion paths (252 trading days)...', delay: 500, cls: 'log-cyan' },
        { text: '[QUANT] VaR 95%: -2.85% | Expected Return (Annualized): +18.4%', delay: 250, cls: 'log-warn' },
        { text: '✔ SIMULATION FINISHED: Parquet serialized to data/master_nav.parquet (0.94s)', delay: 200, cls: 'log-success' }
      ]
    },
    'token-health': {
      cmd: 'audit token-health --engine self-healing --target meta-graph-v19',
      logs: [
        { text: '[OAUTH] Connecting to Meta Graph API v19.0 endpoint...', delay: 150, cls: 'log-info' },
        { text: '[INSPECT] Page Access Token inspected: lifespan = NEVER_EXPIRE (Permanent)', delay: 300, cls: 'log-success' },
        { text: '[WORKER] Node-cron scheduler healthy: interval = 15m polling', delay: 250, cls: 'log-cyan' },
        { text: '[RESILIENCE] Graceful degradation active: in-memory fallback cache verified', delay: 350, cls: 'log-info' },
        { text: '[SYNC] Ingested 142 recent posts (Reels, Videos, Photos) + live reach & impressions', delay: 400, cls: 'log-purple' },
        { text: '[VIRAL-SCORE] Top 5 viral algorithm evaluated -> Top asset score: 94.2/100', delay: 300, cls: 'log-cyan' },
        { text: '✔ CONNECTION VERIFIED: 100% token survival, 0 downtime incidents', delay: 200, cls: 'log-success' }
      ]
    }
  },

  init() {
    this.container = document.getElementById('recruiter-terminal');
    if (!this.container) return;
    this.bodyEl = this.container.querySelector('.terminal-body');

    // Attach click listeners to chips
    this.container.querySelectorAll('.terminal-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.cmd;
        this.runCommand(key);
      });
    });

    // Auto-run first command with a gentle delay so it feels alive
    setTimeout(() => {
      this.runCommand('cashew-ocr');
    }, 800);
  },

  async runCommand(key) {
    if (this.isExecuting || !this.COMMANDS[key]) return;
    this.isExecuting = true;

    const { cmd, logs } = this.COMMANDS[key];
    if (this.bodyEl) {
      this.bodyEl.innerHTML = '';
      
      // Print command prompt
      const promptLine = document.createElement('div');
      promptLine.innerHTML = `<span class="log-prompt">minh@production:~$</span> <span class="log-cmd">${cmd}</span>`;
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

    this.isExecuting = false;
  }
};

window.Terminal = Terminal;
