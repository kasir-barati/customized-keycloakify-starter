import { createRoot } from 'react-dom/client';
import { StrictMode, lazy, Suspense } from 'react';
import { kcContext as kcLoginThemeContext } from './login/kcContext';
import { kcContext as kcAccountThemeContext } from './account/kcContext';
import reportWebVitals from 'reportWebVitals';

const KcLoginThemeApp = lazy(() => import('./login/KcApp'));
const KcAccountThemeApp = lazy(() => import('./account/KcApp'));
const App = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
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

reportWebVitals();
