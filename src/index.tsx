import { createRoot } from 'react-dom/client';
import { StrictMode, lazy, Suspense } from 'react';
import { kcContext as kcLoginThemeContext } from './login/kcContext';
import { kcContext as kcAccountThemeContext } from './account/kcContext';
import reportWebVitals from 'reportWebVitals';

// lazy-loaded components
const KcLoginThemeApp = lazy(() => import('./login/KcApp'));
const KcAccountThemeApp = lazy(() => import('./account/KcApp'));
const App = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* Suspense manages the loading of the lazy-loaded components. */}
        <Suspense>
            {(() => {
                if (kcLoginThemeContext !== undefined) {
                    return (
                        <KcLoginThemeApp
                            kcContext={kcLoginThemeContext}
                        />
                    );
                }

                if (kcAccountThemeContext !== undefined) {
                    return (
                        <KcAccountThemeApp
                            kcContext={kcAccountThemeContext}
                        />
                    );
                }

                return <App />;
            })()}
        </Suspense>
    </StrictMode>,
);

// report performance metrics for the app.
reportWebVitals();
