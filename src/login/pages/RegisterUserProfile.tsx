// ejected using 'npx eject-keycloak-page'
import { useState } from 'react';
import { UserProfileFormFields } from './shared/UserProfileFormFields';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { KcContext } from '../kcContext';
import type { I18n } from '../i18n';
import { Box, Button, Link } from '@mui/material';

export default function RegisterUserProfile(
    props: PageProps<
        Extract<KcContext, { pageId: 'register-user-profile.ftl' }>,
        I18n
    >,
) {
    console.log('\n', 'it is me, register page', '\n');

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
            <Box
                component="form"
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
                    <Box>
                        <Box>
                            <Box
                                data-size="compact"
                                data-sitekey={recaptchaSiteKey}
                            />
                        </Box>
                    </Box>
                )}
                <Box style={{ marginBottom: 30 }}>
                    <Box id="kc-form-options">
                        <Box>
                            <Link href={url.loginUrl}>
                                {msg('backToLogin')}
                            </Link>
                        </Box>
                    </Box>

                    <Box id="kc-form-buttons">
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            value={msgStr('doRegister')}
                            disabled={!isFomSubmittable}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
