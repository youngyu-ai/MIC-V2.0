import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled runtime error in app:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: '#f5f5f4', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: '480px', width: '100%', backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #e7e5e4', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚠️</div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1c1917', marginBottom: '8px' }}>
              系統載入發生非預期錯誤
            </h2>
            <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '16px', lineHeight: 1.5 }}>
              應用程式在啟動或渲染時遇到問題，請點擊下方按鈕重新載入或重設快取。
            </p>
            {this.state.error && (
              <pre style={{ textAlign: 'left', backgroundColor: '#f5f5f4', padding: '10px', borderRadius: '6px', fontSize: '11px', color: '#b91c1c', overflowX: 'auto', marginBottom: '16px' }}>
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <button
              onClick={() => {
                window.location.reload();
              }}
              style={{ backgroundColor: '#f59e0b', color: '#1c1917', fontWeight: 'bold', fontSize: '13px', padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              重新整理網頁
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
} else {
  console.error('Fatal: #root container element not found in DOM.');
}
