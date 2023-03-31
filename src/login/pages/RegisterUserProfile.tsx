// ejected using 'npx eject-keycloak-page'
import { useState } from 'react';
import { UserProfileFormFields } from './shared/UserProfileFormFields';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { KcContext } from '../kcContext';
import type { I18n } from '../i18n';

export default function RegisterUserProfile(
    props: PageProps<
        Extract<KcContext, { pageId: 'register-user-profile.ftl' }>,
        I18n
    >,
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } =
        props;
    const {
        url,
        messagesPerField,
        recaptchaRequired,
        recaptchaSiteKey,
    } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFomSubmittable, setIsFomSubmittable] = useState(false);

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={messagesPerField.exists('global')}
            displayRequiredFields={true}
            headerNode={msg('registerTitle')}
        >
            <form
                id="kc-register-form"
                action={url.registrationAction}
                method="post"
            >
                <UserProfileFormFields
                    kcContext={kcContext}
                    onIsFormSubmittableValueChange={
                        setIsFomSubmittable
                    }
                    i18n={i18n}
                />
                {recaptchaRequired && (
                    <div>
                        <div>
                            <div
                                data-size="compact"
                                data-sitekey={recaptchaSiteKey}
                            />
                        </div>
                    </div>
                )}
                <div style={{ marginBottom: 30 }}>
                    <div id="kc-form-options">
                        <div>
                            <span>
                                <a href={url.loginUrl}>
                                    {msg('backToLogin')}
                                </a>
                            </span>
                        </div>
                    </div>

                    <div id="kc-form-buttons">
                        <input
                            type="submit"
                            value={msgStr('doRegister')}
                            disabled={!isFomSubmittable}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
