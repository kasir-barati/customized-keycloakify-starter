// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx
import { assert } from 'keycloakify/tools/assert';
import {
    Box,
    Typography,
    Link,
    InputLabel,
    TextField,
    Select,
    SelectChangeEvent,
    MenuItem,
    FormControl,
} from '@mui/material';
import { usePrepareTemplate } from 'keycloakify/lib/usePrepareTemplate';
import { type TemplateProps } from 'keycloakify/login/TemplateProps';
import { useGetClassName } from 'keycloakify/login/lib/useGetClassName';
import type { KcContext } from './kcContext';
import type { I18n } from './i18n';

export default function Template(
    props: TemplateProps<KcContext, I18n>,
) {
    console.log('\n', 'it is me, template san', '\n');

    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children,
    } = props;
    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes,
    });
    const {
        msg,
        changeLocale,
        labelBySupportedLanguageTag,
        currentLanguageTag,
    } = i18n;
    const {
        realm,
        locale,
        auth,
        url,
        message,
        isAppInitiatedAction,
    } = kcContext;
    const { isReady } = usePrepareTemplate({
        doFetchDefaultThemeResources: doUseDefaultCss,
        url,
        stylesCommon: [
            'node_modules/patternfly/dist/css/patternfly.min.css',
            'node_modules/patternfly/dist/css/patternfly-additions.min.css',
            'lib/zocial/zocial.css',
        ],
        styles: ['css/login.css'],
        htmlClassName: getClassName('kcHtmlClass'),
        bodyClassName: undefined,
    });

    function onChangeLocale(event: SelectChangeEvent) {
        changeLocale(event.target.value as string);
    }

    if (!isReady) {
        return null;
    }

    return (
        <Box
            textAlign="center"
            bgcolor="rgba(213, 213,213, 0.7)"
            minHeight="100vh"
        >
            <Box id="kc-header" marginBottom={4}>
                <Box
                    id="kc-header-wrapper"
                    padding={1}
                    bgcolor="white"
                    textAlign="center"
                >
                    <Typography
                        variant="h3"
                        color="turquoise"
                        fontWeight={900}
                    >
                        {msg('loginTitleHtml', realm.displayNameHtml)}
                    </Typography>
                </Box>
            </Box>

            <Box
                width="50vw"
                marginY={1}
                marginX="auto"
                padding={3}
                borderRadius={13}
                bgcolor="white"
            >
                <Box component="header" marginY={1} textAlign="left">
                    {realm.internationalizationEnabled &&
                        (assert(locale !== undefined), true) &&
                        locale.supported.length > 1 && (
                            <Box id="kc-locale">
                                <Box id="kc-locale-wrapper">
                                    <Box
                                        id="kc-locale-dropdown"
                                        marginBottom={2}
                                    >
                                        <FormControl fullWidth={true}>
                                            <InputLabel id="select-language-label">
                                                Language
                                            </InputLabel>
                                            <Select
                                                fullWidth={true}
                                                labelId="select-language-label"
                                                id="kc-current-locale-link"
                                                value={
                                                    labelBySupportedLanguageTag[
                                                        currentLanguageTag
                                                    ]
                                                }
                                                label={
                                                    labelBySupportedLanguageTag[
                                                        currentLanguageTag
                                                    ]
                                                }
                                                onChange={
                                                    onChangeLocale
                                                }
                                            >
                                                {locale.supported.map(
                                                    ({
                                                        languageTag,
                                                    }) => {
                                                        const value =
                                                            labelBySupportedLanguageTag[
                                                                languageTag
                                                            ];

                                                        return (
                                                            <MenuItem
                                                                key={
                                                                    languageTag
                                                                }
                                                                value={
                                                                    value
                                                                }
                                                            >
                                                                {
                                                                    value
                                                                }
                                                            </MenuItem>
                                                        );
                                                    },
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    {!(
                        auth !== undefined &&
                        auth.showUsername &&
                        !auth.showResetCredentials
                    ) ? (
                        displayRequiredFields ? (
                            <Box>
                                <Box>
                                    <span>
                                        <span>*</span>
                                        {msg('requiredFields')}
                                    </span>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        id="kc-page-title"
                                    >
                                        {headerNode}
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                id="kc-page-title"
                            >
                                {headerNode}
                            </Typography>
                        )
                    ) : displayRequiredFields ? (
                        <Box>
                            <Box>
                                <span>
                                    <span>*</span>{' '}
                                    {msg('requiredFields')}
                                </span>
                            </Box>
                            <Box>
                                {showUsernameNode}
                                <Box>
                                    <Box id="kc-username">
                                        <label id="kc-attempted-username">
                                            {auth?.attemptedUsername}
                                        </label>
                                        <a
                                            id="reset-login"
                                            href={
                                                url.loginRestartFlowUrl
                                            }
                                        >
                                            <Box>
                                                <i></i>
                                                <span>
                                                    {msg(
                                                        'restartLoginTooltip',
                                                    )}
                                                </span>
                                            </Box>
                                        </a>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            {showUsernameNode}
                            <Box>
                                <Box id="kc-username">
                                    <InputLabel id="kc-attempted-username">
                                        {auth?.attemptedUsername}
                                    </InputLabel>
                                    <Link
                                        id="reset-login"
                                        href={url.loginRestartFlowUrl}
                                    >
                                        <Box>
                                            <i></i>
                                            <span>
                                                {msg(
                                                    'restartLoginTooltip',
                                                )}
                                            </span>
                                        </Box>
                                    </Link>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
                <Box id="kc-content" textAlign="left">
                    <Box id="kc-content-wrapper">
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {displayMessage &&
                            message !== undefined &&
                            (message.type !== 'warning' ||
                                !isAppInitiatedAction) && (
                                <Box marginY={1}>
                                    {message.type === 'success' && (
                                        <span></span>
                                    )}
                                    {message.type === 'warning' && (
                                        <span></span>
                                    )}
                                    {message.type === 'error' && (
                                        <span></span>
                                    )}
                                    {message.type === 'info' && (
                                        <span></span>
                                    )}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: message.summary,
                                        }}
                                    />
                                </Box>
                            )}
                        {children}
                        {auth !== undefined &&
                            auth.showTryAnotherWayLink &&
                            showAnotherWayIfPresent && (
                                <Box
                                    component="form"
                                    width="100%"
                                    textAlign="left"
                                    id="kc-select-try-another-way-form"
                                    action={url.loginAction}
                                    method="post"
                                >
                                    <Box marginY={1}>
                                        <TextField
                                            type="hidden"
                                            name="tryAnotherWay"
                                            value="on"
                                        />
                                        <Link
                                            underline="none"
                                            href="#"
                                            id="try-another-way"
                                            onClick={() => {
                                                document.forms[
                                                    'kc-select-try-another-way-form' as never
                                                ].submit();
                                                return false;
                                            }}
                                        >
                                            {msg('doTryAnotherWay')}
                                        </Link>
                                    </Box>
                                </Box>
                            )}
                        {displayInfo && (
                            <Box id="kc-info">
                                <Box id="kc-info-wrapper">
                                    {infoNode}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
